/**
 * Dados de exemplo da secção Projetos.
 * Ordem: mais recente → mais antigo (índice 0 = mais recente).
 */

/** @typedef {'profissional' | 'pessoal'} TipoProjeto */
/** @typedef {'web' | 'app' | 'sistema'} CategoriaProjeto */

/**
 * @typedef {Object} PlataformaEntrada
 * @property {string} [imagem]
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
 * @typedef {Object} ConteudoTecnicoProjeto
 * @property {string[]} [stackDetalhada]
 * @property {string[]} [decisoesTecnicas]
 * @property {string[]} [desafiosExtras]
 */

/**
 * @typedef {Object} Metrica
 * @property {string} label
 * @property {string} valor
 */

/**
 * @typedef {Object} Projeto
 * @property {string} id
 * @property {TipoProjeto} tipo
 * @property {CategoriaProjeto} categoria
 * @property {string} [destaque] Eyebrow para projeto em destaque
 * @property {string} [status] Badge de status (ex: "Entregue · em produção")
 * @property {string} [logoEmpresa] Logo exibida antes do título do projeto
 * @property {boolean} [logoEmpresaSemPadding] Remove respiro interno quando o arquivo da logo já tem fundo
 * @property {Metrica[]} [metricas] Métricas de escala/impacto do projeto
 * @property {string[]} [responsabilidade] O que foi responsabilidade direta do dev
 * @property {string} nome
 * @property {string} resumo
 * @property {string} descricao
 * @property {string} [descricaoResumida] Modo visual — texto mais curto
 * @property {PlataformasProjeto} plataformas
 * @property {string[]} tecnologias
 * @property {string[] | { web?: string[], mobile?: string[] }} [previewImages]
 * @property {InsightsProjeto} [insights]
 * @property {string[]} evolucao
 * @property {string} [figmaLink]
 * @property {ConteudoTecnicoProjeto} [conteudoTecnico]
 */

