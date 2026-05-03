using backend.DTOs;
using backend.Models;
using Supabase; // Añadimos esto

namespace backend.Services;

public class ArticuloService
{
    private readonly Supabase.Client _supabase;

    // Cambiamos AppDbContext por Supabase.Client
    public ArticuloService(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    public async Task<IEnumerable<ArticuloDto>> GetAllAsync()
    {
        // 1. Pedimos los datos a Supabase por el "túnel" web
        var response = await _supabase.From<Articulo>().Get();
        
        // 2. Convertimos los resultados al DTO que ya tenías
        return response.Models.Select(a => new ArticuloDto
        {
            Id = a.Id,
            Codigo = a.Codigo,
            Descripcion = a.Descripcion,
            PrecioVenta = a.PrecioVenta,
            ExistenciaActual = a.ExistenciaActual,
            // Nota: Para la UnidadMedida, si no has hecho el Join en SQL, 
            // podemos dejarlo vacío o traerlo luego.
            UnidadMedidaCodigo = "" 
        }).ToList();
    }
}