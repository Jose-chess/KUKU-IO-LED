// Models/Recibo.cs
namespace backend.Models;

public class Recibo
{
    public int Id { get; set; }
    public string NumeroRecibo { get; set; } = null!;
    public string TipoRecibo { get; set; } = null!;
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public int ClienteId { get; set; }
    public int? VentaId { get; set; }
    public int? CuentaPorCobrarId { get; set; }
    public int? PagoCuentaId { get; set; }
    public string MetodoPago { get; set; } = null!;
    public decimal Monto { get; set; }
    public decimal? SaldoAnterior { get; set; }
    public decimal? NuevoSaldo { get; set; }
    public string? FacturaNcf { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    public Cliente Cliente { get; set; } = null!;
    public Venta? Venta { get; set; }
    public CuentaPorCobrar? CuentaPorCobrar { get; set; }
    public PagoCuentaCobrar? PagoCuentaCobrar { get; set; }
}