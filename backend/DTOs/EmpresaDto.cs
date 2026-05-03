// DTOs/EmpresaDto.cs
namespace backend.DTOs;

public class EmpresaDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = null!;
    public string? Direccion { get; set; }
    public string? Telefono { get; set; }
    public string? Celular { get; set; }
    public string Rnc { get; set; } = null!;
    public string? EmailReportes { get; set; }
}

public class CrearEmpresaDto
{
    public string Nombre { get; set; } = null!;
    public string? Direccion { get; set; }
    public string? Telefono { get; set; }
    public string? Celular { get; set; }
    public string Rnc { get; set; } = null!;
    public string? EmailReportes { get; set; }
}