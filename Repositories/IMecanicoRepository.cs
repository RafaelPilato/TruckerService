using TruckerService.Models;

namespace TruckerService.Repositories;

public interface IMecanicoRepository
{
    Task<IEnumerable<Mecanico>> GetAllAsync();
    Task<Mecanico?> GetByIdAsync(int id);
    Task AddAsync(Mecanico mecanico);
    Task UpdateAsync(Mecanico mecanico);
    Task DeleteAsync(int id);
}
