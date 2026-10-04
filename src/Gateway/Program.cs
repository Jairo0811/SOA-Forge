using System.Diagnostics;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using SOAForge.Gateway;

var builder = WebApplication.CreateBuilder(args);

var issuer = builder.Configuration["Gateway:Jwt:Issuer"] ?? "SOAForge.Gateway";
var audience = builder.Configuration["Gateway:Jwt:Audience"] ?? "SOAForge.NovaCommerce";
var signingKey = builder.Configuration["Gateway:Jwt:SigningKey"]
    ?? throw new InvalidOperationException("Gateway JWT signing key is required.");

builder.Services.AddOpenApi();
builder.Services.AddHttpClient();
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<GatewayMetrics>();
builder.Services.AddSingleton<ServiceHealthProbe>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("gateway", policy => policy.RequireAuthenticatedUser());
});

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("gateway", limiter =>
    {
        limiter.PermitLimit = 60;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueLimit = 0;
        limiter.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var allowedOrigins = builder.Configuration
    .GetSection("Gateway:Portal:AllowedOrigins")
    .GetChildren()
    .Select(section => section.Value)
    .Where(value => !string.IsNullOrWhiteSpace(value))
    .Cast<string>()
    .ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy("portal", policy =>
    {
        policy
            .WithOrigins(allowedOrigins.Length == 0
                ? new[] { "http://localhost:5173" }
                : allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("portal");
app.UseAuthentication();

app.Use(async (context, next) =>
{
    var correlationId = context.Request.Headers["X-Correlation-ID"].FirstOrDefault();
    if (string.IsNullOrWhiteSpace(correlationId))
    {
        correlationId = Guid.NewGuid().ToString("N");
    }

    context.Request.Headers["X-Correlation-ID"] = correlationId;

    var traceId = Activity.Current?.TraceId.ToString() ?? correlationId;
    context.Response.Headers["X-Correlation-ID"] = correlationId;
    context.Response.Headers["X-Trace-ID"] = traceId;

    var stopwatch = Stopwatch.StartNew();

    try
    {
        await next();
    }
    finally
    {
        stopwatch.Stop();
        var metrics = context.RequestServices.GetRequiredService<GatewayMetrics>();
        metrics.Record(context.Response.StatusCode, stopwatch.ElapsedMilliseconds);

        var username = context.User.Identity?.IsAuthenticated == true
            ? context.User.Identity.Name ?? "authenticated"
            : "anonymous";

        app.Logger.LogInformation(
            "gateway_request Method={Method} Path={Path} StatusCode={StatusCode} DurationMs={DurationMs} User={User} CorrelationId={CorrelationId} TraceId={TraceId}",
            context.Request.Method,
            context.Request.Path.Value,
            context.Response.StatusCode,
            stopwatch.ElapsedMilliseconds,
            username,
            correlationId,
            traceId);
    }
});

app.UseRateLimiter();
app.UseAuthorization();

app.MapOpenApi().AllowAnonymous();

app.MapGet("/", () => Results.Ok(new
{
    service = "SOAForge.Gateway",
    version = "v1",
    project = "SOAForge / NovaCommerce",
    gateway = "YARP"
})).AllowAnonymous();

app.MapPost("/auth/token", (
    TokenRequest request,
    IConfiguration configuration,
    TokenService tokenService) =>
{
    var expectedUsername = configuration["Gateway:DemoUser:Username"] ?? "demo";
    var expectedPassword = configuration["Gateway:DemoUser:Password"] ?? "SOAForge2026!";
    var expectedRole = configuration["Gateway:DemoUser:Role"] ?? "operator";

    if (!string.Equals(request.Username, expectedUsername, StringComparison.Ordinal)
        || !string.Equals(request.Password, expectedPassword, StringComparison.Ordinal))
    {
        return Results.Unauthorized();
    }

    return Results.Ok(tokenService.Create(request.Username, expectedRole));
})
.AllowAnonymous()
.WithTags("Authentication");

app.MapGet("/catalog", () => Results.Ok(new[]
{
    new ServiceCatalogEntry(
        "CustomerService",
        "v1",
        "/api/v1/customers",
        "http://localhost:5101/openapi/v1.json",
        "Customer profiles and customer lookup"),
    new ServiceCatalogEntry(
        "OrderService",
        "v1",
        "/api/v1/orders",
        "http://localhost:5102/openapi/v1.json",
        "Orders and customer validation"),
    new ServiceCatalogEntry(
        "PaymentService",
        "v1",
        "/api/v1/payments",
        "http://localhost:5103/openapi/v1.json",
        "Payments and order validation")
})).AllowAnonymous();

app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    service = "SOAForge.Gateway",
    checkedAtUtc = DateTimeOffset.UtcNow
})).AllowAnonymous();

app.MapGet("/health/services", async (
    ServiceHealthProbe probe,
    CancellationToken cancellationToken) =>
{
    var summary = await probe.CheckAsync(cancellationToken);
    return summary.IsHealthy
        ? Results.Ok(summary)
        : Results.Json(summary, statusCode: StatusCodes.Status503ServiceUnavailable);
}).AllowAnonymous();

app.MapGet("/observability/metrics", (GatewayMetrics metrics) =>
    Results.Ok(metrics.Snapshot()))
    .AllowAnonymous();

app.MapReverseProxy()
    .RequireRateLimiting("gateway");

app.Run();
