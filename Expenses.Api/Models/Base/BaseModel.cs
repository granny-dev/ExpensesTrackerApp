namespace Expenses.Api.Models.Base;

public class BaseModel
{
    public int Id { get; set; }
    public DateTime CreatedAt {  get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
