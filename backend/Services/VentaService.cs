using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class VentaService
{
    private readonly AppDbContext _db;

    public VentaService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<VentaDto> CrearVentaAsync(CrearVentaDto dto)
    {
        await using var transaction = await _db.Database.BeginTransactionAsync();

        try
        {
            var venta = new Venta
            {
                ClienteId = dto.ClienteId,
                Condicion = dto.Condicion,
                MetodoPago = dto.MetodoPago,
                TipoVenta = dto.TipoVenta,
                FechaVenta = DateTime.UtcNow,
                Total = dto.Detalles.Sum(d => d.Cantidad * d.PrecioUnitario)
            };

            _db.Ventas.Add(venta);
            await _db.SaveChangesAsync();

            var detalles = dto.Detalles.Select(item => new VentaDetalle
            {
                VentaId = venta.Id,
                ArticuloId = item.ArticuloId,
                Cantidad = item.Cantidad,
                PrecioUnitario = item.PrecioUnitario
            }).ToList();

            _db.VentaDetalles.AddRange(detalles);
            await _db.SaveChangesAsync();

            await transaction.CommitAsync();

            return new VentaDto
            {
                Id = venta.Id,
                CodigoVenta = $"VNT-{venta.Id}",
                Total = venta.Total
            };
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw new Exception($"Error al crear venta: {ex.Message}", ex);
        }
    }
}