using System.Collections.Concurrent;

namespace SOAForge.OrderService;

public sealed class OrderRepository
{
    private readonly ConcurrentDictionary<Guid, Order> _orders = new();

    public IReadOnlyCollection<Order> GetAll() =>
        _orders.Values.OrderByDescending(order => order.CreatedAt).ToArray();

    public Order? Get(Guid id) =>
        _orders.TryGetValue(id, out var order) ? order : null;

    public IReadOnlyCollection<Order> GetByCustomer(Guid customerId) =>
        _orders.Values
            .Where(order => order.CustomerId == customerId)
            .OrderByDescending(order => order.CreatedAt)
            .ToArray();

    public Order Create(Guid customerId, decimal total)
    {
        var order = new Order(
            Guid.NewGuid(),
            customerId,
            total,
            "PendingPayment",
            DateTimeOffset.UtcNow);

        _orders[order.Id] = order;
        return order;
    }
}
