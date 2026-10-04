using SOAForge.OrderService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<OrderRepository>();
builder.Services.AddHttpClient<CustomerServiceClient>(client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration["Services:CustomerServiceBaseUrl"]
        ?? "http://localhost:5101");
});

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/", () => Results.Ok(new
{
    service = "OrderService",
    version = "v1",
    project = "SOAForge / NovaCommerce"
}));

app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    service = "OrderService"
}));

var orders = app.MapGroup("/api/orders").WithTags("Orders");

orders.MapGet("/", (OrderRepository repository) =>
    Results.Ok(repository.GetAll()))
    .WithName("GetOrders");

orders.MapGet("/{id:guid}", (Guid id, OrderRepository repository) =>
{
    var order = repository.Get(id);
    return order is null ? Results.NotFound() : Results.Ok(order);
})
.WithName("GetOrderById")
.Produces<Order>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

orders.MapGet("/customer/{customerId:guid}", (Guid customerId, OrderRepository repository) =>
    Results.Ok(repository.GetByCustomer(customerId)))
    .WithName("GetOrdersByCustomer");

orders.MapPost("/", async (
    CreateOrderRequest request,
    OrderRepository repository,
    CustomerServiceClient customerService,
    CancellationToken cancellationToken) =>
{
    if (request.CustomerId == Guid.Empty)
    {
        return Results.BadRequest(new { error = "CustomerId is required." });
    }

    if (request.Total <= 0)
    {
        return Results.BadRequest(new { error = "Total must be greater than zero." });
    }

    if (!await customerService.ExistsAsync(request.CustomerId, cancellationToken))
    {
        return Results.BadRequest(new { error = "Customer does not exist." });
    }

    var created = repository.Create(request.CustomerId, request.Total);
    return Results.Created($"/api/orders/{created.Id}", created);
})
.WithName("CreateOrder")
.Produces<Order>(StatusCodes.Status201Created)
.Produces(StatusCodes.Status400BadRequest);

app.Run();
