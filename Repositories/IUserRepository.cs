using TruckerService.Models;

namespace TruckerService.Repositories;

public interface IUserRepository
{
    Task<Usuario?> GetByUserPass(string user, string pass);
    Task AddAsync(Usuario user);
}
