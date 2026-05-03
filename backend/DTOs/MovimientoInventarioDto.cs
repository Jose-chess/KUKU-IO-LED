// DTOs/MovimientoInventarioDto.cs
namespace backend.DTOs;

public class MovimientoInventarioDto
{
    public int Id { get; set; }
    public int ArticuloId { get; set; }
    public string ArticuloDescripcion { get; set; } = null!;
    public string TipoMovimiento { get; set; } = null!;
    public decimal Cantidad { get; set; }
    public decimal? CostoUnitario { get; set; }
    public string? ReferenciaTipo { get; set; }
    public int? ReferenciaId { get; set; }
    public int UsuarioId { get; set; }
    public string UsuarioNombre { get; set; } = null!;
    public DateTime FechaMovimiento { get; set; }
    public string? Observacion { get; set; }
}