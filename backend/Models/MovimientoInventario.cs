using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.Models;

[Table("movimientos_inventario")]
public class MovimientoInventario : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("articulo_id")]
    public int ArticuloId { get; set; }

    [Column("tipo_movimiento")]
    public string TipoMovimiento { get; set; } = null!;

    [Column("cantidad")]
    public decimal Cantidad { get; set; }

    [Column("costo_unitario")]
    public decimal? CostoUnitario { get; set; }

    [Column("referencia_tipo")]
    public string? ReferenciaTipo { get; set; }

    [Column("referencia_id")]
    public int? ReferenciaId { get; set; }

    [Column("usuario_id")]
    public int UsuarioId { get; set; }

    [Column("fecha_movimiento")]
    public DateTime FechaMovimiento { get; set; } = DateTime.UtcNow;

    [Column("observacion")]
    public string? Observacion { get; set; }

    // Navegación
    public Articulo Articulo { get; set; } = null!;
    public Usuario Usuario { get; set; } = null!;
}