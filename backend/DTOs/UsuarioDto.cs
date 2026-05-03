// DTOs/UsuarioDto.cs
namespace backend.DTOs;

public class UsuarioDto
{
    public int Id { get; set; }
    public string NombreUsuario { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string Estado { get; set; } = null!;
    public int RolId { get; set; }
    public string RolNombre { get; set; } = null!;
    public bool DebeCambiarPassword { get; set; }
    public DateTime? UltimoIngreso { get; set; }
}

public class CrearUsuarioDto
{
    public string NombreUsuario { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string Password { get; set; } = null!;
    public int RolId { get; set; }
}

public class ActualizarUsuarioDto
{
    public string Nombre { get; set; } = null!;
    public string Estado { get; set; } = null!;
    public int RolId { get; set; }
}

public class LoginDto
{
    public string NombreUsuario { get; set; } = null!;
    public string Password { get; set; } = null!;
}