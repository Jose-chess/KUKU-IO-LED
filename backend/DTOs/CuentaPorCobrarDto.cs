// DTOs/CuentaPorCobrarDto.cs
namespace backend.DTOs;

public class CuentaPorCobrarDto
{
    public int Id { get; set; }
    public string NumeroCxc { get; set; } = null!;
    public int VentaId { get; set; }
    public string CodigoVenta { get; set; } = null!;
    public int ClienteId { get; set; }
    public string ClienteNombre { get; set; } = null!;
    public DateTime FechaEmision { get; set; }
    public DateTime FechaVencimiento { get; set; }
    public decimal MontoTotal { get; set; }
    public decimal MontoPagado { get; set; }
    public decimal MontoPendiente { get; set; }
    public string Estado { get; set; } = null!;
}