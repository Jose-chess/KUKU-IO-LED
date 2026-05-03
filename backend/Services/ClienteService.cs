using backend.Models;
using Supabase;

namespace backend.Services;

public class ClienteService
{
    private readonly Supabase.Client _supabase;

    public ClienteService(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    // GET ALL - Obtener todos los clientes
    public async Task<IEnumerable<Cliente>> GetAllAsync()
    {
        var response = await _supabase.From<Cliente>().Get();
        return response.Models;
    }

    // GET BY ID - Obtener un cliente por ID
    public async Task<Cliente?> GetByIdAsync(int id)
    {
        var response = await _supabase.From<Cliente>().Where(x => x.Id == id).Get();
        return response.Model;
    }

    // CREATE - Crear nuevo cliente con código automático C-
    public async Task<Cliente> CreateAsync(Cliente cliente)
    {
        // Obtener el último ID para generar el código
        var response = await _supabase.From<Cliente>().Get();
        var lastId = response.Models.Any() ? response.Models.Max(c => c.Id) : 0;
        var nextId = lastId + 1;
        
        // Generar código con formato C-XXXX (ej: C-0001)
        cliente.Codigo = $"C-{nextId:D4}";
        
        var responseInsert = await _supabase.From<Cliente>().Insert(cliente);
        return responseInsert.Model!;
    }

    // UPDATE - Actualizar cliente existente
    public async Task<Cliente?> UpdateAsync(int id, Cliente cliente)
    {
        var response = await _supabase.From<Cliente>().Where(x => x.Id == id).Update(cliente);
        return response.Model;
    }

    // DELETE - Eliminar cliente
    public async Task<bool> DeleteAsync(int id)
    {
        var cliente = await GetByIdAsync(id);
        if (cliente == null) return false;

        await _supabase.From<Cliente>().Where(x => x.Id == id).Delete();
        return true;
    }

    // GET NEXT CODE - Obtener próximo código disponible
    public async Task<string> GetNextCodeAsync()
    {
        var response = await _supabase.From<Cliente>().Get();
        var lastId = response.Models.Any() ? response.Models.Max(c => c.Id) : 0;
        var nextId = lastId + 1;
        return $"C-{nextId:D4}";
    }

    // EXISTE RNC/CEDULA - Verificar si el RNC/Cédula ya está registrado
    public async Task<bool> ExisteRncCedulaAsync(string rncCedula, int? excludeId = null)
    {
        var query = _supabase.From<Cliente>().Where(x => x.RncCedula == rncCedula);
        var response = await query.Get();
        
        if (!response.Models.Any()) return false;
        
        // Si se proporciona excludeId, ignorar ese cliente (para actualizaciones)
        if (excludeId.HasValue)
        {
            return response.Models.Any(c => c.Id != excludeId.Value);
        }
        
        return true;
    }
}