using backend.Models;
namespace backend.Services;

public class UnidadMedidaService
{
    private readonly Supabase.Client _supabase;

    public UnidadMedidaService(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    public async Task<IEnumerable<UnidadMedida>> GetAllAsync()
    {
        var response = await _supabase.From<UnidadMedida>().Get();
        return response.Models;
    }

    public async Task<UnidadMedida> CreateAsync(UnidadMedida unidad)
    {
        var response = await _supabase.From<UnidadMedida>().Insert(unidad);
        return response.Model!;
    }

    public async Task<UnidadMedida?> UpdateAsync(int id, UnidadMedida unidad)
    {
        var response = await _supabase.From<UnidadMedida>()
            .Where(x => x.Id == id)
            .Update(unidad);
        return response.Model;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabase.From<UnidadMedida>().Where(x => x.Id == id).Delete();
        return true;
    }
}
