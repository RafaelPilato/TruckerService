using Microsoft.AspNetCore.Mvc;
using TruckerService.Models;
using TruckerService.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TruckerService.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _repository;

    public AuthController(IUserRepository repository)
    {
        _repository = repository;
    }

    private readonly string key = "minha-chave-secreta-do-sistema-de-trucker-service";

    [HttpPost("login")]
    public async Task<IActionResult> ValidarUser([FromBody] Usuario usuario)
    {
        var user = await _repository.GetByUserPass(usuario.Username, usuario.Password);

        if(user == null)
        {
            return Unauthorized();
        }

        var token = GerarToken(user.Username);

        return Ok(new
        {
            token = token
        });
    }

    private string GerarToken(string usuario)
    {
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(key));

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, usuario)
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Usuario usuario)
    {
        await _repository.AddAsync(usuario);
        return Ok(usuario);
    }
}
