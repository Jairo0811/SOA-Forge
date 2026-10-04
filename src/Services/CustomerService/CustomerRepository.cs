using System.Collections.Concurrent;

namespace SOAForge.CustomerService;

public sealed class CustomerRepository
{
    private readonly ConcurrentDictionary<Guid, Customer> _customers = new();

    public CustomerRepository()
    {
        Seed(new Customer(
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Ana Pérez",
            "ana@novacommerce.local",
            DateTimeOffset.UtcNow));

        Seed(new Customer(
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            "Carlos Gómez",
            "carlos@novacommerce.local",
            DateTimeOffset.UtcNow));
    }

    public IReadOnlyCollection<Customer> GetAll() =>
        _customers.Values.OrderBy(customer => customer.Name).ToArray();

    public Customer? Get(Guid id) =>
        _customers.TryGetValue(id, out var customer) ? customer : null;

    public Customer Create(string name, string email)
    {
        var customer = new Customer(
            Guid.NewGuid(),
            name.Trim(),
            email.Trim(),
            DateTimeOffset.UtcNow);

        _customers[customer.Id] = customer;
        return customer;
    }

    private void Seed(Customer customer) => _customers[customer.Id] = customer;
}
