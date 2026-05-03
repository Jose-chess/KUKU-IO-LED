// DTOs/VentaDetalleDto.cs
namespace backend.DTOs;

public class VentaDetalleDto
{
    public int Id { get; set; }
    public int ArticuloId { get; set; }
    public string ArticuloDescripcion { get; set; } = null!;
    public decimal Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal DescuentoPorcentajeLinea { get; set; }
    public decimal SubtotalLinea { get; set; }
    public decimal ItbisLinea { get; set; }
    public decimal TotalLinea { get; set; }
}

public class CrearVentaDetalleDto
{
    public int ArticuloId { get; set; }
    public decimal Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal DescuentoPorcentajeLinea { get; set; }
}