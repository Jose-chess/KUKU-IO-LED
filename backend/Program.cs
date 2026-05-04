using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Supabase;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// --- 1. SUPABASE ---
var supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL") 
    ?? builder.Configuration["SupabaseConfig:Url"];
var supabaseKey = Environment.GetEnvironmentVariable("SUPABASE_KEY") 
    ?? builder.Configuration["SupabaseConfig:Key"];

builder.Services.AddScoped(_ => new Supabase.Client(supabaseUrl!, supabaseKey!, new SupabaseOptions
{
    AutoConnectRealtime = false
}));

// --- 2. SQLITE ---
builder.Services.AddDbContext<backend.Data.AppDbContext>(options =>
    options.UseSqlite("Data Source=kukuioted.db"));

// --- 3. JWT AUTHENTICATION ---
var jwtKey = Environment.GetEnvironmentVariable("JWT_SECRET") 
    ?? builder.Configuration["Jwt:Key"] 
    ?? "kuku-io-led-secret-key-32chars-long!";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "KUKU-IO-LED";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "KUKU-IO-LED-Users";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// --- 4. AUTORIZACIÓN CON POLÍTICAS ---
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SoloAdmin", policy =>
        policy.RequireClaim("rol_nombre", "Administrador"));
    
    options.AddPolicy("Operador", policy =>
        policy.RequireClaim("rol_nombre", "Administrador", "Operador"));
});

// --- 5. RATE LIMITING ---
builder.Services.AddRateLimiter(options =>
{
    // Rate limiting general: 100 peticiones por minuto por IP
    options.AddFixedWindowLimiter("general", limiterOptions =>
    {
        limiterOptions.PermitLimit = 100;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });

    // Rate limiting para login: 5 intentos por minuto por IP
    options.AddFixedWindowLimiter("login", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });

    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsJsonAsync(new { error = "Too many requests. Please try again later." }, token);
    };
});

// --- 6. CORS RESTRINGIDO ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "tauri://localhost")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// --- 7. SERVICIOS ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ConnectivityService>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<ArticuloService>();
builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<VentaService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UnidadesMedidaService>();

// Background Service para mantener Supabase activo
builder.Services.AddHostedService<SupabasePingService>();

var app = builder.Build();

// --- 8. MIDDLEWARE DE SEGURIDAD ---

// Headers de seguridad HTTP
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    await next();
});

// Validación de tamaño de body (máximo 1MB)
app.Use(async (context, next) =>
{
    const long maxBodySize = 1024 * 1024; // 1MB
    if (context.Request.ContentLength > maxBodySize)
    {
        context.Response.StatusCode = StatusCodes.Status413PayloadTooLarge;
        await context.Response.WriteAsJsonAsync(new { error = "Request body too large. Maximum allowed is 1MB." });
        return;
    }
    await next();
});

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "KUKU-IO API V1");
    c.RoutePrefix = "swagger";
});

app.UseCors("frontend");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// ENDPOINT TEMPORAL: Generar hash BCrypt para contraseñas
app.MapGet("/generate-hash/{password}", (string password) =>
{
    var hash = BCrypt.Net.BCrypt.HashPassword(password);
    return Results.Ok(new { hash });
}).AllowAnonymous();

app.Run();