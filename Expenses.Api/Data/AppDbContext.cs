using Expenses.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Expenses.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
}
