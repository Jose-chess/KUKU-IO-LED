using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[EnableRateLimiting("general")]
public class ClientesController : ControllerBase
{
    private readonly ClienteService _clienteService;

    public ClientesController(ClienteService clienteService)
    {
        _clienteService = clienteService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clientes = await _clienteService.GetAllAsync();
        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cliente = await _clienteService.GetByIdAsync(id);
        if (cliente == null)
            return NotFound($"Cliente con ID {id} no encontrado");
        return Ok(cliente);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CrearClienteDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            return BadRequest(new { error = "El nombre es obligatorio" });

        if (dto.Nombre.Any(char.IsDigit))
            return BadRequest(new { error = "El nombre solo puede contener letras" });

        if (dto.LimiteCredito < 0)
            return BadRequest(new { error = "El límite de crédito no puede ser negativo" });

        try
        {
            var payload = new
            {
                nombre        = dto.Nombre.Trim(),
                apellido      = string.IsNullOrWhiteSpace(dto.Apellido)    ? null : dto.Apellido.Trim(),
                rnc_cedula    = string.IsNullOrWhiteSpace(dto.RncCedula)   ? null : dto.RncCedula.Trim(),
                direccion     = string.IsNullOrWhiteSpace(dto.Direccion)   ? null : dto.Direccion.Trim(),
                sector        = string.IsNullOrWhiteSpace(dto.Sector)      ? null : dto.Sector.Trim(),
                ciudad        = string.IsNullOrWhiteSpace(dto.Ciudad)      ? null : dto.Ciudad.Trim(),
                telefono      = string.IsNullOrWhiteSpace(dto.Telefono)    ? null : dto.Telefono.Trim(),
                limite_credito = dto.LimiteCredito,
                observacion   = string.IsNullOrWhiteSpace(dto.Observacion) ? null : dto.Observacion.Trim()
            };

            var resultado = await _clienteService.CreateAsync(payload);
            return StatusCode(201, resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = $"Error al crear cliente: {ex.Message}" });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ActualizarClienteDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            return BadRequest(new { error = "El nombre es obligatorio" });

        if (dto.LimiteCredito < 0)
            return BadRequest(new { error = "El límite de crédito no puede ser negativo" });

        try
        {
            var payload = new
            {
                nombre        = dto.Nombre.Trim(),
                apellido      = string.IsNullOrWhiteSpace(dto.Apellido)    ? null : dto.Apellido.Trim(),
                rnc_cedula    = string.IsNullOrWhiteSpace(dto.RncCedula)   ? null : dto.RncCedula.Trim(),
                direccion     = string.IsNullOrWhiteSpace(dto.Direccion)   ? null : dto.Direccion.Trim(),
                sector        = string.IsNullOrWhiteSpace(dto.Sector)      ? null : dto.Sector.Trim(),
                ciudad        = string.IsNullOrWhiteSpace(dto.Ciudad)      ? null : dto.Ciudad.Trim(),
                telefono      = string.IsNullOrWhiteSpace(dto.Telefono)    ? null : dto.Telefono.Trim(),
                limite_credito = dto.LimiteCredito,
                observacion   = string.IsNullOrWhiteSpace(dto.Observacion) ? null : dto.Observacion.Trim()
            };

            var resultado = await _clienteService.UpdateAsync(id, payload);
            if (resultado == null)
                return NotFound($"Cliente con ID {id} no encontrado");
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = $"Error al actualizar cliente: {ex.Message}" });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "SoloAdmin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var resultado = await _clienteService.DeleteAsync(id);
            if (resultado)
                return Ok(new { message = "Cliente eliminado correctamente" });
            return BadRequest("No se pudo eliminar el cliente");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error al eliminar cliente: {ex.Message}");
        }
    }

    [HttpGet("next-code")]
    [Authorize]
    public async Task<IActionResult> GetNextCode()
    {
        var nextCode = await _clienteService.GetNextCodeAsync();
        return Ok(new { codigo = nextCode });
    }
}