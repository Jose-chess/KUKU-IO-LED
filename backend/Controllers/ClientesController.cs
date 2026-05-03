using backend.Models;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly ClienteService _clienteService;

    public ClientesController(ClienteService clienteService)
    {
        _clienteService = clienteService;
    }

    private ClienteDto MapToDto(Cliente c) => new ClienteDto
    {
        Id            = c.Id ?? 0,
        Codigo        = c.Codigo,
        Nombre        = c.Nombre,
        Apellido      = c.Apellido,
        RncCedula     = c.RncCedula,
        Direccion     = c.Direccion,
        Sector        = c.Sector,
        Ciudad        = c.Ciudad,
        Telefono      = c.Telefono,
        LimiteCredito = c.LimiteCredito,
        BalanceActual = c.BalanceActual,
        Observacion   = c.Observacion,
        Activo        = c.Activo,
        CreatedAt     = c.CreatedAt == DateTime.MinValue ? null : c.CreatedAt
    };

    // Validaciones de negocio
    private async Task<(bool IsValid, string ErrorMessage)> ValidarCliente(
        string nombre, 
        string? rncCedula, 
        decimal limiteCredito, 
        decimal balanceActual,
        int? excludeId = null)
    {
        // Nombre es obligatorio
        if (string.IsNullOrWhiteSpace(nombre))
            return (false, "El nombre es obligatorio");

        // Nombre solo letras
        if (nombre.Any(char.IsDigit))
            return (false, "El nombre solo puede contener letras");

        // Límite de crédito no negativo
        if (limiteCredito < 0)
            return (false, "El límite de crédito no puede ser negativo");

        // Balance no negativo
        if (balanceActual < 0)
            return (false, "El balance no puede ser negativo");

        // RNC/Cédula único si se proporciona
        if (!string.IsNullOrWhiteSpace(rncCedula))
        {
            var existeRnc = await _clienteService.ExisteRncCedulaAsync(rncCedula, excludeId);
            if (existeRnc)
                return (false, "El RNC/Cédula ya está registrado");
        }

        return (true, string.Empty);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clientes = await _clienteService.GetAllAsync();
        return Ok(clientes.Select(MapToDto));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cliente = await _clienteService.GetByIdAsync(id);
        if (cliente == null)
            return NotFound($"Cliente con ID {id} no encontrado");

        return Ok(MapToDto(cliente));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CrearClienteDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Validaciones de negocio
        var (isValid, errorMessage) = await ValidarCliente(
            dto.Nombre, 
            dto.RncCedula, 
            dto.LimiteCredito, 
            0  // Balance inicial es 0
        );

        if (!isValid)
            return BadRequest(new { error = errorMessage });

        try
        {
            var cliente = new Cliente
            {
                Nombre        = dto.Nombre.Trim(),
                Apellido      = string.IsNullOrWhiteSpace(dto.Apellido) ? null : dto.Apellido.Trim(),
                RncCedula     = string.IsNullOrWhiteSpace(dto.RncCedula) ? null : dto.RncCedula.Trim(),
                Direccion     = string.IsNullOrWhiteSpace(dto.Direccion) ? null : dto.Direccion.Trim(),
                Sector        = string.IsNullOrWhiteSpace(dto.Sector) ? null : dto.Sector.Trim(),
                Ciudad        = string.IsNullOrWhiteSpace(dto.Ciudad) ? null : dto.Ciudad.Trim(),
                Telefono      = string.IsNullOrWhiteSpace(dto.Telefono) ? null : dto.Telefono.Trim(),
                LimiteCredito = dto.LimiteCredito,
                Observacion   = string.IsNullOrWhiteSpace(dto.Observacion) ? null : dto.Observacion.Trim(),
                Activo        = true
            };

            var clienteCreado = await _clienteService.CreateAsync(cliente);
            var resultado = MapToDto(clienteCreado);
            return CreatedAtAction(nameof(GetById), new { id = resultado.Id }, resultado);
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

        var clienteExistente = await _clienteService.GetByIdAsync(id);
        if (clienteExistente == null)
            return NotFound($"Cliente con ID {id} no encontrado");

        // Validaciones de negocio (excluyendo el cliente actual para la validación de RNC único)
        var (isValid, errorMessage) = await ValidarCliente(
            dto.Nombre, 
            dto.RncCedula, 
            dto.LimiteCredito, 
            clienteExistente.BalanceActual,  // Mantener el balance actual
            id  // Excluir este ID de la validación de duplicados
        );

        if (!isValid)
            return BadRequest(new { error = errorMessage });

        try
        {
            clienteExistente.Nombre        = dto.Nombre.Trim();
            clienteExistente.Apellido      = string.IsNullOrWhiteSpace(dto.Apellido) ? null : dto.Apellido.Trim();
            clienteExistente.RncCedula     = string.IsNullOrWhiteSpace(dto.RncCedula) ? null : dto.RncCedula.Trim();
            clienteExistente.Direccion     = string.IsNullOrWhiteSpace(dto.Direccion) ? null : dto.Direccion.Trim();
            clienteExistente.Sector        = string.IsNullOrWhiteSpace(dto.Sector) ? null : dto.Sector.Trim();
            clienteExistente.Ciudad        = string.IsNullOrWhiteSpace(dto.Ciudad) ? null : dto.Ciudad.Trim();
            clienteExistente.Telefono      = string.IsNullOrWhiteSpace(dto.Telefono) ? null : dto.Telefono.Trim();
            clienteExistente.LimiteCredito = dto.LimiteCredito;
            clienteExistente.Observacion   = string.IsNullOrWhiteSpace(dto.Observacion) ? null : dto.Observacion.Trim();
            clienteExistente.Activo        = dto.Activo;

            var clienteActualizado = await _clienteService.UpdateAsync(id, clienteExistente);
            return Ok(MapToDto(clienteActualizado!));
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = $"Error al actualizar cliente: {ex.Message}" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var clienteExistente = await _clienteService.GetByIdAsync(id);
        if (clienteExistente == null)
            return NotFound($"Cliente con ID {id} no encontrado");

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
    public async Task<IActionResult> GetNextCode()
    {
        var nextCode = await _clienteService.GetNextCodeAsync();
        return Ok(new { codigo = nextCode });
    }
}