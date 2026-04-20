using TruckerService.Models;

namespace TruckerService.Repositories;

public interface ICaminhaoRepository
{
    Task<IEnumerable<Caminhao>> GetAllAsync();
    Task<Caminhao?> GetByIdAsync(int id);
    Task AddAsync(Caminhao caminhao);
    Task UpdateAsync(Caminhao caminhao);
    Task DeleteAsync(int id);
}
