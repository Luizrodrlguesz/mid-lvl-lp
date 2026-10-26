/**
 * Dados da secção Projetos.
 * Ordem: mais recente → mais antigo (índice 0 = mais recente).
 *
 * Campos neutros (ids, imagens, links, nomes próprios e stack) ficam na raiz;
 * tudo o que é texto corrido vive em `i18n[locale]`. Use `localizeProject`
 * (`@/lib/project-helpers`) para achatar um projeto no idioma ativo.
 */

/** @typedef {'profissional' | 'pessoal'} TipoProjeto */
/** @typedef {'web' | 'app' | 'sistema' | 'lp'} CategoriaProjeto */
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
 * @property {string | { light: string, dark: string }} [logoEmpresaTint] Cor do vidro do card no carrossel (uma ou uma por tema), quando deve ser outra que não o fundo da logo
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
  // ── Landing pages (Haber Solutions, out/2026). Esboço a partir dos repositórios
  // nauta-lp e pmax-lp: textos e números para revisar; links vazios até os domínios irem ao ar.
  {
    id: "nauta",
    tipo: "profissional",
    categoria: "lp",
    nome: "Nauta Marketing",
    logoEmpresa: "/assets/projects/nauta-icon.svg",
    logoEmpresaBackground: "#0d2b45",
    plataformas: {
      web: { imagem: "/assets/projects/nauta-web.jpg", link: "" },
    },
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    stackDetalhada: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Lenis", "Number Flow"],
    i18n: {
      "en-us": {
        destaque: "Landing page",
        status: "In development",
        resumo: "Landing page for a marketing agency serving businesses on the Paraná coast.",
        descricao: "Static landing page for Nauta Marketing, an agency focused on businesses on the Paraná coast (inns, restaurants, tours, beach clubs). The copy is built around seasonality: be found, remembered and chosen in high season. The lead form opens WhatsApp with the message already written, with no back-end.",
        descricaoResumida: "Marketing agency LP for the Paraná coast: seasonal copy, case studies and a lead form that opens WhatsApp with the message ready.",
        metricas: [
          { label: "Type", valor: "Landing page" },
          { label: "Lead capture", valor: "Form → WhatsApp" },
          { label: "Back-end", valor: "None (static)" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Layout and front-end of every section, from hero to FAQ",
          "Lead form with goal and budget that builds the WhatsApp message",
          "Vector logo that adapts to light and dark backgrounds",
          "All copy centralized in one file, with the reasoning behind each block documented",
        ],
        insights: {
          desafio: "Convince coastal businesses to invest in marketing in the low season, not only in January.",
          solucao: "Copy organized around the season cycle, real-world case blocks (inn, restaurant, tours) and a one-minute form that continues on WhatsApp.",
          resultado: "A fast, static page that turns visits into qualified WhatsApp conversations.",
        },
        evolucao: ["Conversion-oriented copywriting", "Static lead capture without a back-end", "Motion and smooth scrolling with performance in mind"],
      },
      "pt-br": {
        destaque: "Landing page",
        status: "Em desenvolvimento",
        resumo: "Landing page de uma agência de marketing para empresas do litoral do Paraná.",
        descricao: "Landing page estática da Nauta Marketing, agência focada em empresas do litoral do Paraná (pousadas, restaurantes, passeios, beach clubs). A copy gira em torno da sazonalidade: ser encontrada, lembrada e escolhida na alta temporada. O formulário de lead abre o WhatsApp com a mensagem pronta, sem back-end.",
        descricaoResumida: "LP de agência de marketing do litoral do Paraná: copy sazonal, cases e um formulário que abre o WhatsApp com a mensagem pronta.",
        metricas: [
          { label: "Tipo", valor: "Landing page" },
          { label: "Captação", valor: "Formulário → WhatsApp" },
          { label: "Back-end", valor: "Nenhum (estática)" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Layout e front-end de todas as seções, do hero ao FAQ",
          "Formulário de lead com objetivo e verba que monta a mensagem do WhatsApp",
          "Logo vetorial que se adapta a fundo claro e escuro",
          "Toda a copy centralizada num arquivo, com a lógica de cada bloco documentada",
        ],
        insights: {
          desafio: "Convencer empresas do litoral a investir em marketing na baixa temporada, e não só em janeiro.",
          solucao: "Copy organizada pelo ciclo da temporada, blocos de cases reais (pousada, restaurante, passeios) e um formulário de um minuto que continua no WhatsApp.",
          resultado: "Uma página rápida e estática que transforma visita em conversa qualificada no WhatsApp.",
        },
        evolucao: ["Copywriting orientado a conversão", "Captação de leads sem back-end", "Animação e scroll suave sem perder performance"],
      },
      "fr-fr": {
        destaque: "Landing page",
        status: "En développement",
        resumo: "Landing page d’une agence marketing pour les entreprises du littoral du Paraná.",
        descricao: "Landing page statique de Nauta Marketing, agence tournée vers les entreprises du littoral du Paraná (pousadas, restaurants, excursions, beach clubs). Le texte s’articule autour de la saisonnalité : être trouvé, mémorisé et choisi en haute saison. Le formulaire ouvre WhatsApp avec le message déjà rédigé, sans back-end.",
        descricaoResumida: "LP d’agence marketing du littoral du Paraná : texte saisonnier, études de cas et formulaire qui ouvre WhatsApp avec le message prêt.",
        metricas: [
          { label: "Type", valor: "Landing page" },
          { label: "Captation", valor: "Formulaire → WhatsApp" },
          { label: "Back-end", valor: "Aucun (statique)" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Mise en page et front-end de toutes les sections, du hero à la FAQ",
          "Formulaire de lead avec objectif et budget qui compose le message WhatsApp",
          "Logo vectoriel adapté aux fonds clairs et sombres",
          "Tout le texte centralisé dans un fichier, avec la logique de chaque bloc documentée",
        ],
        insights: {
          desafio: "Convaincre les entreprises du littoral d’investir dans le marketing en basse saison, pas seulement en janvier.",
          solucao: "Un texte organisé selon le cycle de la saison, des blocs de cas réels (pousada, restaurant, excursions) et un formulaire d’une minute qui continue sur WhatsApp.",
          resultado: "Une page rapide et statique qui transforme les visites en conversations qualifiées sur WhatsApp.",
        },
        evolucao: ["Copywriting orienté conversion", "Captation de leads sans back-end", "Animations et défilement fluide sans perdre en performance"],
      },
    },
  },
  {
    id: "pmax",
    tipo: "profissional",
    categoria: "lp",
    nome: "Pmax Digital",
    logoEmpresa: "/assets/projects/pmax-icon.svg",
    logoEmpresaBackground: "#12172a",
    logoEmpresaTint: { light: "#c51617", dark: "#5c1312" },
    plataformas: {
      web: { imagem: "/assets/projects/pmax-web.jpg", link: "" },
    },
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    stackDetalhada: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Lenis", "Number Flow"],
    i18n: {
      "en-us": {
        destaque: "Landing page",
        status: "In development",
        resumo: "Landing page for a paid-traffic agency in Curitiba.",
        descricao: "Landing page for Pmax Digital, a paid-traffic agency in Curitiba (Google, Instagram and TikTok ads). The visual identity comes straight from the client's brandbook: the stylized red P, hashtags and broken words of the stickers. The page is built to sell a diagnosis: a short form that continues on WhatsApp.",
        descricaoResumida: "Paid-traffic agency LP in Curitiba: brandbook identity, segments served, the process week by week and a diagnosis form that opens WhatsApp.",
        metricas: [
          { label: "Type", valor: "Landing page" },
          { label: "Lead capture", valor: "Diagnosis → WhatsApp" },
          { label: "Identity", valor: "Client brandbook" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Layout and front-end of every section, from the hero to the FAQ",
          "Logo, seal and hashtags rebuilt as vectors from the brandbook",
          "Diagnosis form with segment and ad budget that builds the WhatsApp message",
          "All copy centralized in one file, with the reasoning behind each block documented",
        ],
        insights: {
          desafio: "Translate a printed brandbook into a page that sells paid traffic to local businesses without jargon.",
          solucao: "Brand elements turned into reusable components, copy focused on clients instead of likes, and a step-by-step view of how the work goes.",
          resultado: "A page faithful to the brand that leads straight to a diagnosis conversation on WhatsApp.",
        },
        evolucao: ["Turning a brandbook into components", "Conversion-oriented copywriting", "Motion and smooth scrolling with performance in mind"],
      },
      "pt-br": {
        destaque: "Landing page",
        status: "Em desenvolvimento",
        resumo: "Landing page de uma agência de tráfego pago de Curitiba.",
        descricao: "Landing page da Pmax Digital, agência de tráfego pago de Curitiba (anúncios no Google, Instagram e TikTok). A identidade visual vem direto do brandbook do cliente: o P estilizado em vermelho, as hashtags e as palavras quebradas dos adesivos. A página é pensada para vender um diagnóstico: um formulário curto que continua no WhatsApp.",
        descricaoResumida: "LP de agência de tráfego pago de Curitiba: identidade do brandbook, segmentos atendidos, o processo semana a semana e um formulário de diagnóstico que abre o WhatsApp.",
        metricas: [
          { label: "Tipo", valor: "Landing page" },
          { label: "Captação", valor: "Diagnóstico → WhatsApp" },
          { label: "Identidade", valor: "Brandbook do cliente" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Layout e front-end de todas as seções, do hero ao FAQ",
          "Logo, selo e hashtags refeitos em vetor a partir do brandbook",
          "Formulário de diagnóstico com segmento e verba que monta a mensagem do WhatsApp",
          "Toda a copy centralizada num arquivo, com a lógica de cada bloco documentada",
        ],
        insights: {
          desafio: "Levar um brandbook impresso para uma página que vende tráfego pago para negócios locais, sem jargão.",
          solucao: "Elementos da marca virando componentes reutilizáveis, copy focada em cliente e não em curtida, e o passo a passo de como o trabalho acontece.",
          resultado: "Uma página fiel à marca que leva direto para uma conversa de diagnóstico no WhatsApp.",
        },
        evolucao: ["Brandbook transformado em componentes", "Copywriting orientado a conversão", "Animação e scroll suave sem perder performance"],
      },
      "fr-fr": {
        destaque: "Landing page",
        status: "En développement",
        resumo: "Landing page d’une agence de publicité payante à Curitiba.",
        descricao: "Landing page de Pmax Digital, agence de publicité payante à Curitiba (annonces Google, Instagram et TikTok). L’identité visuelle vient directement du brandbook du client : le P stylisé en rouge, les hashtags et les mots coupés des autocollants. La page est pensée pour vendre un diagnostic : un formulaire court qui continue sur WhatsApp.",
        descricaoResumida: "LP d’agence de publicité payante à Curitiba : identité du brandbook, secteurs servis, le processus semaine par semaine et un formulaire de diagnostic qui ouvre WhatsApp.",
        metricas: [
          { label: "Type", valor: "Landing page" },
          { label: "Captation", valor: "Diagnostic → WhatsApp" },
          { label: "Identité", valor: "Brandbook du client" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Mise en page et front-end de toutes les sections, du hero à la FAQ",
          "Logo, sceau et hashtags redessinés en vectoriel à partir du brandbook",
          "Formulaire de diagnostic avec secteur et budget qui compose le message WhatsApp",
          "Tout le texte centralisé dans un fichier, avec la logique de chaque bloc documentée",
        ],
        insights: {
          desafio: "Transposer un brandbook imprimé en une page qui vend de la publicité payante aux commerces locaux, sans jargon.",
          solucao: "Des éléments de marque devenus composants réutilisables, un texte centré sur les clients plutôt que sur les likes, et le déroulé du travail étape par étape.",
          resultado: "Une page fidèle à la marque qui mène directement à une conversation de diagnostic sur WhatsApp.",
        },
        evolucao: ["Brandbook transformé en composants", "Copywriting orienté conversion", "Animations et défilement fluide sans perdre en performance"],
      },
    },
  },
  // ── Projetos adicionados a partir dos repositórios em ~/desenvolvimento/trabalho.
  // Esboço: textos tirados da documentação de cada projeto; sem prints ainda (imagem vazia).
  {
    id: "iarthquake",
    tipo: "profissional",
    categoria: "sistema",
    nome: "IArthquake",
    logoEmpresa: "/assets/projects/iarthquake-icon.svg",
    logoEmpresaBackground: "#131211",
    plataformas: {
      web: { imagem: "", link: "https://coderevive.shop/" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    stackDetalhada: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Docker"],
    i18n: {
      "en-us": {
        destaque: "AI SaaS",
        status: "In development",
        resumo: "Multi-tenant platform to create, train and publish AI agents.",
        descricao: "SaaS for building, training, testing and publishing AI agents that serve customers and integrate with companies' internal systems (ERP, CRM, scheduling, e-commerce), without the user having to understand LLMs, prompts or APIs. It is also the single AI brain behind Zapflow.",
        descricaoResumida: "AI agent studio: create, train, test and publish agents integrated with ERP, CRM and other systems, and the AI brain behind Zapflow.",
        metricas: [
          { label: "Model", valor: "Multi-tenant SaaS" },
          { label: "Role", valor: "AI brain of Zapflow" },
          { label: "Channels", valor: "API · webhook · widget" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end of the agent studio: agents, knowledge base, rules, connectors and playground",
          "Onboarding and tenant flows",
          "Shared vocabulary with Zapflow so both products read and write the same AI configuration",
          "Coordination with the back-end through written API requests",
        ],
        insights: {
          desafio: "Let non-technical teams configure AI agents connected to their own systems, with one source of truth shared with another product.",
          solucao: "Concepts the customer understands (profile, creativity, reply length in messages, how strictly to follow the knowledge base) instead of model, temperature and tokens.",
          resultado: "A single AI platform that serves both direct customers and Zapflow's WhatsApp customers.",
        },
        evolucao: ["AI product design for non-technical users", "Multi-tenant SaaS architecture", "Integration contracts between products"],
      },
      "pt-br": {
        destaque: "SaaS de IA",
        status: "Em desenvolvimento",
        resumo: "Plataforma multi-tenant para criar, treinar e publicar agentes de IA.",
        descricao: "SaaS para criar, treinar, testar e publicar agentes de IA que atendem clientes e se integram aos sistemas internos das empresas (ERP, CRM, agenda, e-commerce), sem que o usuário precise entender de LLM, prompt ou API. Também é o cérebro único de IA do Zapflow.",
        descricaoResumida: "Estúdio de agentes de IA: criar, treinar, testar e publicar agentes integrados a ERP, CRM e outros sistemas, e o cérebro de IA do Zapflow.",
        metricas: [
          { label: "Modelo", valor: "SaaS multi-tenant" },
          { label: "Papel", valor: "IA do Zapflow" },
          { label: "Canais", valor: "API · webhook · widget" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end do estúdio de agentes: agentes, base de conhecimento, regras, conectores e playground",
          "Fluxos de onboarding e de tenant",
          "Vocabulário compartilhado com o Zapflow, para os dois produtos lerem e gravarem a mesma configuração de IA",
          "Alinhamento com o back-end por meio de pedidos de API documentados",
        ],
        insights: {
          desafio: "Permitir que equipes sem conhecimento técnico configurem agentes de IA ligados aos próprios sistemas, com uma fonte da verdade compartilhada com outro produto.",
          solucao: "Conceitos que o cliente entende (perfil, criatividade, tamanho da resposta em mensagens, quão presa à base) no lugar de modelo, temperature e tokens.",
          resultado: "Uma plataforma de IA única, que atende tanto clientes diretos quanto os clientes de WhatsApp do Zapflow.",
        },
        evolucao: ["Produto de IA para usuários não técnicos", "Arquitetura SaaS multi-tenant", "Contratos de integração entre produtos"],
      },
      "fr-fr": {
        destaque: "SaaS d’IA",
        status: "En développement",
        resumo: "Plateforme multi-tenant pour créer, entraîner et publier des agents d’IA.",
        descricao: "SaaS pour créer, entraîner, tester et publier des agents d’IA qui servent les clients et s’intègrent aux systèmes internes des entreprises (ERP, CRM, agenda, e-commerce), sans que l’utilisateur ait besoin de comprendre les LLM, les prompts ou les API. C’est aussi le cerveau d’IA unique de Zapflow.",
        descricaoResumida: "Studio d’agents d’IA : créer, entraîner, tester et publier des agents intégrés à l’ERP, au CRM et à d’autres systèmes, et le cerveau d’IA de Zapflow.",
        metricas: [
          { label: "Modèle", valor: "SaaS multi-tenant" },
          { label: "Rôle", valor: "IA de Zapflow" },
          { label: "Canaux", valor: "API · webhook · widget" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end du studio d’agents : agents, base de connaissances, règles, connecteurs et playground",
          "Parcours d’onboarding et de tenant",
          "Vocabulaire partagé avec Zapflow, pour que les deux produits lisent et écrivent la même configuration d’IA",
          "Coordination avec le back-end via des demandes d’API documentées",
        ],
        insights: {
          desafio: "Permettre à des équipes non techniques de configurer des agents d’IA reliés à leurs systèmes, avec une source de vérité partagée avec un autre produit.",
          solucao: "Des concepts compréhensibles (profil, créativité, longueur de réponse en messages, fidélité à la base) au lieu de modèle, temperature et tokens.",
          resultado: "Une plateforme d’IA unique, au service des clients directs comme des clients WhatsApp de Zapflow.",
        },
        evolucao: ["Produit d’IA pour utilisateurs non techniques", "Architecture SaaS multi-tenant", "Contrats d’intégration entre produits"],
      },
    },
  },
  {
    id: "zapflow",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Zapflow",
    logoEmpresa: "/assets/projects/zapflow-icon.png",
    logoEmpresaBackground: "#064e3b",
    plataformas: {
      web: { imagem: "/assets/projects/zapflow-web.jpg", link: "" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Query"],
    stackDetalhada: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "TanStack Query", "React Hook Form + Zod", "Zustand", "Recharts", "Docker"],
    i18n: {
      "en-us": {
        destaque: "WhatsApp SaaS",
        status: "In production",
        resumo: "Multi-tenant SaaS for WhatsApp customer service and automation.",
        descricao: "Companies connect their own WhatsApp Business number (official Meta Cloud API), set up service bots with AI and automate recurring messages such as billing, plan renewals and campaigns. A dashboard for the SaaS admin, for each company (tenant) and for their service teams.",
        descricaoResumida: "WhatsApp service and automation SaaS: official Meta API, bots with AI, inbox and recurring campaigns per company.",
        metricas: [
          { label: "Model", valor: "Multi-tenant SaaS" },
          { label: "WhatsApp", valor: "Official Meta API" },
          { label: "Users", valor: "Admin · tenant · team" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end of the dashboard: channels, bot flows, inbox, campaigns and admin area",
          "Visual bot flow builder with branching steps",
          "Inbox with media, avatars and AI copilot",
          "Integration with the back-end services and written API requests for new capabilities",
        ],
        insights: {
          desafio: "Give each company its own WhatsApp operation (bot, team inbox and campaigns) inside one multi-tenant product.",
          solucao: "A dashboard organized by the three user layers, with typed data fetching and forms, on top of the official WhatsApp API.",
          resultado: "The bot is live in production; the AI layer now runs on IArthquake.",
        },
        evolucao: ["Multi-tenant product UX", "Bot and flow builders", "Integration with the official WhatsApp API"],
      },
      "pt-br": {
        destaque: "SaaS de WhatsApp",
        status: "Em produção",
        resumo: "SaaS multi-tenant de atendimento e automação no WhatsApp.",
        descricao: "Empresas conectam o próprio número de WhatsApp Business (API oficial da Meta), configuram bots de atendimento com IA e automatizam mensagens recorrentes, como cobranças, renovação de planos e campanhas. Painel para o admin do SaaS, para cada empresa (tenant) e para as equipes de atendimento.",
        descricaoResumida: "SaaS de atendimento e automação no WhatsApp: API oficial da Meta, bots com IA, inbox e campanhas recorrentes por empresa.",
        metricas: [
          { label: "Modelo", valor: "SaaS multi-tenant" },
          { label: "WhatsApp", valor: "API oficial da Meta" },
          { label: "Usuários", valor: "Admin · tenant · equipe" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end do painel: canais, fluxos de bot, inbox, campanhas e área administrativa",
          "Construtor visual de fluxos do bot, com ramificações",
          "Inbox com mídia, avatares e copiloto de IA",
          "Integração com os serviços do back-end e pedidos de API documentados para novas funcionalidades",
        ],
        insights: {
          desafio: "Dar a cada empresa a própria operação de WhatsApp (bot, inbox da equipe e campanhas) dentro de um único produto multi-tenant.",
          solucao: "Painel organizado pelas três camadas de usuário, com busca de dados e formulários tipados, sobre a API oficial do WhatsApp.",
          resultado: "O bot está no ar em produção; a camada de IA passou a rodar no IArthquake.",
        },
        evolucao: ["UX de produto multi-tenant", "Construtores de bot e de fluxo", "Integração com a API oficial do WhatsApp"],
      },
      "fr-fr": {
        destaque: "SaaS WhatsApp",
        status: "En production",
        resumo: "SaaS multi-tenant de service client et d’automatisation sur WhatsApp.",
        descricao: "Les entreprises connectent leur propre numéro WhatsApp Business (API officielle de Meta), configurent des bots de service avec IA et automatisent les messages récurrents comme les relances de paiement, les renouvellements et les campagnes. Un tableau de bord pour l’admin du SaaS, pour chaque entreprise (tenant) et pour ses équipes.",
        descricaoResumida: "SaaS de service client et d’automatisation WhatsApp : API officielle de Meta, bots avec IA, inbox et campagnes récurrentes par entreprise.",
        metricas: [
          { label: "Modèle", valor: "SaaS multi-tenant" },
          { label: "WhatsApp", valor: "API officielle Meta" },
          { label: "Utilisateurs", valor: "Admin · tenant · équipe" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end du tableau de bord : canaux, flux de bot, inbox, campagnes et espace d’administration",
          "Constructeur visuel de flux de bot, avec embranchements",
          "Inbox avec médias, avatars et copilote d’IA",
          "Intégration aux services du back-end et demandes d’API documentées pour les nouvelles fonctionnalités",
        ],
        insights: {
          desafio: "Donner à chaque entreprise sa propre opération WhatsApp (bot, inbox d’équipe et campagnes) dans un seul produit multi-tenant.",
          solucao: "Un tableau de bord organisé selon les trois niveaux d’utilisateurs, avec requêtes et formulaires typés, sur l’API officielle de WhatsApp.",
          resultado: "Le bot est en production ; la couche d’IA tourne désormais sur IArthquake.",
        },
        evolucao: ["UX de produit multi-tenant", "Constructeurs de bot et de flux", "Intégration à l’API officielle de WhatsApp"],
      },
    },
  },
  {
    id: "votre",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Votre CRM",
    logoEmpresa: "/assets/projects/votre-icon.png",
    logoEmpresaBackground: "#7d6119",
    plataformas: {
      web: { imagem: "/assets/projects/votre-web.jpg", link: "https://votreconsorcios.online/" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["Next.js", "React", "TypeScript", "Ant Design", "SCSS Modules", "TanStack Query"],
    stackDetalhada: ["Next.js 16 (App Router)", "TypeScript", "Ant Design v6", "SCSS Modules", "TanStack Query v5", "Zustand", "React Hook Form + Zod", "ApexCharts", "Motion", "Docker"],
    i18n: {
      "en-us": {
        destaque: "CRM",
        status: "In production",
        resumo: "Sales CRM for a consortium consultancy.",
        descricao: "Votre sells real estate, vehicle and investment consortium quotas as a representative of partner administrators. The CRM is its commercial operating system: lead origin, service, the sale, the post-sale portfolio and the commission, in one place, owned by the company and not by the consultant's phone.",
        descricaoResumida: "The commercial operating system of a consortium consultancy: sales funnel, quota portfolio, commissions and goals.",
        metricas: [
          { label: "Domain", valor: "Consortiums" },
          { label: "Scope", valor: "Funnel · portfolio · commission" },
          { label: "UI", valor: "Ant Design v6" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end of the CRM: sales funnel, contact card, quota portfolio, commissions and goals",
          "Design system on top of Ant Design, with wrappers instead of raw components in the features",
          "Money handled as integer cents across the front-end",
          "Compliance rule: no generated material can promise a contemplation date",
        ],
        insights: {
          desafio: "The sale doesn't end at signing: commission is paid in installments and can be reversed if the customer cancels early.",
          solucao: "Portfolio and post-sale as part of the product, with provisioned, realized and reversal risk visible before the fact.",
          resultado: "Customer history and commission forecasts owned by the company in a single system.",
        },
        evolucao: ["Complex domain modeling in the front-end", "Design system over a component library", "Compliance as a product requirement"],
      },
      "pt-br": {
        destaque: "CRM",
        status: "Em produção",
        resumo: "CRM comercial de uma consultoria de consórcios.",
        descricao: "A Votre vende cotas de consórcio de imóvel, veículo e investimento como representante de administradoras parceiras. O CRM é o sistema operacional comercial dela: a origem do lead, o atendimento, a venda, a carteira no pós-venda e a comissão, num só lugar, pertencendo à empresa e não ao celular do consultor.",
        descricaoResumida: "O sistema operacional comercial de uma consultoria de consórcios: funil de vendas, carteira de cotas, comissionamento e metas.",
        metricas: [
          { label: "Domínio", valor: "Consórcios" },
          { label: "Escopo", valor: "Funil · carteira · comissão" },
          { label: "UI", valor: "Ant Design v6" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end do CRM: funil de vendas, cartão do contato, carteira de cotas, comissionamento e metas",
          "Design system sobre o Ant Design, com wrappers no lugar dos componentes crus nas features",
          "Dinheiro tratado como inteiro em centavos em todo o front",
          "Regra de compliance: nenhum material gerado pode prometer data de contemplação",
        ],
        insights: {
          desafio: "A venda não termina na assinatura: a comissão é paga em parcelas e pode ser estornada se o cliente cancelar cedo.",
          solucao: "Carteira e pós-venda como parte do produto, com provisionado, realizado e risco de estorno visíveis antes do fato.",
          resultado: "Histórico do cliente e previsão de comissão pertencendo à empresa, num sistema único.",
        },
        evolucao: ["Modelagem de domínio complexo no front-end", "Design system sobre biblioteca de componentes", "Compliance como requisito de produto"],
      },
      "fr-fr": {
        destaque: "CRM",
        status: "En production",
        resumo: "CRM commercial d’un cabinet de conseil en consortiums.",
        descricao: "Votre vend des parts de consortium immobilier, automobile et d’investissement en tant que représentant d’administrateurs partenaires. Le CRM est son système d’exploitation commercial : l’origine du lead, l’accompagnement, la vente, le portefeuille après-vente et la commission, en un seul endroit, appartenant à l’entreprise et non au téléphone du consultant.",
        descricaoResumida: "Le système d’exploitation commercial d’un cabinet de consortiums : entonnoir de vente, portefeuille de parts, commissions et objectifs.",
        metricas: [
          { label: "Domaine", valor: "Consortiums" },
          { label: "Périmètre", valor: "Entonnoir · portefeuille · commission" },
          { label: "UI", valor: "Ant Design v6" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end du CRM : entonnoir de vente, fiche contact, portefeuille de parts, commissions et objectifs",
          "Design system sur Ant Design, avec des wrappers au lieu des composants bruts dans les features",
          "Montants traités en centimes entiers dans tout le front",
          "Règle de conformité : aucun document généré ne peut promettre de date de contemplation",
        ],
        insights: {
          desafio: "La vente ne s’arrête pas à la signature : la commission est payée en plusieurs fois et peut être annulée si le client résilie tôt.",
          solucao: "Portefeuille et après-vente intégrés au produit, avec provisionné, réalisé et risque d’annulation visibles à l’avance.",
          resultado: "Historique client et prévision de commission appartenant à l’entreprise, dans un seul système.",
        },
        evolucao: ["Modélisation d’un domaine complexe côté front", "Design system sur une bibliothèque de composants", "La conformité comme exigence produit"],
      },
    },
  },
  {
    id: "haber-contabilidade",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Haber Contabilidade",
    logoEmpresa: "/assets/projects/haber-contabil-icon.png",
    logoEmpresaBackground: "#ffffff",
    plataformas: {
      web: { imagem: "/assets/projects/haber-contabilidade-web.jpg", link: "https://habercontabilidade.com.br/" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["Next.js", "React", "TypeScript", "CSS Modules", "TanStack Query", "Laravel (PHP)"],
    stackDetalhada: ["Next.js 15 (App Router)", "React 19", "TypeScript", "CSS Modules", "TanStack Query", "Laravel 12 (API REST, JWT)", "Banco Inter (boletos)"],
    i18n: {
      "en-us": {
        destaque: "Platform",
        status: "In production",
        resumo: "Website, client portal and admin panel for an accounting firm.",
        descricao: "Platform for the Haber accounting firm: an institutional website with a contact form, a logged-in portal for client companies (profile, address, partners, payments) and an admin panel for the internal team: clients, payments, bank slips integrated with Banco Inter, debt collection, company documents, income tax and areas per role (HR, tax, finance).",
        descricaoResumida: "Accounting firm platform: website, client portal and admin panel with bank slips, collections and documents.",
        metricas: [
          { label: "Apps", valor: "Site · portal · admin" },
          { label: "Back-end", valor: "Laravel 12 API" },
          { label: "Bank", valor: "Banco Inter slips" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end of the website, the client portal and the admin panel",
          "Admin flows for payments, bank slips, collections and company documents",
          "Integration with the Laravel REST API with JWT authentication",
          "Design system with themes and CSS rules for the front-end",
        ],
        insights: {
          desafio: "Bring the firm's website, its clients and its internal team into the same platform, with financial flows tied to a bank.",
          solucao: "A monorepo with an independent Laravel API and Next.js front-end, layered domain and bank-slip integration with Banco Inter.",
          resultado: "Clients, payments and documents managed in one place by the firm.",
        },
        evolucao: ["Financial flows integrated with a bank", "Role-based admin areas", "Monorepo with independent apps"],
      },
      "pt-br": {
        destaque: "Plataforma",
        status: "Em produção",
        resumo: "Site, portal do cliente e painel administrativo de um escritório contábil.",
        descricao: "Plataforma do escritório contábil Haber: site institucional com formulário de contato, portal logado para as empresas clientes (perfil, endereço, sócios, pagamentos) e painel administrativo para a equipe interna: clientes, pagamentos, boletos integrados ao Banco Inter, cobrança, documentos por empresa, imposto de renda e áreas por perfil (RH, fiscal, financeiro).",
        descricaoResumida: "Plataforma de escritório contábil: site, portal do cliente e painel administrativo com boletos, cobrança e documentos.",
        metricas: [
          { label: "Apps", valor: "Site · portal · admin" },
          { label: "Back-end", valor: "API Laravel 12" },
          { label: "Banco", valor: "Boletos Banco Inter" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end do site, do portal do cliente e do painel administrativo",
          "Fluxos administrativos de pagamentos, boletos, cobrança e documentos por empresa",
          "Integração com a API REST em Laravel, com autenticação JWT",
          "Design system com temas e regras de CSS do front-end",
        ],
        insights: {
          desafio: "Reunir o site do escritório, os clientes e a equipe interna na mesma plataforma, com fluxos financeiros ligados a um banco.",
          solucao: "Monorepo com API Laravel e front-end Next.js independentes, domínio em camadas e boletos integrados ao Banco Inter.",
          resultado: "Clientes, pagamentos e documentos geridos pelo escritório num só lugar.",
        },
        evolucao: ["Fluxos financeiros integrados a banco", "Áreas administrativas por perfil", "Monorepo com aplicações independentes"],
      },
      "fr-fr": {
        destaque: "Plateforme",
        status: "En production",
        resumo: "Site, portail client et back-office d’un cabinet comptable.",
        descricao: "Plateforme du cabinet comptable Haber : un site institutionnel avec formulaire de contact, un portail connecté pour les entreprises clientes (profil, adresse, associés, paiements) et un back-office pour l’équipe interne : clients, paiements, boletos intégrés à la Banco Inter, recouvrement, documents par entreprise, impôt sur le revenu et espaces par profil (RH, fiscal, finance).",
        descricaoResumida: "Plateforme de cabinet comptable : site, portail client et back-office avec boletos, recouvrement et documents.",
        metricas: [
          { label: "Apps", valor: "Site · portail · admin" },
          { label: "Back-end", valor: "API Laravel 12" },
          { label: "Banque", valor: "Boletos Banco Inter" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Front-end du site, du portail client et du back-office",
          "Parcours d’administration des paiements, boletos, recouvrement et documents",
          "Intégration à l’API REST Laravel avec authentification JWT",
          "Design system avec thèmes et règles CSS du front-end",
        ],
        insights: {
          desafio: "Réunir le site du cabinet, ses clients et son équipe interne sur une même plateforme, avec des flux financiers liés à une banque.",
          solucao: "Un monorepo avec API Laravel et front-end Next.js indépendants, domaine en couches et boletos intégrés à la Banco Inter.",
          resultado: "Clients, paiements et documents gérés au même endroit par le cabinet.",
        },
        evolucao: ["Flux financiers intégrés à une banque", "Espaces d’administration par profil", "Monorepo avec applications indépendantes"],
      },
    },
  },
  {
    id: "habersolutions",
    tipo: "profissional",
    categoria: "sistema",
    nome: "Haber Solutions",
    logoEmpresa: "/assets/projects/habersolutions-icon.png",
    logoEmpresaBackground: "#064e3b",
    plataformas: {
      web: { imagem: "/assets/projects/habersolutions-web.jpg", link: "https://habersolutions.com.br/" },
      mobile: { imagem: "", link: "" },
    },
    tecnologias: ["React", "React Router", "TypeScript", "Tailwind CSS", "Vite", "Laravel (PHP)"],
    stackDetalhada: ["React Router 7 (framework, SSR)", "React 19", "TypeScript", "Tailwind CSS v4", "Vite", "Laravel API", "Docker"],
    i18n: {
      "en-us": {
        destaque: "Website + panel",
        status: "In production",
        resumo: "Website and internal panel for a custom software house.",
        descricao: "Haber Solutions builds custom software for companies. The project has a server-rendered landing page (full HTML for Google, with meta tags, Open Graph and structured data) and a login-only internal panel for the team: projects, leads, tasks, schedule, credentials, links and history, consuming a Laravel API.",
        descricaoResumida: "Server-rendered landing page for a software house and an internal panel for projects, leads, tasks and schedule.",
        metricas: [
          { label: "Apps", valor: "Landing · panel" },
          { label: "Rendering", valor: "SSR for SEO" },
          { label: "Back-end", valor: "Laravel API" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Landing page rendered on the server, with SEO metadata and structured data",
          "Internal panel: projects, leads, tasks, schedule, credentials and users",
          "Mock mode with a fake back-end for developing the panel without the API",
          "Integration with the Laravel API and the landing page's tracking scripts",
        ],
        insights: {
          desafio: "A landing page that ranks on Google and an internal tool for the team, in the same app.",
          solucao: "React Router 7 in framework mode: SSR for the landing page and a client-side panel behind login, with a documented API contract.",
          resultado: "The company's site and the team's day-to-day tool in one codebase.",
        },
        evolucao: ["Server-side rendering for SEO", "Internal tools for a small team", "API contracts kept in sync with Postman"],
      },
      "pt-br": {
        destaque: "Site + painel",
        status: "Em produção",
        resumo: "Site e painel interno de uma software house de software sob medida.",
        descricao: "A Haber Solutions desenvolve software sob medida para empresas. O projeto tem uma landing page renderizada no servidor (HTML completo para o Google, com meta tags, Open Graph e dados estruturados) e um painel interno só com login, para a equipe: projetos, leads, tarefas, agenda, credenciais, links e histórico, consumindo uma API Laravel.",
        descricaoResumida: "Landing page com SSR de uma software house e painel interno de projetos, leads, tarefas e agenda.",
        metricas: [
          { label: "Apps", valor: "Landing · painel" },
          { label: "Renderização", valor: "SSR para SEO" },
          { label: "Back-end", valor: "API Laravel" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Landing page renderizada no servidor, com metadados de SEO e dados estruturados",
          "Painel interno: projetos, leads, tarefas, agenda, credenciais e usuários",
          "Modo mock com back-end falso para desenvolver o painel sem a API",
          "Integração com a API Laravel e com os scripts de tracking da landing",
        ],
        insights: {
          desafio: "Uma landing que aparece no Google e uma ferramenta interna para a equipe, no mesmo app.",
          solucao: "React Router 7 no modo framework: SSR para a landing e painel no cliente atrás de login, com o contrato da API documentado.",
          resultado: "O site da empresa e a ferramenta do dia a dia da equipe numa base de código só.",
        },
        evolucao: ["Renderização no servidor para SEO", "Ferramentas internas para equipe pequena", "Contrato de API sincronizado com o Postman"],
      },
      "fr-fr": {
        destaque: "Site + panneau",
        status: "En production",
        resumo: "Site et panneau interne d’une société de logiciels sur mesure.",
        descricao: "Haber Solutions développe des logiciels sur mesure pour les entreprises. Le projet comprend une landing page rendue côté serveur (HTML complet pour Google, avec balises meta, Open Graph et données structurées) et un panneau interne accessible uniquement par connexion, pour l’équipe : projets, leads, tâches, agenda, identifiants, liens et historique, via une API Laravel.",
        descricaoResumida: "Landing page en SSR d’une société de logiciels et panneau interne de projets, leads, tâches et agenda.",
        metricas: [
          { label: "Apps", valor: "Landing · panneau" },
          { label: "Rendu", valor: "SSR pour le SEO" },
          { label: "Back-end", valor: "API Laravel" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Landing page rendue côté serveur, avec métadonnées SEO et données structurées",
          "Panneau interne : projets, leads, tâches, agenda, identifiants et utilisateurs",
          "Mode mock avec un faux back-end pour développer le panneau sans l’API",
          "Intégration à l’API Laravel et aux scripts de tracking de la landing",
        ],
        insights: {
          desafio: "Une landing qui se positionne sur Google et un outil interne pour l’équipe, dans la même application.",
          solucao: "React Router 7 en mode framework : SSR pour la landing et panneau côté client derrière une connexion, avec un contrat d’API documenté.",
          resultado: "Le site de l’entreprise et l’outil quotidien de l’équipe dans une seule base de code.",
        },
        evolucao: ["Rendu côté serveur pour le SEO", "Outils internes pour une petite équipe", "Contrat d’API synchronisé avec Postman"],
      },
    },
  },
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
        destaque: "Featured project: enterprise system",
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
          "Project run by me and two partners, with no external staff, from signing the contract to production delivery",
          "Architecture and full front-end development: component structure, routing and navigation flows",
          "Integration with the REST API built by the back-end devs, including authentication and state handling",
          "UI/UX decisions: prototyping the main screens and validating them with the client during development",
          "Modules delivered: property registration, service dashboard, operational tracking and customer history",
        ],
        insights: {
          desafio: "A real estate agency with no visibility into its sales funnel: client service and customer history scattered across spreadsheets and WhatsApp.",
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
        destaque: "Projeto destaque: sistema empresarial",
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
          "Projeto conduzido por mim e mais dois sócios, sem staff externo, do acerto de contrato à entrega em produção",
          "Arquitetura e desenvolvimento completo do front-end: estrutura de componentes, roteamento e fluxos de navegação",
          "Integração com API REST construída pelos devs back-end, incluindo autenticação e tratamento de estados",
          "Decisões de UI/UX: prototipagem das telas principais e validação com o cliente durante o desenvolvimento",
          "Módulos entregues: cadastro de imóveis, painel de atendimentos, acompanhamento operacional e histórico de clientes",
        ],
        insights: {
          desafio: "Imobiliária sem visibilidade do funil de vendas: atendimentos e histórico de clientes espalhados em planilhas e WhatsApp.",
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
        destaque: "Projet phare : système d'entreprise",
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
          "Projet mené par moi et deux associés, sans équipe externe, du contrat à la mise en production",
          "Architecture et développement complet du front-end : structure des composants, routage et flux de navigation",
          "Intégration de l'API REST construite par les devs back-end, avec authentification et gestion des états",
          "Décisions UI/UX : prototypage des écrans principaux et validation avec le client pendant le développement",
          "Modules livrés : enregistrement des biens, tableau de suivi client, suivi opérationnel et historique client",
        ],
        insights: {
          desafio: "Agence immobilière sans visibilité sur son tunnel de vente : suivi client et historique dispersés entre tableurs et WhatsApp.",
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
    logoEmpresaBackground: "#0141ac",
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
        destaque: "Legacy ERP, web + mobile",
        status: "In production · active client base",
        resumo: "Full ERP with POS, service orders, e-commerce, tax, finance and logistics modules.",
        descricao:
          "Full ERP with POS, service orders, e-commerce, tax, finance and logistics modules, a legacy system in production with an active client base. I joined the front-end team, responsible for the evolutionary maintenance of the web interface and for the mobile app.",
        descricaoResumida:
          "I worked on the web front-end and was the main maintainer of the Flutter mobile app, evolving critical modules of a legacy ERP in production.",
        metricas: [
          { label: "Platform", valor: "Web + Mobile" },
          { label: "Role", valor: "Front-end" },
          { label: "Modules delivered", valor: "5" },
          { label: "System", valor: "Legacy ERP" },
        ],
        responsabilidade: [
          "Visual modernization of the web interface: reviewing existing pages and components for a more consistent, up-to-date UI",
          "Development of new modules: recurring plans, consignment, production module and sales flow",
          "Main maintainer of the Flutter mobile app: bug fixes, flow adjustments and production stability",
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
        destaque: "ERP legado, web + mobile",
        status: "Em produção · base ativa",
        resumo: "ERP completo com módulos de PDV, OS, e-commerce, fiscal, financeiro e logística.",
        descricao:
          "ERP completo com módulos de PDV, OS, e-commerce, fiscal, financeiro e logística, sistema legado em produção com base ativa de clientes. Entrei para compor o time de front-end, responsável pela manutenção evolutiva da interface web e pelo app mobile.",
        descricaoResumida:
          "Atuei no front-end web e na manutenção principal do app mobile em Flutter, evoluindo módulos críticos de um ERP legado em produção.",
        metricas: [
          { label: "Plataforma", valor: "Web + Mobile" },
          { label: "Atuação", valor: "Front-end" },
          { label: "Módulos entregues", valor: "5" },
          { label: "Sistema", valor: "ERP legado" },
        ],
        responsabilidade: [
          "Modernização visual da interface web: revisão de páginas e componentes existentes com foco em UI mais consistente e atual",
          "Desenvolvimento de novos módulos: plano de recorrência, consignado, módulo de produção e fluxo de venda",
          "Manutenção principal do app mobile em Flutter: correção de bugs, ajustes de fluxo e estabilidade em produção",
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
        destaque: "ERP legacy, web + mobile",
        status: "En production · base client active",
        resumo: "ERP complet avec modules PDV, ordres de service, e-commerce, fiscal, finance et logistique.",
        descricao:
          "ERP complet avec modules PDV, ordres de service, e-commerce, fiscal, finance et logistique, système legacy en production avec une base client active. J'ai rejoint l'équipe front-end, en charge de la maintenance évolutive de l'interface web et de l'app mobile.",
        descricaoResumida:
          "J'ai travaillé sur le front-end web et assuré la maintenance principale de l'app mobile en Flutter, en faisant évoluer des modules critiques d'un ERP legacy en production.",
        metricas: [
          { label: "Plateforme", valor: "Web + Mobile" },
          { label: "Rôle", valor: "Front-end" },
          { label: "Modules livrés", valor: "5" },
          { label: "Système", valor: "ERP legacy" },
        ],
        responsabilidade: [
          "Modernisation visuelle de l'interface web : révision des pages et composants existants pour une UI plus cohérente et actuelle",
          "Développement de nouveaux modules : plan de récurrence, consignation, module de production et flux de vente",
          "Maintenance principale de l'app mobile en Flutter : correction de bugs, ajustements de flux et stabilité en production",
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
    categoria: "lp",
    nome: "Levita Massagens",
    logoEmpresa: "/assets/projects/levita-icon.png",
    logoEmpresaBackground: "#2a4937",
    plataformas: {
      web: {
        imagem: "/assets/projects/levita-1.png",
        link: "https://levitamassagem.pt/",
      },
      mobile: { imagem: "", link: "" },
    },
    previewImages: ["/assets/projects/levita-1.png"],
    tecnologias: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    stackDetalhada: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    i18n: {
      "en-us": {
        destaque: "First international engagement: Lisbon",
        status: "Delivered · 7 business days",
        resumo: "Landing page to present services and capture contacts.",
        descricao:
          "A client in Lisbon was running on a website built in Canva, visually limited and with no structure to grow. I built a professional landing page with an architecture ready to scale, allowing future pages and modules such as booking and CRM to be added without refactoring.",
        descricaoResumida:
          "A client in Lisbon was running on a Canva-built website. I built a professional landing page with an architecture ready to scale, allowing future pages and modules without refactoring.",
        metricas: [
          { label: "Market", valor: "Portugal 🇵🇹" },
          { label: "Deadline", valor: "7 business days" },
          { label: "Revisions", valor: "2 rounds" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Complete project, from requirements gathering to delivery, including contract, client communication and deadline management",
          "Responsive layout for mobile and desktop, faithful to the brand's visual identity",
          "Project architecture structured to scale: new pages and modules such as booking and CRM without refactoring",
          "First international engagement: client in Lisbon, contract in euros, communication in European Portuguese",
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
        destaque: "Primeiro serviço internacional: Lisboa",
        status: "Entregue · 7 dias úteis",
        resumo: "Landing page para apresentação de serviços e captação de contatos.",
        descricao:
          "Cliente em Lisboa operava com site feito no Canva, limitado visualmente e sem estrutura para crescer. Desenvolvi uma landing page profissional com arquitetura preparada para escalar, permitindo adicionar páginas e módulos futuros como agendamento e CRM sem necessidade de refatoração.",
        descricaoResumida:
          "Cliente em Lisboa operava com site feito no Canva. Desenvolvi uma landing page profissional com arquitetura preparada para escalar, permitindo adicionar páginas e módulos futuros sem refatoração.",
        metricas: [
          { label: "Mercado", valor: "Portugal 🇵🇹" },
          { label: "Prazo", valor: "7 dias úteis" },
          { label: "Revisões", valor: "2 rodadas" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Projeto completo, do levantamento de requisitos à entrega, incluindo contrato, comunicação com o cliente e gestão de prazo",
          "Layout responsivo para mobile e desktop, fiel à identidade visual do negócio",
          "Arquitetura do projeto estruturada para escalar: novas páginas e módulos como agendamento e CRM sem refatoração",
          "Primeiro serviço internacional: cliente em Lisboa, contrato em euros, comunicação em português europeu",
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
        destaque: "Première mission internationale : Lisbonne",
        status: "Livré · 7 jours ouvrés",
        resumo: "Landing page de présentation des services et de captation de contacts.",
        descricao:
          "Un client à Lisbonne fonctionnait avec un site fait sur Canva, visuellement limité et sans structure pour évoluer. J'ai développé une landing page professionnelle avec une architecture prête à évoluer, permettant d'ajouter des pages et modules futurs comme la réservation et le CRM sans refonte.",
        descricaoResumida:
          "Un client à Lisbonne fonctionnait avec un site fait sur Canva. J'ai développé une landing page professionnelle avec une architecture prête à évoluer, permettant d'ajouter des pages et modules futurs sans refonte.",
        metricas: [
          { label: "Marché", valor: "Portugal 🇵🇹" },
          { label: "Délai", valor: "7 jours ouvrés" },
          { label: "Révisions", valor: "2 tours" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Projet complet, du recueil des besoins à la livraison, contrat, communication client et gestion des délais inclus",
          "Mise en page responsive mobile et desktop, fidèle à l'identité visuelle de l'activité",
          "Architecture du projet structurée pour évoluer : nouvelles pages et modules comme la réservation et le CRM sans refonte",
          "Première mission internationale : client à Lisbonne, contrat en euros, communication en portugais européen",
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
    categoria: "lp",
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
        destaque: "Commercial landing page: digital presence",
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
          "Complete landing page development: structure, layout, responsiveness and publishing the site",
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
        destaque: "Landing page comercial: presença digital",
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
          "Desenvolvimento completo da landing page: estrutura, layout, responsividade e publicação do site",
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
        destaque: "Landing page commerciale : présence numérique",
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
          "Développement complet de la landing page : structure, mise en page, responsive et mise en ligne du site",
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
      web: { imagem: "/assets/projects/aprova-web.jpg", link: "https://aprovalegal.com/" },
      mobile: { imagem: "", link: "" },
    },
    previewImages: {
      web: [
        "/assets/projects/aprova-web.jpg",
        "/assets/projects/aprova-numeros.jpg",
        "/assets/projects/aprova-coberturas.jpg",
        "/assets/projects/aprova-planos.jpg",
        "/assets/projects/aprova-login.jpg",
      ],
    },
    tecnologias: ["Next.js", "React", "TypeScript", "MUI", "Tailwind CSS", "TanStack Query", "Motion", "Laravel (PHP)"],
    stackDetalhada: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript",
      "MUI",
      "Tailwind CSS v4",
      "TanStack Query",
      "Motion",
      "Sonner",
      "REST API (Laravel)",
      "Docker",
    ],
    i18n: {
      "en-us": {
        destaque: "Featured project: enterprise system",
        status: "Delivered · in production",
        resumo: "Rental guarantee platform: landing page, agency portal and admin back office.",
        descricao:
          "Aprova Legal is a rental guarantee company: it covers rent, charges and termination costs for partner real estate agencies. The first version was a Laravel monolith with Blade screens. I rebuilt the front-end as a decoupled Next.js app consuming the REST API, with three areas: a new landing page, the agency portal and the admin back office.",
        descricaoResumida:
          "I rebuilt the rental guarantee platform as a decoupled Next.js front-end: landing page, agency portal and admin back office over a REST API.",
        metricas: [
          { label: "Pages", valor: "115+" },
          { label: "Portals", valor: "Agency + admin" },
          { label: "Architecture", valor: "Decoupled" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Migration from the Laravel monolith (Blade) to a decoupled Next.js front-end, keeping fields, rules and messages as the API contract",
          "Agency portal: proposal wizard, credit analysis, facial biometrics, contracts with version history, claims, evictions, renewals and readjustments",
          "Admin back office: proposals, guarantees, indemnities, settlements, billing forecast, reports, plans and permission-based roles",
          "Landing page redesigned with its own identity, inspired by certificates and stamps, plus a coverage simulator per plan",
          "Internal chat for the admin team and an AI assistant inside the claim chat",
        ],
        insights: {
          desafio: "A Laravel monolith with server-rendered screens and no formal API, which made each new flow slow to build and hard to evolve.",
          solucao: "A Next.js front-end split into two portals, data hooks per domain with TanStack Query and a proxy route that keeps the tokens in httpOnly cookies.",
          resultado: "Platform in production with more than 1,000 active contracts and 95+ partner agencies, managing R$45 million in guaranteed capital, now on an architecture that grows one screen at a time.",
        },
        evolucao: ["From monolith to decoupled architecture", "Large-scale TypeScript", "Back offices with granular permissions"],
        decisoesTecnicas: [
          "Two portals in the same app (agency and admin), each with its own layout, session and permissions.",
          "A Next.js proxy route to the Laravel API: tokens live in httpOnly cookies, never in localStorage.",
          "One data hook per domain with TanStack Query, and an admin UI kit (tables, filters, pagination, status badges) shared by every screen.",
          "Admin can open an agency session (impersonation), with a warning banner in the panel.",
        ],
        desafiosExtras: [
          "Migrating screen by screen without stopping an operation already in production.",
          "Showing each proposal's real stage, derived from credit, biometrics and contract, in both portals.",
        ],
      },
      "pt-br": {
        destaque: "Projeto destaque: sistema empresarial",
        status: "Entregue · em produção",
        resumo: "Plataforma de garantia locatícia: landing page, portal da imobiliária e backoffice administrativo.",
        descricao:
          "A Aprova Legal é uma garantidora locatícia: cobre aluguel, encargos e verbas rescisórias para imobiliárias parceiras. A primeira versão era um monólito Laravel com telas em Blade. Reconstruí o front-end como uma aplicação Next.js desacoplada, consumindo a API REST, com três frentes: a nova landing page, o portal da imobiliária e o backoffice administrativo.",
        descricaoResumida:
          "Reconstruí a plataforma de garantia locatícia em um front-end Next.js desacoplado: landing page, portal da imobiliária e backoffice sobre uma API REST.",
        metricas: [
          { label: "Páginas", valor: "115+" },
          { label: "Portais", valor: "Imobiliária + admin" },
          { label: "Arquitetura", valor: "Desacoplada" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Migração do monólito Laravel (Blade) para um front-end Next.js desacoplado, preservando campos, regras e mensagens como contrato da API",
          "Portal da imobiliária: wizard de proposta, análise de crédito, biometria facial, contratos com histórico de versões, ocorrências, desocupações, renovações e reajustes",
          "Backoffice: propostas, garantias, indenizações, acordos, previsão de faturamento, relatórios, planos e perfis com permissões",
          "Landing page redesenhada com identidade própria, inspirada em certificado e carimbo, e simulador de cobertura por plano",
          "Chat interno da equipe admin e assistente de IA dentro do chat de ocorrências",
        ],
        insights: {
          desafio: "Um monólito Laravel com telas renderizadas no servidor e sem API formal, o que deixava cada fluxo novo lento de construir e difícil de evoluir.",
          solucao: "Front-end em Next.js dividido em dois portais, hooks de dados por domínio com TanStack Query e uma rota de proxy que mantém os tokens em cookies httpOnly.",
          resultado: "Plataforma em produção com mais de 1.000 contratos ativos e 95+ imobiliárias parceiras, gerenciando R$45 milhões em capital garantido, agora numa arquitetura que cresce tela a tela.",
        },
        evolucao: ["Do monólito à arquitetura desacoplada", "TypeScript em larga escala", "Backoffices com permissões granulares"],
        decisoesTecnicas: [
          "Dois portais no mesmo app (imobiliária e admin), cada um com layout, sessão e permissões próprios.",
          "Rota de proxy do Next para a API Laravel: os tokens ficam em cookies httpOnly, nunca no localStorage.",
          "Um hook de dados por domínio com TanStack Query e um kit de UI do admin (tabelas, filtros, paginação, status) usado por todas as telas.",
          "O admin pode abrir a sessão de uma imobiliária (impersonação), com faixa de aviso no painel.",
        ],
        desafiosExtras: [
          "Migrar tela a tela sem parar uma operação que já estava em produção.",
          "Mostrar a etapa real de cada proposta, derivada de crédito, biometria e contrato, nos dois portais.",
        ],
      },
      "fr-fr": {
        destaque: "Projet phare : système d'entreprise",
        status: "Livré · en production",
        resumo: "Plateforme de garantie locative : landing page, portail des agences et back-office.",
        descricao:
          "Aprova Legal est une société de garantie locative : elle couvre loyers, charges et frais de résiliation pour des agences immobilières partenaires. La première version était un monolithe Laravel avec des écrans Blade. J'ai reconstruit le front-end en application Next.js découplée, consommant l'API REST, en trois volets : la nouvelle landing page, le portail des agences et le back-office.",
        descricaoResumida:
          "J'ai reconstruit la plateforme de garantie locative en front-end Next.js découplé : landing page, portail des agences et back-office sur une API REST.",
        metricas: [
          { label: "Pages", valor: "115+" },
          { label: "Portails", valor: "Agence + admin" },
          { label: "Architecture", valor: "Découplée" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Migration du monolithe Laravel (Blade) vers un front-end Next.js découplé, en gardant champs, règles et messages comme contrat d'API",
          "Portail des agences : assistant de proposition, analyse de crédit, biométrie faciale, contrats avec historique des versions, sinistres, expulsions, renouvellements et révisions de loyer",
          "Back-office : propositions, garanties, indemnisations, accords, prévision de facturation, rapports, plans et rôles avec permissions",
          "Landing page repensée avec une identité propre, inspirée des certificats et des tampons, et un simulateur de couverture par plan",
          "Chat interne pour l'équipe admin et assistant d'IA dans le chat des sinistres",
        ],
        insights: {
          desafio: "Un monolithe Laravel aux écrans rendus côté serveur et sans API formelle, ce qui rendait chaque nouveau flux lent à construire et difficile à faire évoluer.",
          solucao: "Un front-end Next.js en deux portails, des hooks de données par domaine avec TanStack Query et une route proxy qui garde les jetons dans des cookies httpOnly.",
          resultado: "Plateforme en production avec plus de 1 000 contrats actifs et 95+ agences partenaires, gérant 45 millions R$ de capital garanti, désormais sur une architecture qui évolue écran par écran.",
        },
        evolucao: ["Du monolithe à l'architecture découplée", "TypeScript à grande échelle", "Back-offices aux permissions fines"],
        decisoesTecnicas: [
          "Deux portails dans la même app (agence et admin), chacun avec sa mise en page, sa session et ses permissions.",
          "Une route proxy Next vers l'API Laravel : les jetons restent dans des cookies httpOnly, jamais dans le localStorage.",
          "Un hook de données par domaine avec TanStack Query et un kit d'UI admin (tableaux, filtres, pagination, statuts) partagé par tous les écrans.",
          "L'admin peut ouvrir la session d'une agence (impersonation), avec un bandeau d'avertissement dans le panneau.",
        ],
        desafiosExtras: [
          "Migrer écran par écran sans arrêter une activité déjà en production.",
          "Afficher l'étape réelle de chaque proposition, déduite du crédit, de la biométrie et du contrat, dans les deux portails.",
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
          "A Telegram sales startup needed an admin dashboard to manage bots, users, groups, commands and operational metrics. The first dashboard system I built, delivered within the stack limitations of my first year as a front-end dev.",
        descricaoResumida:
          "The first admin dashboard I built: a panel for bots, users, groups, commands and operational metrics of a Telegram sales startup.",
        metricas: [
          { label: "Team", valor: "3 devs" },
          { label: "Build", valor: "From scratch" },
          { label: "Context", valor: "Startup" },
          { label: "Platform", valor: "Web" },
        ],
        responsabilidade: [
          "Complete front-end development of the admin panel: no modern framework, with plain HTML, CSS and JavaScript",
          "Building reusable components with manual state handling, without React or an equivalent library",
          "Admin sections split by responsibility: users, groups, commands, logs, statistics and settings",
          "Integration with the Laravel back-end and UTM tracking scripts to follow campaigns between sales pages and the bot",
        ],
        insights: {
          desafio: "A Telegram sales startup needed to centralize bots, users, groups, commands and metrics in an admin panel built on a limited stack.",
          solucao: "Complete front-end in plain HTML, CSS and JavaScript, with reusable components, manual state handling and integration with the Laravel back-end.",
          resultado: "A working system shipped to production for a live startup. Building a dashboard without a modern framework demanded real command of plain CSS and JS, the technical base that solidified my understanding of state, components and interaction before moving to React.",
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
          "Startup de vendas via Telegram precisava de um painel administrativo para gerenciar bots, usuários, grupos, comandos e métricas operacionais. Primeiro sistema com dashboard que desenvolvi, entregue dentro das limitações de stack do meu primeiro ano como dev front-end.",
        descricaoResumida:
          "Primeiro dashboard administrativo que desenvolvi: painel para bots, usuários, grupos, comandos e métricas operacionais de uma startup de vendas via Telegram.",
        metricas: [
          { label: "Equipe", valor: "3 devs" },
          { label: "Construção", valor: "Do zero" },
          { label: "Contexto", valor: "Startup" },
          { label: "Plataforma", valor: "Web" },
        ],
        responsabilidade: [
          "Desenvolvimento do front-end completo do painel administrativo: sem framework moderno, com HTML, CSS e JavaScript puros",
          "Construção de componentes reutilizáveis com controle de estados manual, sem React ou biblioteca equivalente",
          "Seções administrativas separadas por responsabilidade: usuários, grupos, comandos, logs, estatísticas e configurações",
          "Integração com back-end Laravel e implementação de scripts de tracking UTM para rastreamento de campanhas entre páginas de venda e o bot",
        ],
        insights: {
          desafio: "Startup de vendas via Telegram precisava centralizar bots, usuários, grupos, comandos e métricas em um painel administrativo construído com uma stack limitada.",
          solucao: "Front-end completo em HTML, CSS e JavaScript puros, com componentes reutilizáveis, controle de estados manual e integração ao back-end Laravel.",
          resultado: "Sistema funcional entregue em produção para uma startup em operação. Construir dashboard sem framework moderno exigiu domínio real de CSS e JS puros, base técnica que consolidou meu entendimento de estado, componentes e interação antes de migrar para React.",
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
          "Une startup de vente via Telegram avait besoin d'un panneau d'administration pour gérer bots, utilisateurs, groupes, commandes et métriques opérationnelles. Premier système avec tableau de bord que j'ai développé, livré avec les limites de stack de ma première année en tant que dev front-end.",
        descricaoResumida:
          "Premier tableau de bord administratif que j'ai développé : panneau pour bots, utilisateurs, groupes, commandes et métriques opérationnelles d'une startup de vente via Telegram.",
        metricas: [
          { label: "Équipe", valor: "3 devs" },
          { label: "Construction", valor: "Depuis zéro" },
          { label: "Contexte", valor: "Startup" },
          { label: "Plateforme", valor: "Web" },
        ],
        responsabilidade: [
          "Développement complet du front-end du panneau d'administration : sans framework moderne, en HTML, CSS et JavaScript purs",
          "Construction de composants réutilisables avec gestion manuelle des états, sans React ni bibliothèque équivalente",
          "Sections d'administration séparées par responsabilité : utilisateurs, groupes, commandes, logs, statistiques et configurations",
          "Intégration au back-end Laravel et scripts de tracking UTM pour suivre les campagnes entre pages de vente et bot",
        ],
        insights: {
          desafio: "Une startup de vente via Telegram devait centraliser bots, utilisateurs, groupes, commandes et métriques dans un panneau d'administration construit avec une stack limitée.",
          solucao: "Front-end complet en HTML, CSS et JavaScript purs, avec composants réutilisables, gestion manuelle des états et intégration au back-end Laravel.",
          resultado: "Système fonctionnel livré en production pour une startup en activité. Construire un tableau de bord sans framework moderne a exigé une vraie maîtrise du CSS et du JS purs, la base technique qui a consolidé ma compréhension de l'état, des composants et de l'interaction avant de passer à React.",
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
]
