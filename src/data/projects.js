/**
 * Dados da secção Projetos.
 * Ordem: mais recente → mais antigo (índice 0 = mais recente).
 *
 * Campos neutros (ids, imagens, links, nomes próprios e stack) ficam na raiz;
 * tudo o que é texto corrido vive em `i18n[locale]`. Use `localizeProject`
 * (`@/lib/project-helpers`) para achatar um projeto no idioma ativo.
 */

/** @typedef {'profissional' | 'pessoal'} TipoProjeto */
/** @typedef {'web' | 'app' | 'sistema'} CategoriaProjeto */
/** @typedef {'en-us' | 'pt-br' | 'fr-fr'} Locale */

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
 * @typedef {Object} Metrica
 * @property {string} label
 * @property {string} valor
 */

/**
 * @typedef {Object} ProjetoTraduzido
 * @property {string} [destaque] Eyebrow para projeto em destaque
 * @property {string} [status] Badge de status (ex: "Delivered · in production")
 * @property {string} resumo
 * @property {string} descricao
 * @property {string} [descricaoResumida] Modo visual — texto mais curto
 * @property {Metrica[]} [metricas] Métricas de escala/impacto do projeto
 * @property {string[]} [responsabilidade] O que foi responsabilidade direta do dev
 * @property {InsightsProjeto} [insights]
 * @property {string[]} evolucao
 * @property {string[]} [decisoesTecnicas]
 * @property {string[]} [desafiosExtras]
 */

/**
 * @typedef {Object} Projeto
 * @property {string} id
 * @property {TipoProjeto} tipo
 * @property {CategoriaProjeto} categoria
 * @property {string} nome
 * @property {string} [logoEmpresa] Logo exibida antes do título do projeto
 * @property {string} [logoEmpresaBackground] Cor de fundo aplicada ao invólucro da logo
 * @property {boolean} [logoEmpresaSemPadding] Remove respiro interno quando o arquivo da logo já tem fundo
 * @property {PlataformasProjeto} plataformas
 * @property {string[]} tecnologias
 * @property {string[]} [stackDetalhada]
 * @property {string[] | { web?: string[], mobile?: string[] }} [previewImages]
 * @property {string} [figmaLink]
 * @property {Record<Locale, ProjetoTraduzido>} i18n
 */

