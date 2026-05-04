using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ArticuloService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _configuration;
    private readonly ConnectivityService _connectivity;

    public ArticuloService(AppDbContext db, IConfiguration configuration, ConnectivityService connectivity)
    {
        _db = db;
        _configuration = configuration;
        _connectivity = connectivity;
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

    public async Task<IEnumerable<object>> GetAllAsync()
    {
        using var http = CreateClient();
        var response = await http.GetAsync("rest/v1/articulos?select=*,unidades_medida(nombre)&activo=eq.true&order=codigo.asc");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var articulos = JsonSerializer.Deserialize<List<JsonElement>>(json) ?? new();

        return articulos.Select(a => new
        {
            id = a.TryGetProperty("id", out var id) ? id.GetInt32() : 0,
            codigo = a.TryGetProperty("codigo", out var cod) ? cod.GetString() : "",
            descripcion = a.TryGetProperty("descripcion", out var desc) ? desc.GetString() : "",
            color = a.TryGetProperty("color", out var col) ? col.GetString() : "",
            unidad = a.TryGetProperty("unidades_medida", out var um) && um.ValueKind == JsonValueKind.Object && um.TryGetProperty("nombre", out var unNombre) ? unNombre.GetString() : "",
            unidad_medida_id = a.TryGetProperty("unidad_medida_id", out var umId) ? umId.GetInt32() : 0,
            minima = a.TryGetProperty("existencia_minima", out var min) ? min.GetDecimal() : 0,
            actual = a.TryGetProperty("existencia_actual", out var act) ? act.GetDecimal() : 0,
            costo = a.TryGetProperty("costo_compra", out var costo) ? costo.GetDecimal() : 0,
            precio = a.TryGetProperty("precio_venta", out var precio) ? precio.GetDecimal() : 0
        });
    }

    public async Task<string> GetNextCodeAsync()
    {
        using var http = CreateClient();
        var response = await http.GetAsync("rest/v1/articulos?select=codigo&order=id.desc&limit=1");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var lista = JsonSerializer.Deserialize<List<JsonElement>>(json);

        if (lista == null || lista.Count == 0) return "ART-0001";

        var ultimo = lista[0].GetProperty("codigo").GetString() ?? "ART-0000";
        var num = int.TryParse(ultimo.Replace("ART-", ""), out var n) ? n + 1 : 1;
        return $"ART-{num:D4}";
    }

    public async Task<object?> CreateAsync(object payload)
    {
        using var http = CreateClient();
        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await http.PostAsync("rest/v1/articulos", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        var lista = JsonSerializer.Deserialize<List<JsonElement>>(result);
        return lista?.FirstOrDefault();
    }

    public async Task<object?> UpdateAsync(int id, object payload)
    {
        using var http = CreateClient();
        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await http.PatchAsync($"rest/v1/articulos?id=eq.{id}", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        var lista = JsonSerializer.Deserialize<List<JsonElement>>(result);
        return lista?.FirstOrDefault();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var http = CreateClient();
        var payload = JsonSerializer.Serialize(new { activo = false });
        var content = new StringContent(payload, Encoding.UTF8, "application/json");
        var response = await http.PatchAsync($"rest/v1/articulos?id=eq.{id}", content);
        return response.IsSuccessStatusCode;
    }
}