 import type { Locale } from "@/components/language-switcher"

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

export type Qualification = {
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export type Experience = {
  role: Record<Locale, string>
  period: Record<Locale, string>
  description: Record<Locale, string>
}

export type ShowcaseSkill = {
  id: string
  category: "linguagens" | "front" | "back" | "outros"
  label: Record<Locale, string>
  description: Record<Locale, string>
  image: string
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
   { name: "Testes e Qualidade", level: 70 },
   { name: "DevOps básico", level: 75 },
 ]

export const qualifications: Qualification[] = [
  {
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
    title: { "pt-br": "Flutter / Dart", "en-us": "Flutter / Dart", "fr-fr": "Flutter / Dart" },
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
    role: {
      "pt-br": "Desenvolvedor Web/App — 360erp",
      "en-us": "Web/App Developer — 360erp",
      "fr-fr": "Développeur Web/App — 360erp",
    },
    period: {
      "pt-br": "Set/2025 - Presente",
      "en-us": "Sep/2025 - Present",
      "fr-fr": "Sep/2025 - Présent",
    },
    description: {
      "pt-br":
        "Atuação em sistema interno e app da 360erp. ERP integra áreas como finanças, estoque, vendas e operações; trabalho em fluxos e telas que conectam esses módulos, garantindo consistência e usabilidade.",
      "en-us":
        "Working on 360erp’s internal system and app. ERP ties finance, inventory, sales, and operations; I build flows and screens connecting these modules, ensuring consistency and usability.",
      "fr-fr":
        "Travail sur le système interne et l’app de 360erp. L’ERP relie finance, stock, ventes et opérations ; je conçois des flux et écrans reliant ces modules avec cohérence et ergonomie.",
    },
  },
  {
    role: {
      "pt-br": "Desenvolvedor Front-end — BuskTraffic",
      "en-us": "Front-end Developer — BuskTraffic",
      "fr-fr": "Développeur Front-end — BuskTraffic",
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
  },
  {
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
  },
]

export const skillShowcase: ShowcaseSkill[] = [
  {
    id: "htmlcss",
    category: "front",
    label: { "pt-br": "HTML5 & CSS3", "en-us": "HTML5 & CSS3", "fr-fr": "HTML5 & CSS3" },
    description: {
      "pt-br":
        "Base para construção de sites. Estruturas semânticas com HTML e CSS moderno, incluindo responsividade.",
      "en-us":
        "Foundation for building sites. Semantic HTML and modern CSS, including responsive design.",
      "fr-fr":
        "Base pour créer des sites. HTML sémantique et CSS moderne, y compris le responsive.",
    },
    image: "/assets/skills/htmlcss.png",
  },
  {
    id: "react",
    category: "front",
    label: { "pt-br": "React", "en-us": "React", "fr-fr": "React" },
    description: {
      "pt-br":
        "Componentes, hooks e integração com APIs para interfaces reativas. Foco em estado, roteamento e boas práticas.",
      "en-us":
        "Components, hooks, and API integration for reactive UIs. Focus on state, routing, and best practices.",
      "fr-fr":
        "Composants, hooks et intégration d’API pour des UI réactives. Focus sur état, routage et bonnes pratiques.",
    },
    image: "/assets/skills/react.png",
  },
  {
    id: "tailwind",
    category: "outros",
    label: { "pt-br": "Tailwind CSS", "en-us": "Tailwind CSS", "fr-fr": "Tailwind CSS" },
    description: {
      "pt-br":
        "CSS utilitário para criar layouts rápidos, acessíveis e responsivos direto no JSX.",
      "en-us":
        "Utility-first CSS for fast, accessible, responsive layouts directly in JSX.",
      "fr-fr":
        "CSS utilitaire pour des mises en page rapides, accessibles et responsives directement dans le JSX.",
    },
    image: "/assets/skills/tailwind.png",
  },
  {
    id: "bootstrap",
    category: "outros",
    label: { "pt-br": "Bootstrap", "en-us": "Bootstrap", "fr-fr": "Bootstrap" },
    description: {
      "pt-br":
        "Componentes prontos e grid responsivo para entregar telas com agilidade.",
      "en-us":
        "Ready-made components and responsive grid to deliver screens quickly.",
      "fr-fr":
        "Composants prêts à l’emploi et grille responsive pour livrer rapidement.",
    },
    image: "/assets/skills/bootstrap.png",
  },
  {
    id: "mui",
    category: "outros",
    label: { "pt-br": "MUI React", "en-us": "MUI React", "fr-fr": "MUI React" },
    description: {
      "pt-br":
        "Componentes React baseados em Material Design com theming pronto e acessibilidade.",
      "en-us":
        "React components built on Material Design with ready theming and accessibility.",
      "fr-fr":
        "Composants React Material Design avec thèmes prêts et accessibilité.",
    },
    image: "/assets/skills/mui.png",
  },
  {
    id: "shadcn",
    category: "outros",
    label: { "pt-br": "shadcn/ui", "en-us": "shadcn/ui", "fr-fr": "shadcn/ui" },
    description: {
      "pt-br":
        "Componentes React desacoplados (Radix + Tailwind) para montar UIs personalizadas.",
      "en-us":
        "Headless React components (Radix + Tailwind) to build custom UIs.",
      "fr-fr":
        "Composants React headless (Radix + Tailwind) pour créer des UIs sur mesure.",
    },
    image: "/assets/skills/shadcn.png",
  },
  {
    id: "javascript",
    category: "linguagens",
    label: { "pt-br": "JavaScript (ES6+)", "en-us": "JavaScript (ES6+)", "fr-fr": "JavaScript (ES6+)" },
    description: {
      "pt-br":
        "ES6+, async/await e DOM. Base para front e back com foco em legibilidade.",
      "en-us":
        "ES6+, async/await, DOM. Core for front and back with readability focus.",
      "fr-fr":
        "ES6+, async/await, DOM. Base pour front et back avec focus lisibilité.",
    },
    image: "/assets/skills/js.png",
  },
  {
    id: "typescript",
    category: "linguagens",
    label: { "pt-br": "TypeScript", "en-us": "TypeScript", "fr-fr": "TypeScript" },
    description: {
      "pt-br":
        "TypeScript para tipagem estática e verificação de tipos em tempo real.",
      "en-us":
        "TypeScript for static typing and type checking in real time.",
      "fr-fr":
        "TypeScript pour la typage statique et la vérification de types en temps réel.",
    },
    image: "/assets/skills/ts.png",
  },
  {
    id: "dart",
    category: "linguagens",
    label: { "pt-br": "Dart", "en-us": "Dart", "fr-fr": "Dart" },
    description: {
      "pt-br": "Linguagem base do Flutter, focada em apps reativos e multi-plataforma.",
      "en-us": "Flutter’s core language, focused on reactive, multi-platform apps.",
      "fr-fr": "Langage du Flutter, pensé pour des apps réactives multi-plateformes.",
    },
    image: "/assets/skills/dart.png",
  },
  {
    id: "node",
    category: "back",
    label: { "pt-br": "Node.js", "en-us": "Node.js", "fr-fr": "Node.js" },
    description: {
      "pt-br":
        "APIs REST com Express, integração com bancos e middlewares de autenticação/validação.",
      "en-us":
        "REST APIs with Express, database integration, and auth/validation middleware.",
      "fr-fr":
        "APIs REST avec Express, intégration BD, middlewares d’authentification/validation.",
    },
    image: "/assets/skills/node.png",
  },
  {
    id: "laravel",
    category: "back",
    label: { "pt-br": "Laravel (PHP)", "en-us": "Laravel (PHP)", "fr-fr": "Laravel (PHP)" },
    description: {
      "pt-br":
        "Rotas, autenticação, formulários e segurança. Experiência full-cycle em PHP/Laravel.",
      "en-us":
        "Routes, auth, forms, and security. Full-cycle experience in PHP/Laravel.",
      "fr-fr":
        "Routes, auth, formulaires et sécurité. Expérience full-cycle en PHP/Laravel.",
    },
    image: "/assets/skills/laravel.png",
  },
  {
    id: "next",
    category: "front",
    label: { "pt-br": "Next.js", "en-us": "Next.js", "fr-fr": "Next.js" },
    description: {
      "pt-br":
        "SSR/SSG, otimização de performance e roteamento para apps modernas em React.",
      "en-us":
        "SSR/SSG, performance optimizations, and routing for modern React apps.",
      "fr-fr":
        "SSR/SSG, optimisations de performance et routage pour apps React modernes.",
    },
    image: "/assets/skills/next.png",
  },
  {
    id: "flutter",
    category: "front",
    label: { "pt-br": "Flutter", "en-us": "Flutter", "fr-fr": "Flutter" },
    description: {
      "pt-br":
        "Explorando apps mobile com widgets, navegação e estado básico.",
      "en-us":
        "Exploring mobile apps with widgets, navigation, and basic state.",
      "fr-fr":
        "Exploration d’apps mobiles avec widgets, navigation et état basique.",
    },
    image: "/assets/skills/flutter.png",
  },
  {
    id: "git",
    category: "outros",
    label: { "pt-br": "Git & GitHub", "en-us": "Git & GitHub", "fr-fr": "Git & GitHub" },
    description: {
      "pt-br":
        "Fluxo com branches, PRs e versionamento para times ágeis.",
      "en-us":
        "Workflow with branches, PRs, and versioning for agile teams.",
      "fr-fr":
        "Flux avec branches, PRs et versioning pour équipes agiles.",
    },
    image: "/assets/skills/git.png",
  },
  {
    id: "figma",
    category: "outros",
    label: { "pt-br": "Figma Design", "en-us": "Figma Design", "fr-fr": "Figma Design" },
    description: {
      "pt-br":
        "Apoio em design, leitura de layouts e colaboração em protótipos.",
      "en-us":
        "Design support, reading layouts, and collaborating on prototypes.",
      "fr-fr":
        "Support design, lecture de maquettes et collaboration sur prototypes.",
    },
    image: "/assets/skills/figma.png",
  },
  {
    id: "postman",
    category: "back",
    label: { "pt-br": "Postman", "en-us": "Postman", "fr-fr": "Postman" },
    description: {
      "pt-br":
        "Teste e documentação de APIs, collections e ambientes para validação rápida.",
      "en-us":
        "API testing and documentation, collections and environments for quick validation.",
      "fr-fr":
        "Tests et documentation d’API, collections et environnements pour validation rapide.",
    },
    image: "/assets/skills/postman.png",
  },
  {
    id: "vercel",
    category: "outros",
    label: { "pt-br": "Vercel", "en-us": "Vercel", "fr-fr": "Vercel" },
    description: {
      "pt-br":
        "Deploy rápido de apps front-end/Next.js com pré-visualizações e CI simplificado.",
      "en-us":
        "Fast deploy for front-end/Next.js apps with previews and simplified CI.",
      "fr-fr":
        "Déploiement rapide pour apps front-end/Next.js avec prévisualisations et CI simplifiée.",
    },
    image: "/assets/skills/vercel.png",
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
      "pt-br": "Dashboard Administrativo e Landing Page",
      "en-us": "Admin Dashboard and Landing Page",
      "fr-fr": "Tableau de bord Administratif et Landing Page",
    },
    description: {
      "pt-br":
        "Sistema de gerenciamento para bot do Telegram com interface intuitiva. Controle de usuários, mensagens, comandos, grupos e monitoramento de estatísticas, configurações e logs. Foco em usabilidade e eficiência operacional.",
      "en-us":
        "Telegram bot management system with intuitive interface. User, message, command, and group control, plus monitoring of stats, settings, and logs. Focused on usability and operational efficiency.",
      "fr-fr":
        "Système de gestion pour bot Telegram avec interface intuitive. Contrôle des utilisateurs, messages, commandes, groupes et suivi des statistiques, configurations et logs. Centré sur l’utilisabilité et l’efficacité opérationnelle.",
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
      "pt-br": "Sistema de Seguro Imobiliário",
      "en-us": "Real Estate Insurance System",
      "fr-fr": "Système d’assurance immobilière",
    },
    description: {
      "pt-br":
        "Sistema de seguro imobiliário com interface intuitiva e funcionalidades avançadas: clientes, apólices, sinistros, relatórios e mais.",
      "en-us":
        "Real estate insurance system with intuitive interface and advanced features: customers, policies, claims, reports, and more.",
      "fr-fr":
        "Système d’assurance immobilière avec interface intuitive et fonctionnalités avancées : clients, polices, sinistres, rapports et plus.",
    },
    category: { "pt-br": "Sistema", "en-us": "System", "fr-fr": "Système" },
    skills: ["HTML5 & CSS3", "Bootstrap", "JavaScript", "Laravel (PHP)", "Figma"],
    liveLink: "#",
    image: "/assets/projects/aprova.png",
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

