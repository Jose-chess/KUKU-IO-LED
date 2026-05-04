using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace backend.Services;

public class UnidadesMedidaService
{
    private readonly IConfiguration _configuration;

    public UnidadesMedidaService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private HttpClient CreateClient()
    {
        var url = _configuration["SupabaseConfig:Url"]?.TrimEnd('/');
        var key = _configuration["SupabaseConfig:Key"];
        var client = new HttpClient { BaseAddress = new Uri($"{url}/") };
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", key);
        client.DefaultRequestHeaders.Add("apikey", key);
        client.DefaultRequestHeaders.Add("Prefer", "return=representation");
        return client;
    }

    public async Task<List<JsonElement>> GetAllAsync()
    {
        using var http = CreateClient();
        var response = await http.GetAsync("rest/v1/unidades_medida?activa=eq.true&order=codigo.asc");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<JsonElement>>(json) ?? new();
    }

    public async Task<string> GetNextCodeAsync()
    {
        using var http = CreateClient();
        var response = await http.GetAsync("rest/v1/unidades_medida?select=codigo&order=id.desc&limit=1");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var lista = JsonSerializer.Deserialize<List<JsonElement>>(json);

        if (lista == null || lista.Count == 0) return "U-0001";

        var ultimo = lista[0].GetProperty("codigo").GetString() ?? "U-0000";
        var num = int.TryParse(ultimo.Replace("U-", ""), out var n) ? n + 1 : 1;
        return $"U-{num:D4}";
    }

    public async Task<JsonElement?> CreateAsync(string codigo, string descripcion)
    {
        using var http = CreateClient();
        var payload = JsonSerializer.Serialize(new { codigo = codigo.ToUpper(), descripcion, activa = true });
        var content = new StringContent(payload, Encoding.UTF8, "application/json");
        var response = await http.PostAsync("rest/v1/unidades_medida", content);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var lista = JsonSerializer.Deserialize<List<JsonElement>>(json);
        return lista?.FirstOrDefault();
    }

    public async Task<JsonElement?> UpdateAsync(int id, string codigo, string descripcion)
    {
        using var http = CreateClient();
        var payload = JsonSerializer.Serialize(new { codigo = codigo.ToUpper(), descripcion });
        var content = new StringContent(payload, Encoding.UTF8, "application/json");
        var response = await http.PatchAsync($"rest/v1/unidades_medida?id=eq.{id}", content);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var lista = JsonSerializer.Deserialize<List<JsonElement>>(json);
        return lista?.FirstOrDefault();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var http = CreateClient();
        var response = await http.DeleteAsync($"rest/v1/unidades_medida?id=eq.{id}");
        return response.IsSuccessStatusCode;
    }
}