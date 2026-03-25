namespace Expenses.Api.DTOs;

public class PostTransactionDto
{
    public string Type { get; set; } = string.Empty;
    public double Amount { get; set; }
    public string Category { get; set; } = string.Empty;
}
