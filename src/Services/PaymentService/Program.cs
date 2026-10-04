using SOAForge.PaymentService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<PaymentRepository>();
builder.Services.AddHttpClient<OrderServiceClient>(client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration["Services:OrderServiceBaseUrl"]
        ?? "http://localhost:5102");
});

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/", () => Results.Ok(new
{
    service = "PaymentService",
    version = "v1",
    project = "SOAForge / NovaCommerce"
}));

app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    service = "PaymentService"
}));

var payments = app.MapGroup("/api/payments").WithTags("Payments");

payments.MapGet("/", (PaymentRepository repository) =>
    Results.Ok(repository.GetAll()))
    .WithName("GetPayments");

payments.MapGet("/{id:guid}", (Guid id, PaymentRepository repository) =>
{
    var payment = repository.Get(id);
    return payment is null ? Results.NotFound() : Results.Ok(payment);
})
.WithName("GetPaymentById")
.Produces<Payment>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

payments.MapPost("/", async (
    CreatePaymentRequest request,
    PaymentRepository repository,
    OrderServiceClient orderService,
    CancellationToken cancellationToken) =>
{
    if (request.OrderId == Guid.Empty)
    {
        return Results.BadRequest(new { error = "OrderId is required." });
    }

    if (request.Amount <= 0)
    {
        return Results.BadRequest(new { error = "Amount must be greater than zero." });
    }

    if (!await orderService.ExistsAsync(request.OrderId, cancellationToken))
    {
        return Results.BadRequest(new { error = "Order does not exist." });
    }

    var created = repository.Create(request.OrderId, request.Amount);
    return Results.Created($"/api/payments/{created.Id}", created);
})
.WithName("CreatePayment")
.Produces<Payment>(StatusCodes.Status201Created)
.Produces(StatusCodes.Status400BadRequest);

app.Run();
