using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ArticuloService
{
    private readonly AppDbContext _db;
    private readonly Supabase.Client _supabase;
    private readonly ConnectivityService _connectivity;

    public ArticuloService(AppDbContext db, Supabase.Client supabase, ConnectivityService connectivity)
    {
        _db = db;
        _supabase = supabase;
        _connectivity = connectivity;
    }

    public async Task<IEnumerable<ArticuloDto>> GetAllAsync()
    {
        if (await _connectivity.IsOnlineAsync())
        {
            var result = await _supabase.From<Articulo>().Get();
            return result.Models.Select(a => new ArticuloDto
            {
                Id = a.Id,
                Codigo = a.Codigo,
                Descripcion = a.Descripcion,
                PrecioVenta = a.PrecioVenta,
                ExistenciaActual = a.ExistenciaActual,
                UnidadMedidaCodigo = string.Empty
            });
        }

        return await _db.Articulos
            .AsNoTracking()
            .Include(a => a.UnidadMedida)
            .Select(a => new ArticuloDto
            {
                Id = a.Id,
                Codigo = a.Codigo,
                Descripcion = a.Descripcion,
                PrecioVenta = a.PrecioVenta,
                ExistenciaActual = a.ExistenciaActual,
                UnidadMedidaCodigo = a.UnidadMedida != null ? a.UnidadMedida.Codigo : string.Empty
            })
            .ToListAsync();
    }
}