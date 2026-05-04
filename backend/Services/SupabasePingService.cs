using System.Net.Http.Headers;

namespace backend.Services;

public class SupabasePingService : BackgroundService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<SupabasePingService> _logger;

    public SupabasePingService(IConfiguration configuration, ILogger<SupabasePingService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("SupabasePingService iniciado. Esperando 30 segundos antes del primer ping...");
        
        // Esperar 30 segundos antes del primer ping para dar tiempo a que el backend termine de iniciar
        await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        
        _logger.LogInformation("SupabasePingService comenzando ciclo de pings cada 24 horas.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await PingSupabaseAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en SupabasePingService durante el ping. Continuando con el siguiente ciclo.");
                Console.WriteLine($"[SupabasePingService] Error: {ex.Message}");
            }

            // Esperar 24 horas antes del siguiente ping
            _logger.LogInformation("SupabasePingService esperando 24 horas para el siguiente ping...");
            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }

    private async Task PingSupabaseAsync()
    {
        var supabaseUrl = _configuration["SupabaseConfig:Url"]?.TrimEnd('/');
        var supabaseKey = _configuration["SupabaseConfig:Key"];

        if (string.IsNullOrEmpty(supabaseUrl) || string.IsNullOrEmpty(supabaseKey))
        {
            _logger.LogWarning("SupabasePingService: URL o Key no configurados. Saltando ping.");
            Console.WriteLine("[SupabasePingService] Advertencia: URL o Key de Supabase no configurados.");
            return;
        }

        using var httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri($"{supabaseUrl}/");
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", supabaseKey);
        httpClient.DefaultRequestHeaders.Add("apikey", supabaseKey);

        var pingUrl = "rest/v1/clientes?limit=1";
        _logger.LogInformation("SupabasePingService ejecutando ping a: {Url}", pingUrl);
        
        var response = await httpClient.GetAsync(pingUrl);
        response.EnsureSuccessStatusCode();
        
        _logger.LogInformation("SupabasePingService: Ping exitoso a Supabase. Status: {StatusCode}", response.StatusCode);
        Console.WriteLine($"[SupabasePingService] Ping exitoso a Supabase. Status: {response.StatusCode} - {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
    }
}
