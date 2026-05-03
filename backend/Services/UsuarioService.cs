using backend.Models;
using Supabase;

namespace backend.Services;

public class UsuarioService
{
    private readonly Supabase.Client _supabase;

    public UsuarioService(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        var response = await _supabase.From<Usuario>().Get();
        return response.Models;
    }

    // --- AGREGAMOS EL MÉTODO QUE FALTA ---
    public async Task<Usuario?> LoginAsync(string username, string password)
    {
        // Buscamos el usuario por nombre y contraseña
        // Nota: Asegúrate de que los nombres de columna coincidan con tu tabla
        var response = await _supabase
            .From<Usuario>()
            .Where(u => u.Username == username)
            .Where(u => u.PasswordHash == password) // Idealmente usarías hashing aquí
            .Get();

        return response.Model;
    }
}