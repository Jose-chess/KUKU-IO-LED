// Models/Rol.cs
namespace backend.Models;

public class Rol
{
    public int Id { get; set; }
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }

    // Navegación
    public ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}