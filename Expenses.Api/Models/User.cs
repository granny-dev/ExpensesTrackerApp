using Expenses.Api.Models.Base;

namespace Expenses.Api.Models;

public class User : BaseModel
{
    public string Email {  get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
