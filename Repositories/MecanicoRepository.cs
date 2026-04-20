using Microsoft.EntityFrameworkCore;
using TruckerService.Data;
using TruckerService.Models;

namespace TruckerService.Repositories;

public class MecanicoRepository : IMecanicoRepository
{
    private readonly AppDbContext _context;

    public MecanicoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Mecanico>> GetAllAsync()
    {
        return await _context.Mecanicos.ToListAsync();
    }

    public async Task<Mecanico?> GetByIdAsync(int id)
    {
        return await _context.Mecanicos.FindAsync(id);
    }

    public async Task AddAsync(Mecanico mecanico)
    {
        await _context.Mecanicos.AddAsync(mecanico);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Mecanico mecanico)
    {
        _context.Mecanicos.Update(mecanico);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var mecanico = await _context.Mecanicos.FindAsync(id);
        if (mecanico is null) return;

        _context.Mecanicos.Remove(mecanico);
        await _context.SaveChangesAsync();
    }
}
