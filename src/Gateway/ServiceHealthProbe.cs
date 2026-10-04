using System.Diagnostics;

namespace SOAForge.Gateway;

public sealed class ServiceHealthProbe
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public ServiceHealthProbe(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<ServiceHealthSummary> CheckAsync(CancellationToken cancellationToken)
    {
        var results = new List<ServiceHealthResult>();
        var client = _httpClientFactory.CreateClient();
        client.Timeout = TimeSpan.FromSeconds(3);

        foreach (var service in _configuration.GetSection("Gateway:Services").GetChildren())
        {
            var name = service.Key;
            var baseUrl = service["BaseUrl"];

            if (string.IsNullOrWhiteSpace(baseUrl))
            {
                results.Add(new ServiceHealthResult(
                    name,
                    "Misconfigured",
                    null,
                    0,
                    "BaseUrl is missing."));
                continue;
            }

            var stopwatch = Stopwatch.StartNew();

            try
            {
                using var response = await client.GetAsync(
                    $"{baseUrl.TrimEnd('/')}/health",
                    cancellationToken);
                stopwatch.Stop();

                results.Add(new ServiceHealthResult(
                    name,
                    response.IsSuccessStatusCode ? "Healthy" : "Unhealthy",
                    (int)response.StatusCode,
                    stopwatch.ElapsedMilliseconds,
                    response.IsSuccessStatusCode ? null : response.ReasonPhrase));
            }
            catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
            {
                stopwatch.Stop();
                results.Add(new ServiceHealthResult(
                    name,
                    "Timeout",
                    null,
                    stopwatch.ElapsedMilliseconds,
                    "Health request exceeded the 3 second timeout."));
            }
            catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
            {
                stopwatch.Stop();
                results.Add(new ServiceHealthResult(
                    name,
                    "Unavailable",
                    null,
                    stopwatch.ElapsedMilliseconds,
                    ex.Message));
            }
        }

        return new ServiceHealthSummary(
            results.Count > 0 && results.All(result => result.Status == "Healthy"),
            DateTimeOffset.UtcNow,
            results);
    }
}
