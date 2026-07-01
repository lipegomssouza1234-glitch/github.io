export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface MindmapNode {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color?: string;
  tasks?: Task[];
  children?: MindmapNode[];
}

export const mindmapData: MindmapNode = {
  id: "root",
  title: "Funil de Lançamento de Produto Digital",
  description: "Guia estratégico e operacional para o lançamento bem-sucedido de produtos digitais, abrangendo desde o planejamento inicial até a análise de resultados, com foco na otimização da produção e maximização da conversão.",
  icon: "🚀",
  color: "bg-blue-600",
  children: [
    {
      id: "planejamento",
      title: "1. Planejamento Estratégico e de Produto",
      icon: "📋",
      color: "bg-blue-500",
      tasks: [
        { id: "p1", title: "Definição detalhada da persona e avatar ideal para o produto", completed: false },
        { id: "p2", title: "Análise aprofundada de mercado, concorrência e diferenciais", completed: false },
        { id: "p3", title: "Elaboração de uma oferta irresistível e posicionamento único", completed: false },
        { id: "p4", title: "Criação do cronograma mestre do lançamento com marcos e prazos", completed: false }
      ]
    },
    {
      id: "captacao",
      title: "2. Estratégias de Captação de Leads Qualificados",
      icon: "🧲",
      color: "bg-indigo-500",
      tasks: [
        { id: "c1", title: "Desenvolvimento e otimização de Landing Pages de alta conversão", completed: false },
        { id: "c2", title: "Configuração e gestão de campanhas de tráfego pago (Facebook Ads, Google Ads)", completed: false },
        { id: "c3", title: "Automação de sequência de e-mails de confirmação e boas-vindas", completed: false },
        { id: "c4", title: "Criação e gerenciamento de comunidades em grupos (WhatsApp, Telegram)", completed: false }
      ]
    },
    {
      id: "aquecimento",
      title: "3. Aquecimento e Engajamento da Audiência",
      icon: "🔥",
      color: "bg-orange-500",
      tasks: [
        { id: "a1", title: "Produção de conteúdo estratégico para redes sociais (Instagram, TikTok)", completed: false },
        { id: "a2", title: "Realização de lives e webinars de aquecimento (Pré-Lançamento)", completed: false },
        { id: "a3", title: "Distribuição contínua de conteúdo de valor e educativo", completed: false },
        { id: "a4", title: "Interação com a audiência através de enquetes e pesquisas", completed: false }
      ]
    },
    {
      id: "evento",
      title: "4. Execução do Evento de Lançamento (CPL)",
      icon: "🎥",
      color: "bg-purple-500",
      tasks: [
        { id: "e1", title: "Roteirização detalhada e script dos vídeos/aulas do CPL", completed: false },
        { id: "e2", title: "Produção audiovisual e edição profissional dos conteúdos do CPL", completed: false },
        { id: "e3", title: "Configuração técnica da plataforma de transmissão e acesso", completed: false },
        { id: "e4", title: "Gestão e moderação de chat, suporte ao vivo e FAQs", completed: false }
      ]
    },
    {
      id: "vendas",
      title: "5. Abertura de Carrinho e Estratégias de Vendas",
      icon: "💰",
      color: "bg-green-500",
      tasks: [
        { id: "v1", title: "Configuração robusta do checkout e múltiplos meios de pagamento", completed: false },
        { id: "v2", title: "Desenvolvimento de página de vendas com copy persuasiva e elementos de prova social", completed: false },
        { id: "v3", title: "Disparo de e-mails de vendas, remarketing e recuperação de carrinho", completed: false },
        { id: "v4", title: "Implementação de bônus de ação rápida e escassez (primeiras 24h)", completed: false }
      ]
    },
    {
      id: "pos-venda",
      title: "6. Pós-Venda, Onboarding e Suporte",
      icon: "🤝",
      color: "bg-pink-500",
      tasks: [
        { id: "pv1", title: "Envio de e-mails de boas-vindas e instruções para novos alunos/clientes", completed: false },
        { id: "pv2", title: "Garantia de entrega e acesso imediato à plataforma/produto", completed: false },
        { id: "pv3", title: "Estruturação de canais de suporte técnico e de dúvidas eficiente", completed: false },
        { id: "pv4", title: "Coleta proativa de depoimentos, feedbacks e cases de sucesso", completed: false }
      ]
    },
    {
      id: "analise",
      title: "7. Análise de Resultados e Otimização Contínua",
      icon: "📊",
      color: "bg-red-500",
      tasks: [
        { id: "an1", title: "Cálculo detalhado de ROI (Retorno sobre Investimento) e ROAS (Retorno sobre Anúncios)", completed: false },
        { id: "an2", title: "Análise aprofundada das taxas de conversão em cada etapa do funil", completed: false },
        { id: "an3", title: "Realização de debriefing completo com a equipe para lições aprendidas", completed: false },
        { id: "an4", title: "Elaboração de plano de ação para o próximo lançamento com base nos dados", completed: false }
      ]
    }
  ]
};
