// Models/MovimientoInventario.cs
namespace backend.Models;

public class MovimientoInventario
{
    public int Id { get; set; }
    public int ArticuloId { get; set; }
    public string TipoMovimiento { get; set; } = null!;
    public decimal Cantidad { get; set; }
    public decimal? CostoUnitario { get; set; }
    public string? ReferenciaTipo { get; set; }
    public int? ReferenciaId { get; set; }
    public int UsuarioId { get; set; }
    public DateTime FechaMovimiento { get; set; } = DateTime.UtcNow;
    public string? Observacion { get; set; }

    // Navegación
    public Articulo Articulo { get; set; } = null!;
    public Usuario Usuario { get; set; } = null!;
}