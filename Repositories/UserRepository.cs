using Microsoft.EntityFrameworkCore;
using TruckerService.Data;
using TruckerService.Models;

namespace TruckerService.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Usuario?> GetByUserPass(string user, string pass)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u =>
                u.Username == user &&
                u.Password == pass);
    }

    public async Task AddAsync(Usuario user)
    {
        await _context.Usuarios.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}