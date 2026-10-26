import type { Locale } from "./locale-context"

/**
 * Textos de interface (chrome do site). Conteúdo editorial longo — sobre,
 * qualificações, projetos, skills — vive em `@/lib/content`, `@/data/projects`
 * e `@/lib/skill-showcase-items`.
 *
 * `en-us` é a fonte da verdade: o tipo `Dictionary` deriva dele, então uma
 * chave nova quebra o build até ser traduzida nos outros idiomas.
 */
const enUS = {
  nav: {
    inicio: "Home",
    sobre: "About",
    habilidades: "Skills",
    projetos: "Projects",
    processo: "Process",
    contato: "Contact",
  },

  common: {
    backToTop: "Back to top",
    toggleTheme: "Toggle theme",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    languageMenu: "Choose language",
    sectionsNav: "Page sections",
  },

  hero: {
    greeting: "Hey, I'm Luiz,",
    titleBefore: "",
    titleAccent: "Front-end",
    titleAfter: "Developer",
    paragraph:
      "3+ years focused on modern interfaces and fluid experiences: React, TypeScript and Laravel, from layout to shipped product.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    stats: {
      years: "Years of experience",
      projects: "Portfolio projects",
      companies: "Companies",
    },
    stackTitle: "Tech stack",
    scrollCue: "Scroll to discover more",
    features: [
      { title: "Front-end", description: "Responsive, interactive UIs with a focus on UX and performance." },
      { title: "Back-end", description: "Node.js and Laravel: integrations, forms and security." },
      { title: "Mobile", description: "Exploring Flutter and Dart for mobile experiences." },
      { title: "Collaboration", description: "Git and agile workflows for effective teamwork." },
    ],
  },

  about: {
    eyebrow: "About",
    slogan: "Interfaces that feel fast, because they are.",
    title: "Who am I?",
    highlights: [
      "Software Engineering, Unicesumar",
      "3+ years in digital product",
      "React · TypeScript · Node",
    ],
    credentials: [
      { title: "Software Engineering", detail: "Unicesumar · since 2024" },
      { title: "English & French", detail: "Fluency Academy" },
      { title: "years of study", detail: "Building for the web, every day" },
    ],
    qualificationsTitle: "Skill set",
    qualificationOpen: (name: string) => `Expand ${name}`,
    qualificationClose: (name: string) => `Collapse ${name}`,
    experienceTitle: "Professional experience",
    detailHighlights: "What I did",
    detailStack: "Stack",
    visitSite: "Visit site",
  },

  skills: {
    eyebrow: "Skills",
    title: "Tech stack",
    intro:
      "Scroll to stack each area: what I use, how I apply it day to day and how comfortable I am with each tool.",
    categories: {
      linguagens: {
        title: "Languages",
        subtitle:
          "The languages I work with day to day: what each one is for, where I apply it and how it fits into my workflow.",
      },
      front: {
        title: "Front-end",
        subtitle:
          "The tools I use to build screens, navigation and user experience, from markup to the frameworks that ship the product.",
      },
      back: {
        title: "Back-end",
        subtitle:
          "The layer where I support integrations, APIs and data validation, aligning what the interface promises with what the server guarantees.",
      },
      outros: {
        title: "Others",
        subtitle:
          "The ecosystem around the code: utility styling, design systems, versioning, deploys and everything that speeds up quality delivery.",
      },
    },
    categoriesNavAria: "Skill category navigation",
    goToCategory: (title: string) => `Go to ${title}`,
    panel: {
      empty: "No skills in this category.",
      skillsNavAria: "Skills in this category",
      whatIs: "What it is",
      howIUse: "How I use it",
      level: "Proficiency",
    },
  },

  projects: {
    eyebrow: "Projects",
    title: "My journey",
    description:
      "Drag or scroll sideways through the carousel and click the centered project to open everything about it: context, numbers, stack and decisions.",
    filter: {
      aria: "Filter projects by type",
      profissional: "Professional projects",
      pessoal: "Personal projects",
    },
    mode: {
      aria: "Project presentation mode",
      visual: "Visual",
      tecnico: "Technical",
    },
    category: {
      aria: "Filter projects",
      all: "All projects",
      sistema: "Systems",
      lp: "LPs",
    },
    view: {
      aria: "Projects view",
      carousel: "Carousel",
      timeline: "Timeline",
    },
    timeline: {
      aria: "Project timeline: most recent on the left, oldest on the right",
      caption: "Evolution · project constellation",
      empty: "No projects in this category.",
      mostRecent: "Most recent",
      position: (index: number) => `Position ${index}`,
      itemAria: (name: string, selected: boolean) =>
        `Project: ${name}${selected ? " (selected)" : ""}`,
    },
    tabs: {
      aria: "Projects in this category",
      empty: "No projects in this category.",
    },
    card: {
      platform: "Platform",
      aboutHeading: "About the project",
      noPlatformRef: "No web or mobile reference in this entry.",
      contentShownFor: (platform: string) => `Content shown for ${platform}.`,
      responsibility: "My responsibility",
      techHidden: (count: number) =>
        `+${count} ${count === 1 ? "technology" : "technologies"} in the technical view`,
      result: "Outcome",
      visit: "Visit project",
      viewFigma: "View on Figma",
      noImageBefore: "No image for this platform. Add a URL in",
      noImageAfter: ".",
      previewGroup: (platform: string) => `${platform} preview`,
      previewAlt: (platform: string, name: string) =>
        `Preview (${platform}): ${name}`,
      logoAlt: (name: string) => `${name} logo`,
    },
    categoryLabels: {
      web: "Web",
      app: "App",
      sistema: "System",
      lp: "Landing page",
    },
    platformLabels: {
      web: "Web",
      mobile: "Mobile",
    },
    technologies: "Technologies",
    technical: {
      stack: "Detailed stack",
      decisions: "Technical decisions",
      challenges: "Additional challenges",
    },
    insights: {
      heading: "Technical highlight",
      desafio: "Challenge",
      solucao: "Solution",
      resultado: "Outcome",
    },
    evolution: "Growth and takeaways",
  },

  process: {
    eyebrow: "Process",
    title: "How I work",
    intro:
      "From the first conversation to the version in production: four steps that keep the interface, the code and the deadline on the same page.",
    stepLabel: "Step",
    detailsTitle: "How it works",
    deliverablesTitle: "What you get",
    toolsTitle: "Tools",
    durationTitle: "Typical duration",
    openDetails: "See details",
    close: "Close",
    steps: [
      {
        title: "Understand",
        description:
          "Before any code, I align goals, users and constraints, and map the flows that actually matter for the product.",
        tools: ["Briefing", "User flows", "Notion"],
        details:
          "I start by listening: who uses the product, what problem it solves and what success looks like. From there I map the flows that matter, list the business rules and constraints (deadline, budget, legacy, integrations) and turn everything into a clear scope, so nobody is surprised halfway through.",
        deliverables: ["Scope with goals and priorities", "Map of the main user flows", "List of rules, integrations and risks", "Milestone plan"],
        duration: "1 to 2 weeks",
      },
      {
        title: "Design",
        description:
          "I shape the interface in Figma and turn it into a consistent system of components, tokens and states.",
        tools: ["Figma", "Design system", "Tailwind"],
        details:
          "With the flows defined, I design the screens in Figma, starting from the most important path. Before polishing, I validate the structure; then I build a small design system (colors, type, spacing, components and their states) that the code follows one to one.",
        deliverables: ["Navigable prototype in Figma", "Components with states (hover, loading, empty, error)", "Design tokens ready for Tailwind", "Responsive versions"],
        duration: "1 to 3 weeks",
      },
      {
        title: "Build",
        description:
          "Typed, componentized front-end integrated with the APIs, with performance and accessibility from the start.",
        tools: ["React", "Next.js", "TypeScript", "Laravel"],
        details:
          "The interface becomes typed, componentized code that talks to the API through a documented contract. I take care of loading and error states, accessibility, performance and SEO from the start, and the work ships in small steps you can see and test along the way.",
        deliverables: ["Front-end in React / Next.js with TypeScript", "API integration with a documented contract", "Accessibility and performance from day one", "Preview links for every delivery"],
        duration: "2 to 8 weeks",
      },
      {
        title: "Ship & evolve",
        description:
          "Deploy with previews, follow what happens in production and keep improving, including legacy systems that can't stop.",
        tools: ["Vercel", "Git", "Monitoring"],
        details:
          "Going live is a step, not the end. I set up deploys with previews, follow what happens in production and keep improving with real feedback, including legacy systems that can't stop, where each change goes in carefully and without regressions.",
        deliverables: ["Deploy with preview and production environments", "Monitoring and error tracking", "Fixes and improvements in short cycles", "Technical documentation for the team"],
        duration: "Ongoing",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk?",
    intro:
      "Pick a channel below or send the form. It opens WhatsApp with the message already written from your details.",
    linksAria: "Contact links and social networks",
    emailLabel: "E-mail",
    resumeLabel: "Résumé",
    resumeDetail: "download PDF",
    formNoteBefore: "Channel for",
    formNoteStrong: "professional enquiries",
    formNoteAfter: ": opportunities, projects and partnerships.",
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailPlaceholder: "you@email.com",
    messageLabel: "Message",
    messagePlaceholder: "In a few lines: what you need or how I can help.",
    previewHeading: "Message preview",
    submit: "Send message on WhatsApp",
    openForm: "Write a message",
    closeForm: "Close message form",
    messageTemplate: (name: string, message: string, email: string) =>
      `Hi, I'm ${name}, and ${message}. You can reach me at ${email}.`,
    templatePlaceholders: {
      name: "[your name]",
      message: "[your message]",
      email: "[your e-mail]",
    },
    footerRights: (year: number) =>
      `© ${year} Luiz Henrique. All rights reserved.`,
    footerBuilt: "Built with Next.js, Tailwind, shadcn/ui and Three.js.",
  },
}

export type Dictionary = typeof enUS

const ptBR: Dictionary = {
  nav: {
    inicio: "Início",
    sobre: "Sobre",
    habilidades: "Habilidades",
    projetos: "Projetos",
    processo: "Processo",
    contato: "Contato",
  },

  common: {
    backToTop: "Voltar ao topo",
    toggleTheme: "Alternar tema",
    themeToLight: "Mudar para o modo claro",
    themeToDark: "Mudar para o modo escuro",
    languageMenu: "Escolher idioma",
    sectionsNav: "Seções da página",
  },

  hero: {
    greeting: "Olá, eu sou o Luiz,",
    titleBefore: "Desenvolvedor",
    titleAccent: "Front-end",
    titleAfter: "",
    paragraph:
      "3+ anos focado em interfaces modernas e experiências fluidas: React, TypeScript e Laravel, do layout ao produto no ar.",
    ctaProjects: "Ver projetos",
    ctaContact: "Falar comigo",
    stats: {
      years: "Anos de experiência",
      projects: "Projetos no portfólio",
      companies: "Empresas",
    },
    stackTitle: "Stack",
    scrollCue: "Role para descobrir mais",
    features: [
      { title: "Front-end", description: "Interfaces responsivas e interativas com foco em UX e performance." },
      { title: "Back-end", description: "Node.js e Laravel: integrações, formulários e segurança." },
      { title: "Mobile", description: "Explorando Flutter e Dart em experiências mobile." },
      { title: "Colaboração", description: "Git e metodologias ágeis para trabalhar bem em equipe." },
    ],
  },

  about: {
    eyebrow: "Sobre",
    slogan: "Interfaces que parecem rápidas, porque são.",
    title: "Quem sou eu?",
    highlights: [
      "Eng. de Software, Unicesumar",
      "3+ anos em produto digital",
      "React · TypeScript · Node",
    ],
    credentials: [
      { title: "Engenharia de Software", detail: "Unicesumar · desde 2024" },
      { title: "Inglês e Francês", detail: "Fluency Academy" },
      { title: "anos de estudo", detail: "Construindo para a web, todo dia" },
    ],
    qualificationsTitle: "Capacitações",
    qualificationOpen: (name: string) => `Expandir ${name}`,
    qualificationClose: (name: string) => `Recolher ${name}`,
    experienceTitle: "Experiência de mercado",
    detailHighlights: "O que eu fiz",
    detailStack: "Stack",
    visitSite: "Visitar site",
  },

  skills: {
    eyebrow: "Habilidades",
    title: "Stack técnica",
    intro:
      "Role para empilhar cada área: o que eu uso, como aplico no dia a dia e meu nível em cada ferramenta.",
    categories: {
      linguagens: {
        title: "Linguagens",
        subtitle:
          "Apresentação das linguagens que uso no dia a dia: o papel de cada uma, onde aplico e como encaixam no meu fluxo de trabalho.",
      },
      front: {
        title: "Front-end",
        subtitle:
          "Ferramentas com que estruturo telas, navegação e experiência do utilizador, da marcação às frameworks que entregam o produto.",
      },
      back: {
        title: "Back-end",
        subtitle:
          "Camada em que apoio integrações, APIs e validação de dados, alinhando o que a interface promete com o que o servidor garante.",
      },
      outros: {
        title: "Outros",
        subtitle:
          "Ecossistema em volta do código: estilização utilitária, design system, versionamento, deploy e tudo o que acelera a entrega com qualidade.",
      },
    },
    categoriesNavAria: "Navegação das categorias de habilidades",
    goToCategory: (title: string) => `Ir para ${title}`,
    panel: {
      empty: "Nenhuma habilidade nesta categoria.",
      skillsNavAria: "Habilidades da categoria",
      whatIs: "O que é",
      howIUse: "Como uso",
      level: "Domínio",
    },
  },

  projects: {
    eyebrow: "Projetos",
    title: "Minha jornada",
    description:
      "Arraste ou role para o lado no carrossel e clique no projeto em destaque para abrir tudo sobre ele: contexto, números, stack e decisões.",
    filter: {
      aria: "Filtrar projetos por tipo",
      profissional: "Projetos profissionais",
      pessoal: "Projetos pessoais",
    },
    mode: {
      aria: "Modo de apresentação do projeto",
      visual: "Visual",
      tecnico: "Técnico",
    },
    category: {
      aria: "Filtrar projetos",
      all: "Todos os projetos",
      sistema: "Sistemas",
      lp: "LPs",
    },
    view: {
      aria: "Visualização dos projetos",
      carousel: "Carrossel",
      timeline: "Linha do tempo",
    },
    timeline: {
      aria: "Linha do tempo dos projetos: mais recente à esquerda, mais antigo à direita",
      caption: "Evolução · constelação de projetos",
      empty: "Nenhum projeto nesta categoria.",
      mostRecent: "Mais recente",
      position: (index: number) => `Posição ${index}`,
      itemAria: (name: string, selected: boolean) =>
        `Projeto: ${name}${selected ? " (selecionado)" : ""}`,
    },
    tabs: {
      aria: "Projetos nesta categoria",
      empty: "Nenhum projeto nesta categoria.",
    },
    card: {
      platform: "Plataforma",
      aboutHeading: "Sobre o projeto",
      noPlatformRef: "Sem referência web ou mobile neste registo.",
      contentShownFor: (platform: string) => `Conteúdo mostrado para ${platform}.`,
      responsibility: "Minha responsabilidade",
      techHidden: (count: number) =>
        `+${count} ${count === 1 ? "tecnologia" : "tecnologias"} na vista técnica`,
      result: "Resultado",
      visit: "Visitar projeto",
      viewFigma: "Ver no Figma",
      noImageBefore: "Sem imagem para esta plataforma. Adicione URL em",
      noImageAfter: ".",
      previewGroup: (platform: string) => `Pré-visualização ${platform}`,
      previewAlt: (platform: string, name: string) =>
        `Pré-visualização (${platform}): ${name}`,
      logoAlt: (name: string) => `Logo ${name}`,
    },
    categoryLabels: {
      web: "Web",
      app: "App",
      sistema: "Sistema",
      lp: "Landing page",
    },
    platformLabels: {
      web: "Web",
      mobile: "Mobile",
    },
    technologies: "Tecnologias",
    technical: {
      stack: "Stack detalhada",
      decisions: "Decisões técnicas",
      challenges: "Desafios adicionais",
    },
    insights: {
      heading: "Diferencial técnico",
      desafio: "Desafio",
      solucao: "Solução",
      resultado: "Resultado",
    },
    evolution: "Evolução e aprendizados",
  },

  process: {
    eyebrow: "Processo",
    title: "Como eu trabalho",
    intro:
      "Da primeira conversa à versão em produção: quatro etapas que mantêm a interface, o código e o prazo alinhados.",
    stepLabel: "Etapa",
    detailsTitle: "Como funciona",
    deliverablesTitle: "O que você recebe",
    toolsTitle: "Ferramentas",
    durationTitle: "Duração típica",
    openDetails: "Ver detalhes",
    close: "Fechar",
    steps: [
      {
        title: "Entender",
        description:
          "Antes de qualquer código, alinho objetivos, usuários e restrições, e mapeio os fluxos que realmente importam para o produto.",
        tools: ["Briefing", "Fluxos", "Notion"],
        details:
          "Começo ouvindo: quem usa o produto, qual problema ele resolve e como é o sucesso. A partir daí mapeio os fluxos que importam, levanto as regras de negócio e as restrições (prazo, orçamento, legado, integrações) e transformo tudo num escopo claro, para ninguém ter surpresa no meio do caminho.",
        deliverables: ["Escopo com objetivos e prioridades", "Mapa dos principais fluxos de uso", "Lista de regras, integrações e riscos", "Plano de entregas por etapa"],
        duration: "1 a 2 semanas",
      },
      {
        title: "Desenhar",
        description:
          "Dou forma à interface no Figma e transformo em um sistema consistente de componentes, tokens e estados.",
        tools: ["Figma", "Design system", "Tailwind"],
        details:
          "Com os fluxos definidos, desenho as telas no Figma, começando pelo caminho mais importante. Antes de refinar, valido a estrutura; depois monto um pequeno design system (cores, tipografia, espaçamentos, componentes e seus estados) que o código segue um para um.",
        deliverables: ["Protótipo navegável no Figma", "Componentes com estados (hover, carregando, vazio, erro)", "Tokens de design prontos para o Tailwind", "Versões responsivas"],
        duration: "1 a 3 semanas",
      },
      {
        title: "Construir",
        description:
          "Front-end tipado e componentizado, integrado às APIs, com performance e acessibilidade desde o começo.",
        tools: ["React", "Next.js", "TypeScript", "Laravel"],
        details:
          "A interface vira código tipado e componentizado, conversando com a API por um contrato documentado. Cuido de estados de carregamento e erro, acessibilidade, performance e SEO desde o início, e o trabalho é entregue em pequenas etapas que você vê e testa ao longo do caminho.",
        deliverables: ["Front-end em React / Next.js com TypeScript", "Integração com a API com contrato documentado", "Acessibilidade e performance desde o início", "Links de preview a cada entrega"],
        duration: "2 a 8 semanas",
      },
      {
        title: "Entregar e evoluir",
        description:
          "Deploy com previews, acompanhamento do que acontece em produção e melhoria contínua, inclusive em sistemas legados que não podem parar.",
        tools: ["Vercel", "Git", "Monitoramento"],
        details:
          "Ir para o ar é uma etapa, não o fim. Configuro deploys com preview, acompanho o que acontece em produção e sigo melhorando com feedback real, inclusive em sistemas legados que não podem parar, onde cada mudança entra com cuidado e sem regressões.",
        deliverables: ["Deploy com ambientes de preview e produção", "Monitoramento e rastreio de erros", "Correções e melhorias em ciclos curtos", "Documentação técnica para a equipe"],
        duration: "Contínuo",
      },
    ],
  },

  contact: {
    eyebrow: "Contato",
    title: "Vamos conversar?",
    intro:
      "Escolha um canal abaixo ou envie o formulário. Ele abre o WhatsApp com a mensagem já montada com os seus dados.",
    linksAria: "Links de contato e redes",
    emailLabel: "E-mail",
    resumeLabel: "Currículo",
    resumeDetail: "download PDF",
    formNoteBefore: "Canal para",
    formNoteStrong: "contatos profissionais",
    formNoteAfter: ": oportunidades, projetos e parcerias.",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome completo",
    emailPlaceholder: "seu@email.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Em poucas linhas: o que você precisa ou como posso ajudar.",
    previewHeading: "Prévia da mensagem",
    submit: "Enviar mensagem no WhatsApp",
    openForm: "Escrever mensagem",
    closeForm: "Fechar formulário de mensagem",
    messageTemplate: (name: string, message: string, email: string) =>
      `Olá, sou ${name}, e ${message}. Entre em contato através do e-mail ${email}.`,
    templatePlaceholders: {
      name: "[seu nome]",
      message: "[sua mensagem]",
      email: "[seu e-mail]",
    },
    footerRights: (year: number) =>
      `© ${year} Luiz Henrique. Todos os direitos reservados.`,
    footerBuilt: "Feito com Next.js, Tailwind, shadcn/ui e Three.js.",
  },
}

const frFR: Dictionary = {
  nav: {
    inicio: "Accueil",
    sobre: "À propos",
    habilidades: "Compétences",
    projetos: "Projets",
    processo: "Méthode",
    contato: "Contact",
  },

  common: {
    backToTop: "Retour en haut",
    toggleTheme: "Changer de thème",
    themeToLight: "Passer en mode clair",
    themeToDark: "Passer en mode sombre",
    languageMenu: "Choisir la langue",
    sectionsNav: "Sections de la page",
  },

  hero: {
    greeting: "Salut, je suis Luiz,",
    titleBefore: "Développeur",
    titleAccent: "Front-end",
    titleAfter: "",
    paragraph:
      "3+ ans axé sur les interfaces modernes et les expériences fluides : React, TypeScript et Laravel, de la maquette au produit en ligne.",
    ctaProjects: "Voir les projets",
    ctaContact: "Me contacter",
    stats: {
      years: "Années d'expérience",
      projects: "Projets du portfolio",
      companies: "Entreprises",
    },
    stackTitle: "Stack technique",
    scrollCue: "Faites défiler pour en découvrir plus",
    features: [
      { title: "Front-end", description: "Interfaces responsives et interactives axées UX et performance." },
      { title: "Back-end", description: "Node.js et Laravel : intégrations, formulaires et sécurité." },
      { title: "Mobile", description: "Exploration de Flutter et Dart pour le mobile." },
      { title: "Collaboration", description: "Git et méthodes agiles pour un travail d'équipe efficace." },
    ],
  },

  about: {
    eyebrow: "À propos",
    slogan: "Des interfaces qui semblent rapides, parce qu’elles le sont.",
    title: "Qui suis-je ?",
    highlights: [
      "Génie logiciel, Unicesumar",
      "3+ ans en produit numérique",
      "React · TypeScript · Node",
    ],
    credentials: [
      { title: "Génie logiciel", detail: "Unicesumar · depuis 2024" },
      { title: "Anglais et français", detail: "Fluency Academy" },
      { title: "ans d’études", detail: "Construire pour le web, chaque jour" },
    ],
    qualificationsTitle: "Compétences",
    qualificationOpen: (name: string) => `Développer ${name}`,
    qualificationClose: (name: string) => `Réduire ${name}`,
    experienceTitle: "Expérience professionnelle",
    detailHighlights: "Ce que j’ai fait",
    detailStack: "Stack",
    visitSite: "Voir le site",
  },

  skills: {
    eyebrow: "Compétences",
    title: "Stack technique",
    intro:
      "Faites défiler pour empiler chaque domaine : ce que j'utilise, comment je l'applique au quotidien et mon niveau sur chaque outil.",
    categories: {
      linguagens: {
        title: "Langages",
        subtitle:
          "Les langages que j'utilise au quotidien : le rôle de chacun, où je les applique et comment ils s'intègrent à mon flux de travail.",
      },
      front: {
        title: "Front-end",
        subtitle:
          "Les outils avec lesquels je structure écrans, navigation et expérience utilisateur, du balisage aux frameworks qui livrent le produit.",
      },
      back: {
        title: "Back-end",
        subtitle:
          "La couche où j'appuie intégrations, API et validation des données, en alignant ce que promet l'interface avec ce que garantit le serveur.",
      },
      outros: {
        title: "Autres",
        subtitle:
          "L'écosystème autour du code : style utilitaire, design system, versionnement, déploiement et tout ce qui accélère une livraison de qualité.",
      },
    },
    categoriesNavAria: "Navigation des catégories de compétences",
    goToCategory: (title: string) => `Aller à ${title}`,
    panel: {
      empty: "Aucune compétence dans cette catégorie.",
      skillsNavAria: "Compétences de la catégorie",
      whatIs: "Ce que c'est",
      howIUse: "Comment je l'utilise",
      level: "Maîtrise",
    },
  },

  projects: {
    eyebrow: "Projets",
    title: "Mon parcours",
    description:
      "Faites glisser ou défiler latéralement le carrousel et cliquez sur le projet au centre pour tout voir : contexte, chiffres, stack et décisions.",
    filter: {
      aria: "Filtrer les projets par type",
      profissional: "Projets professionnels",
      pessoal: "Projets personnels",
    },
    mode: {
      aria: "Mode de présentation du projet",
      visual: "Visuel",
      tecnico: "Technique",
    },
    category: {
      aria: "Filtrer les projets",
      all: "Tous les projets",
      sistema: "Systèmes",
      lp: "LPs",
    },
    view: {
      aria: "Affichage des projets",
      carousel: "Carrousel",
      timeline: "Chronologie",
    },
    timeline: {
      aria: "Chronologie des projets : le plus récent à gauche, le plus ancien à droite",
      caption: "Évolution · constellation de projets",
      empty: "Aucun projet dans cette catégorie.",
      mostRecent: "Le plus récent",
      position: (index: number) => `Position ${index}`,
      itemAria: (name: string, selected: boolean) =>
        `Projet : ${name}${selected ? " (sélectionné)" : ""}`,
    },
    tabs: {
      aria: "Projets de cette catégorie",
      empty: "Aucun projet dans cette catégorie.",
    },
    card: {
      platform: "Plateforme",
      aboutHeading: "À propos du projet",
      noPlatformRef: "Aucune référence web ou mobile dans cette fiche.",
      contentShownFor: (platform: string) => `Contenu affiché pour ${platform}.`,
      responsibility: "Ma responsabilité",
      techHidden: (count: number) =>
        `+${count} ${count === 1 ? "technologie" : "technologies"} dans la vue technique`,
      result: "Résultat",
      visit: "Visiter le projet",
      viewFigma: "Voir sur Figma",
      noImageBefore: "Aucune image pour cette plateforme. Ajoutez une URL dans",
      noImageAfter: ".",
      previewGroup: (platform: string) => `Aperçu ${platform}`,
      previewAlt: (platform: string, name: string) => `Aperçu (${platform}): ${name}`,
      logoAlt: (name: string) => `Logo ${name}`,
    },
    categoryLabels: {
      web: "Web",
      app: "App",
      sistema: "Système",
      lp: "Landing page",
    },
    platformLabels: {
      web: "Web",
      mobile: "Mobile",
    },
    technologies: "Technologies",
    technical: {
      stack: "Stack détaillée",
      decisions: "Décisions techniques",
      challenges: "Défis supplémentaires",
    },
    insights: {
      heading: "Différenciateur technique",
      desafio: "Défi",
      solucao: "Solution",
      resultado: "Résultat",
    },
    evolution: "Évolution et apprentissages",
  },

  process: {
    eyebrow: "Méthode",
    title: "Comment je travaille",
    intro:
      "De la première conversation à la version en production : quatre étapes qui gardent l’interface, le code et le délai alignés.",
    stepLabel: "Étape",
    detailsTitle: "Comment ça marche",
    deliverablesTitle: "Ce que vous recevez",
    toolsTitle: "Outils",
    durationTitle: "Durée typique",
    openDetails: "Voir les détails",
    close: "Fermer",
    steps: [
      {
        title: "Comprendre",
        description:
          "Avant tout code, j’aligne objectifs, utilisateurs et contraintes, et je cartographie les parcours qui comptent vraiment pour le produit.",
        tools: ["Brief", "Parcours", "Notion"],
        details:
          "Je commence par écouter : qui utilise le produit, quel problème il résout et à quoi ressemble la réussite. Ensuite je cartographie les parcours qui comptent, je liste les règles métier et les contraintes (délai, budget, legacy, intégrations) et je transforme le tout en un périmètre clair, pour éviter les surprises en cours de route.",
        deliverables: ["Périmètre avec objectifs et priorités", "Carte des principaux parcours", "Liste des règles, intégrations et risques", "Plan de livraison par étape"],
        duration: "1 à 2 semaines",
      },
      {
        title: "Concevoir",
        description:
          "Je donne forme à l’interface dans Figma et je la transforme en un système cohérent de composants, tokens et états.",
        tools: ["Figma", "Design system", "Tailwind"],
        details:
          "Une fois les parcours définis, je dessine les écrans dans Figma, en commençant par le chemin le plus important. Avant de peaufiner, je valide la structure ; puis je monte un petit design system (couleurs, typographie, espacements, composants et leurs états) que le code suit à l’identique.",
        deliverables: ["Prototype navigable dans Figma", "Composants avec états (survol, chargement, vide, erreur)", "Design tokens prêts pour Tailwind", "Versions responsives"],
        duration: "1 à 3 semaines",
      },
      {
        title: "Développer",
        description:
          "Un front-end typé et composé, intégré aux API, avec performance et accessibilité dès le départ.",
        tools: ["React", "Next.js", "TypeScript", "Laravel"],
        details:
          "L’interface devient du code typé et componentisé, qui dialogue avec l’API via un contrat documenté. Je soigne les états de chargement et d’erreur, l’accessibilité, la performance et le SEO dès le départ, et le travail est livré par petites étapes que vous voyez et testez au fil de l’eau.",
        deliverables: ["Front-end en React / Next.js avec TypeScript", "Intégration API avec contrat documenté", "Accessibilité et performance dès le premier jour", "Liens de preview à chaque livraison"],
        duration: "2 à 8 semaines",
      },
      {
        title: "Livrer et faire évoluer",
        description:
          "Déploiement avec previews, suivi de la production et amélioration continue, y compris sur des systèmes legacy qui ne peuvent pas s’arrêter.",
        tools: ["Vercel", "Git", "Monitoring"],
        details:
          "La mise en ligne est une étape, pas la fin. Je mets en place des déploiements avec preview, je suis ce qui se passe en production et je continue d’améliorer avec des retours réels, y compris sur des systèmes legacy qui ne peuvent pas s’arrêter, où chaque changement entre avec soin et sans régression.",
        deliverables: ["Déploiement avec environnements de preview et de production", "Monitoring et suivi des erreurs", "Corrections et améliorations en cycles courts", "Documentation technique pour l’équipe"],
        duration: "En continu",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "On en discute ?",
    intro:
      "Choisissez un canal ci-dessous ou envoyez le formulaire. Il ouvre WhatsApp avec le message déjà rédigé à partir de vos informations.",
    linksAria: "Liens de contact et réseaux",
    emailLabel: "E-mail",
    resumeLabel: "CV",
    resumeDetail: "télécharger le PDF",
    formNoteBefore: "Canal pour les",
    formNoteStrong: "contacts professionnels",
    formNoteAfter: " : opportunités, projets et partenariats.",
    nameLabel: "Nom",
    namePlaceholder: "Votre nom complet",
    emailPlaceholder: "vous@email.com",
    messageLabel: "Message",
    messagePlaceholder: "En quelques lignes : ce dont vous avez besoin ou comment je peux aider.",
    previewHeading: "Aperçu du message",
    submit: "Envoyer le message sur WhatsApp",
    openForm: "Écrire un message",
    closeForm: "Fermer le formulaire de message",
    messageTemplate: (name: string, message: string, email: string) =>
      `Bonjour, je suis ${name}, et ${message}. Vous pouvez me contacter à l'adresse ${email}.`,
    templatePlaceholders: {
      name: "[votre nom]",
      message: "[votre message]",
      email: "[votre e-mail]",
    },
    footerRights: (year: number) => `© ${year} Luiz Henrique. Tous droits réservés.`,
    footerBuilt: "Réalisé avec Next.js, Tailwind, shadcn/ui et Three.js.",
  },
}

export const dictionaries: Record<Locale, Dictionary> = {
  "en-us": enUS,
  "pt-br": ptBR,
  "fr-fr": frFR,
}
