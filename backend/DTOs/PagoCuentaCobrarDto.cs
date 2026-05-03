// DTOs/PagoCuentaCobrarDto.cs
namespace backend.DTOs;

public class PagoCuentaCobrarDto
{
    public int Id { get; set; }
    public int CuentaPorCobrarId { get; set; }
    public string NumeroCxc { get; set; } = null!;
    public DateTime FechaPago { get; set; }
    public decimal MontoPagado { get; set; }
    public string MetodoPago { get; set; } = null!;
    public string? Referencia { get; set; }
    public int UsuarioId { get; set; }
    public string UsuarioNombre { get; set; } = null!;
    public string? Observacion { get; set; }
}

public class CrearPagoCuentaCobrarDto
{
    public int CuentaPorCobrarId { get; set; }
    public decimal MontoPagado { get; set; }
    public string MetodoPago { get; set; } = null!;
    public string? Referencia { get; set; }
    public int UsuarioId { get; set; }
    public string? Observacion { get; set; }
}