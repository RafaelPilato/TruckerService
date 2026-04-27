using Microsoft.AspNetCore.Mvc;
using TruckerService.Models;
using TruckerService.Repositories;

namespace TruckerService.Controllers;

[ApiController]
[Route("api/mecanico")]
public class MecanicoController : ControllerBase
{
    private readonly IMecanicoRepository _repository;

    public MecanicoController(IMecanicoRepository repository)
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
        var mecanico = await _repository.GetByIdAsync(id);
        if (mecanico == null) return NotFound();

        return Ok(mecanico);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Mecanico mecanico)
    {
        await _repository.AddAsync(mecanico);
        return CreatedAtAction(nameof(GetById), new { id = mecanico.Id }, mecanico);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Mecanico mecanico)
    {
        if (id != mecanico.Id) return BadRequest();

        await _repository.UpdateAsync(mecanico);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}