/** @type {Projeto[]} */
export const MOCK_PROJECTS = [
  {
    id: "chaves-e-chaves",
    tipo: "profissional",
    categoria: "sistema",
    destaque: "Projeto destaque — sistema empresarial",
    status: "Entregue · em produção",
    logoEmpresa: "/assets/projects/cec-icon.png",
    nome: "Chaves & Chaves",
    resumo: "Sistema para gestão imobiliária, atendimentos e processos internos.",
    descricao:
      "A imobiliária controlava atendimentos e processos internos por planilha e WhatsApp, sem visibilidade do funil de vendas nem histórico centralizado de clientes. O objetivo era transformar isso em um sistema operacional real.",
    descricaoResumida:
      "A imobiliária controlava atendimentos por planilha e WhatsApp. Desenvolvi o front-end completo do sistema que centralizou a operação, histórico de clientes e funil de vendas.",
    metricas: [
      { label: "Valor do projeto", valor: "R$ 50k" },
      { label: "Equipe", valor: "3 devs" },
      { label: "Construção", valor: "Do zero" },
      { label: "Plataforma", valor: "Web" },
    ],
    responsabilidade: [
      "Arquitetura e desenvolvimento completo do front-end — estrutura de componentes, roteamento e fluxos de navegação",
      "Integração com API REST construída pelos devs back-end, incluindo autenticação e tratamento de estados",
      "Decisões de UI/UX — prototipagem das telas principais e validação com o cliente durante o desenvolvimento",
      "Módulos entregues: cadastro de imóveis, painel de atendimentos, acompanhamento operacional e histórico de clientes",
    ],
    plataformas: {
      web: {
        imagem: "/assets/projects/cec-1.png",
        link: "",
      },
      mobile: { imagem: "", link: "" },
    },
    previewImages: [
      "/assets/projects/cec-1.png",
      "/assets/projects/cec-2.png",
      "/assets/projects/cec-3.png",
      "/assets/projects/cec-4.png",
      "/assets/projects/cec-5.png",
      "/assets/projects/cec-6.png",
    ],
    tecnologias: ["TypeScript", "React", "Next.js", "Node.js", "REST API", "Postman", "Tailwind CSS", "shadcn/ui"],
    insights: {
      desafio: "Imobiliária sem visibilidade do funil de vendas — atendimentos e histórico de clientes espalhados em planilhas e WhatsApp.",
      solucao: "Front-end completo com módulos separados por domínio (imóveis, atendimentos, operacional), integrado a API REST do back-end com autenticação e estados consistentes.",
      resultado: "Sistema substituiu o controle manual por planilha e WhatsApp, centralizando histórico de clientes e funil de atendimentos em uma plataforma única. Hoje em uso pela equipe da imobiliária.",
    },
    evolucao: [
      "Arquitetura front-end de sistema empresarial do zero",
      "Integração com API REST e fluxos de autenticação",
      "UI/UX para sistemas com alta densidade de informação",
    ],
    conteudoTecnico: {
      stackDetalhada: ["TypeScript", "React", "Next.js", "Node.js", "REST API", "Postman", "Tailwind CSS", "shadcn/ui"],
      decisoesTecnicas: [
        "Separação de módulos por domínio (imóveis, atendimentos, operacional) para permitir evolução independente de cada área.",
        "Componentes reutilizáveis para formulários e listagens com validação centralizada.",
        "Integração de autenticação com gerenciamento de sessão e proteção de rotas no front-end.",
      ],
      desafiosExtras: [
        "Manter consistência visual em telas com alta densidade de informação operacional.",
        "Coordenação de contrato de API com devs back-end em desenvolvimento paralelo.",
      ],
    },
  },
  {
    id: "360erp",
    tipo: "profissional",
    categoria: "sistema",
    destaque: "ERP legado — web + mobile",
    status: "Em produção · base ativa",
    logoEmpresa: "/assets/projects/erp-icon.png",
    logoEmpresaSemPadding: true,
    nome: "360erp",
    resumo: "ERP completo com módulos de PDV, OS, e-commerce, fiscal, financeiro e logística.",
    descricao:
      "ERP completo com módulos de PDV, OS, e-commerce, fiscal, financeiro e logística — sistema legado em produção com base ativa de clientes. Entrei para compor o time de front-end, responsável pela manutenção evolutiva da interface web e pelo app mobile.",
    descricaoResumida:
      "Atuei no front-end web e na manutenção principal do app mobile em Flutter, evoluindo módulos críticos de um ERP legado em produção.",
    metricas: [
      { label: "Plataforma", valor: "Web + Mobile" },
      { label: "Atuação", valor: "Front-end" },
      { label: "Módulos entregues", valor: "5" },
      { label: "Sistema", valor: "ERP legado" },
    ],
    responsabilidade: [
      "Modernização visual da interface web — revisão de páginas e componentes existentes com foco em UI mais consistente e atual",
      "Desenvolvimento de novos módulos: plano de recorrência, consignado, módulo de produção e fluxo de venda",
      "Manutenção principal do app mobile em Flutter — correção de bugs, ajustes de fluxo e estabilidade em produção",
      "Atuação em sistema legado de alta complexidade, com entrega contínua sem impacto nas funcionalidades existentes",
    ],
    plataformas: {
      web: { imagem: "/assets/projects/360.png", link: "https://app.360erp.com.br/" },
      mobile: { imagem: "/assets/projects/erp-app-1.PNG", link: "" },
    },
    previewImages: {
      web: [
        "/assets/projects/360.png",
        "/assets/projects/erp-2.png",
        "/assets/projects/erp-3.png",
        "/assets/projects/erp-4.png",
        "/assets/projects/erp-5.png",
      ],
      mobile: [
        "/assets/projects/erp-app-1.PNG",
        "/assets/projects/erp-app-2.jpeg",
        "/assets/projects/erp-app-3.PNG",
        "/assets/projects/erp-app-4.PNG",
        "/assets/projects/erp-app-5.PNG",
      ],
    },
    tecnologias: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel", "React", "Flutter", "Dart", "MUI", "REST API"],
    insights: {
      desafio: "Evoluir um ERP legado com módulos críticos de negócio, mantendo estabilidade em produção na web e no app mobile.",
      solucao: "Modernização gradual da UI web, desenvolvimento de novos módulos e manutenção contínua do app Flutter com foco em correção, fluxo e previsibilidade.",
      resultado: "Sistema em operação ativa com múltiplos módulos críticos de negócio. A atuação no app mobile como responsável principal exigiu leitura rápida de código existente, diagnóstico de problemas em produção e entrega com zero tolerância a quebra de fluxo para os usuários finais.",
    },
    evolucao: [
      "Manutenção evolutiva em sistema legado",
      "Flutter em produto real com usuários ativos",
      "Interfaces ERP orientadas a operação",
    ],
    conteudoTecnico: {
      stackDetalhada: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel", "React", "Flutter", "Dart", "MUI", "REST API"],
      decisoesTecnicas: [
        "Evolução incremental de páginas e componentes para modernizar a UI sem interromper fluxos existentes.",
        "Manutenção do app Flutter priorizando estabilidade, correção de bugs e preservação de jornadas em produção.",
        "Organização de módulos por domínio para lidar com PDV, OS, recorrência, consignado, produção e venda.",
      ],
      desafiosExtras: [
        "Ler e alterar código legado com alta dependência entre módulos.",
        "Entregar ajustes em produção com baixa tolerância a regressões em fluxos operacionais.",
      ],
    },
  },
  {
    id: "levita-massagens",
    tipo: "profissional",
    categoria: "web",
    nome: "Levita Massagens",
    resumo: "Landing page para apresentação de serviços e captação de contatos.",
    descricao:
      "Landing page com foco em conversão, apresentação de serviços, diferenciais, contato rápido e uma experiência visual acolhedora para o público da marca.",
    descricaoResumida:
      "LP de serviços com foco em apresentação, confiança e contato rápido.",
    plataformas: {
      web: { imagem: "/assets/projects/levita-1.png", link: "" },
      mobile: { imagem: "", link: "" },
    },
    previewImages: ["/assets/projects/levita-1.png"],
    tecnologias: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    insights: {
      desafio: "Traduzir um serviço sensorial para uma experiência digital simples.",
      solucao: "Hierarquia visual direta, CTAs evidentes e conteúdo orientado à confiança.",
      resultado: "Página objetiva para comunicar serviços e facilitar contato.",
    },
    evolucao: ["Copy para conversão", "Estruturação de landing pages", "Design responsivo"],
    conteudoTecnico: {
      stackDetalhada: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
      decisoesTecnicas: [
        "Seções curtas para leitura rápida em mobile.",
        "CTAs posicionados para reduzir atrito no contato.",
      ],
      desafiosExtras: ["Manter leveza visual sem perder clareza comercial."],
    },
  },
  {
    id: "newline-persianas",
    tipo: "profissional",
    categoria: "web",
    nome: "NewLine Persianas",
    resumo: "Landing page para catálogo, materiais e pedido de orçamento.",
    descricao:
      "Landing page para fabricante de persianas com catálogo visual, destaques de materiais, diferenciais e CTA de orçamento para captar leads qualificados.",
    descricaoResumida:
      "LP com catálogo visual, materiais e chamada para orçamento.",
    plataformas: {
      web: { imagem: "/assets/projects/nl-1.png", link: "https://newlinepersianas.com.br/" },
      mobile: { imagem: "", link: "" },
    },
    previewImages: [
      "/assets/projects/nl-1.png",
      "/assets/projects/nl-2.png",
      "/assets/projects/nl-3.png",
    ],
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
    insights: {
      desafio: "Mostrar variedade de produtos sem transformar a página em catálogo pesado.",
      solucao: "Blocos visuais enxutos, hierarquia clara e CTA de orçamento em destaque.",
      resultado: "Página mais direta para explicar produtos e gerar contato.",
    },
    evolucao: ["Landing pages comerciais", "Organização de catálogo", "Design responsivo"],
    conteudoTecnico: {
      stackDetalhada: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
      decisoesTecnicas: [
        "Conteúdo dividido por intenção de compra.",
        "Componentes simples para facilitar manutenção do conteúdo.",
      ],
      desafiosExtras: ["Equilibrar apelo visual e performance em imagens de produto."],
    },
  },
  {
    id: "aprova-legal",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Aprova Legal",
    resumo: "Sistema para seguro imobiliário e gestão de processos.",
    descricao:
      "Sistema de seguro imobiliário com interface para clientes, apólices, sinistros, relatórios e fluxos operacionais, priorizando clareza e organização das informações.",
    descricaoResumida:
      "Sistema imobiliário para clientes, apólices, sinistros e relatórios.",
    plataformas: {
      web: { imagem: "/assets/projects/aprova-0.png", link: "https://aprovalegal.com/" },
      mobile: { imagem: "", link: "" },
    },
     previewImages: {
      web: [
        "/assets/projects/aprova-0.png",
        "/assets/projects/aprova-1.png",
        "/assets/projects/aprova-2.png",
      ],
    },
    tecnologias: ["HTML5 & CSS3", "Bootstrap", "JavaScript", "Laravel (PHP)", "Figma"],
    insights: {
      desafio: "Organizar processos com muitos dados e etapas distintas.",
      solucao: "Telas segmentadas por fluxo, formulários claros e navegação objetiva.",
      resultado: "Melhor leitura das etapas e mais previsibilidade no uso do sistema.",
    },
    evolucao: ["Fluxos de sistema", "Laravel em aplicações reais", "Validação de formulários"],
    conteudoTecnico: {
      stackDetalhada: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "PHP/Laravel"],
      decisoesTecnicas: [
        "Separação visual entre entidades do domínio.",
        "Padronização de componentes de listagem e formulário.",
      ],
      desafiosExtras: ["Manter consistência em telas de cadastro, consulta e relatório."],
    },
  },
  {
    id: "lunarbot",
    tipo: "profissional",
    categoria: "sistema",
    nome: "LunarBot.io",
    resumo: "Sistema para gerenciamento de bot, comandos, usuários e grupos.",
    descricao:
      "Sistema administrativo para bot do Telegram com controle de usuários, mensagens, comandos, grupos, estatísticas, configurações e logs operacionais.",
    descricaoResumida:
      "Dashboard administrativo para bot com usuários, comandos, grupos e estatísticas.",
    plataformas: {
      web: { imagem: "/assets/projects/lunar.png", link: "https://lunarbot.com.br/" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["HTML5 & CSS3", "Bootstrap", "JavaScript", "Laravel (PHP)", "Postman", "Figma"],
    insights: {
      desafio: "Criação de interface sem framework, com muito uso de css e JS puros para controle de estados e interações.",
      solucao: "Implementação de componentes reutilizáveis com controle de estados manual.",
      resultado: "Sistema funcional e organizado, mesmo sem o uso de frameworks modernos, com foco em usabilidade e clareza para o usuário final.",
    },
    evolucao: ["Dashboards administrativos", "Integração com back-end Laravel", "Organização de logs e estatísticas"],
    figmaLink: "https://www.figma.com/design/0gHgezIDrlEidd1cYQymAY/lunarbot?node-id=8-134&t=9CtnBgcuyuGNeN0I-0",
    conteudoTecnico: {
      stackDetalhada: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "PHP/Laravel", "Postman", "Figma"],
      decisoesTecnicas: [
        "Seções administrativas separadas por responsabilidade.",
        "Fluxos pensados para reduzir cliques em tarefas recorrentes.",
      ],
      desafiosExtras: ["Conectar informação operacional com uma interface simples para administração."],
    },
  },
  {
    id: "salon",
    tipo: "pessoal",
    categoria: "sistema",
    nome: "Salon",
    resumo: "Sistema e app para gestão de atendimentos, agenda e clientes.",
    descricao:
      "Projeto pessoal para gestão de salão, com foco em agenda, clientes, serviços, atendimentos e uma experiência que pode evoluir entre painel web e app mobile.",
    descricaoResumida:
      "Sistema e app para agenda, clientes, serviços e atendimentos de salão.",
    plataformas: {
      web: { imagem: "", link: "" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["React", "React Native", "TypeScript", "Node.js", "Tailwind CSS"],
    insights: {
      desafio: "Modelar agenda e atendimentos de forma simples para uso diário.",
      solucao: "Fluxos enxutos para cadastro, consulta e acompanhamento de horários.",
      resultado: "Base de produto pessoal pronta para evoluir web e mobile.",
    },
    evolucao: ["Modelagem de produto", "Fluxos web e mobile", "Arquitetura inicial full-stack"],
    conteudoTecnico: {
      stackDetalhada: ["React", "React Native", "TypeScript", "Node.js", "Tailwind CSS"],
      decisoesTecnicas: [
        "Modelo pensado para compartilhar regras entre painel e app.",
        "Separação inicial entre agenda, clientes e serviços.",
      ],
      desafiosExtras: ["Planejar evolução sem criar complexidade antes da validação do produto."],
    },
  },
]
