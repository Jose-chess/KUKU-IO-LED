// Models/UnidadMedida.cs
namespace backend.Models;

public class UnidadMedida
{
    public int Id { get; set; }
    public string Codigo { get; set; } = null!;
    public string Descripcion { get; set; } = null!;
    public bool Activa { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    public ICollection<Articulo> Articulos { get; set; } = new List<Articulo>();
}