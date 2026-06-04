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
 * @typedef {Object} Projeto
 * @property {string} id
 * @property {TipoProjeto} tipo
 * @property {CategoriaProjeto} categoria
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
    nome: "Chaves & Chaves",
    resumo: "Sistema para gestão imobiliária, atendimentos e processos internos.",
    descricao:
      "Sistema web para apoiar rotinas imobiliárias, centralizando cadastros, atendimentos, etapas de negociação e acompanhamento operacional em uma interface mais clara para a equipe.",
    descricaoResumida:
      "Sistema imobiliário para centralizar cadastros, atendimentos e acompanhamento operacional.",
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
    tecnologias: ["TypeScript", "React", "Next.js", "Node.js", "Postman", "Tailwind CSS", "shadcn/ui"],
    insights: {
      desafio: "Organizar fluxos internos com muitas informações espalhadas.",
      solucao: "Interface por módulos, estados claros e cadastros com validação.",
      resultado: "Rotina mais previsível e dados mais fáceis de acompanhar.",
    },
    evolucao: ["Organização de fluxos administrativos", "Componentização de telas de sistema"],
    conteudoTecnico: {
      stackDetalhada: ["TypeScript", "React", "Next.js", "Node.js", "Postman", "Tailwind CSS", "shadcn/ui"],
      decisoesTecnicas: [
        "Separação de módulos para facilitar evolução por área do sistema.",
        "Componentes reutilizáveis para formulários e listagens.",
      ],
      desafiosExtras: ["Manter consistência visual em telas com alta densidade de informação."],
    },
  },
  {
    id: "360erp",
    tipo: "profissional",
    categoria: "sistema",
    nome: "360erp",
    resumo: "Sistema e app para operações, financeiro, estoque e vendas.",
    descricao:
      "ERP web e mobile que conecta rotinas operacionais, módulos financeiros, estoque, vendas e acompanhamento de processos internos com foco em consistência e usabilidade.",
    descricaoResumida:
      "ERP web e mobile para centralizar operações, financeiro, estoque e vendas.",
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
    tecnologias: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel", "React", "Flutter", "Dart", "MUI"],
    insights: {
      desafio: "Conectar módulos diferentes sem perder clareza de navegação.",
      solucao: "Fluxos organizados por domínio, componentes reutilizáveis e estados consistentes.",
      resultado: "Experiência mais fluida para tarefas recorrentes de operação.",
    },
    evolucao: ["Visão de produto ERP", "Integração entre web e mobile", "Interfaces orientadas a operação"],
    conteudoTecnico: {
      stackDetalhada: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel", "React", "Flutter", "Dart", "MUI"],
      decisoesTecnicas: [
        "Componentes compartilhados para manter consistência entre módulos.",
        "Estados de carregamento e vazio tratados por fluxo.",
      ],
      desafiosExtras: ["Equilibrar densidade de informação com legibilidade em telas administrativas."],
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
      web: { imagem: "", link: "" },
      mobile: { imagem: "", link: "" },
    },
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
