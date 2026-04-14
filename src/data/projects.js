/**
 * Dados de exemplo da secção Projetos.
 * Ordem: mais recente → mais antigo (índice 0 = mais recente).
 *
 * Modelo alinhado ao portfólio (campos em PT para conteúdo editorial).
 */

/** @typedef {'profissional' | 'pessoal'} TipoProjeto */
/** @typedef {'web' | 'app' | 'sistema'} CategoriaProjeto */

/**
 * @typedef {Object} PlataformaEntrada
 * @property {string} [imagem] URL ou caminho da captura (evolução futura: galeria / alternador).
 * @property {string} [link]
 */

/**
 * @typedef {Object} PlataformasProjeto
 * @property {PlataformaEntrada} [web]
 * @property {PlataformaEntrada} [mobile]
 */

/**
 * @typedef {Object} InsightsProjeto
 * @property {string} desafio
 * @property {string} solucao
 * @property {string} resultado
 */

/**
 * @typedef {Object} Projeto
 * @property {string} id
 * @property {TipoProjeto} tipo
 * @property {CategoriaProjeto} categoria
 * @property {string} nome
 * @property {string} resumo
 * @property {string} descricao
 * @property {PlataformasProjeto} plataformas
 * @property {string[]} tecnologias
 * @property {InsightsProjeto} [insights]
 * @property {string[]} evolucao
 * @property {string} [figmaLink]
 */

/** @type {Projeto[]} */
export const MOCK_PROJECTS = [
  {
    id: "corp-dashboard",
    tipo: "profissional",
    categoria: "web",
    nome: "Dashboard operacional",
    resumo: "Painel interno para acompanhamento de métricas e incidentes.",
    descricao:
      "Aplicação web consumindo APIs internas, com foco em filtros por período, exportação e estados de carregamento consistentes. Base preparada para evoluir com gráficos e permissões por perfil.",
    plataformas: {
      web: {
        imagem: "/placeholder-dashboard.png",
        link: "https://example.com/dashboard",
      },
      mobile: {
        imagem: "/placeholder-dashboard-mobile.png",
        link: "",
      },
    },
    tecnologias: ["React", "Next.js", "TanStack Query", "REST"],
    insights: {
      desafio: "Volume de dados e latência em filtros amplos.",
      solucao: "Paginação no servidor, cache por chave de filtro e skeletons.",
      resultado: "Tempo médio de interação reduzido e menos re-fetch desnecessário.",
    },
    evolucao: ["Modelagem de estados assíncronos", "Contratos de API com o backend"],
    figmaLink: "https://www.figma.com/file/example-dashboard",
  },
  {
    id: "corp-onboarding",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Fluxo de onboarding B2B",
    resumo: "Cadastro guiado de empresas com validação e revisão manual.",
    descricao:
      "Fluxo multi-etapas com persistência parcial, upload de documentos e painel de revisão para operações. Estrutura modular por etapa para facilitar testes e novos requisitos legais.",
    plataformas: {
      web: { imagem: "", link: "https://example.com/onboarding" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["React", "Node", "PostgreSQL", "AWS S3"],
    insights: {
      desafio: "Regras de negócio que mudam por segmento de cliente.",
      solucao: "Configuração por etapa e feature flags para rollout gradual.",
      resultado: "Menos retrabalho ao lançar variações regionais.",
    },
    evolucao: ["Feature flags em produção", "Upload resiliente com retry"],
  },
  {
    id: "pessoal-stargazing",
    tipo: "pessoal",
    categoria: "app",
    nome: "Stargazing log",
    resumo: "Registo simples de sessões de observação (side project).",
    descricao:
      "App para anotar condições do céu, equipamento e notas. Estrutura pensada para no futuro sincronizar entre web e mobile e mostrar histórico por localização.",
    plataformas: {
      web: { imagem: "", link: "https://example.com/stargazing" },
      mobile: {
        imagem: "/placeholder-stargazing-app.png",
        link: "https://example.com/app/stargazing",
      },
    },
    tecnologias: ["React Native", "Expo", "SQLite"],
    insights: {
      desafio: "Manter o modelo de dados flexível sem over-engineering.",
      solucao: "Schema versionado e migrações incrementais no dispositivo.",
      resultado: "Base estável para acrescentar mapas e alertas meteorológicos.",
    },
    evolucao: ["Offline-first", "Migrações locais de base de dados"],
  },
  {
    id: "pessoal-portfolio",
    tipo: "pessoal",
    categoria: "web",
    nome: "Portfólio (este site)",
    resumo: "Landing single-page com hero interativo e secções modulares.",
    descricao:
      "Experimento contínuo com performance, acessibilidade e componentização. A secção Projetos consome dados centralizados e componentes desacoplados para evoluir UI depois.",
    plataformas: {
      web: { imagem: "", link: "https://example.com/portfolio" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["Next.js", "Tailwind CSS", "WebGL"],
    insights: {
      desafio: "Equilibrar efeitos visuais com legibilidade e custo de render.",
      solucao: "Camadas claras (fundo vs conteúdo) e carregamento condicional.",
      resultado: "Estrutura pronta para refinar motion e conteúdo por fases.",
    },
    evolucao: ["Scroll-linked UI", "Organização de dados por domínio"],
    figmaLink: "https://www.figma.com/file/example-portfolio",
  },
]
