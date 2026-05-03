// Models/CuentaPorCobrar.cs
namespace backend.Models;

public class CuentaPorCobrar
{
    public int Id { get; set; }
    public int VentaId { get; set; }
    public string NumeroCxc { get; set; } = null!;
    public int ClienteId { get; set; }
    public DateTime FechaEmision { get; set; } = DateTime.UtcNow;
    public DateTime FechaVencimiento { get; set; }
    public decimal MontoTotal { get; set; }
    public decimal MontoPagado { get; set; } = 0;
    public decimal MontoPendiente { get; set; }
    public string Estado { get; set; } = "Pendiente";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    public Venta Venta { get; set; } = null!;
    public Cliente Cliente { get; set; } = null!;
    public ICollection<PagoCuentaCobrar> Pagos { get; set; } = new List<PagoCuentaCobrar>();
    public ICollection<Recibo> Recibos { get; set; } = new List<Recibo>();
}