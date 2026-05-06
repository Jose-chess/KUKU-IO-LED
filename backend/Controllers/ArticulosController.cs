using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
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

    [HttpGet("kpis")]
    public async Task<IActionResult> GetKpis()
    {
        var articulos = await _articuloService.GetAllAsync();
        var totalArticulos = articulos.Count();
        var existenciaBaja = articulos.Count(a => a.ExistenciaActual <= a.ExistenciaMinima && a.ExistenciaActual > 0);
        var sinExistencia = articulos.Count(a => a.ExistenciaActual == 0);
        var valorInventario = articulos.Sum(a => a.ExistenciaActual * a.CostoCompra);

        var kpis = new
        {
            totalArticulos,
            existenciaBaja,
            sinExistencia,
            valorInventario
        };

        return Ok(kpis);
    }
}