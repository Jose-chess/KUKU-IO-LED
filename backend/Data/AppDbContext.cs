using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<Rol> Roles { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<UnidadMedida> UnidadesMedida { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Articulo> Articulos { get; set; }
    public DbSet<Venta> Ventas { get; set; }
    public DbSet<VentaDetalle> VentaDetalles { get; set; }
    public DbSet<CuentaPorCobrar> CuentasPorCobrar { get; set; }
    public DbSet<PagoCuentaCobrar> PagosCuentasCobrar { get; set; }
    public DbSet<Recibo> Recibos { get; set; }
    public DbSet<MovimientoInventario> MovimientosInventario { get; set; }
}