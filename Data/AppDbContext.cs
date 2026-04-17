using Microsoft.EntityFrameworkCore;

namespace TruckerService.Data
{
    public class AppDbContext : DbContext
    {
        //Tabelas

        //Configuração/Construtor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
    }
}