namespace SOAForge.Gateway;

public sealed class GatewayMetrics
{
    private long _totalRequests;
    private long _failedRequests;
    private long _totalDurationMs;
    private readonly DateTimeOffset _startedAtUtc = DateTimeOffset.UtcNow;

    public void Record(int statusCode, long durationMs)
    {
        Interlocked.Increment(ref _totalRequests);
        Interlocked.Add(ref _totalDurationMs, durationMs);

        if (statusCode >= 400)
        {
            Interlocked.Increment(ref _failedRequests);
        }
    }

    public GatewayMetricsSnapshot Snapshot()
    {
        var total = Volatile.Read(ref _totalRequests);
        var failed = Volatile.Read(ref _failedRequests);
        var duration = Volatile.Read(ref _totalDurationMs);
        var average = total == 0 ? 0 : Math.Round((double)duration / total, 2);

        return new GatewayMetricsSnapshot(total, failed, average, _startedAtUtc);
    }
}
