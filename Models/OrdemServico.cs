using TruckerService.Models;

namespace TruckerService.Models
{
    public enum StatusOS { Aberta, Finalizada }
    public class OrdemServico {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string DescricaoProblema { get; set; }
        public DateTime DataHoraAbertura { get; set; }
        public StatusOS Status { get; set; } = StatusOS.Aberta;
        
        // Relacionamentos [4]
        public int CaminhaoId { get; set; }
        public Caminhao? Veiculo { get; set; }
        
        // Campos opcionais na abertura (Nullable [5])
        public int? MecanicoId { get; set; }
        public Mecanico? Mecanico { get; set; }
        public DateTime? DataHoraFechamento { get; set; }
        public string? DescricaoServicoRealizado { get; set; }
    }
}