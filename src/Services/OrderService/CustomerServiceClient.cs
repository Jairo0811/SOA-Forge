using System.Net;

namespace SOAForge.OrderService;

public sealed class CustomerServiceClient
{
    private readonly HttpClient _httpClient;

    public CustomerServiceClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<bool> ExistsAsync(Guid customerId, CancellationToken cancellationToken = default)
    {
        using var response = await _httpClient.GetAsync(
            $"/api/customers/{customerId}",
            cancellationToken);

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return false;
        }

        response.EnsureSuccessStatusCode();
        return true;
    }
}
