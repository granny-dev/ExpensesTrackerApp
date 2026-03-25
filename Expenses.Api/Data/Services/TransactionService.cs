using Expenses.Api.DTOs;
using Expenses.Api.Models;

namespace Expenses.Api.Data.Services;

public class TransactionService(AppDbContext context) : ITransactionService
{
    public Transaction Add(PostTransactionDto payload)
    {
        var newTransaction = new Transaction()
        {
            Amount = payload.Amount,
            Type = payload.Type,
            Category = payload.Category,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.UtcNow,
        };
        context.Transactions.Add(newTransaction);
        context.SaveChanges();

        return newTransaction;
    }

    public void Delete(int id)
    {
        var transaction = context.Transactions.FirstOrDefault(x => x.Id == id);
        if (transaction != null)
        {
            context.Transactions.Remove(transaction);
            context.SaveChanges();
        }
    }

    public List<Transaction> GetAll()
    {
        var transactions = context.Transactions.ToList();
        return transactions;
    }

    public Transaction? GetById(int id)
    {
        var transaction = context.Transactions.FirstOrDefault(t => t.Id == id);
        return transaction;
    }

    public Transaction? Update(int id, PutTransactionDto payload)
    {
        var transaction = context.Transactions.FirstOrDefault(x => x.Id == id);
        if(transaction != null)
        {
            transaction.Amount = payload.Amount;
            transaction.Type = payload.Type;
            transaction.Category = payload.Category;
            transaction.UpdatedAt = DateTime.UtcNow;

            context.Transactions.Update(transaction);

            context.SaveChanges();
        }
        return transaction;
    }
}
