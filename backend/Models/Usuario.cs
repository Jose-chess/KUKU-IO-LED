using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.Models;

[Table("usuarios")]
public class Usuario : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("username")]
    public string Username { get; set; } = null!;

    [Column("password_hash")]
    public string PasswordHash { get; set; } = null!;

    [Column("rol")]
    public string Rol { get; set; } = "Vendedor";
}