using TruckerService.Models;

namespace TruckerService.Repositories;

public interface IOrdemServicoRepository
{
    Task<IEnumerable<OrdemServico>> GetAllAsync();
    Task<OrdemServico?> GetByIdAsync(int id);
    Task AddAsync(OrdemServico ordemServico);
    Task UpdateAsync(OrdemServico ordemServico);
    Task DeleteAsync(int id);
    Task FinalizarAsync(OrdemServico ordemServico);
}
