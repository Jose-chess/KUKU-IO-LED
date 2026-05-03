using Postgrest.Attributes; //
using Postgrest.Models;      //

namespace backend.Models;

// Le decimos que esta clase representa la tabla "articulos" en Supabase
[Table("articulos")] 
public class Articulo : BaseModel // Heredar de BaseModel es necesario para la librería
{
    // El segundo parámetro "false" indica que Supabase maneja el ID (autoincrement)
    [PrimaryKey("id", false)] 
    public int Id { get; set; }

    [Column("codigo")]
    public string Codigo { get; set; } = null!;

    [Column("descripcion")]
    public string Descripcion { get; set; } = null!;

    [Column("color")]
    public string? Color { get; set; }

    [Column("unidad_medida_id")]
    public int UnidadMedidaId { get; set; }

    [Column("existencia_minima")]
    public decimal ExistenciaMinima { get; set; } = 0;

    [Column("existencia_actual")]
    public decimal ExistenciaActual { get; set; } = 0;

    [Column("costo_compra")]
    public decimal CostoCompra { get; set; } = 0;

    [Column("precio_venta")]
    public decimal PrecioVenta { get; set; } = 0;

    [Column("activo")]
    public bool Activo { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // --- Nota sobre Navegación ---
    // La librería de Supabase maneja las relaciones de forma distinta a Entity Framework.
    // Por ahora, para que tu código compile y funcione la conexión, 
    // mantendremos estas propiedades abajo sin etiquetas de [Column].
    
    public UnidadMedida UnidadMedida { get; set; } = null!;
    public ICollection<VentaDetalle> VentaDetalles { get; set; } = new List<VentaDetalle>();
    public ICollection<MovimientoInventario> MovimientosInventario { get; set; } = new List<MovimientoInventario>();
}