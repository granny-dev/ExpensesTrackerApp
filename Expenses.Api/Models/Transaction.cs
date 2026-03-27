using Expenses.Api.Models.Base;

namespace Expenses.Api.Models;

public class Transaction : BaseModel
{
    public string Type { get; set; } = string.Empty;
    public double Amount {  get; set; }
    public string Category {  get; set; } = string.Empty;
    public int UserId {  get; set; }
    public virtual User? User { get; set; }
}
