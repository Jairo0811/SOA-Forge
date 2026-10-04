namespace SOAForge.CustomerService;

public sealed record Customer(
    Guid Id,
    string Name,
    string Email,
    DateTimeOffset CreatedAt);

public sealed record CreateCustomerRequest(string Name, string Email);
