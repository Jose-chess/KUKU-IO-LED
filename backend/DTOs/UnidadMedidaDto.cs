// DTOs/UnidadMedidaDto.cs
namespace backend.DTOs;

public class UnidadMedidaDto
{
    public int Id { get; set; }
    public string Codigo { get; set; } = null!;
    public string Descripcion { get; set; } = null!;
    public bool Activa { get; set; }
}

public class CrearUnidadMedidaDto
{
    public string Codigo { get; set; } = null!;
    public string Descripcion { get; set; } = null!;
}