using System.Collections.Concurrent;

namespace SOAForge.PaymentService;

public sealed class PaymentRepository
{
    private readonly ConcurrentDictionary<Guid, Payment> _payments = new();

    public IReadOnlyCollection<Payment> GetAll() =>
        _payments.Values.OrderByDescending(payment => payment.CreatedAt).ToArray();

    public Payment? Get(Guid id) =>
        _payments.TryGetValue(id, out var payment) ? payment : null;

    public Payment Create(Guid orderId, decimal amount)
    {
        var payment = new Payment(
            Guid.NewGuid(),
            orderId,
            amount,
            "Approved",
            DateTimeOffset.UtcNow);

        _payments[payment.Id] = payment;
        return payment;
    }
}
