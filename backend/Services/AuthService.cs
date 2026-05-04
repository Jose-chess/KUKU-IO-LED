using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly ConnectivityService _connectivity;

    public AuthService(IConfiguration configuration, ConnectivityService connectivity)
    {
        _configuration = configuration;
        _connectivity = connectivity;
    }

    private HttpClient CreateSupabaseClient()
    {
        var supabaseUrl = _configuration["SupabaseConfig:Url"]?.TrimEnd('/');
        var supabaseKey = _configuration["SupabaseConfig:Key"];

        var client = new HttpClient { BaseAddress = new Uri($"{supabaseUrl}/") };
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", supabaseKey);
        client.DefaultRequestHeaders.Add("apikey", supabaseKey);
        client.DefaultRequestHeaders.Add("Prefer", "return=representation");
        return client;
    }

    public async Task<(string? token, string? error)> LoginAsync(string usuario, string password)
    {
        try
        {
            using var http = CreateSupabaseClient();
            
            // Buscar usuario por nombre de usuario
            var response = await http.GetAsync($"rest/v1/usuarios?usuario=eq.{Uri.EscapeDataString(usuario)}&select=*");
            response.EnsureSuccessStatusCode();
            
            var json = await response.Content.ReadAsStringAsync();
            var usuarios = JsonSerializer.Deserialize<List<JsonElement>>(json);
            
            if (usuarios == null || usuarios.Count == 0)
            {
                return (null, "Usuario o contraseña incorrectos");
            }

            var userData = usuarios[0];
            
            // Verificar si el campo existe y obtener el hash de contraseña
            if (!userData.TryGetProperty("password_hash", out var passwordHashElement))
            {
                return (null, "Usuario o contraseña incorrectos");
            }
            
            var passwordHash = passwordHashElement.GetString();
            
            // Verificar contraseña con BCrypt
            if (string.IsNullOrEmpty(passwordHash) || !BCrypt.Net.BCrypt.Verify(password, passwordHash))
            {
                return (null, "Usuario o contraseña incorrectos");
            }

            // Obtener datos del usuario
            var userId = userData.GetProperty("id").GetInt32();
            var nombre = userData.GetProperty("nombre").GetString() ?? usuario;
            var rolId = userData.GetProperty("rol_id").GetInt32();
            
            // Obtener nombre del rol
            var rolResponse = await http.GetAsync($"rest/v1/roles?id=eq.{rolId}&select=nombre");
            rolResponse.EnsureSuccessStatusCode();
            var rolJson = await rolResponse.Content.ReadAsStringAsync();
            var roles = JsonSerializer.Deserialize<List<JsonElement>>(rolJson);
            var rolNombre = roles?.Count > 0 && roles[0].TryGetProperty("nombre", out var rolNombreElement) 
                ? rolNombreElement.GetString() ?? "Usuario" 
                : "Usuario";

            // Verificar si debe cambiar contraseña
            bool debeCambiarPassword = false;
            if (userData.TryGetProperty("debe_cambiar_password", out var debeCambiarElement))
            {
                debeCambiarPassword = debeCambiarElement.GetBoolean();
            }

            // Generar JWT
            var token = GenerateJwtToken(userId, usuario, nombre, rolId, rolNombre, debeCambiarPassword);
            
            return (token, null);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error en login: {ex.Message}");
            return (null, "Error en el servidor");
        }
    }

    private string GenerateJwtToken(int id, string usuario, string nombre, int rolId, string rolNombre, bool debeCambiarPassword)
    {
        var jwtKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured");
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "KUKU-IO-LED";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "KUKU-IO-LED-Users";

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, usuario),
            new Claim("nombre", nombre),
            new Claim("rol_id", rolId.ToString()),
            new Claim("rol_nombre", rolNombre),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        // Incluir debe_cambiar_password si es true
        if (debeCambiarPassword)
        {
            claims.Add(new Claim("debe_cambiar_password", "true"));
        }

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.Now.AddHours(8), // Token expira en 8 horas
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
