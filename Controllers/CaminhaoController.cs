using Microsoft.AspNetCore.Mvc;
using TruckerService.Models;
using TruckerService.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace TruckerService.Controllers;

[ApiController]
[Route("api/caminhao")]
public class CaminhaoController : ControllerBase
{
    private readonly ICaminhaoRepository _repository;

    public CaminhaoController(ICaminhaoRepository repository)
    {
        _repository = repository;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var caminhoes = await _repository.GetAllAsync();
        return Ok(caminhoes);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var caminhao = await _repository.GetByIdAsync(id);

        if (caminhao == null)
            return NotFound();

        return Ok(caminhao);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Caminhao caminhao)
    {
        await _repository.AddAsync(caminhao);
        return CreatedAtAction(nameof(GetById), new { id = caminhao.Id }, caminhao);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Caminhao caminhao)
    {
        if (id != caminhao.Id)
            return BadRequest();

        await _repository.UpdateAsync(caminhao);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}