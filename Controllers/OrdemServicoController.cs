using Microsoft.AspNetCore.Mvc;
using TruckerService.Models;
using TruckerService.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace TruckerService.Controllers;

[ApiController]
[Route("api/ordemservico")]
public class OrdemServicoController : ControllerBase
{
    private readonly IOrdemServicoRepository _repository;

    public OrdemServicoController(IOrdemServicoRepository repository)
    {
        _repository = repository;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _repository.GetAllAsync());
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ordem = await _repository.GetByIdAsync(id);
        if (ordem == null) return NotFound();

        return Ok(ordem);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OrdemServico ordem)
    {
        await _repository.AddAsync(ordem);
        return CreatedAtAction(nameof(GetById), new { id = ordem.Id }, ordem);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] OrdemServico ordem)
    {
        if (id != ordem.Id) return BadRequest();

        await _repository.UpdateAsync(ordem);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }

    [Authorize]
    [HttpPut("{id}/finalizar")]
    public async Task<IActionResult> Finalizar(int id, [FromBody] OrdemServico dadosFechamento)
    {
        var ordem = await _repository.GetByIdAsync(id);

        if (ordem == null)
            return NotFound("Ordem de serviço não encontrada.");

        // Atualiza somente os campos de fechamento
        ordem.MecanicoId = dadosFechamento.MecanicoId;
        ordem.DataHoraFechamento = dadosFechamento.DataHoraFechamento;
        ordem.DescricaoServicoRealizado = dadosFechamento.DescricaoServicoRealizado;

        try
        {
            await _repository.FinalizarAsync(ordem);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok(ordem);
    }
}