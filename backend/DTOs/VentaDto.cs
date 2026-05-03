// DTOs/VentaDto.cs
namespace backend.DTOs;

public class VentaDto
{
    public int Id { get; set; }
    public string CodigoVenta { get; set; } = null!;
    public int ClienteId { get; set; }
    public string ClienteNombre { get; set; } = null!;
    public int UsuarioId { get; set; }
    public string UsuarioNombre { get; set; } = null!;
    public DateTime FechaVenta { get; set; }
    public string Condicion { get; set; } = null!;
    public string? MetodoPago { get; set; }
    public string TipoVenta { get; set; } = null!;
    public decimal DescuentoPorcentaje { get; set; }
    public decimal ItbisPorcentaje { get; set; }
    public decimal Subtotal { get; set; }
    public decimal DescuentoMonto { get; set; }
    public decimal ItbisMonto { get; set; }
    public decimal Total { get; set; }
    public string Estado { get; set; } = null!;
    public DateTime? FechaPagoCompromiso { get; set; }
    public string? Observacion { get; set; }
    public List<VentaDetalleDto> Detalles { get; set; } = new();
}

public class CrearVentaDto
{
    public int ClienteId { get; set; }
    public int UsuarioId { get; set; }
    public string Condicion { get; set; } = null!;
    public string? MetodoPago { get; set; }
    public string TipoVenta { get; set; } = "ConsumidorFinal";
    public decimal DescuentoPorcentaje { get; set; }
    public decimal ItbisPorcentaje { get; set; } = 18;
    public DateTime? FechaPagoCompromiso { get; set; }
    public string? Observacion { get; set; }
    public List<CrearVentaDetalleDto> Detalles { get; set; } = new();
}