using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.Models;

[Table("unidades_medida")]
public class UnidadMedida : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("codigo")]
    public string Codigo { get; set; } = null!;

    [Column("descripcion")]
    public string Descripcion { get; set; } = null!;

    [Column("activa")]
    public bool Activa { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }
}
