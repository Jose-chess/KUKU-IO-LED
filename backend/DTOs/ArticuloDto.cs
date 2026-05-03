// DTOs/ArticuloDto.cs
namespace backend.DTOs;

public class ArticuloDto
{
    public int Id { get; set; }
    public string Codigo { get; set; } = null!;
    public string Descripcion { get; set; } = null!;
    public string? Color { get; set; }
    public int UnidadMedidaId { get; set; }
    public string UnidadMedidaCodigo { get; set; } = null!;
    public decimal ExistenciaMinima { get; set; }
    public decimal ExistenciaActual { get; set; }
    public decimal CostoCompra { get; set; }
    public decimal PrecioVenta { get; set; }
    public bool Activo { get; set; }
}

public class CrearArticuloDto
{
    public string Descripcion { get; set; } = null!;
    public string? Color { get; set; }
    public int UnidadMedidaId { get; set; }
    public decimal ExistenciaMinima { get; set; }
    public decimal CostoCompra { get; set; }
    public decimal PrecioVenta { get; set; }
}

public class ActualizarArticuloDto
{
    public string Descripcion { get; set; } = null!;
    public string? Color { get; set; }
    public int UnidadMedidaId { get; set; }
    public decimal ExistenciaMinima { get; set; }
    public decimal CostoCompra { get; set; }
    public decimal PrecioVenta { get; set; }
    public bool Activo { get; set; }
}