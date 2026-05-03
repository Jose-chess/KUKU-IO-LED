using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UsuarioService
{
    private readonly AppDbContext _db;
    private readonly Supabase.Client _supabase;
    private readonly ConnectivityService _connectivity;

    public UsuarioService(AppDbContext db, Supabase.Client supabase, ConnectivityService connectivity)
    {
        _db = db;
        _supabase = supabase;
        _connectivity = connectivity;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        if (await _connectivity.IsOnlineAsync())
        {
            var result = await _supabase.From<Usuario>().Get();
            return result.Models;
        }

        return await _db.Usuarios.AsNoTracking().ToListAsync();
    }

    public async Task<Usuario?> LoginAsync(string username, string password)
    {
        if (await _connectivity.IsOnlineAsync())
        {
            var result = await _supabase.From<Usuario>()
                .Where(u => u.Username == username && u.PasswordHash == password)
                .Get();
            return result.Models.FirstOrDefault();
        }

        return await _db.Usuarios
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == username && u.PasswordHash == password);
    }
}