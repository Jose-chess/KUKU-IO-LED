using backend.Data;
using backend.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURACIÓN DE CONEXIONES ---

// Datos de la API de Supabase (Evitan el bloqueo de tu router)
var supabaseUrl = builder.Configuration["SupabaseConfig:Url"];
var supabaseKey = builder.Configuration["SupabaseConfig:Key"];

// Registro del Cliente oficial de Supabase (Usa el puerto 443/HTTPS)
builder.Services.AddScoped(_ => new Supabase.Client(supabaseUrl!, supabaseKey!, new SupabaseOptions
{
    AutoConnectRealtime = true
}));

// Configuración de Entity Framework (Solo para SQLite local)
var offlineConn = builder.Configuration.GetConnectionString("OfflineDB");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    // Usamos SQLite por defecto para evitar errores de conexión al arrancar
    options.UseSqlite(offlineConn);
});

// --- 2. SERVICIOS DE LA API ---
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registro de tus servicios
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<ArticuloService>();
builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<VentaService>();
builder.Services.AddScoped<UnidadMedidaService>();

builder.Services.AddCors(options => {
    options.AddPolicy("frontend", policy => {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// --- 3. MIDDLEWARE PIPELINE ---
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "KUKU-IO API V1");
    c.RoutePrefix = "swagger"; 
});

app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();

app.Run();