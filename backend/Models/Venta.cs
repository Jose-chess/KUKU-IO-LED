using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.Models;

[Table("ventas")]
public class Venta : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("cliente_id")]
    public int ClienteId { get; set; }

    [Column("fecha_venta")]
    public DateTime FechaVenta { get; set; } = DateTime.UtcNow;

    [Column("condicion")]
    public string Condicion { get; set; } = "Contado";

    [Column("metodo_pago")]
    public string? MetodoPago { get; set; }

    [Column("tipo_venta")]
    public string TipoVenta { get; set; } = "ConsumidorFinal";

    [Column("total")]
    public decimal Total { get; set; } = 0;

    [Column("estado")]
    public string Estado { get; set; } = "Completada";
}

[Table("venta_detalles")]
public class VentaDetalle : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("venta_id")]
    public int VentaId { get; set; }

    [Column("articulo_id")]
    public int ArticuloId { get; set; }

    [Column("cantidad")]
    public decimal Cantidad { get; set; }

    [Column("precio_unitario")]
    public decimal PrecioUnitario { get; set; }
}