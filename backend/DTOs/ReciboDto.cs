// DTOs/ReciboDto.cs
namespace backend.DTOs;

public class ReciboDto
{
    public int Id { get; set; }
    public string NumeroRecibo { get; set; } = null!;
    public string TipoRecibo { get; set; } = null!;
    public DateTime Fecha { get; set; }
    public int ClienteId { get; set; }
    public string ClienteNombre { get; set; } = null!;
    public int? VentaId { get; set; }
    public int? CuentaPorCobrarId { get; set; }
    public int? PagoCuentaId { get; set; }
    public string MetodoPago { get; set; } = null!;
    public decimal Monto { get; set; }
    public decimal? SaldoAnterior { get; set; }
    public decimal? NuevoSaldo { get; set; }
    public string? FacturaNcf { get; set; }
}