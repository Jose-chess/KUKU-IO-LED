using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// --- 1. SUPABASE ---
var supabaseUrl = builder.Configuration["SupabaseConfig:Url"];
var supabaseKey = builder.Configuration["SupabaseConfig:Key"];

builder.Services.AddScoped(_ => new Supabase.Client(supabaseUrl!, supabaseKey!, new SupabaseOptions
{
    AutoConnectRealtime = false
}));

// --- 2. SQLITE ---
builder.Services.AddDbContext<backend.Data.AppDbContext>(options =>
    options.UseSqlite("Data Source=kukuioted.db"));

// --- 3. SERVICIOS ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ConnectivityService>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<ArticuloService>();
builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<VentaService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// --- 4. MIDDLEWARE ---
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "KUKU-IO API V1");
    c.RoutePrefix = "swagger";
});

app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();

app.Run();