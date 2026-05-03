// Models/PagoCuentaCobrar.cs
namespace backend.Models;

public class PagoCuentaCobrar
{
    public int Id { get; set; }
    public int CuentaPorCobrarId { get; set; }
    public DateTime FechaPago { get; set; } = DateTime.UtcNow;
    public decimal MontoPagado { get; set; }
    public string MetodoPago { get; set; } = null!;
    public string? Referencia { get; set; }
    public int UsuarioId { get; set; }
    public string? Observacion { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    public CuentaPorCobrar CuentaPorCobrar { get; set; } = null!;
    public Usuario Usuario { get; set; } = null!;
    public ICollection<Recibo> Recibos { get; set; } = new List<Recibo>();
}