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
    contato: "Contact",
  },

  common: {
    backToTop: "Back to top",
    toggleTheme: "Toggle theme",
    languageMenu: "Choose language",
  },

  hero: {
    titleLine1: "Front-end",
    titleLine2: "Developer focused on",
    titleGradient1: "modern interfaces",
    titleConnector: "and",
    titleGradient2: "fluid experiences",
    paragraph:
      "I'm Luiz Rodrigues, a front-end developer with experience in React, Laravel and building modern web interfaces.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    scrollHint: "Continue",
  },

  about: {
    eyebrow: "About",
    title: "Who am I?",
    highlights: [
      "Software Engineering — Unicesumar",
      "2+ years in digital product",
      "React · TypeScript · Node",
    ],
    qualificationsTitle: "Skill set",
    experienceTitle: "Professional experience",
  },

  skills: {
    eyebrow: "Skills",
    title: "Horizontal gallery",
    intro:
      "Vertical scrolling moves the cards horizontally. Once you reach the last one, vertical scrolling goes back to normal.",
    categories: {
      linguagens: {
        title: "Languages",
        subtitle:
          "The languages I work with day to day: what each one is for, where I apply it and how it fits into my workflow.",
      },
      front: {
        title: "Front-end",
        subtitle:
          "The tools I use to build screens, navigation and user experience — from markup to the frameworks that ship the product.",
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
      "Walk through the timeline constellation — from the most recent to the oldest. Use Visual mode for a quick read or Technical to dig into decisions and stack.",
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
        `Preview (${platform}) — ${name}`,
      logoAlt: (name: string) => `${name} logo`,
    },
    categoryLabels: {
      web: "Web",
      app: "App",
      sistema: "System",
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

  contact: {
    eyebrow: "Contact",
    title: "Let's talk?",
    intro:
      "Pick a channel below or send the form — it opens WhatsApp with the message already written from your details.",
    linksAria: "Contact links and social networks",
    emailLabel: "E-mail",
    resumeLabel: "Résumé",
    resumeDetail: "download PDF",
    formNoteBefore: "Channel for",
    formNoteStrong: "professional enquiries",
    formNoteAfter: "— opportunities, projects and partnerships.",
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailPlaceholder: "you@email.com",
    messageLabel: "Message",
    messagePlaceholder: "In a few lines: what you need or how I can help.",
    previewHeading: "Message preview",
    submit: "Send message on WhatsApp",
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
    contato: "Contato",
  },

  common: {
    backToTop: "Voltar ao topo",
    toggleTheme: "Alternar tema",
    languageMenu: "Escolher idioma",
  },

  hero: {
    titleLine1: "Desenvolvedor",
    titleLine2: "Front-end focado em",
    titleGradient1: "interfaces modernas",
    titleConnector: "e",
    titleGradient2: "experiências fluidas",
    paragraph:
      "Eu sou o Luiz Rodrigues, desenvolvedor Front-end com experiência em React, Laravel e construção de interfaces modernas para web.",
    ctaProjects: "Ver projetos",
    ctaContact: "Falar comigo",
    scrollHint: "Continuar",
  },

  about: {
    eyebrow: "Sobre",
    title: "Quem sou eu?",
    highlights: [
      "Eng. de Software — Unicesumar",
      "2+ anos em produto digital",
      "React · TypeScript · Node",
    ],
    qualificationsTitle: "Capacitações",
    experienceTitle: "Experiência de mercado",
  },

  skills: {
    eyebrow: "Habilidades",
    title: "Galeria horizontal",
    intro:
      "Scroll vertical percorre os cards horizontalmente. Ao chegar no último, o scroll vertical volta ao normal.",
    categories: {
      linguagens: {
        title: "Linguagens",
        subtitle:
          "Apresentação das linguagens que uso no dia a dia: o papel de cada uma, onde aplico e como encaixam no meu fluxo de trabalho.",
      },
      front: {
        title: "Front-end",
        subtitle:
          "Ferramentas com que estruturo telas, navegação e experiência do utilizador — da marcação às frameworks que entregam o produto.",
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
      "Percorra a constelação da linha do tempo — do mais recente ao mais antigo. Use o modo Visual para uma leitura rápida ou Técnico para aprofundar decisões e stack.",
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
        `Pré-visualização (${platform}) — ${name}`,
      logoAlt: (name: string) => `Logo ${name}`,
    },
    categoryLabels: {
      web: "Web",
      app: "App",
      sistema: "Sistema",
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

  contact: {
    eyebrow: "Contato",
    title: "Vamos conversar?",
    intro:
      "Escolha um canal abaixo ou envie o formulário — ele abre o WhatsApp com a mensagem já montada com os seus dados.",
    linksAria: "Links de contato e redes",
    emailLabel: "E-mail",
    resumeLabel: "Currículo",
    resumeDetail: "download PDF",
    formNoteBefore: "Canal para",
    formNoteStrong: "contatos profissionais",
    formNoteAfter: "— oportunidades, projetos e parcerias.",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome completo",
    emailPlaceholder: "seu@email.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Em poucas linhas: o que você precisa ou como posso ajudar.",
    previewHeading: "Prévia da mensagem",
    submit: "Enviar mensagem no WhatsApp",
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
    contato: "Contact",
  },

  common: {
    backToTop: "Retour en haut",
    toggleTheme: "Changer de thème",
    languageMenu: "Choisir la langue",
  },

  hero: {
    titleLine1: "Développeur",
    titleLine2: "Front-end axé sur les",
    titleGradient1: "interfaces modernes",
    titleConnector: "et les",
    titleGradient2: "expériences fluides",
    paragraph:
      "Je suis Luiz Rodrigues, développeur front-end avec de l'expérience en React, Laravel et la création d'interfaces web modernes.",
    ctaProjects: "Voir les projets",
    ctaContact: "Me contacter",
    scrollHint: "Continuer",
  },

  about: {
    eyebrow: "À propos",
    title: "Qui suis-je ?",
    highlights: [
      "Génie logiciel — Unicesumar",
      "2+ ans en produit numérique",
      "React · TypeScript · Node",
    ],
    qualificationsTitle: "Compétences",
    experienceTitle: "Expérience professionnelle",
  },

  skills: {
    eyebrow: "Compétences",
    title: "Galerie horizontale",
    intro:
      "Le défilement vertical fait défiler les cartes horizontalement. Arrivé à la dernière, le défilement vertical redevient normal.",
    categories: {
      linguagens: {
        title: "Langages",
        subtitle:
          "Les langages que j'utilise au quotidien : le rôle de chacun, où je les applique et comment ils s'intègrent à mon flux de travail.",
      },
      front: {
        title: "Front-end",
        subtitle:
          "Les outils avec lesquels je structure écrans, navigation et expérience utilisateur — du balisage aux frameworks qui livrent le produit.",
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
      "Parcourez la constellation chronologique — du plus récent au plus ancien. Utilisez le mode Visuel pour une lecture rapide ou Technique pour approfondir décisions et stack.",
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
      previewAlt: (platform: string, name: string) => `Aperçu (${platform}) — ${name}`,
      logoAlt: (name: string) => `Logo ${name}`,
    },
    categoryLabels: {
      web: "Web",
      app: "App",
      sistema: "Système",
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

  contact: {
    eyebrow: "Contact",
    title: "On en discute ?",
    intro:
      "Choisissez un canal ci-dessous ou envoyez le formulaire — il ouvre WhatsApp avec le message déjà rédigé à partir de vos informations.",
    linksAria: "Liens de contact et réseaux",
    emailLabel: "E-mail",
    resumeLabel: "CV",
    resumeDetail: "télécharger le PDF",
    formNoteBefore: "Canal pour les",
    formNoteStrong: "contacts professionnels",
    formNoteAfter: "— opportunités, projets et partenariats.",
    nameLabel: "Nom",
    namePlaceholder: "Votre nom complet",
    emailPlaceholder: "vous@email.com",
    messageLabel: "Message",
    messagePlaceholder: "En quelques lignes : ce dont vous avez besoin ou comment je peux aider.",
    previewHeading: "Aperçu du message",
    submit: "Envoyer le message sur WhatsApp",
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
