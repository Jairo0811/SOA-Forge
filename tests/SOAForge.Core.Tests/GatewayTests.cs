using System.IdentityModel.Tokens.Jwt;
using SOAForge.Gateway;
using Xunit;

namespace SOAForge.Core.Tests;

public sealed class GatewayTests
{
    [Fact]
    public void TokenService_CreatesSignedJwtWithExpectedIssuer()
    {
        var service = new TokenService(new JwtSettings(
            "SOAForge.Gateway",
            "SOAForge.NovaCommerce",
            "SOAForge-Test-Signing-Key-With-More-Than-32-Bytes",
            30));

        var result = service.Create("demo", "operator");
        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(result.AccessToken);

        Assert.Equal("Bearer", result.TokenType);
        Assert.Equal("SOAForge.Gateway", jwt.Issuer);
        Assert.Contains(jwt.Claims, claim => claim.Type == "sub" && claim.Value == "demo");
    }

    [Fact]
    public void GatewayMetrics_TracksRequestsFailuresAndAverageDuration()
    {
        var metrics = new GatewayMetrics();

        metrics.Record(200, 10);
        metrics.Record(500, 30);

        var snapshot = metrics.Snapshot();

        Assert.Equal(2, snapshot.TotalRequests);
        Assert.Equal(1, snapshot.FailedRequests);
        Assert.Equal(20d, snapshot.AverageDurationMs);
    }
}
