using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.Models;

[Table("clientes")]
public class Cliente : BaseModel
{
    [PrimaryKey("id", shouldInsert: false)]
    public int Id { get; set; }

    [Column("codigo")]
    public string Codigo { get; set; } = null!;

    [Column("nombre")]
    public string Nombre { get; set; } = null!;

    [Column("apellido")]
    public string? Apellido { get; set; }

    [Column("rnc_cedula")]
    public string? RncCedula { get; set; }

    [Column("direccion")]
    public string? Direccion { get; set; }

    [Column("sector")]
    public string? Sector { get; set; }

    [Column("ciudad")]
    public string? Ciudad { get; set; }

    [Column("telefono")]
    public string? Telefono { get; set; }

    [Column("limite_credito")]
    public decimal LimiteCredito { get; set; }

    [Column("balance_actual")]
    public decimal BalanceActual { get; set; }

    [Column("observacion")]
    public string? Observacion { get; set; }

    [Column("activo")]
    public bool Activo { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }
}