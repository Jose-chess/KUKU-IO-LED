using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace backend.Services;

public class ClienteService
{
    private readonly IConfiguration _configuration;
    private readonly ConnectivityService _connectivity;

    public ClienteService(IConfiguration configuration, ConnectivityService connectivity)
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

    public async Task<List<JsonElement>> GetAllAsync()
    {
        using var http = CreateSupabaseClient();
        var response = await http.GetAsync("rest/v1/clientes?select=*&order=id.asc");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<JsonElement>>(json) ?? new List<JsonElement>();
    }

    public async Task<JsonElement?> GetByIdAsync(int id)
    {
        using var http = CreateSupabaseClient();
        var response = await http.GetAsync($"rest/v1/clientes?id=eq.{id}&select=*");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<List<JsonElement>>(json);
        return result?.Count > 0 ? result[0] : null;
    }

    public async Task<JsonElement?> CreateAsync(object payload)
    {
        // Generar código antes de insertar
        var nextCode = await GetNextCodeAsync();

        // Agregar el código al payload
        var json = JsonSerializer.Serialize(payload);
        var dict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json)!;
        dict["codigo"] = JsonSerializer.SerializeToElement(nextCode);

        using var http = CreateSupabaseClient();
        var response = await http.PostAsJsonAsync("rest/v1/clientes", dict);
        response.EnsureSuccessStatusCode();
        var responseJson = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<List<JsonElement>>(responseJson);
        return result?.Count > 0 ? result[0] : null;
    }

    public async Task<JsonElement?> UpdateAsync(int id, object payload)
    {
        using var http = CreateSupabaseClient();
        var request = new HttpRequestMessage(HttpMethod.Patch, $"rest/v1/clientes?id=eq.{id}")
        {
            Content = JsonContent.Create(payload)
        };
        var response = await http.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<List<JsonElement>>(json);
        return result?.Count > 0 ? result[0] : null;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var http = CreateSupabaseClient();
        var request = new HttpRequestMessage(HttpMethod.Delete, $"rest/v1/clientes?id=eq.{id}");
        var response = await http.SendAsync(request);
        return response.IsSuccessStatusCode;
    }

    public async Task<string> GetNextCodeAsync()
    {
        using var http = CreateSupabaseClient();
        var response = await http.GetAsync("rest/v1/clientes?select=id&order=id.desc&limit=1");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<List<JsonElement>>(json);
        var lastId = 0;
        if (result?.Count > 0 && result[0].TryGetProperty("id", out var idProp))
            lastId = idProp.GetInt32();
        return $"C-{(lastId + 1):D4}";
    }
}