// DTOs/RolDto.cs
namespace backend.DTOs;

public class RolDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
}