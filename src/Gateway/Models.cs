namespace SOAForge.Gateway;

public sealed record TokenRequest(string Username, string Password);

public sealed record TokenResponse(
    string AccessToken,
    string TokenType,
    DateTimeOffset ExpiresAtUtc,
    string Role);

public sealed record JwtSettings(
    string Issuer,
    string Audience,
    string SigningKey,
    int LifetimeMinutes);

public sealed record ServiceCatalogEntry(
    string Name,
    string Version,
    string GatewayRoute,
    string UpstreamOpenApi,
    string Responsibility);

public sealed record ServiceHealthResult(
    string Name,
    string Status,
    int? StatusCode,
    long DurationMs,
    string? Error);

public sealed record ServiceHealthSummary(
    bool IsHealthy,
    DateTimeOffset CheckedAtUtc,
    IReadOnlyCollection<ServiceHealthResult> Services);

public sealed record GatewayMetricsSnapshot(
    long TotalRequests,
    long FailedRequests,
    double AverageDurationMs,
    DateTimeOffset StartedAtUtc);
