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
public class ArticulosController : ControllerBase
{
    private readonly ArticuloService _articuloService;

    public ArticulosController(ArticuloService articuloService)
    {
        _articuloService = articuloService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var articulos = await _articuloService.GetAllAsync();
        return Ok(articulos);
    }

    [HttpGet("next-code")]
    public async Task<IActionResult> GetNextCode()
    {
        var codigo = await _articuloService.GetNextCodeAsync();
        return Ok(new { codigo });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CrearArticuloDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Descripcion))
            return BadRequest(new { error = "La descripción es obligatoria" });

        try
        {
            var codigo = await _articuloService.GetNextCodeAsync();
            var payload = new
            {
                codigo,
                descripcion = dto.Descripcion.Trim(),
                color = string.IsNullOrWhiteSpace(dto.Color) ? null : dto.Color.Trim(),
                unidad_medida_id = dto.UnidadMedidaId,
                existencia_minima = dto.ExistenciaMinima,
                existencia_actual = dto.ExistenciaActual,
                costo_compra = dto.CostoCompra,
                precio_venta = dto.PrecioVenta,
                activo = true
            };
            var resultado = await _articuloService.CreateAsync(payload);
            return StatusCode(201, resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ActualizarArticuloDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Descripcion))
            return BadRequest(new { error = "La descripción es obligatoria" });

        try
        {
            var payload = new
            {
                descripcion = dto.Descripcion.Trim(),
                color = string.IsNullOrWhiteSpace(dto.Color) ? null : dto.Color.Trim(),
                unidad_medida_id = dto.UnidadMedidaId,
                existencia_minima = dto.ExistenciaMinima,
                existencia_actual = dto.ExistenciaActual,
                costo_compra = dto.CostoCompra,
                precio_venta = dto.PrecioVenta,
                activo = dto.Activo
            };
            var resultado = await _articuloService.UpdateAsync(id, payload);
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
        var ok = await _articuloService.DeleteAsync(id);
        if (!ok) return BadRequest(new { error = "No se pudo eliminar el artículo" });
        return Ok(new { message = "Artículo eliminado correctamente" });
    }
}