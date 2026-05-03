// Models/Empresa.cs
namespace backend.Models;

public class Empresa
{
    public int Id { get; set; }
    public string Nombre { get; set; } = null!;
    public string? Direccion { get; set; }
    public string? Telefono { get; set; }
    public string? Celular { get; set; }
    public string Rnc { get; set; } = null!;
    public string? EmailReportes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}