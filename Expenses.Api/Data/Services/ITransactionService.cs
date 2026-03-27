using Expenses.Api.DTOs;
using Expenses.Api.Models;

namespace Expenses.Api.Data.Services;

public interface ITransactionService
{
    List<Transaction> GetAll(int userId);
    Transaction? GetById(int id);
    Transaction Add(PostTransactionDto payload, int userId);
    Transaction? Update(int id, PutTransactionDto payload);
    void Delete(int id);

}
