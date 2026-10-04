namespace SOAForge.PaymentService;

public sealed record Payment(
    Guid Id,
    Guid OrderId,
    decimal Amount,
    string Status,
    DateTimeOffset CreatedAt);

public sealed record CreatePaymentRequest(Guid OrderId, decimal Amount);
