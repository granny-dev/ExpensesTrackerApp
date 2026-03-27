using Expenses.Api.Data;
using Expenses.Api.DTOs;
using Expenses.Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Expenses.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[EnableCors("AllowAll")]
public class AuthController(AppDbContext context, PasswordHasher<User> passwordHasher) : ControllerBase
{

    [HttpPost("Login")]
    public IActionResult Login([FromBody]LoginUserDto payload)
    {
        var user = context.Users.FirstOrDefault(u => u.Email == payload.Email);
        if(user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var result = passwordHasher.VerifyHashedPassword(user, user.Password, payload.Password);

        if(result == PasswordVerificationResult.Failed)
        {
            return Unauthorized("Invalid password");
        }

        var token = GenerateJwtToken(user);

        return Ok(new { Token = token });
    }


    [HttpPost("Register")]
    public IActionResult Register([FromBody]RegistertUserDto payload)
    {
        if(context.Users.Any(u => u.Email == payload.Email))
        {
            return BadRequest($"User with email {payload.Email} already exists");
        }

        var hashedPassword = passwordHasher.HashPassword(null, payload.Password);

        var newUser = new User()
        {
            Email = payload.Email,
            Password = hashedPassword,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Users.Add(newUser);
        context.SaveChanges();

        var token = GenerateJwtToken(newUser);

        return Ok(new {Token = token});
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("073b36cb-935d-4e72-9c66-04179c23c5e9-073b36cb-935d-4e72-9c66-04179c23c5e9"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: "dotnethow.net",
            audience: "dotnethow.net",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}

 