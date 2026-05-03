// DTOs/ClienteDto.cs
namespace backend.DTOs;

public class ClienteDto
{
    public int Id { get; set; }
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Apellido { get; set; }
    public string? RncCedula { get; set; }
    public string? Direccion { get; set; }
    public string? Sector { get; set; }
    public string? Ciudad { get; set; }
    public string? Telefono { get; set; }
    public decimal LimiteCredito { get; set; }
    public decimal BalanceActual { get; set; }
    public string? Observacion { get; set; }
    public bool Activo { get; set; }
    public DateTime? CreatedAt { get; set; }
}

public class CrearClienteDto
{
    public string Nombre { get; set; } = null!;
    public string? Apellido { get; set; }
    public string? RncCedula { get; set; }
    public string? Direccion { get; set; }
    public string? Sector { get; set; }
    public string? Ciudad { get; set; }
    public string? Telefono { get; set; }
    public decimal LimiteCredito { get; set; }
    public decimal BalanceActual { get; set; }
    public string? Observacion { get; set; }
    public bool Activo { get; set; }
}

public class ActualizarClienteDto
{
    public string Nombre { get; set; } = null!;
    public string? Apellido { get; set; }
    public string? RncCedula { get; set; }
    public string? Direccion { get; set; }
    public string? Sector { get; set; }
    public string? Ciudad { get; set; }
    public string? Telefono { get; set; }
    public decimal LimiteCredito { get; set; }
    public decimal BalanceActual { get; set; }
    public string? Observacion { get; set; }
    public bool Activo { get; set; }
}