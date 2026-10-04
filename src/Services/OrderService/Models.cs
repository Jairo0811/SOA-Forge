namespace SOAForge.OrderService;

public sealed record Order(
    Guid Id,
    Guid CustomerId,
    decimal Total,
    string Status,
    DateTimeOffset CreatedAt);

public sealed record CreateOrderRequest(Guid CustomerId, decimal Total);
