using Microsoft.EntityFrameworkCore;
using TruckerService.Data;
using TruckerService.Models;

namespace TruckerService.Repositories;

public class CaminhaoRepository : ICaminhaoRepository
{
    private readonly AppDbContext _context;

    public CaminhaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Caminhao>> GetAllAsync()
    {
        return await _context.Caminhoes.ToListAsync();
    }

    public async Task<Caminhao?> GetByIdAsync(int id)
    {
        return await _context.Caminhoes.FindAsync(id);
    }

    public async Task AddAsync(Caminhao caminhao)
    {
        await _context.Caminhoes.AddAsync(caminhao);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Caminhao caminhao)
    {
        _context.Caminhoes.Update(caminhao);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var caminhao = await _context.Caminhoes.FindAsync(id);
        if (caminhao is null) return;

        _context.Caminhoes.Remove(caminhao);
        await _context.SaveChangesAsync();
    }
}
