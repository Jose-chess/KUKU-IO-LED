using backend.DTOs;
using backend.Models;
using Supabase;

namespace backend.Services;

public class VentaService
{
    private readonly Supabase.Client _supabase;

    public VentaService(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    public async Task<VentaDto> CrearVentaAsync(CrearVentaDto dto)
    {
        try
        {
            // 1. Crear la cabecera de la venta
            var venta = new Venta
            {
                ClienteId = dto.ClienteId,
                FechaVenta = DateTime.UtcNow,
                Total = dto.Detalles.Sum(d => d.Cantidad * d.PrecioUnitario)
            };

            // Insertar venta en Supabase
            var responseVenta = await _supabase.From<Venta>().Insert(venta);
            var ventaCreada = responseVenta.Model;

            if (ventaCreada == null)
                throw new Exception("Error al crear la venta");

            // 2. Crear los detalles de la venta
            var detalles = dto.Detalles.Select(item => new VentaDetalle
            {
                VentaId = ventaCreada.Id,
                ArticuloId = item.ArticuloId,
                Cantidad = item.Cantidad,
                PrecioUnitario = item.PrecioUnitario
            }).ToList();

            // Insertar detalles en Supabase
            await _supabase.From<VentaDetalle>().Insert(detalles);

            // TODO: Actualizar inventario de artículos
            // TODO: Crear cuenta por cobrar si es crédito

            return new VentaDto
            {
                Id = ventaCreada.Id,
                CodigoVenta = $"VNT-{ventaCreada.Id}",
                Total = venta.Total
            };
        }
        catch (Exception ex)
        {
            throw new Exception($"Error al crear venta: {ex.Message}", ex);
        }
    }
}