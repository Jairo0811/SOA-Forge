using SOAForge.CustomerService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<CustomerRepository>();

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/", () => Results.Ok(new
{
    service = "CustomerService",
    version = "v1",
    project = "SOAForge / NovaCommerce"
}));

app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    service = "CustomerService"
}));

var customers = app.MapGroup("/api/customers").WithTags("Customers");

customers.MapGet("/", (CustomerRepository repository) =>
    Results.Ok(repository.GetAll()))
    .WithName("GetCustomers");

customers.MapGet("/{id:guid}", (Guid id, CustomerRepository repository) =>
{
    var customer = repository.Get(id);
    return customer is null ? Results.NotFound() : Results.Ok(customer);
})
.WithName("GetCustomerById")
.Produces<Customer>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

customers.MapPost("/", (CreateCustomerRequest request, CustomerRepository repository) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        return Results.BadRequest(new { error = "Name is required." });
    }

    if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@'))
    {
        return Results.BadRequest(new { error = "A valid email is required." });
    }

    var created = repository.Create(request.Name, request.Email);
    return Results.Created($"/api/customers/{created.Id}", created);
})
.WithName("CreateCustomer")
.Produces<Customer>(StatusCodes.Status201Created)
.Produces(StatusCodes.Status400BadRequest);

app.Run();