/** @type {Projeto[]} */
export const MOCK_PROJECTS = [
  {
    id: "chaves-e-chaves",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Chaves & Chaves",
    logoEmpresa: "/assets/projects/cec-icon.png",
    plataformas: {
      web: { imagem: "/assets/projects/cec-1.png", link: "" },
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
    stackDetalhada: ["TypeScript", "React", "Next.js", "Node.js", "REST API", "Postman", "Tailwind CSS", "shadcn/ui"],
    i18n: {
      "en-us": {
        destaque: "Featured project — enterprise system",
        status: "Delivered · in production",
        resumo: "System for real estate management, client service and internal processes.",
        descricao:
          "The agency ran client service and internal processes on spreadsheets and WhatsApp, with no visibility into the sales funnel and no centralized customer history. The goal was to turn that into a real operational system.",
        descricaoResumida:
          "The agency ran client service on spreadsheets and WhatsApp. I built the complete front-end of the system that centralized operations, customer history and the sales funnel.",
        metricas: [
          { label: "Team", valor: "3 partners" },
          { label: "Scope", valor: "End to end" },
          { label: "Build", valor: "From scratch" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Project run by me and two partners, with no external staff — from signing the contract to production delivery",
          "Architecture and full front-end development — component structure, routing and navigation flows",
          "Integration with the REST API built by the back-end devs, including authentication and state handling",
          "UI/UX decisions — prototyping the main screens and validating them with the client during development",
          "Modules delivered: property registration, service dashboard, operational tracking and customer history",
        ],
        insights: {
          desafio: "A real estate agency with no visibility into its sales funnel — client service and customer history scattered across spreadsheets and WhatsApp.",
          solucao: "Complete front-end with modules split by domain (properties, client service, operations), integrated with the back-end REST API with authentication and consistent states.",
          resultado: "The system replaced manual control via spreadsheets and WhatsApp, centralizing customer history and the service funnel on a single platform. It is in daily use by the agency's team.",
        },
        evolucao: [
          "Front-end architecture for an enterprise system from scratch",
          "REST API integration and authentication flows",
          "UI/UX for information-dense systems",
        ],
        decisoesTecnicas: [
          "Modules split by domain (properties, client service, operations) so each area can evolve independently.",
          "Reusable components for forms and lists with centralized validation.",
          "Authentication integrated with session management and route protection on the front-end.",
        ],
        desafiosExtras: [
          "Keeping visual consistency on screens with a high density of operational information.",
          "Coordinating the API contract with back-end devs working in parallel.",
        ],
      },
      "pt-br": {
        destaque: "Projeto destaque — sistema empresarial",
        status: "Entregue · em produção",
        resumo: "Sistema para gestão imobiliária, atendimentos e processos internos.",
        descricao:
          "A imobiliária controlava atendimentos e processos internos por planilha e WhatsApp, sem visibilidade do funil de vendas nem histórico centralizado de clientes. O objetivo era transformar isso em um sistema operacional real.",
        descricaoResumida:
          "A imobiliária controlava atendimentos por planilha e WhatsApp. Desenvolvi o front-end completo do sistema que centralizou a operação, histórico de clientes e funil de vendas.",
        metricas: [
          { label: "Equipe", valor: "3 sócios" },
          { label: "Escopo", valor: "Ponta a ponta" },
          { label: "Construção", valor: "Do zero" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Projeto conduzido por mim e mais dois sócios, sem staff externo — do acerto de contrato à entrega em produção",
          "Arquitetura e desenvolvimento completo do front-end — estrutura de componentes, roteamento e fluxos de navegação",
          "Integração com API REST construída pelos devs back-end, incluindo autenticação e tratamento de estados",
          "Decisões de UI/UX — prototipagem das telas principais e validação com o cliente durante o desenvolvimento",
          "Módulos entregues: cadastro de imóveis, painel de atendimentos, acompanhamento operacional e histórico de clientes",
        ],
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
      "fr-fr": {
        destaque: "Projet phare — système d'entreprise",
        status: "Livré · en production",
        resumo: "Système de gestion immobilière, de suivi client et de processus internes.",
        descricao:
          "L'agence immobilière gérait le suivi client et les processus internes via tableurs et WhatsApp, sans visibilité sur le tunnel de vente ni historique client centralisé. L'objectif était d'en faire un véritable système opérationnel.",
        descricaoResumida:
          "L'agence gérait son suivi client via tableurs et WhatsApp. J'ai développé tout le front-end du système qui a centralisé l'opération, l'historique client et le tunnel de vente.",
        metricas: [
          { label: "Équipe", valor: "3 associés" },
          { label: "Périmètre", valor: "De bout en bout" },
          { label: "Construction", valor: "Depuis zéro" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Projet mené par moi et deux associés, sans équipe externe — du contrat à la mise en production",
          "Architecture et développement complet du front-end — structure des composants, routage et flux de navigation",
          "Intégration de l'API REST construite par les devs back-end, avec authentification et gestion des états",
          "Décisions UI/UX — prototypage des écrans principaux et validation avec le client pendant le développement",
          "Modules livrés : enregistrement des biens, tableau de suivi client, suivi opérationnel et historique client",
        ],
        insights: {
          desafio: "Agence immobilière sans visibilité sur son tunnel de vente — suivi client et historique dispersés entre tableurs et WhatsApp.",
          solucao: "Front-end complet avec des modules séparés par domaine (biens, suivi client, opérations), intégré à l'API REST du back-end avec authentification et états cohérents.",
          resultado: "Le système a remplacé le contrôle manuel par tableurs et WhatsApp, centralisant l'historique client et le tunnel de suivi sur une plateforme unique. Il est aujourd'hui utilisé au quotidien par l'équipe de l'agence.",
        },
        evolucao: [
          "Architecture front-end d'un système d'entreprise depuis zéro",
          "Intégration d'API REST et flux d'authentification",
          "UI/UX pour systèmes à forte densité d'information",
        ],
        decisoesTecnicas: [
          "Séparation des modules par domaine (biens, suivi client, opérations) pour faire évoluer chaque périmètre indépendamment.",
          "Composants réutilisables pour les formulaires et les listes, avec validation centralisée.",
          "Authentification intégrée avec gestion de session et protection des routes côté front-end.",
        ],
        desafiosExtras: [
          "Maintenir la cohérence visuelle sur des écrans à forte densité d'information opérationnelle.",
          "Coordonner le contrat d'API avec les devs back-end en développement parallèle.",
        ],
      },
    },
  },
  {
    id: "360erp",
    tipo: "profissional",
    categoria: "sistema",
    nome: "360erp",
    logoEmpresa: "/assets/projects/erp-icon.png",
    logoEmpresaSemPadding: true,
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
    stackDetalhada: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel", "React", "Flutter", "Dart", "MUI", "REST API"],
    i18n: {
      "en-us": {
        destaque: "Legacy ERP — web + mobile",
        status: "In production · active client base",
        resumo: "Full ERP with POS, service orders, e-commerce, tax, finance and logistics modules.",
        descricao:
          "Full ERP with POS, service orders, e-commerce, tax, finance and logistics modules — a legacy system in production with an active client base. I joined the front-end team, responsible for the evolutionary maintenance of the web interface and for the mobile app.",
        descricaoResumida:
          "I worked on the web front-end and was the main maintainer of the Flutter mobile app, evolving critical modules of a legacy ERP in production.",
        metricas: [
          { label: "Platform", valor: "Web + Mobile" },
          { label: "Role", valor: "Front-end" },
          { label: "Modules delivered", valor: "5" },
          { label: "System", valor: "Legacy ERP" },
        ],
        responsabilidade: [
          "Visual modernization of the web interface — reviewing existing pages and components for a more consistent, up-to-date UI",
          "Development of new modules: recurring plans, consignment, production module and sales flow",
          "Main maintainer of the Flutter mobile app — bug fixes, flow adjustments and production stability",
          "Working on a highly complex legacy system, shipping continuously without impacting existing features",
        ],
        insights: {
          desafio: "Evolving a legacy ERP with business-critical modules while keeping production stable on both web and the mobile app.",
          solucao: "Gradual modernization of the web UI, development of new modules and continuous maintenance of the Flutter app focused on fixes, flow and predictability.",
          resultado: "A system in active operation with several business-critical modules. Owning the mobile app meant reading existing code quickly, diagnosing production issues and shipping with zero tolerance for breaking end-user flows.",
        },
        evolucao: [
          "Evolutionary maintenance on a legacy system",
          "Flutter in a real product with active users",
          "Operation-oriented ERP interfaces",
        ],
        decisoesTecnicas: [
          "Incremental evolution of pages and components to modernize the UI without interrupting existing flows.",
          "Flutter app maintenance prioritizing stability, bug fixes and preserving production journeys.",
          "Modules organized by domain to handle POS, service orders, recurring plans, consignment, production and sales.",
        ],
        desafiosExtras: [
          "Reading and changing legacy code with heavy coupling between modules.",
          "Shipping production changes with low tolerance for regressions in operational flows.",
        ],
      },
      "pt-br": {
        destaque: "ERP legado — web + mobile",
        status: "Em produção · base ativa",
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
      "fr-fr": {
        destaque: "ERP legacy — web + mobile",
        status: "En production · base client active",
        resumo: "ERP complet avec modules PDV, ordres de service, e-commerce, fiscal, finance et logistique.",
        descricao:
          "ERP complet avec modules PDV, ordres de service, e-commerce, fiscal, finance et logistique — système legacy en production avec une base client active. J'ai rejoint l'équipe front-end, en charge de la maintenance évolutive de l'interface web et de l'app mobile.",
        descricaoResumida:
          "J'ai travaillé sur le front-end web et assuré la maintenance principale de l'app mobile en Flutter, en faisant évoluer des modules critiques d'un ERP legacy en production.",
        metricas: [
          { label: "Plateforme", valor: "Web + Mobile" },
          { label: "Rôle", valor: "Front-end" },
          { label: "Modules livrés", valor: "5" },
          { label: "Système", valor: "ERP legacy" },
        ],
        responsabilidade: [
          "Modernisation visuelle de l'interface web — révision des pages et composants existants pour une UI plus cohérente et actuelle",
          "Développement de nouveaux modules : plan de récurrence, consignation, module de production et flux de vente",
          "Maintenance principale de l'app mobile en Flutter — correction de bugs, ajustements de flux et stabilité en production",
          "Intervention sur un système legacy très complexe, avec livraison continue et sans impact sur les fonctionnalités existantes",
        ],
        insights: {
          desafio: "Faire évoluer un ERP legacy avec des modules critiques pour l'activité, tout en gardant la production stable sur le web et l'app mobile.",
          solucao: "Modernisation progressive de l'UI web, développement de nouveaux modules et maintenance continue de l'app Flutter, centrée sur les correctifs, le flux et la prévisibilité.",
          resultado: "Système en exploitation active avec plusieurs modules critiques. Être responsable principal de l'app mobile a exigé une lecture rapide du code existant, un diagnostic des problèmes en production et des livraisons sans aucune tolérance à la rupture des parcours utilisateurs.",
        },
        evolucao: [
          "Maintenance évolutive sur système legacy",
          "Flutter sur un produit réel avec des utilisateurs actifs",
          "Interfaces ERP orientées opération",
        ],
        decisoesTecnicas: [
          "Évolution incrémentale des pages et composants pour moderniser l'UI sans interrompre les flux existants.",
          "Maintenance de l'app Flutter en priorisant la stabilité, la correction de bugs et la préservation des parcours en production.",
          "Organisation des modules par domaine pour gérer PDV, ordres de service, récurrence, consignation, production et vente.",
        ],
        desafiosExtras: [
          "Lire et modifier du code legacy avec de fortes dépendances entre modules.",
          "Livrer des ajustements en production avec une faible tolérance aux régressions sur les flux opérationnels.",
        ],
      },
    },
  },
  {
    id: "levita-massagens",
    tipo: "profissional",
    categoria: "web",
    nome: "Levita Massagens",
    logoEmpresa: "/assets/projects/levita-icon.png",
    logoEmpresaBackground: "#2a4937",
    plataformas: {
      web: { imagem: "/assets/projects/levita-1.png", link: "" },
      mobile: { imagem: "", link: "" },
    },
    previewImages: ["/assets/projects/levita-1.png"],
    tecnologias: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    stackDetalhada: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    i18n: {
      "en-us": {
        destaque: "First international engagement — Lisbon",
        status: "Delivered · 7 business days",
        resumo: "Landing page to present services and capture contacts.",
        descricao:
          "A client in Lisbon was running on a website built in Canva — visually limited and with no structure to grow. I built a professional landing page with an architecture ready to scale, allowing future pages and modules such as booking and CRM to be added without refactoring.",
        descricaoResumida:
          "A client in Lisbon was running on a Canva-built website. I built a professional landing page with an architecture ready to scale, allowing future pages and modules without refactoring.",
        metricas: [
          { label: "Market", valor: "Portugal 🇵🇹" },
          { label: "Deadline", valor: "7 business days" },
          { label: "Revisions", valor: "2 rounds" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Complete project — from requirements gathering to delivery, including contract, client communication and deadline management",
          "Responsive layout for mobile and desktop, faithful to the brand's visual identity",
          "Project architecture structured to scale — new pages and modules such as booking and CRM without refactoring",
          "First international engagement — client in Lisbon, contract in euros, communication in European Portuguese",
        ],
        insights: {
          desafio: "Replace a Canva-built website with a professional digital presence, with a more consistent look and a structure ready to grow.",
          solucao: "Responsive landing page, faithful to the brand identity, with an architecture ready to take on new pages and modules without refactoring.",
          resultado: "Replaced a Canva site with a professional landing page delivered in 7 business days, with a technical structure ready to evolve as the business grows.",
        },
        evolucao: ["Copy for conversion", "Structuring landing pages", "Responsive design"],
        decisoesTecnicas: [
          "Architecture prepared for future expansion with new pages and modules, such as booking and CRM.",
          "Short sections for quick reading on mobile, staying faithful to the brand's visual identity.",
          "CTAs positioned to reduce friction on contact and support conversion.",
        ],
        desafiosExtras: [
          "Turning a limited Canva site into a professional landing page without losing the brand's welcoming tone.",
          "Handling contract, communication and international delivery with a client in Lisbon.",
        ],
      },
      "pt-br": {
        destaque: "Primeiro serviço internacional — Lisboa",
        status: "Entregue · 7 dias úteis",
        resumo: "Landing page para apresentação de serviços e captação de contatos.",
        descricao:
          "Cliente em Lisboa operava com site feito no Canva — limitado visualmente e sem estrutura para crescer. Desenvolvi uma landing page profissional com arquitetura preparada para escalar, permitindo adicionar páginas e módulos futuros como agendamento e CRM sem necessidade de refatoração.",
        descricaoResumida:
          "Cliente em Lisboa operava com site feito no Canva. Desenvolvi uma landing page profissional com arquitetura preparada para escalar, permitindo adicionar páginas e módulos futuros sem refatoração.",
        metricas: [
          { label: "Mercado", valor: "Portugal 🇵🇹" },
          { label: "Prazo", valor: "7 dias úteis" },
          { label: "Revisões", valor: "2 rodadas" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Projeto completo — do levantamento de requisitos à entrega, incluindo contrato, comunicação com o cliente e gestão de prazo",
          "Layout responsivo para mobile e desktop, fiel à identidade visual do negócio",
          "Arquitetura do projeto estruturada para escalar — novas páginas e módulos como agendamento e CRM sem refatoração",
          "Primeiro serviço internacional — cliente em Lisboa, contrato em euros, comunicação em português europeu",
        ],
        insights: {
          desafio: "Substituir um site feito no Canva por uma presença digital profissional, com visual mais consistente e estrutura pronta para crescimento.",
          solucao: "Landing page responsiva, fiel à identidade do negócio, com arquitetura preparada para receber novas páginas e módulos sem refatoração.",
          resultado: "Substituiu um site Canva por uma landing page profissional entregue em 7 dias úteis, com estrutura técnica preparada para evoluir conforme o negócio cresce.",
        },
        evolucao: ["Copy para conversão", "Estruturação de landing pages", "Design responsivo"],
        decisoesTecnicas: [
          "Arquitetura preparada para expansão futura com novas páginas e módulos, como agendamento e CRM.",
          "Seções curtas para leitura rápida em mobile, mantendo fidelidade à identidade visual do negócio.",
          "CTAs posicionados para reduzir atrito no contato e apoiar conversão.",
        ],
        desafiosExtras: [
          "Transformar um site Canva limitado em uma landing page profissional sem perder o tom acolhedor da marca.",
          "Conduzir contrato, comunicação e entrega internacional com cliente em Lisboa.",
        ],
      },
      "fr-fr": {
        destaque: "Première mission internationale — Lisbonne",
        status: "Livré · 7 jours ouvrés",
        resumo: "Landing page de présentation des services et de captation de contacts.",
        descricao:
          "Un client à Lisbonne fonctionnait avec un site fait sur Canva — visuellement limité et sans structure pour évoluer. J'ai développé une landing page professionnelle avec une architecture prête à évoluer, permettant d'ajouter des pages et modules futurs comme la réservation et le CRM sans refonte.",
        descricaoResumida:
          "Un client à Lisbonne fonctionnait avec un site fait sur Canva. J'ai développé une landing page professionnelle avec une architecture prête à évoluer, permettant d'ajouter des pages et modules futurs sans refonte.",
        metricas: [
          { label: "Marché", valor: "Portugal 🇵🇹" },
          { label: "Délai", valor: "7 jours ouvrés" },
          { label: "Révisions", valor: "2 tours" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Projet complet — du recueil des besoins à la livraison, contrat, communication client et gestion des délais inclus",
          "Mise en page responsive mobile et desktop, fidèle à l'identité visuelle de l'activité",
          "Architecture du projet structurée pour évoluer — nouvelles pages et modules comme la réservation et le CRM sans refonte",
          "Première mission internationale — client à Lisbonne, contrat en euros, communication en portugais européen",
        ],
        insights: {
          desafio: "Remplacer un site fait sur Canva par une présence numérique professionnelle, au visuel plus cohérent et à la structure prête pour la croissance.",
          solucao: "Landing page responsive, fidèle à l'identité de la marque, avec une architecture prête à accueillir de nouvelles pages et modules sans refonte.",
          resultado: "A remplacé un site Canva par une landing page professionnelle livrée en 7 jours ouvrés, avec une structure technique prête à évoluer avec l'activité.",
        },
        evolucao: ["Copy orientée conversion", "Structuration de landing pages", "Design responsive"],
        decisoesTecnicas: [
          "Architecture prête pour une expansion future avec de nouvelles pages et modules, comme la réservation et le CRM.",
          "Sections courtes pour une lecture rapide sur mobile, en restant fidèle à l'identité visuelle de l'activité.",
          "CTA placés pour réduire la friction au contact et soutenir la conversion.",
        ],
        desafiosExtras: [
          "Transformer un site Canva limité en landing page professionnelle sans perdre le ton chaleureux de la marque.",
          "Mener contrat, communication et livraison à l'international avec un client à Lisbonne.",
        ],
      },
    },
  },
  {
    id: "newline-persianas",
    tipo: "profissional",
    categoria: "web",
    nome: "NewLine Persianas",
    logoEmpresa: "/assets/projects/newline-icon.png",
    logoEmpresaSemPadding: true,
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
    stackDetalhada: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
    i18n: {
      "en-us": {
        destaque: "Commercial landing page — digital presence",
        status: "Delivered · from scratch",
        resumo: "Landing page for catalog, materials and quote requests.",
        descricao:
          "A blinds, curtains and awnings company in Curitiba and the surrounding region still had no concrete website to present its work. I created a landing page from scratch to organize products, maintenance services, applications, differentiators and quote channels into a clear digital presence, helping widen the brand's commercial reach.",
        descricaoResumida:
          "A company with no concrete website. I created a landing page from scratch to organize products, maintenance, applications and quote channels, widening the brand's digital presence.",
        metricas: [
          { label: "Build", valor: "From scratch" },
          { label: "Experience", valor: "25+ years" },
          { label: "Reach", valor: "PR + SC" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Complete landing page development — structure, layout, responsiveness and publishing the site",
          "Organizing institutional content to present products, maintenance, applications, differentiators and quotes in a single journey",
          "Creating a concrete digital presence for a company that had no structured website yet",
          "Focus on widening reach and easing first commercial contact through the form, WhatsApp and direct channels",
        ],
        insights: {
          desafio: "Create a concrete website for a company with a broad offering, gathering products, services and differentiators without turning the landing page into a heavy catalog.",
          solucao: "Landing page structure with lean visual blocks, clear hierarchy, sections for products, maintenance and applications, plus quote CTAs via form and WhatsApp.",
          resultado: "The company gained a professional digital presence to present its services, show its range of products and widen its commercial reach with new customers.",
        },
        evolucao: ["Commercial landing pages", "Catalog organization", "Responsive design"],
        decisoesTecnicas: [
          "Content split by purchase intent: products, maintenance, applications, differentiators and contact.",
          "Simple components to keep content easy to maintain and preserve visual performance.",
          "Quote CTAs distributed across the page without building a service automation that was out of the landing page's scope.",
        ],
        desafiosExtras: [
          "Turning a broad commercial offering into an objective page, without information overload.",
          "Balancing visual appeal and performance on product images.",
        ],
      },
      "pt-br": {
        destaque: "Landing page comercial — presença digital",
        status: "Entregue · do zero",
        resumo: "Landing page para catálogo, materiais e pedido de orçamento.",
        descricao:
          "Empresa de persianas, cortinas e toldos em Curitiba e região ainda não tinha um site concreto para apresentar sua atuação. Criei uma landing page do zero para organizar produtos, serviços de manutenção, aplicações, diferenciais e canais de orçamento em uma presença digital clara, ajudando a ampliar o alcance comercial da marca.",
        descricaoResumida:
          "Empresa sem site concreto. Criei uma landing page do zero para organizar produtos, manutenção, aplicações e canais de orçamento, ampliando a presença digital da marca.",
        metricas: [
          { label: "Construção", valor: "Do zero" },
          { label: "Experiência", valor: "25+ anos" },
          { label: "Alcance", valor: "PR + SC" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Desenvolvimento completo da landing page — estrutura, layout, responsividade e publicação do site",
          "Organização do conteúdo institucional para apresentar produtos, manutenção, aplicações, diferenciais e orçamento em uma jornada única",
          "Criação de uma presença digital concreta para uma empresa que ainda não tinha site estruturado",
          "Foco em ampliar alcance e facilitar o primeiro contato comercial por formulário, WhatsApp e canais diretos",
        ],
        insights: {
          desafio: "Criar um site concreto para uma empresa com atuação ampla, reunindo produtos, serviços e diferenciais sem transformar a landing page em um catálogo pesado.",
          solucao: "Estrutura de LP com blocos visuais enxutos, hierarquia clara, seções para produtos, manutenção, aplicações e CTAs de orçamento por formulário e WhatsApp.",
          resultado: "A empresa ganhou uma presença digital profissional para apresentar seus serviços, mostrar variedade de produtos e ampliar o alcance comercial junto a novos clientes.",
        },
        evolucao: ["Landing pages comerciais", "Organização de catálogo", "Design responsivo"],
        decisoesTecnicas: [
          "Conteúdo dividido por intenção de compra: produtos, manutenção, aplicações, diferenciais e contato.",
          "Componentes simples para facilitar manutenção do conteúdo e preservar performance visual.",
          "CTAs distribuídos para orçamento sem criar uma automação de serviço que não fazia parte do escopo da LP.",
        ],
        desafiosExtras: [
          "Transformar uma atuação comercial ampla em uma página objetiva, sem excesso de informação.",
          "Equilibrar apelo visual e performance em imagens de produto.",
        ],
      },
      "fr-fr": {
        destaque: "Landing page commerciale — présence numérique",
        status: "Livré · depuis zéro",
        resumo: "Landing page pour catalogue, matériaux et demande de devis.",
        descricao:
          "Une entreprise de stores, rideaux et bannes à Curitiba et sa région n'avait pas encore de site concret pour présenter son activité. J'ai créé une landing page depuis zéro pour organiser produits, services de maintenance, applications, atouts et canaux de devis en une présence numérique claire, aidant à élargir la portée commerciale de la marque.",
        descricaoResumida:
          "Entreprise sans site concret. J'ai créé une landing page depuis zéro pour organiser produits, maintenance, applications et canaux de devis, en élargissant la présence numérique de la marque.",
        metricas: [
          { label: "Construction", valor: "Depuis zéro" },
          { label: "Expérience", valor: "25+ ans" },
          { label: "Portée", valor: "PR + SC" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Développement complet de la landing page — structure, mise en page, responsive et mise en ligne du site",
          "Organisation du contenu institutionnel pour présenter produits, maintenance, applications, atouts et devis en un parcours unique",
          "Création d'une présence numérique concrète pour une entreprise qui n'avait pas encore de site structuré",
          "Objectif : élargir la portée et faciliter le premier contact commercial par formulaire, WhatsApp et canaux directs",
        ],
        insights: {
          desafio: "Créer un site concret pour une entreprise à l'activité large, en réunissant produits, services et atouts sans transformer la landing page en catalogue lourd.",
          solucao: "Structure de LP avec des blocs visuels épurés, une hiérarchie claire, des sections produits, maintenance, applications et des CTA de devis par formulaire et WhatsApp.",
          resultado: "L'entreprise a gagné une présence numérique professionnelle pour présenter ses services, montrer sa variété de produits et élargir sa portée commerciale auprès de nouveaux clients.",
        },
        evolucao: ["Landing pages commerciales", "Organisation de catalogue", "Design responsive"],
        decisoesTecnicas: [
          "Contenu découpé par intention d'achat : produits, maintenance, applications, atouts et contact.",
          "Composants simples pour faciliter la maintenance du contenu et préserver la performance visuelle.",
          "CTA de devis répartis sans créer une automatisation de service hors du périmètre de la LP.",
        ],
        desafiosExtras: [
          "Transformer une activité commerciale large en une page claire, sans excès d'information.",
          "Équilibrer impact visuel et performance sur les images produit.",
        ],
      },
    },
  },
  {
    id: "aprova-legal",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Aprova Legal",
    logoEmpresa: "/assets/projects/aprova-icon.png",
    logoEmpresaBackground: "#123d2a",
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
    stackDetalhada: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "PHP/Laravel"],
    i18n: {
      "en-us": {
        destaque: "Project — enterprise system",
        status: "Delivered · in production",
        resumo: "System for managing rental guarantees, contracts and tenant analysis.",
        descricao:
          "Aprova Legal ran its rental guarantee processes manually and in a fragmented way. I built the front-end of the internal system that digitized and centralized the whole flow — from tenant analysis to managing active contracts.",
        descricaoResumida:
          "I built the front-end of the internal system that centralized rental guarantees, tenant analysis and active contract management.",
        metricas: [
          { label: "Team", valor: "3 partners" },
          { label: "Scope", valor: "End to end" },
          { label: "Build", valor: "From scratch" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Project run by me and two partners, with no external staff — from signing the contract to production delivery",
          "Front-end development integrated with the Laravel back-end — registration screens, analysis flow and operations dashboard",
          "Building navigation flows and component structure inside the PHP/Laravel architecture",
          "Screens delivered: contract management, partner agency dashboard, tenant analysis flow and active guarantee tracking",
          "The project that preceded my move to decoupled architecture — a lesson that drove the use of REST APIs and TypeScript in later projects",
        ],
        insights: {
          desafio: "Rental guarantee processes still manual and fragmented, with tenant analysis, contracts and partner agencies lacking operational centralization.",
          solucao: "Front-end integrated with Laravel, with registration screens, analysis flow, contract management, agency dashboard and active guarantee tracking.",
          resultado: "System in production with more than 1,000 active contracts and 95+ partner real estate agencies, managing R$45 million in guaranteed capital. It digitized a formerly manual process, with 100% digital analysis and anti-fraud facial recognition.",
        },
        evolucao: ["Enterprise system flows", "Laravel in real applications", "Moving toward decoupled architecture"],
        decisoesTecnicas: [
          "Component and navigation structure built inside the existing PHP/Laravel architecture.",
          "Screens segmented by operational flow: tenant analysis, contracts, partner agencies and active guarantees.",
          "An experience that exposed the limits of a front-end coupled to Laravel and drove the adoption of REST APIs and TypeScript in later projects.",
        ],
        desafiosExtras: [
          "Centralizing rental guarantee processes that previously relied on manual steps.",
          "Keeping consistency across registration, analysis, tracking and operations screens.",
        ],
      },
      "pt-br": {
        destaque: "Projeto — sistema empresarial",
        status: "Entregue · em produção",
        resumo: "Sistema para gestão de garantias locatícias, contratos e análise de inquilinos.",
        descricao:
          "A Aprova Legal operava processos de garantia locatícia de forma manual e fragmentada. Desenvolvi o front-end do sistema interno que digitalizou e centralizou o fluxo completo — da análise de inquilino à gestão de contratos ativos.",
        descricaoResumida:
          "Desenvolvi o front-end do sistema interno que centralizou garantias locatícias, análise de inquilinos e gestão de contratos ativos.",
        metricas: [
          { label: "Equipe", valor: "3 sócios" },
          { label: "Escopo", valor: "Ponta a ponta" },
          { label: "Construção", valor: "Do zero" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Projeto conduzido por mim e mais dois sócios, sem staff externo — do acerto de contrato à entrega em produção",
          "Desenvolvimento do front-end integrado ao back-end Laravel — interfaces de cadastro, fluxo de análise e painel operacional",
          "Construção dos fluxos de navegação e estrutura de componentes dentro da arquitetura PHP/Laravel",
          "Telas entregues: gestão de contratos, painel de imobiliárias parceiras, fluxo de análise de inquilino e acompanhamento de garantias ativas",
          "Projeto que antecedeu minha especialização em arquitetura desacoplada — aprendizado que direcionou o uso de API REST e TypeScript nos projetos seguintes",
        ],
        insights: {
          desafio: "Processos de garantia locatícia ainda manuais e fragmentados, com análise de inquilinos, contratos e imobiliárias parceiras sem centralização operacional.",
          solucao: "Front-end integrado ao Laravel, com telas de cadastro, fluxo de análise, gestão de contratos, painel de imobiliárias e acompanhamento de garantias ativas.",
          resultado: "Sistema em produção com mais de 1.000 contratos ativos e 95+ imobiliárias parceiras, gerenciando R$45 milhões em capital garantido. Digitalizou um processo antes manual, com análise 100% digital e reconhecimento facial antifraude.",
        },
        evolucao: ["Fluxos de sistema empresarial", "Laravel em aplicações reais", "Evolução para arquitetura desacoplada"],
        decisoesTecnicas: [
          "Estrutura de componentes e navegação construída dentro da arquitetura PHP/Laravel existente.",
          "Telas segmentadas por fluxo operacional: análise de inquilino, contratos, imobiliárias parceiras e garantias ativas.",
          "Experiência que evidenciou os limites do front-end acoplado ao Laravel e direcionou a adoção de API REST e TypeScript nos projetos seguintes.",
        ],
        desafiosExtras: [
          "Centralizar processos de garantia locatícia que antes dependiam de etapas manuais.",
          "Manter consistência em telas de cadastro, análise, acompanhamento e painel operacional.",
        ],
      },
      "fr-fr": {
        destaque: "Projet — système d'entreprise",
        status: "Livré · en production",
        resumo: "Système de gestion des garanties locatives, des contrats et de l'analyse des locataires.",
        descricao:
          "Aprova Legal gérait ses processus de garantie locative de façon manuelle et fragmentée. J'ai développé le front-end du système interne qui a numérisé et centralisé tout le flux — de l'analyse du locataire à la gestion des contrats actifs.",
        descricaoResumida:
          "J'ai développé le front-end du système interne qui a centralisé les garanties locatives, l'analyse des locataires et la gestion des contrats actifs.",
        metricas: [
          { label: "Équipe", valor: "3 associés" },
          { label: "Périmètre", valor: "De bout en bout" },
          { label: "Construction", valor: "Depuis zéro" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Projet mené par moi et deux associés, sans équipe externe — du contrat à la mise en production",
          "Développement du front-end intégré au back-end Laravel — interfaces d'enregistrement, flux d'analyse et tableau de bord opérationnel",
          "Construction des flux de navigation et de la structure de composants au sein de l'architecture PHP/Laravel",
          "Écrans livrés : gestion des contrats, tableau des agences partenaires, flux d'analyse des locataires et suivi des garanties actives",
          "Projet qui a précédé ma spécialisation en architecture découplée — un apprentissage qui a orienté l'usage d'API REST et de TypeScript sur les projets suivants",
        ],
        insights: {
          desafio: "Des processus de garantie locative encore manuels et fragmentés, avec analyse des locataires, contrats et agences partenaires sans centralisation opérationnelle.",
          solucao: "Front-end intégré à Laravel, avec écrans d'enregistrement, flux d'analyse, gestion des contrats, tableau des agences et suivi des garanties actives.",
          resultado: "Système en production avec plus de 1 000 contrats actifs et 95+ agences immobilières partenaires, gérant 45 millions R$ de capital garanti. Il a numérisé un processus auparavant manuel, avec une analyse 100 % digitale et une reconnaissance faciale antifraude.",
        },
        evolucao: ["Flux de systèmes d'entreprise", "Laravel sur des applications réelles", "Évolution vers une architecture découplée"],
        decisoesTecnicas: [
          "Structure de composants et navigation construites au sein de l'architecture PHP/Laravel existante.",
          "Écrans segmentés par flux opérationnel : analyse du locataire, contrats, agences partenaires et garanties actives.",
          "Une expérience qui a révélé les limites d'un front-end couplé à Laravel et orienté l'adoption d'API REST et de TypeScript ensuite.",
        ],
        desafiosExtras: [
          "Centraliser des processus de garantie locative qui dépendaient d'étapes manuelles.",
          "Maintenir la cohérence entre écrans d'enregistrement, d'analyse, de suivi et tableau opérationnel.",
        ],
      },
    },
  },
  {
    id: "lunarbot",
    tipo: "profissional",
    categoria: "sistema",
    nome: "LunarBot.io",
    logoEmpresa: "/assets/projects/lunar-icon.png",
    logoEmpresaBackground: "#050505",
    plataformas: {
      web: { imagem: "/assets/projects/lunar.png", link: "https://lunarbot.com.br/" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["HTML5 & CSS3", "Bootstrap", "JavaScript", "Laravel (PHP)", "Postman", "Figma"],
    stackDetalhada: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "PHP/Laravel", "Postman", "Figma"],
    figmaLink: "https://www.figma.com/design/0gHgezIDrlEidd1cYQymAY/lunarbot?node-id=8-134&t=9CtnBgcuyuGNeN0I-0",
    i18n: {
      "en-us": {
        destaque: "System",
        status: "First year in the field",
        resumo: "Admin system for a Telegram-based sales platform.",
        descricao:
          "A Telegram sales startup needed an admin dashboard to manage bots, users, groups, commands and operational metrics. The first dashboard system I built — delivered within the stack limitations of my first year as a front-end dev.",
        descricaoResumida:
          "The first admin dashboard I built: a panel for bots, users, groups, commands and operational metrics of a Telegram sales startup.",
        metricas: [
          { label: "Team", valor: "3 devs" },
          { label: "Build", valor: "From scratch" },
          { label: "Context", valor: "Startup" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Complete front-end development of the admin panel — no modern framework, with plain HTML, CSS and JavaScript",
          "Building reusable components with manual state handling, without React or an equivalent library",
          "Admin sections split by responsibility: users, groups, commands, logs, statistics and settings",
          "Integration with the Laravel back-end and UTM tracking scripts to follow campaigns between sales pages and the bot",
        ],
        insights: {
          desafio: "A Telegram sales startup needed to centralize bots, users, groups, commands and metrics in an admin panel built on a limited stack.",
          solucao: "Complete front-end in plain HTML, CSS and JavaScript, with reusable components, manual state handling and integration with the Laravel back-end.",
          resultado: "A working system shipped to production for a live startup. Building a dashboard without a modern framework demanded real command of plain CSS and JS — the technical base that solidified my understanding of state, components and interaction before moving to React.",
        },
        evolucao: ["Dashboard without a modern framework", "Integration with a Laravel back-end", "Fundamentals of state and components"],
        decisoesTecnicas: [
          "Reusable components built without React, with state and interactions handled in plain JavaScript.",
          "Admin sections split by responsibility: users, groups, commands, logs, statistics and settings.",
          "UTM tracking scripts to connect campaigns, sales pages and the bot flow.",
        ],
        desafiosExtras: [
          "Building a working dashboard within the technical limits of my first year in the field.",
          "Connecting the startup's operational data with a simple interface for daily administration.",
        ],
      },
      "pt-br": {
        destaque: "Sistema",
        status: "Primeiro ano de carreira",
        resumo: "Sistema administrativo para plataforma de vendas via Telegram.",
        descricao:
          "Startup de vendas via Telegram precisava de um painel administrativo para gerenciar bots, usuários, grupos, comandos e métricas operacionais. Primeiro sistema com dashboard que desenvolvi — entregue dentro das limitações de stack do meu primeiro ano como dev front-end.",
        descricaoResumida:
          "Primeiro dashboard administrativo que desenvolvi: painel para bots, usuários, grupos, comandos e métricas operacionais de uma startup de vendas via Telegram.",
        metricas: [
          { label: "Equipe", valor: "3 devs" },
          { label: "Construção", valor: "Do zero" },
          { label: "Contexto", valor: "Startup" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Desenvolvimento do front-end completo do painel administrativo — sem framework moderno, com HTML, CSS e JavaScript puros",
          "Construção de componentes reutilizáveis com controle de estados manual, sem React ou biblioteca equivalente",
          "Seções administrativas separadas por responsabilidade: usuários, grupos, comandos, logs, estatísticas e configurações",
          "Integração com back-end Laravel e implementação de scripts de tracking UTM para rastreamento de campanhas entre páginas de venda e o bot",
        ],
        insights: {
          desafio: "Startup de vendas via Telegram precisava centralizar bots, usuários, grupos, comandos e métricas em um painel administrativo construído com uma stack limitada.",
          solucao: "Front-end completo em HTML, CSS e JavaScript puros, com componentes reutilizáveis, controle de estados manual e integração ao back-end Laravel.",
          resultado: "Sistema funcional entregue em produção para uma startup em operação. Construir dashboard sem framework moderno exigiu domínio real de CSS e JS puros — base técnica que consolidou meu entendimento de estado, componentes e interação antes de migrar para React.",
        },
        evolucao: ["Dashboard sem framework moderno", "Integração com back-end Laravel", "Fundamentos de estado e componentes"],
        decisoesTecnicas: [
          "Componentes reutilizáveis construídos sem React, com controle de estados e interações em JavaScript puro.",
          "Seções administrativas separadas por responsabilidade: usuários, grupos, comandos, logs, estatísticas e configurações.",
          "Scripts de tracking UTM para conectar campanhas, páginas de venda e fluxo do bot.",
        ],
        desafiosExtras: [
          "Construir um dashboard funcional dentro das limitações técnicas do primeiro ano de carreira.",
          "Conectar informação operacional da startup com uma interface simples para administração diária.",
        ],
      },
      "fr-fr": {
        destaque: "Système",
        status: "Première année de carrière",
        resumo: "Système administratif pour une plateforme de vente via Telegram.",
        descricao:
          "Une startup de vente via Telegram avait besoin d'un panneau d'administration pour gérer bots, utilisateurs, groupes, commandes et métriques opérationnelles. Premier système avec tableau de bord que j'ai développé — livré avec les limites de stack de ma première année en tant que dev front-end.",
        descricaoResumida:
          "Premier tableau de bord administratif que j'ai développé : panneau pour bots, utilisateurs, groupes, commandes et métriques opérationnelles d'une startup de vente via Telegram.",
        metricas: [
          { label: "Équipe", valor: "3 devs" },
          { label: "Construction", valor: "Depuis zéro" },
          { label: "Contexte", valor: "Startup" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Développement complet du front-end du panneau d'administration — sans framework moderne, en HTML, CSS et JavaScript purs",
          "Construction de composants réutilisables avec gestion manuelle des états, sans React ni bibliothèque équivalente",
          "Sections d'administration séparées par responsabilité : utilisateurs, groupes, commandes, logs, statistiques et configurations",
          "Intégration au back-end Laravel et scripts de tracking UTM pour suivre les campagnes entre pages de vente et bot",
        ],
        insights: {
          desafio: "Une startup de vente via Telegram devait centraliser bots, utilisateurs, groupes, commandes et métriques dans un panneau d'administration construit avec une stack limitée.",
          solucao: "Front-end complet en HTML, CSS et JavaScript purs, avec composants réutilisables, gestion manuelle des états et intégration au back-end Laravel.",
          resultado: "Système fonctionnel livré en production pour une startup en activité. Construire un tableau de bord sans framework moderne a exigé une vraie maîtrise du CSS et du JS purs — la base technique qui a consolidé ma compréhension de l'état, des composants et de l'interaction avant de passer à React.",
        },
        evolucao: ["Tableau de bord sans framework moderne", "Intégration avec un back-end Laravel", "Fondamentaux de l'état et des composants"],
        decisoesTecnicas: [
          "Composants réutilisables construits sans React, avec états et interactions en JavaScript pur.",
          "Sections d'administration séparées par responsabilité : utilisateurs, groupes, commandes, logs, statistiques et configurations.",
          "Scripts de tracking UTM pour relier campagnes, pages de vente et flux du bot.",
        ],
        desafiosExtras: [
          "Construire un tableau de bord fonctionnel avec les limites techniques de la première année de carrière.",
          "Relier l'information opérationnelle de la startup à une interface simple pour l'administration quotidienne.",
        ],
      },
    },
  },
  {
    id: "salon",
    tipo: "pessoal",
    categoria: "sistema",
    nome: "Salon",
    plataformas: {
      web: { imagem: "", link: "" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["React", "React Native", "TypeScript", "Node.js", "Tailwind CSS"],
    stackDetalhada: ["React", "React Native", "TypeScript", "Node.js", "Tailwind CSS"],
    i18n: {
      "en-us": {
        resumo: "System and app for managing appointments, schedule and clients.",
        descricao:
          "Personal project for salon management, focused on schedule, clients, services, appointments and an experience that can grow between a web dashboard and a mobile app.",
        descricaoResumida:
          "System and app for a salon's schedule, clients, services and appointments.",
        insights: {
          desafio: "Model schedule and appointments simply enough for daily use.",
          solucao: "Lean flows to create, look up and follow appointment slots.",
          resultado: "A personal product base ready to evolve on web and mobile.",
        },
        evolucao: ["Product modeling", "Web and mobile flows", "Initial full-stack architecture"],
        decisoesTecnicas: [
          "A model designed to share rules between dashboard and app.",
          "Initial separation between schedule, clients and services.",
        ],
        desafiosExtras: ["Planning growth without adding complexity before the product is validated."],
      },
      "pt-br": {
        resumo: "Sistema e app para gestão de atendimentos, agenda e clientes.",
        descricao:
          "Projeto pessoal para gestão de salão, com foco em agenda, clientes, serviços, atendimentos e uma experiência que pode evoluir entre painel web e app mobile.",
        descricaoResumida:
          "Sistema e app para agenda, clientes, serviços e atendimentos de salão.",
        insights: {
          desafio: "Modelar agenda e atendimentos de forma simples para uso diário.",
          solucao: "Fluxos enxutos para cadastro, consulta e acompanhamento de horários.",
          resultado: "Base de produto pessoal pronta para evoluir web e mobile.",
        },
        evolucao: ["Modelagem de produto", "Fluxos web e mobile", "Arquitetura inicial full-stack"],
        decisoesTecnicas: [
          "Modelo pensado para compartilhar regras entre painel e app.",
          "Separação inicial entre agenda, clientes e serviços.",
        ],
        desafiosExtras: ["Planejar evolução sem criar complexidade antes da validação do produto."],
      },
      "fr-fr": {
        resumo: "Système et app de gestion des rendez-vous, de l'agenda et des clients.",
        descricao:
          "Projet personnel de gestion de salon, axé sur l'agenda, les clients, les services, les rendez-vous et une expérience pouvant évoluer entre panneau web et app mobile.",
        descricaoResumida:
          "Système et app pour l'agenda, les clients, les services et les rendez-vous d'un salon.",
        insights: {
          desafio: "Modéliser agenda et rendez-vous de façon simple pour un usage quotidien.",
          solucao: "Flux épurés pour créer, consulter et suivre les créneaux.",
          resultado: "Base de produit personnel prête à évoluer sur web et mobile.",
        },
        evolucao: ["Modélisation de produit", "Flux web et mobile", "Architecture full-stack initiale"],
        decisoesTecnicas: [
          "Modèle pensé pour partager les règles entre panneau et app.",
          "Séparation initiale entre agenda, clients et services.",
        ],
        desafiosExtras: ["Planifier l'évolution sans créer de complexité avant la validation du produit."],
      },
    },
  },
]
