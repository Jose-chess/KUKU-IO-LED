using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[EnableRateLimiting("general")]
public class UnidadesMedidaController : ControllerBase
{
    private readonly UnidadesMedidaService _service;

    public UnidadesMedidaController(UnidadesMedidaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var unidades = await _service.GetAllAsync();
        return Ok(unidades);
    }

    [HttpGet("next-code")]
    public async Task<IActionResult> GetNextCode()
    {
        var codigo = await _service.GetNextCodeAsync();
        return Ok(new { codigo });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UnidadMedidaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Codigo) || string.IsNullOrWhiteSpace(request.Descripcion))
            return BadRequest(new { error = "Código y descripción son obligatorios" });

        try
        {
            var resultado = await _service.CreateAsync(request.Codigo, request.Descripcion);
            return StatusCode(201, resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UnidadMedidaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Codigo) || string.IsNullOrWhiteSpace(request.Descripcion))
            return BadRequest(new { error = "Código y descripción son obligatorios" });

        try
        {
            var resultado = await _service.UpdateAsync(id, request.Codigo, request.Descripcion);
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        if (!ok) return BadRequest(new { error = "No se pudo eliminar la unidad" });
        return Ok(new { message = "Unidad eliminada correctamente" });
    }
}

public class UnidadMedidaRequest
{
    public string Codigo { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
}