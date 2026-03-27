using Expenses.Api.Data;
using Expenses.Api.Data.Services;
using Expenses.Api.DTOs;
using Expenses.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Expenses.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[EnableCors("AllowAll")]
[Authorize]
public class TransactionsController(ITransactionService service) : ControllerBase
{
    [HttpPost]
    public IActionResult CreateTransaction([FromBody] PostTransactionDto payload)
    {
        var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(nameIdentifierClaim))
        {
            return BadRequest("failed getting user id");
        }

        if(!int.TryParse(nameIdentifierClaim, out int userId))
        {
            return BadRequest();
        }
        var transaction = service.Add(payload, userId);
        return Ok(transaction);
    }

    [HttpGet]
    public IActionResult GetAllTransactions()
    {
        var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(nameIdentifierClaim))
        {
            return BadRequest("failed getting user id");
        }

        if (!int.TryParse(nameIdentifierClaim, out int userId))
        {
            return BadRequest();
        }
        var transactions = service.GetAll(userId);
        return Ok(transactions);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetTransactionById(int id)
    {
       var transaction = service.GetById(id);
        if (transaction == null) return NotFound();
        return Ok(transaction);
    }

    [HttpPut("{id:int}")]
    public IActionResult UpdateTransaction(int id, [FromBody]PutTransactionDto payload)
    {
        var transaction = service.Update(id, payload);
        if (transaction == null) return NotFound();

        return Ok(transaction);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteTransaction(int id)
    {
        service.Delete(id);

        return Ok();
    }
}
