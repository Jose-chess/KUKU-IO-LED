using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly UsuarioService _usuarioService;

    public UsuariosController(UsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto login)
    {
        var resultado = await _usuarioService.LoginAsync(login.Username, login.Password);
        if (resultado == null) return Unauthorized("Usuario o contraseña incorrectos");
        return Ok(resultado);
    }
}