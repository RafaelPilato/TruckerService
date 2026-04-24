using Microsoft.AspNetCore.Mvc;
using TruckerService.Models;
using TruckerService.Repositories;

namespace TruckerService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdemServicoController : ControllerBase
{
    private readonly IOrdemServicoRepository _repository;

    public OrdemServicoController(IOrdemServicoRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _repository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ordem = await _repository.GetByIdAsync(id);
        if (ordem == null) return NotFound();

        return Ok(ordem);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OrdemServico ordem)
    {
        await _repository.AddAsync(ordem);
        return CreatedAtAction(nameof(GetById), new { id = ordem.Id }, ordem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] OrdemServico ordem)
    {
        if (id != ordem.Id) return BadRequest();

        await _repository.UpdateAsync(ordem);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}