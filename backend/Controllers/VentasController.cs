using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VentasController : ControllerBase
{
    private readonly VentaService _ventaService;

    public VentasController(VentaService ventaService)
    {
        _ventaService = ventaService;
    }

    [HttpPost]
    public async Task<IActionResult> Crear(CrearVentaDto dto)
    {
        try 
        {
            var venta = await _ventaService.CrearVentaAsync(dto);
            return Ok(venta);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}