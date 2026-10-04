using SOAForge.CustomerService;
using SOAForge.OrderService;
using SOAForge.PaymentService;

namespace SOAForge.Core.Tests;

public sealed class RepositoryTests
{
    [Fact]
    public void CustomerRepository_ContainsSeededCustomers()
    {
        var repository = new CustomerRepository();

        var customers = repository.GetAll();

        Assert.True(customers.Count >= 2);
        Assert.Contains(customers, customer => customer.Email == "ana@novacommerce.local");
    }

    [Fact]
    public void CustomerRepository_CreateAddsCustomer()
    {
        var repository = new CustomerRepository();

        var created = repository.Create("Jairo Test", "jairo@test.local");

        Assert.Equal(created, repository.Get(created.Id));
    }

    [Fact]
    public void OrderRepository_CreatePersistsOrder()
    {
        var repository = new OrderRepository();
        var customerId = Guid.NewGuid();

        var created = repository.Create(customerId, 1500m);

        Assert.Equal("PendingPayment", created.Status);
        Assert.Equal(created, repository.Get(created.Id));
        Assert.Single(repository.GetByCustomer(customerId));
    }

    [Fact]
    public void PaymentRepository_CreatePersistsApprovedPayment()
    {
        var repository = new PaymentRepository();
        var orderId = Guid.NewGuid();

        var created = repository.Create(orderId, 1500m);

        Assert.Equal("Approved", created.Status);
        Assert.Equal(created, repository.Get(created.Id));
    }
}
