import ModulePlaceholder from "../components/ui/ModulePlaceholder";

export default function MecanicosPage() {
  return (
    <ModulePlaceholder
      title="Mecanicos"
      description="A tela de mecanicos fica separada desde o inicio para preservar coesao e facilitar a construcao do fluxo de cadastro e consulta."
      highlights={[
        "Estrutura pronta para formulario e validacoes futuras.",
        "Layout padrao compartilhado com os outros modulos.",
        "Espaco preparado para tabela, busca e acoes rapidas.",
      ]}
    />
  );
}
