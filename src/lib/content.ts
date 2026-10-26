import type { Locale } from "@/lib/i18n/locale-context"
import type { ShowcaseSkill } from "./skill-showcase-items"
import { skillShowcase } from "./skill-showcase-items"

export type { ShowcaseSkill }
export { skillShowcase }

export type Project = {
  id: number
  title: Record<Locale, string>
  subtitle: Record<Locale, string>
  description: Record<Locale, string>
  category: Record<Locale, string>
  skills: string[]
  liveLink: string
  figmaLink?: string
  image?: string
  themeColor: string
}

 export type Skill = {
   name: string
   level: number
 }

export type QualificationId =
  | "front"
  | "back"
  | "mobile"
  | "vcs"
  | "communication"

export type Qualification = {
  id: QualificationId
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export type Experience = {
  /** Cargo + empresa numa linha (usado no index). */
  role: Record<Locale, string>
  period: Record<Locale, string>
  description: Record<Locale, string>
  /** Campos do painel detalhado da /new (accordion de experiência). */
  company: string
  position: Record<Locale, string>
  logo?: string
  logoBackground?: string
  link?: string
  summary: Record<Locale, string>
  highlights: Record<Locale, string[]>
  stack: string[]
}

 export const heroCopy: Record<
   Locale,
   { title: string; subtitle: string; cta: string; secondaryCta: string }
 > = {
   "pt-br": {
    title:
      "Dev Front-end | React | Next.ts | TypeScript | Node.ts | Tailwind | Flutter/Dart",
    subtitle:
      "Olá, sou Luiz Rodrigues, Desenvolvedor Front-end. Comecei em 2023 e venho aplicando JavaScript moderno, interfaces web e otimização de performance em projetos reais. Também exploro Flutter/Dart para experiências mobile.",
    cta: "Fale comigo",
    secondaryCta: "Ver projetos",
  },
  "en-us": {
    title:
      "Front-end Developer | React | Next.ts | TypeScript | Node.ts | Tailwind | Flutter/Dart",
    subtitle:
      "Hi, I'm Luiz Rodrigues, a Front-end Developer. I started in 2023 and have been applying modern JavaScript, web UI, and performance optimization in real projects. Also exploring Flutter/Dart (beginner) for mobile experiences.",
    cta: "Contact me",
    secondaryCta: "View projects",
  },
  "fr-fr": {
    title:
      "Développeur Front-end | React | Next.ts | TypeScript | Node.js | Tailwind | Flutter/Dart",
    subtitle:
      "Salut, je suis Luiz Rodrigues, Développeur Front-end. J'ai commencé en 2023 et j'applique JavaScript moderne, interfaces web et optimisation des performances sur des projets réels. J'explore aussi Flutter/Dart (débutant) pour des expériences mobiles.",
    cta: "Parler avec moi",
    secondaryCta: "Voir les projets",
  },
 }

 export const aboutCopy: Record<Locale, string> = {
   "pt-br":
    "Estudante de Engenharia de Software (Unicesumar) desde 2024, motivado por aprender mais e ajudar as pessoas ao meu redor. Vejo software além do código: como ferramenta para resolver problemas reais e gerar impacto positivo. Busco evoluir habilidades técnicas e soft skills para colaborar em equipes e projetos desafiadores.",
   "en-us":
    "Software Engineering student (Unicesumar) since 2024, driven to learn more and support people around me. I see software beyond code: a tool to solve real problems and create positive impact. I focus on growing technical and soft skills to collaborate in challenging projects.",
   "fr-fr":
    "Étudiant en génie logiciel (Unicesumar) depuis 2024, motivé à apprendre et à aider les gens autour de moi. Pour moi, le logiciel dépasse le code : c’est un outil pour résoudre des problèmes réels et générer un impact positif. Je cherche à développer mes compétences techniques et humaines pour collaborer sur des projets exigeants.",
 }

 export const skills: Skill[] = [
   { name: "React / Next.js", level: 65 },
   { name: "TypeScript", level: 55 },
   { name: "Node.js / APIs", level: 50 },
   { name: "UI / UX Systems", level: 75 },
  { name: "Flutter / Dart", level: 35 },
   { name: "Testing & Quality", level: 70 },
   { name: "Basic DevOps", level: 75 },
 ]

export const qualifications: Qualification[] = [
  {
    id: "front",
    title: { "pt-br": "Front-end", "en-us": "Front-end", "fr-fr": "Front-end" },
    description: {
      "pt-br":
        "Proficiente em HTML, CSS, JavaScript, TypeScript, Tailwind CSS e React. Criação de interfaces responsivas e interativas com foco em UX e performance.",
      "en-us":
        "Proficient in HTML, CSS, JavaScript, TypeScript, Tailwind CSS, and React. Builds responsive, interactive UIs with focus on UX and performance.",
      "fr-fr":
        "Compétent en HTML, CSS, JavaScript, TypeScript, Tailwind CSS et React. Création d’interfaces responsives et interactives avec un focus UX et performance.",
    },
  },
  {
    id: "back",
    title: { "pt-br": "Back-end", "en-us": "Back-end", "fr-fr": "Back-end" },
    description: {
      "pt-br":
        "Conhecimento em Node.js e PHP (Laravel). Experiência em integrações, formulários e segurança, cobrindo etapas do ciclo de desenvolvimento.",
      "en-us":
        "Knowledge in Node.js and PHP (Laravel). Experience with integrations, forms, and security, covering multiple stages of the development cycle.",
      "fr-fr":
        "Connaissances en Node.js et PHP (Laravel). Expérience en intégrations, formulaires et sécurité, couvrant plusieurs étapes du cycle de développement.",
    },
  },
  {
    id: "mobile",
    title: { "pt-br": "Mobile", "en-us": "Mobile", "fr-fr": "Mobile" },
    description: {
      "pt-br":
        "Explorando Flutter/Dart para experiências mobile, prototipando telas e entendendo o fluxo de estado e navegação.",
      "en-us":
        "Exploring Flutter/Dart for mobile experiences, prototyping screens and understanding state flow and navigation.",
      "fr-fr":
        "Exploration de Flutter/Dart pour le mobile, prototypage d’écrans et compréhension des flux d’état et de navigation.",
    },
  },
  {
    id: "vcs",
    title: {
      "pt-br": "Controle de versão e colaboração",
      "en-us": "Version control & collaboration",
      "fr-fr": "Contrôle de version et collaboration",
    },
    description: {
      "pt-br":
        "Experiência com Git e metodologias ágeis, facilitando colaboração efetiva em equipes de desenvolvimento.",
      "en-us":
        "Experience with Git and agile methodologies, enabling effective collaboration in development teams.",
      "fr-fr":
        "Expérience avec Git et les méthodologies agiles, pour une collaboration efficace en équipe de développement.",
    },
  },
  {
    id: "communication",
    title: {
      "pt-br": "Comunicação global",
      "en-us": "Global communication",
      "fr-fr": "Communication globale",
    },
    description: {
      "pt-br":
        "Certificado em curso de inglês, permitindo colaboração eficiente em projetos internacionais.",
      "en-us":
        "Certified English course, enabling efficient collaboration in international projects.",
      "fr-fr":
        "Certificat d’anglais, permettant une collaboration efficace sur des projets internationaux.",
    },
  },
]

export const experiences: Experience[] = [
  {
    company: "Haber Solutions",
    position: {
      "pt-br": "Co-Founder & Lead Front-End Engineer",
      "en-us": "Co-Founder & Lead Front-End Engineer",
      "fr-fr": "Co-Founder & Lead Front-End Engineer",
    },
    role: {
      "pt-br": "Co-Founder & Lead Front-End Engineer, Haber Solutions",
      "en-us": "Co-Founder & Lead Front-End Engineer, Haber Solutions",
      "fr-fr": "Co-Founder & Lead Front-End Engineer, Haber Solutions",
    },
    period: {
      "pt-br": "Set/2026 - Presente",
      "en-us": "Sep/2026 - Present",
      "fr-fr": "Sep/2026 - Présent",
    },
    description: {
      "pt-br":
        "Co-fundador de uma software house de software sob medida: lidero o front-end e desenho as soluções com os clientes, do escopo ao produto no ar.",
      "en-us":
        "Co-founder of a custom software house: I lead the front-end and design solutions with clients, from scoping to shipped product.",
      "fr-fr":
        "Cofondateur d’une société de logiciels sur mesure : je dirige le front-end et conçois les solutions avec les clients, du cadrage au produit en ligne.",
    },
    logo: "/assets/projects/habersolutions-icon.png",
    logoBackground: "#064e3b",
    link: "https://habersolutions.com.br/",
    summary: {
      "pt-br":
        "A Haber Solutions desenvolve software sob medida para empresas: sistemas internos, SaaS e sites. Como co-fundador, lidero a engenharia de front-end e participo do desenho das soluções: entendimento com o cliente, arquitetura, interfaces e entrega.",
      "en-us":
        "Haber Solutions builds custom software for companies: internal systems, SaaS and websites. As co-founder I lead front-end engineering and take part in designing the solutions: understanding the client, architecture, interfaces and delivery.",
      "fr-fr":
        "Haber Solutions développe des logiciels sur mesure pour les entreprises : systèmes internes, SaaS et sites. En tant que cofondateur, je dirige l’ingénierie front-end et participe à la conception des solutions : compréhension du client, architecture, interfaces et livraison.",
    },
    highlights: {
      "pt-br": [
        "Liderança do front-end nos projetos: arquitetura, componentes e revisão de código",
        "Desenho de soluções com os clientes: escopo, fluxos e contratos de API",
        "Do layout à produção: SSR, SEO e deploy com Docker",
        "Ferramentas internas: site da empresa e painel da equipe",
      ],
      "en-us": [
        "Front-end leadership across projects: architecture, components and code review",
        "Solution design with clients: scope, flows and API contracts",
        "From layout to production: SSR, SEO and Docker deploys",
        "Internal tools: the company site and the team panel",
      ],
      "fr-fr": [
        "Direction du front-end sur les projets : architecture, composants et revue de code",
        "Conception de solutions avec les clients : périmètre, flux et contrats d’API",
        "De la maquette à la production : SSR, SEO et déploiement avec Docker",
        "Outils internes : le site de l’entreprise et le panneau de l’équipe",
      ],
    },
    stack: ["React", "Next.js", "React Router", "TypeScript", "Tailwind CSS", "Laravel", "Docker"],
  },
  {
    company: "360erp",
    position: {
      "pt-br": "Desenvolvedor Web/App",
      "en-us": "Web/App Developer",
      "fr-fr": "Développeur Web/App",
    },
    role: {
      "pt-br": "Desenvolvedor Web/App, 360erp",
      "en-us": "Web/App Developer, 360erp",
      "fr-fr": "Développeur Web/App, 360erp",
    },
    period: {
      "pt-br": "Set/2025 - Set/2026",
      "en-us": "Sep/2025 - Sep/2026",
      "fr-fr": "Sep/2025 - Sep/2026",
    },
    description: {
      "pt-br":
        "Atuação em sistema interno e app da 360erp. ERP integra áreas como finanças, estoque, vendas e operações; trabalho em fluxos e telas que conectam esses módulos, garantindo consistência e usabilidade.",
      "en-us":
        "Worked on 360erp’s internal system and app. The ERP ties finance, inventory, sales, and operations; I built flows and screens connecting these modules, ensuring consistency and usability.",
      "fr-fr":
        "Travail sur le système interne et l’app de 360erp. L’ERP relie finance, stock, ventes et opérations ; j’ai conçu des flux et écrans reliant ces modules avec cohérence et ergonomie.",
    },
    logo: "/assets/projects/erp-icon.png",
    logoBackground: "#0141ac",
    link: "https://www.360erp.com.br/",
    summary: {
      "pt-br":
        "ERP completo com módulos de PDV, OS, e-commerce, fiscal, financeiro e logística, sistema legado em produção com base ativa de clientes. Entrei no time de front-end, responsável pela evolução da interface web e pelo app mobile em Flutter.",
      "en-us":
        "Full ERP with POS, service orders, e-commerce, tax, finance and logistics modules, a legacy system in production with an active client base. I joined the front-end team, responsible for evolving the web interface and the Flutter mobile app.",
      "fr-fr":
        "ERP complet avec modules caisse, ordres de service, e-commerce, fiscal, finance et logistique, un système legacy en production avec une base de clients active. J’ai rejoint l’équipe front-end, responsable de l’évolution de l’interface web et de l’app mobile Flutter.",
    },
    highlights: {
      "pt-br": [
        "Telas e fluxos que conectam finanças, estoque, vendas e operações",
        "Manutenção principal do app mobile em Flutter",
        "Mudanças em produção com baixa tolerância a regressões",
      ],
      "en-us": [
        "Screens and flows connecting finance, inventory, sales and operations",
        "Main maintainer of the Flutter mobile app",
        "Production changes with low tolerance for regressions",
      ],
      "fr-fr": [
        "Écrans et flux reliant finance, stock, ventes et opérations",
        "Mainteneur principal de l’app mobile Flutter",
        "Changements en production avec une faible tolérance aux régressions",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MUI", "Flutter", "Dart"],
  },
  {
    company: "BuskTraffic",
    position: {
      "pt-br": "Desenvolvedor Front-end",
      "en-us": "Front-end Developer",
      "fr-fr": "Développeur Front-end",
    },
    role: {
      "pt-br": "Desenvolvedor Front-end, BuskTraffic",
      "en-us": "Front-end Developer, BuskTraffic",
      "fr-fr": "Développeur Front-end, BuskTraffic",
    },
    period: {
      "pt-br": "Fev/2025 - Set/2025",
      "en-us": "Feb/2025 - Sep/2025",
      "fr-fr": "Fév/2025 - Sep/2025",
    },
    description: {
      "pt-br":
        "Front-end com HTML, CSS, JavaScript, React. Apoio em design e ocasionalmente back-end com PHP/Laravel. Foquei em estruturar código e criar interfaces alinhadas ao design.",
      "en-us":
        "Front-end with HTML, CSS, JavaScript, React. Supported design and occasionally back-end with PHP/Laravel. Focused on structured code and design-aligned interfaces.",
      "fr-fr":
        "Front-end avec HTML, CSS, JavaScript, React. Support design et parfois back-end avec PHP/Laravel. Accent sur un code structuré et des interfaces alignées au design.",
    },
    summary: {
      "pt-br":
        "Desenvolvimento front-end de interfaces web em React, com apoio ao time de design e, quando preciso, no back-end em PHP/Laravel.",
      "en-us":
        "Front-end development of web interfaces in React, supporting the design team and, when needed, the PHP/Laravel back-end.",
      "fr-fr":
        "Développement front-end d’interfaces web en React, en soutien à l’équipe design et, si besoin, au back-end PHP/Laravel.",
    },
    highlights: {
      "pt-br": [
        "Interfaces fiéis ao design, com código bem estruturado",
        "Apoio ao design na definição de telas e componentes",
        "Ajustes pontuais no back-end com PHP/Laravel",
      ],
      "en-us": [
        "Design-faithful interfaces with well-structured code",
        "Design support defining screens and components",
        "Occasional back-end work with PHP/Laravel",
      ],
      "fr-fr": [
        "Interfaces fidèles au design, avec un code bien structuré",
        "Soutien au design pour définir écrans et composants",
        "Interventions ponctuelles sur le back-end en PHP/Laravel",
      ],
    },
    stack: ["React", "JavaScript", "HTML", "CSS", "PHP", "Laravel"],
  },
  {
    company: "PallaceMakers",
    position: {
      "pt-br": "Desenvolvedor Front-end",
      "en-us": "Front-end Developer",
      "fr-fr": "Développeur Front-end",
    },
    role: {
      "pt-br": "Desenvolvedor Front-end - PallaceMakers",
      "en-us": "Front-end Developer - PallaceMakers",
      "fr-fr": "Développeur Front-end - PallaceMakers",
    },
    period: {
      "pt-br": "Mar/2024 - Out/2024",
      "en-us": "Mar/2024 - Oct/2024",
      "fr-fr": "Mar/2024 - Oct/2024",
    },
    description: {
      "pt-br":
        "Desenvolvimento de sites, LPs e manutenção e correção de bugs em interfaces. Também atuei com PHP/Laravel em formulários e validação de usuários, ampliando a visão de back-end.",
      "en-us":
        "Built websites, LPs and maintained and fixed UI bugs. Also worked with PHP/Laravel on forms and user validation, expanding back-end understanding.",
      "fr-fr":
        "Création de sites, LPs et maintenance et correction de bugs d’interface. Travail avec PHP/Laravel sur formulaires et validation d’utilisateurs, élargissant la vision back-end.",
    },
    summary: {
      "pt-br":
        "Primeira experiência de mercado: sites e landing pages, manutenção de interfaces e os primeiros passos no back-end com PHP/Laravel.",
      "en-us":
        "First industry experience: websites and landing pages, interface maintenance and first steps in the back-end with PHP/Laravel.",
      "fr-fr":
        "Première expérience professionnelle : sites et landing pages, maintenance d’interfaces et premiers pas côté back-end avec PHP/Laravel.",
    },
    highlights: {
      "pt-br": [
        "Sites e landing pages do layout à publicação",
        "Manutenção e correção de bugs em interfaces",
        "Formulários e validação de usuários com PHP/Laravel",
      ],
      "en-us": [
        "Websites and landing pages from layout to launch",
        "Interface maintenance and bug fixing",
        "Forms and user validation with PHP/Laravel",
      ],
      "fr-fr": [
        "Sites et landing pages de la maquette à la mise en ligne",
        "Maintenance d’interfaces et correction de bugs",
        "Formulaires et validation d’utilisateurs avec PHP/Laravel",
      ],
    },
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Laravel"],
  },
]

export const projects: Project[] = [
  {
    id: 1,
    title: { "pt-br": "350erp", "en-us": "350erp", "fr-fr": "350erp" },
    subtitle: {
      "pt-br": "ERP web e mobile para operações e finanças",
      "en-us": "Web and mobile ERP for operations and finance",
      "fr-fr": "ERP web et mobile pour opérations et finances",
    },
    description: {
      "pt-br":
        "ERP que integra finanças, estoque, vendas e operações em um painel web e app mobile. Dashboards, fluxos e controle de permissões para manter dados centralizados e equipes sincronizadas.",
      "en-us":
        "ERP connecting finance, inventory, sales, and operations across web dashboard and mobile app. Dashboards, workflows, and access control keep data centralized and teams aligned.",
      "fr-fr":
        "ERP reliant finances, stock, ventes et opérations via un tableau de bord web et une app mobile. Tableaux de bord, flux et contrôle d’accès pour centraliser les données et aligner les équipes.",
    },
    category: {
      "pt-br": "Sistema e App",
      "en-us": "System and App",
      "fr-fr": "Système et App",
    },
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Figma"],
    liveLink: "#",
    themeColor: "#2563eb",
  },
  {
    id: 2,
    title: { "pt-br": "LunarBot.io", "en-us": "LunarBot.io", "fr-fr": "LunarBot.io" },
    subtitle: {
      "pt-br": "Sistema administrativo para Telegram",
      "en-us": "Telegram admin system",
      "fr-fr": "Système administratif pour Telegram",
    },
    description: {
      "pt-br":
        "Sistema administrativo para plataforma de vendas via Telegram. Primeiro dashboard que desenvolvi, com bots, usuários, grupos, comandos, logs, estatísticas, configurações e tracking UTM integrado ao fluxo entre páginas de venda e bot.",
      "en-us":
        "Admin system for a Telegram sales platform. My first dashboard project, with bots, users, groups, commands, logs, statistics, settings, and UTM tracking integrated between sales pages and the bot flow.",
      "fr-fr":
        "Système administratif pour une plateforme de vente via Telegram. Mon premier dashboard, avec bots, utilisateurs, groupes, commandes, logs, statistiques, configurations et tracking UTM intégré entre les pages de vente et le bot.",
    },
    category: {
      "pt-br": "Sistema e Landing Page",
      "en-us": "System and Landing Page",
      "fr-fr": "Système et Landing Page",
    },
    skills: ["HTML5 & CSS3", "Bootstrap", "JavaScript", "Laravel (PHP)", "Postman", "Notion", "Figma"],
    liveLink: "https://lunarbot.com.br/",
    figmaLink: "https://www.figma.com/design/0gHgezIDrlEidd1cYQymAY/lunarbot?node-id=8-134&t=9CtnBgcuyuGNeN0I-0",
    image: "/assets/projects/lunar.png",
    themeColor: "#8b5cf6",
  },
  {
    id: 3,
    title: { "pt-br": "Aprova Legal", "en-us": "Aprova Legal", "fr-fr": "Aprova Legal" },
    subtitle: {
      "pt-br": "Sistema de garantias locatícias",
      "en-us": "Rental guarantee management system",
      "fr-fr": "Système de garanties locatives",
    },
    description: {
      "pt-br":
        "Sistema interno para gestão de garantias locatícias, contratos e análise de inquilinos. Digitalizou fluxos antes manuais e centralizou a operação com mais de 1.000 contratos ativos, 95+ imobiliárias parceiras e R$45 milhões em capital garantido.",
      "en-us":
        "Internal system for rental guarantee management, contracts, and tenant analysis. It digitized formerly manual workflows and centralized operations with 1,000+ active contracts, 95+ partner real estate agencies, and R$45 million in guaranteed capital.",
      "fr-fr":
        "Système interne de gestion des garanties locatives, des contrats et de l’analyse des locataires. Il a numérisé des flux auparavant manuels et centralisé l’opération avec plus de 1 000 contrats actifs, 95+ agences immobilières partenaires et 45 millions R$ de capital garanti.",
    },
    category: { "pt-br": "Sistema", "en-us": "System", "fr-fr": "Système" },
    skills: ["HTML5 & CSS3", "Bootstrap", "JavaScript", "Laravel (PHP)", "Figma"],
    liveLink: "#",
    image: "/assets/projects/aprova-2.png",
    themeColor: "#22c55e",
  },
  {
    id: 4,
    title: { "pt-br": "Haber Contabilidade", "en-us": "Haber Accounting", "fr-fr": "Haber Comptabilité" },
    subtitle: {
      "pt-br": "Landing Page profissional e micro-sistema contábil",
      "en-us": "Professional landing page and accounting mini-system",
      "fr-fr": "Landing Page professionnelle et micro-système comptable",
    },
    description: {
      "pt-br":
        "Landing page focada em captação de leads para serviços contábeis e micro-sistema de controle com usabilidade e eficiência.",
      "en-us":
        "Landing page focused on lead generation for accounting services and a control mini-system with usability and efficiency.",
      "fr-fr":
        "Landing page orientée génération de leads pour services comptables et micro-système de contrôle axé sur l’utilisabilité et l’efficacité.",
    },
    category: {
      "pt-br": "Sistema e Landing Page",
      "en-us": "System and Landing Page",
      "fr-fr": "Système et Landing Page",
    },
    skills: ["React", "Tailwind CSS", "Vercel"],
    liveLink: "https://haber.vercel.app",
    themeColor: "#0ea5e9",
  },
  {
    id: 5,
    title: { "pt-br": "Newline Persianas", "en-us": "Newline Persianas", "fr-fr": "Newline Persianas" },
    subtitle: {
      "pt-br": "Landing page com catálogo e pedido de orçamento",
      "en-us": "Landing page with catalog and quote request",
      "fr-fr": "Landing page avec catalogue et demande de devis",
    },
    description: {
      "pt-br":
        "Landing page para fabricante de persianas com catálogo visual, destaques de materiais e CTA de orçamento. Conteúdo otimizado para gerar confiança e captar leads.",
      "en-us":
        "Landing page for a blinds manufacturer featuring visual catalog, material highlights, and quote CTA. Content optimized to build trust and capture leads.",
      "fr-fr":
        "Landing page pour un fabricant de stores avec catalogue visuel, mise en avant des matériaux et CTA de devis. Contenu optimisé pour inspirer confiance et générer des leads.",
    },
    category: { "pt-br": "Landing Page", "en-us": "Landing Page", "fr-fr": "Landing Page" },
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Figma"],
    liveLink: "#",
    figmaLink: "#",
    themeColor: "#d97706",
  },
]

 export const contactCopy: Record<Locale, { title: string; subtitle: string }> = {
   "pt-br": {
     title: "Vamos construir algo juntos?",
     subtitle: "Pronto para oportunidades, freelas e colaborações.",
   },
   "en-us": {
     title: "Let’s build something together?",
     subtitle: "Open to opportunities, freelancing, and collaborations.",
   },
   "fr-fr": {
     title: "On construit quelque chose ensemble ?",
     subtitle: "Disponible pour opportunités, freelances et collaborations.",
   },
 }
