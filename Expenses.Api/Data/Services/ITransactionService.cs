using Expenses.Api.DTOs;
using Expenses.Api.Models;

namespace Expenses.Api.Data.Services;

public interface ITransactionService
{
    List<Transaction> GetAll();
    Transaction? GetById(int id);
    Transaction Add(PostTransactionDto payload);
    Transaction? Update(int id, PutTransactionDto payload);
    void Delete(int id);

}
