using backend.DTOs;
using backend.Models;
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
}