using Microsoft.EntityFrameworkCore;
using TruckerService.Data;
using TruckerService.Models;

namespace TruckerService.Repositories;

public class OrdemServicoRepository : IOrdemServicoRepository
{
    private readonly AppDbContext _context;

    public OrdemServicoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrdemServico>> GetAllAsync()
    {
        return await _context.OrdensServico
            .Include(os => os.Veiculo)
            .Include(os => os.Mecanico)
            .ToListAsync();
    }

    public async Task<OrdemServico?> GetByIdAsync(int id)
    {
        return await _context.OrdensServico
            .Include(os => os.Veiculo)
            .Include(os => os.Mecanico)
            .FirstOrDefaultAsync(os => os.Id == id);
    }

    public async Task AddAsync(OrdemServico ordemServico)
    {
        ordemServico.Status = StatusOS.Aberta;
        ordemServico.DataHoraAbertura = DateTime.Now;

        await _context.OrdensServico.AddAsync(ordemServico);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(OrdemServico ordemServico)
    {
        _context.OrdensServico.Update(ordemServico);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var ordemServico = await _context.OrdensServico.FindAsync(id);
        if (ordemServico is null) return;

        _context.OrdensServico.Remove(ordemServico);
        await _context.SaveChangesAsync();
    }

    public async Task FinalizarAsync(OrdemServico ordemServico)
    {
        if (ordemServico.MecanicoId is null)
            throw new InvalidOperationException("Não é permitido finalizar a OS sem um mecânico vinculado.");

        if (ordemServico.DataHoraFechamento is null)
            throw new InvalidOperationException("A data de fechamento é obrigatória.");

        if (ordemServico.DataHoraFechamento < ordemServico.DataHoraAbertura)
            throw new InvalidOperationException("A data de fechamento não pode ser menor que a data de abertura.");

        if (string.IsNullOrWhiteSpace(ordemServico.DescricaoServicoRealizado))
            throw new InvalidOperationException("A descrição do serviço realizado é obrigatória.");

        if (ordemServico.Status == StatusOS.Finalizada)
            throw new InvalidOperationException("A OS já está finalizada.");

        ordemServico.Status = StatusOS.Finalizada;

        _context.OrdensServico.Update(ordemServico);
        await _context.SaveChangesAsync();
    }
}
