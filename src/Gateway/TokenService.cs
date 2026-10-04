using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace SOAForge.Gateway;

public sealed class TokenService
{
    private readonly JwtSettings _settings;

    public TokenService(IConfiguration configuration)
        : this(new JwtSettings(
            configuration["Gateway:Jwt:Issuer"] ?? "SOAForge.Gateway",
            configuration["Gateway:Jwt:Audience"] ?? "SOAForge.NovaCommerce",
            configuration["Gateway:Jwt:SigningKey"]
                ?? throw new InvalidOperationException("Gateway JWT signing key is required."),
            int.TryParse(configuration["Gateway:Jwt:LifetimeMinutes"], out var lifetime)
                ? lifetime
                : 60))
    {
    }

    public TokenService(JwtSettings settings)
    {
        if (Encoding.UTF8.GetByteCount(settings.SigningKey) < 32)
        {
            throw new ArgumentException("JWT signing key must contain at least 32 bytes.", nameof(settings));
        }

        _settings = settings;
    }

    public TokenResponse Create(string username, string role)
    {
        var now = DateTimeOffset.UtcNow;
        var expiresAt = now.AddMinutes(_settings.LifetimeMinutes);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.SigningKey)),
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            notBefore: now.UtcDateTime,
            expires: expiresAt.UtcDateTime,
            signingCredentials: credentials);

        return new TokenResponse(
            new JwtSecurityTokenHandler().WriteToken(token),
            "Bearer",
            expiresAt,
            role);
    }
}
