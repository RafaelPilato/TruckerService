using Microsoft.EntityFrameworkCore;
using TruckerService.Models;

namespace TruckerService.Data;

public class AppDbContext : DbContext
{
    public DbSet<Caminhao> Caminhoes { get; set; }
    public DbSet<Mecanico> Mecanicos { get; set; }
    public DbSet<OrdemServico> OrdensServico { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
}
