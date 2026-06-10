import type { Locale } from "@/components/language-switcher"

export type ShowcaseSkill = {
  id: string
  category: "linguagens" | "front" | "back" | "outros"
  label: Record<Locale, string>
  description: Record<Locale, string>
  image: string
  usos: Record<Locale, string[]>
  aplicacao: Record<Locale, string>
  nivel: Record<Locale, string>
  destaque?: Record<Locale, string>
}

export const skillShowcase: ShowcaseSkill[] = [
  {
    id: "htmlcss",
    category: "front",
    label: { "pt-br": "HTML5 & CSS3", "en-us": "HTML5 & CSS3", "fr-fr": "HTML5 & CSS3" },
    description: {
      "pt-br": "Camada estrutural e visual da web: semântica, layout e estilização responsiva.",
      "en-us": "The web’s structural and visual layer: semantics, layout, and responsive styling.",
      "fr-fr": "Couche structurelle et visuelle du web : sémantique, mise en page et style responsive.",
    },
    image: "/assets/skills/htmlcss.png",
    usos: {
      "pt-br": [
        "Estrutura semântica e acessível",
        "Layouts com Flexbox e Grid",
        "Design responsivo e breakpoints",
        "Animações e microinterações leves em CSS",
      ],
      "en-us": [
        "Semantic, accessible structure",
        "Flexbox and Grid layouts",
        "Responsive design and breakpoints",
        "Light CSS animations and micro-interactions",
      ],
      "fr-fr": [
        "Structure sémantique et accessible",
        "Mises en page Flexbox et Grid",
        "Design responsive et breakpoints",
        "Animations CSS légères et micro-interactions",
      ],
    },
    aplicacao: {
      "pt-br":
        "Base de landing pages, painéis e fluxos em ERP: marco inicial antes de React ou templates PHP.",
      "en-us":
        "Foundation for landing pages, dashboards, and ERP flows—often before React or PHP templates.",
      "fr-fr":
        "Base des landing pages, tableaux de bord et flux ERP, souvent avant React ou les templates PHP.",
    },
    nivel: { "pt-br": "Forte", "en-us": "Strong", "fr-fr": "Solide" },
  },
  {
    id: "react",
    category: "front",
    label: { "pt-br": "React", "en-us": "React", "fr-fr": "React" },
    description: {
      "pt-br": "Biblioteca para interfaces declarativas, com estado local e composição de componentes.",
      "en-us": "Library for declarative UIs with local state and composable components.",
      "fr-fr": "Bibliothèque pour des UI déclaratives, état local et composition de composants.",
    },
    image: "/assets/skills/react.png",
    destaque: {
      "pt-br": "Principal biblioteca do meu stack atual",
      "en-us": "Main library in my current stack",
      "fr-fr": "Bibliothèque principale de ma stack actuelle",
    },
    usos: {
      "pt-br": [
        "Componentização e reutilização de UI",
        "Hooks para estado, efeitos e dados",
        "Consumo de APIs e estados de carregamento",
        "Integração com roteadores e ecossistema",
      ],
      "en-us": [
        "Componentized, reusable UI",
        "Hooks for state, effects, and data",
        "API consumption and loading states",
        "Integration with routers and ecosystem",
      ],
      "fr-fr": [
        "UI composants réutilisables",
        "Hooks pour état, effets et données",
        "Consommation d’API et états de chargement",
        "Intégration routeurs et écosystème",
      ],
    },
    aplicacao: {
      "pt-br":
        "Uso intensivo em dashboards, sistemas internos e produtos web onde a experiência precisa ser fluida e previsível.",
      "en-us":
        "Heavy use in dashboards, internal systems, and web products where UX must feel smooth and predictable.",
      "fr-fr":
        "Usage intensif dans des dashboards, systèmes internes et produits web où l’UX doit rester fluide.",
    },
    nivel: { "pt-br": "Forte", "en-us": "Strong", "fr-fr": "Solide" },
  },
  {
    id: "tailwind",
    category: "outros",
    label: { "pt-br": "Tailwind CSS", "en-us": "Tailwind CSS", "fr-fr": "Tailwind CSS" },
    description: {
      "pt-br": "Framework utilitário que acelera layout e consistência visual direto no JSX.",
      "en-us": "Utility-first framework that speeds up layout and visual consistency in JSX.",
      "fr-fr": "Framework utilitaire qui accélère la mise en page et la cohérence visuelle dans le JSX.",
    },
    image: "/assets/skills/tailwind.png",
    usos: {
      "pt-br": [
        "Prototipagem rápida de telas",
        "Design system com tokens e variantes",
        "Responsividade e dark mode",
        "Acessibilidade com utilitários e focus states",
      ],
      "en-us": [
        "Fast screen prototyping",
        "Design systems with tokens and variants",
        "Responsiveness and dark mode",
        "Accessibility utilities and focus states",
      ],
      "fr-fr": [
        "Prototypage rapide d’écrans",
        "Design system avec tokens et variantes",
        "Responsive et mode sombre",
        "Accessibilité et états de focus",
      ],
    },
    aplicacao: {
      "pt-br":
        "Presente em projetos Next/React e landing pages: entrega rápida sem perder legibilidade do código.",
      "en-us":
        "Used across Next/React projects and landing pages—fast delivery without sacrificing readable markup.",
      "fr-fr":
        "Présent sur Next/React et landing pages : livraison rapide avec un code lisible.",
    },
    nivel: { "pt-br": "Forte", "en-us": "Strong", "fr-fr": "Solide" },
  },
  {
    id: "bootstrap",
    category: "outros",
    label: { "pt-br": "Bootstrap", "en-us": "Bootstrap", "fr-fr": "Bootstrap" },
    description: {
      "pt-br": "Framework CSS com grid e componentes prontos para entregar interfaces consistentes.",
      "en-us": "CSS framework with grid and ready-made components for consistent UIs.",
      "fr-fr": "Framework CSS avec grille et composants prêts pour des UI cohérentes.",
    },
    image: "/assets/skills/bootstrap.png",
    usos: {
      "pt-br": [
        "Grids e utilitários responsivos",
        "Componentes de formulário e navegação",
        "Temas e overrides quando necessário",
        "Entrega ágil em stacks legadas",
      ],
      "en-us": [
        "Responsive grids and utilities",
        "Form and navigation components",
        "Theming and overrides when needed",
        "Fast delivery on legacy stacks",
      ],
      "fr-fr": [
        "Grilles et utilitaires responsive",
        "Composants formulaires et navigation",
        "Thèmes et surcharges si besoin",
        "Livraison rapide sur stacks legacy",
      ],
    },
    aplicacao: {
      "pt-br":
        "Utilizado em sistemas administrativos e painéis onde o time já padronizou em Bootstrap e o prazo exige consistência.",
      "en-us":
        "Used on admin systems and dashboards where the team standardized on Bootstrap and deadlines demand consistency.",
      "fr-fr":
        "Utilisé sur des admins et tableaux de bord où l’équipe s’est standardisée sur Bootstrap.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "mui",
    category: "outros",
    label: { "pt-br": "MUI React", "en-us": "MUI React", "fr-fr": "MUI React" },
    description: {
      "pt-br": "Biblioteca de componentes alinhada ao Material Design, com theming e acessibilidade.",
      "en-us": "Component library aligned with Material Design, with theming and accessibility.",
      "fr-fr": "Bibliothèque de composants Material Design, theming et accessibilité.",
    },
    image: "/assets/skills/mui.png",
    usos: {
      "pt-br": [
        "Telas densas de dados (tabelas, dialogs)",
        "Theming global e modo escuro",
        "Formulários com validação visual",
        "Padronização com design systems corporativos",
      ],
      "en-us": [
        "Data-dense screens (tables, dialogs)",
        "Global theming and dark mode",
        "Forms with clear validation UX",
        "Alignment with corporate design systems",
      ],
      "fr-fr": [
        "Écrans data-dense (tables, modales)",
        "Theming global et mode sombre",
        "Formulaires avec validation claire",
        "Alignement design systems entreprise",
      ],
    },
    aplicacao: {
      "pt-br":
        "Encaixo quando o produto exige componentes ricos prontos e guidelines visuais já próximas do Material.",
      "en-us":
        "I reach for it when the product needs rich, ready-made components near Material guidelines.",
      "fr-fr":
        "Je l’utilise quand le produit demande des composants riches proches des guidelines Material.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "shadcn",
    category: "outros",
    label: { "pt-br": "shadcn/ui", "en-us": "shadcn/ui", "fr-fr": "shadcn/ui" },
    description: {
      "pt-br": "Padrão de componentes copiáveis (Radix + Tailwind) para UIs customizáveis e acessíveis.",
      "en-us": "Copy-paste component patterns (Radix + Tailwind) for customizable, accessible UIs.",
      "fr-fr": "Composants copiables (Radix + Tailwind) pour des UI personnalisables et accessibles.",
    },
    image: "/assets/skills/shadcn.png",
    usos: {
      "pt-br": [
        "Primitives acessíveis sem reinventar acessibilidade",
        "Customização fina com Tailwind",
        "Padrões de formulário e feedback",
        "Consistência visual em apps modernos",
      ],
      "en-us": [
        "Accessible primitives without reinventing a11y",
        "Fine-grained Tailwind customization",
        "Form and feedback patterns",
        "Visual consistency in modern apps",
      ],
      "fr-fr": [
        "Primitives accessibles sans refaire l’a11y",
        "Personnalisation Tailwind fine",
        "Patterns formulaires et feedback",
        "Cohérence visuelle dans les apps modernes",
      ],
    },
    aplicacao: {
      "pt-br":
        "Ótimo para produtos Next onde quero controle total do código dos componentes sem depender de um pacote opaco.",
      "en-us":
        "Great for Next products where I want full control of component code without an opaque package dependency.",
      "fr-fr":
        "Idéal sur Next quand je veux le contrôle total du code des composants.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "javascript",
    category: "linguagens",
    label: { "pt-br": "JavaScript (ES6+)", "en-us": "JavaScript (ES6+)", "fr-fr": "JavaScript (ES6+)" },
    description: {
      "pt-br": "Linguagem do ecossistema web moderno: módulos, assincronia e lógica no cliente e no servidor.",
      "en-us": "The modern web stack language: modules, async, and logic on client and server.",
      "fr-fr": "Langage du web moderne : modules, async, logique client et serveur.",
    },
    image: "/assets/skills/js.png",
    destaque: {
      "pt-br": "Principal linguagem do dia a dia no front",
      "en-us": "Primary language for day-to-day front-end work",
      "fr-fr": "Langage principal au quotidien côté front",
    },
    usos: {
      "pt-br": [
        "Manipulação de DOM quando necessário",
        "Consumo de APIs REST e tratamento de erros",
        "Controle de estado e fluxos assíncronos",
        "Lógica de negócio compartilhada com Node",
      ],
      "en-us": [
        "DOM manipulation when needed",
        "REST API consumption and error handling",
        "Async flows and stateful logic",
        "Shared business logic with Node",
      ],
      "fr-fr": [
        "Manipulation DOM si besoin",
        "Consommation REST et gestion d’erreurs",
        "Flux async et logique d’état",
        "Logique métier partagée avec Node",
      ],
    },
    aplicacao: {
      "pt-br":
        "Utilizado na construção de interfaces dinâmicas e integração com APIs em praticamente todos os meus projetos web.",
      "en-us":
        "Used to build dynamic interfaces and API integration across nearly all my web projects.",
      "fr-fr":
        "Utilisé pour des interfaces dynamiques et l’intégration d’API sur presque tous mes projets web.",
    },
    nivel: { "pt-br": "Forte", "en-us": "Strong", "fr-fr": "Solide" },
  },
  {
    id: "typescript",
    category: "linguagens",
    label: { "pt-br": "TypeScript", "en-us": "TypeScript", "fr-fr": "TypeScript" },
    description: {
      "pt-br": "Superset tipado que reduz regressões e documenta contratos de dados no código.",
      "en-us": "Typed superset that cuts regressions and documents data contracts in code.",
      "fr-fr": "Surcouche typée qui limite les régressions et documente les contrats de données.",
    },
    image: "/assets/skills/ts.png",
    usos: {
      "pt-br": [
        "Modelagem de props e respostas de API",
        "Enums e unions para estados de UI",
        "Refactors mais seguros em bases médias",
        "Integração com ferramentas do ecossistema React",
      ],
      "en-us": [
        "Typing props and API responses",
        "Enums and unions for UI states",
        "Safer refactors in medium codebases",
        "Ecosystem tooling with React",
      ],
      "fr-fr": [
        "Typage des props et réponses API",
        "Enums et unions pour états d’UI",
        "Refactors plus sûrs",
        "Outils d’écosystème React",
      ],
    },
    aplicacao: {
      "pt-br":
        "Adoto em apps Next/React novos para manter previsibilidade quando o domínio cresce (ERP, dashboards).",
      "en-us":
        "I adopt it on new Next/React apps to keep predictability as the domain grows (ERP, dashboards).",
      "fr-fr":
        "Je l’adopte sur les nouvelles apps Next/React pour garder de la prévisibilité quand le domaine grossit.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "dart",
    category: "linguagens",
    label: { "pt-br": "Dart", "en-us": "Dart", "fr-fr": "Dart" },
    description: {
      "pt-br": "Linguagem otimizada para UI reativa no ecossistema Flutter.",
      "en-us": "Language optimized for reactive UI in the Flutter ecosystem.",
      "fr-fr": "Langage optimisé pour une UI réactive avec Flutter.",
    },
    image: "/assets/skills/dart.png",
    usos: {
      "pt-br": [
        "Modelagem de dados e classes imutáveis",
        "Async/await em fluxos mobile",
        "Organização por camadas (UI / lógica)",
        "Integração com plugins Flutter",
      ],
      "en-us": [
        "Data modeling and immutable classes",
        "Async/await in mobile flows",
        "Layered structure (UI / logic)",
        "Flutter plugin integration",
      ],
      "fr-fr": [
        "Modélisation de données et classes immuables",
        "Async/await sur mobile",
        "Structure en couches",
        "Intégration de plugins Flutter",
      ],
    },
    aplicacao: {
      "pt-br":
        "Uso em telas e fluxos Flutter, com base prática em UI, estado local e integrações simples enquanto aprofundo arquitetura mobile.",
      "en-us":
        "Used in Flutter screens and flows, with practical basics in UI, local state, and simple integrations while I deepen mobile architecture.",
      "fr-fr":
        "Utilisé dans des écrans et flux Flutter, avec des bases pratiques en UI, état local et intégrations simples pendant que j’approfondis l’architecture mobile.",
    },
    nivel: { "pt-br": "Base prática", "en-us": "Practical basics", "fr-fr": "Bases pratiques" },
  },
  {
    id: "node",
    category: "back",
    label: { "pt-br": "Node.js", "en-us": "Node.js", "fr-fr": "Node.js" },
    description: {
      "pt-br": "Runtime JavaScript no servidor para APIs, automação e glue entre front e dados.",
      "en-us": "JavaScript runtime on the server for APIs, automation, and front-to-data glue.",
      "fr-fr": "Runtime JavaScript serveur pour APIs, automatisation et lien front-données.",
    },
    image: "/assets/skills/node.png",
    usos: {
      "pt-br": [
        "APIs REST e middlewares",
        "Autenticação, validação e erros padronizados",
        "Integração com banco e serviços externos",
        "Scripts de build e automação",
      ],
      "en-us": [
        "REST APIs and middleware",
        "Auth, validation, standardized errors",
        "Database and third-party integrations",
        "Build scripts and automation",
      ],
      "fr-fr": [
        "APIs REST et middleware",
        "Auth, validation, erreurs standardisées",
        "Intégration BDD et services tiers",
        "Scripts de build et automatisation",
      ],
    },
    aplicacao: {
      "pt-br":
        "Apoio em backends de produtos full-stack e consumo próprio das APIs que construo no front.",
      "en-us":
        "Supporting full-stack product backends and consuming the APIs I help shape from the front end.",
      "fr-fr":
        "Support des backends full-stack et consommation des APIs que j’aide à concevoir côté front.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "nest",
    category: "back",
    label: { "pt-br": "Nest.js", "en-us": "Nest.js", "fr-fr": "Nest.js" },
    description: {
      "pt-br": "Framework Node.js para APIs estruturadas, modularizadas e prontas para crescer.",
      "en-us": "Node.js framework for structured, modular APIs ready to scale.",
      "fr-fr": "Framework Node.js pour APIs structurées, modulaires et prêtes à évoluer.",
    },
    image: "/assets/nest.png",
    usos: {
      "pt-br": [
        "Módulos, controllers e providers",
        "APIs REST com validação tipada",
        "Integração com bancos e serviços externos",
        "Arquitetura organizada para projetos full-stack",
      ],
      "en-us": [
        "Modules, controllers, providers",
        "REST APIs with typed validation",
        "Database and third-party service integrations",
        "Organized architecture for full-stack projects",
      ],
      "fr-fr": [
        "Modules, contrôleurs et providers",
        "APIs REST avec validation typée",
        "Intégration BDD et services externes",
        "Architecture organisée pour projets full-stack",
      ],
    },
    aplicacao: {
      "pt-br":
        "Uso para estruturar backends Node com padrões claros, separando regras de negócio, rotas e integrações.",
      "en-us":
        "Used to structure Node backends with clear patterns, separating business rules, routes, and integrations.",
      "fr-fr":
        "Utilisé pour structurer des backends Node avec des patterns clairs, séparant règles métier, routes et intégrations.",
    },
    nivel: { "pt-br": "Em evolução", "en-us": "Growing", "fr-fr": "En progression" },
  },
  {
    id: "laravel",
    category: "back",
    label: { "pt-br": "Laravel (PHP)", "en-us": "Laravel (PHP)", "fr-fr": "Laravel (PHP)" },
    description: {
      "pt-br": "Framework PHP com rotas, Eloquent e camadas claras para aplicações web tradicionais.",
      "en-us": "PHP framework with routes, Eloquent, and clear layers for classic web apps.",
      "fr-fr": "Framework PHP avec routes, Eloquent et couches claires pour apps web classiques.",
    },
    image: "/assets/skills/laravel.png",
    usos: {
      "pt-br": [
        "Rotas, controllers e policies",
        "Formulários, validação e sessão",
        "Blades ou APIs consumidas pelo front",
        "Integração com filas e e-mail quando necessário",
      ],
      "en-us": [
        "Routes, controllers, policies",
        "Forms, validation, sessions",
        "Blade or APIs consumed by the front",
        "Queues and mail when needed",
      ],
      "fr-fr": [
        "Routes, contrôleurs, policies",
        "Formulaires, validation, sessions",
        "Blade ou APIs consommées par le front",
        "Files et mail si besoin",
      ],
    },
    aplicacao: {
      "pt-br":
        "Experiência em sistemas legados e painéis Laravel entregues com foco em segurança de formulários e permissões.",
      "en-us":
        "Experience on legacy systems and Laravel dashboards with emphasis on form security and permissions.",
      "fr-fr":
        "Expérience sur systèmes legacy et dashboards Laravel avec sécurité des formulaires et permissions.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "next",
    category: "front",
    label: { "pt-br": "Next.js", "en-us": "Next.js", "fr-fr": "Next.js" },
    description: {
      "pt-br": "Framework React com roteamento, SSR/SSG e otimizações de produção integradas.",
      "en-us": "React framework with routing, SSR/SSG, and built-in production optimizations.",
      "fr-fr": "Framework React avec routing, SSR/SSG et optimisations production intégrées.",
    },
    image: "/assets/skills/next.png",
    destaque: {
      "pt-br": "Stack preferida para produtos web novos",
      "en-us": "Preferred stack for new web products",
      "fr-fr": "Stack privilégiée pour les nouveaux produits web",
    },
    usos: {
      "pt-br": [
        "App Router e layouts compartilhados",
        "Server Components e fetching no servidor",
        "Imagens e fontes otimizadas",
        "Deploy na Vercel com previews",
      ],
      "en-us": [
        "App Router and shared layouts",
        "Server Components and server fetching",
        "Optimized images and fonts",
        "Vercel deploys with previews",
      ],
      "fr-fr": [
        "App Router et layouts partagés",
        "Server Components et fetch serveur",
        "Images et polices optimisées",
        "Déploiements Vercel avec previews",
      ],
    },
    aplicacao: {
      "pt-br":
        "Base desta landing e de projetos onde performance, SEO e DX precisam caminhar juntos.",
      "en-us":
        "Foundation for this landing and projects where performance, SEO, and DX must move together.",
      "fr-fr":
        "Base de cette landing et de projets où performance, SEO et DX vont ensemble.",
    },
    nivel: { "pt-br": "Forte", "en-us": "Strong", "fr-fr": "Solide" },
  },
  {
    id: "react-native",
    category: "front",
    label: {
      "pt-br": "React Native",
      "en-us": "React Native",
      "fr-fr": "React Native",
    },
    description: {
      "pt-br": "Framework para criar interfaces mobile nativas usando React e componentes declarativos.",
      "en-us": "Framework for building native mobile interfaces with React and declarative components.",
      "fr-fr": "Framework pour créer des interfaces mobiles natives avec React et composants déclaratifs.",
    },
    image: "/assets/skills/react.png",
    usos: {
      "pt-br": [
        "Componentes mobile reutilizáveis",
        "Navegação entre telas",
        "Estados e hooks no contexto mobile",
        "Protótipos de apps com experiência nativa",
      ],
      "en-us": [
        "Reusable mobile components",
        "Screen navigation",
        "State and hooks in mobile context",
        "App prototypes with native experience",
      ],
      "fr-fr": [
        "Composants mobiles réutilisables",
        "Navigation entre écrans",
        "État et hooks en contexte mobile",
        "Prototypes d’apps avec expérience native",
      ],
    },
    aplicacao: {
      "pt-br":
        "Já usei para levar padrões de React ao mobile em protótipos e telas iniciais, com foco em componentes, navegação e estado.",
      "en-us":
        "Used to bring React patterns into mobile prototypes and early screens, focused on components, navigation, and state.",
      "fr-fr":
        "Utilisé pour porter des patterns React vers des prototypes et premiers écrans mobiles, avec focus sur composants, navigation et état.",
    },
    nivel: { "pt-br": "Base prática", "en-us": "Practical basics", "fr-fr": "Bases pratiques" },
  },
  {
    id: "flutter",
    category: "front",
    label: { "pt-br": "Flutter", "en-us": "Flutter", "fr-fr": "Flutter" },
    description: {
      "pt-br": "Toolkit multiplataforma para construir interfaces nativas compiladas a partir de um único código.",
      "en-us": "Multi-platform toolkit for native-feeling UIs from a single codebase.",
      "fr-fr": "Toolkit multi-plateforme pour des UI natives à partir d’un seul code.",
    },
    image: "/assets/skills/flutter.png",
    usos: {
      "pt-br": [
        "Composição com widgets e temas",
        "Navegação entre telas",
        "Estado local e padrões iniciais",
        "Integração com assets e ícones",
      ],
      "en-us": [
        "Widget composition and theming",
        "Screen navigation",
        "Local state and starter patterns",
        "Assets and icon integration",
      ],
      "fr-fr": [
        "Composition de widgets et thèmes",
        "Navigation entre écrans",
        "État local et patterns de base",
        "Assets et icônes",
      ],
    },
    aplicacao: {
      "pt-br":
        "Já atuei em manutenção e telas Flutter, com base prática em widgets, navegação e ajustes de interface além do trabalho principal em React.",
      "en-us":
        "Used in Flutter maintenance and screens, with practical basics in widgets, navigation, and interface adjustments alongside my main React work.",
      "fr-fr":
        "Utilisé en maintenance et écrans Flutter, avec des bases pratiques en widgets, navigation et ajustements d’interface en parallèle de mon travail React principal.",
    },
    nivel: { "pt-br": "Base prática", "en-us": "Practical basics", "fr-fr": "Bases pratiques" },
  },
  {
    id: "git",
    category: "outros",
    label: { "pt-br": "Git & GitHub", "en-us": "Git & GitHub", "fr-fr": "Git & GitHub" },
    description: {
      "pt-br": "Controle de versão distribuído e plataforma de colaboração em código.",
      "en-us": "Distributed version control and code collaboration platform.",
      "fr-fr": "Contrôle de version distribué et plateforme de collaboration code.",
    },
    image: "/assets/skills/git.png",
    usos: {
      "pt-br": [
        "Branches por feature e revisão em PR",
        "Commits claros e histórico legível",
        "Resolução de conflitos em equipe",
        "CI básico via GitHub Actions quando aplicável",
      ],
      "en-us": [
        "Feature branches and PR review",
        "Clear commits and readable history",
        "Team merge conflict resolution",
        "Basic CI with GitHub Actions when applicable",
      ],
      "fr-fr": [
        "Branches feature et revue en PR",
        "Commits clairs et historique lisible",
        "Résolution de conflits en équipe",
        "CI simple avec GitHub Actions",
      ],
    },
    aplicacao: {
      "pt-br":
        "Fluxo diário em todos os projetos: do protótipo ao deploy, com rastreabilidade de mudanças.",
      "en-us":
        "Daily workflow across projects—from prototype to deploy—with traceable changes.",
      "fr-fr":
        "Flux quotidien sur tous les projets, du prototype au déploiement, avec traçabilité.",
    },
    nivel: { "pt-br": "Forte", "en-us": "Strong", "fr-fr": "Solide" },
  },
  {
    id: "figma",
    category: "outros",
    label: { "pt-br": "Figma Design", "en-us": "Figma Design", "fr-fr": "Figma Design" },
    description: {
      "pt-br": "Ferramenta de design colaborativo para ler specs, medir espaçamentos e alinhar entrega.",
      "en-us": "Collaborative design tool to read specs, measure spacing, and align delivery.",
      "fr-fr": "Outil de design collaboratif pour lire les specs, mesurer et aligner la livraison.",
    },
    image: "/assets/skills/figma.png",
    usos: {
      "pt-br": [
        "Leitura de auto-layout e componentes",
        "Export de assets e ícones",
        "Handoff com dev mode",
        "Comentários com design e produto",
      ],
      "en-us": [
        "Reading auto-layout and components",
        "Exporting assets and icons",
        "Handoff with dev mode",
        "Commenting with design and product",
      ],
      "fr-fr": [
        "Lecture auto-layout et composants",
        "Export d’assets et icônes",
        "Handoff avec dev mode",
        "Commentaires design et produit",
      ],
    },
    aplicacao: {
      "pt-br":
        "Uso em projetos com Figma linkado (ex.: LunarBot) para implementar fiel ao layout sem retrabalho.",
      "en-us":
        "Used on projects with linked Figma (e.g. LunarBot) to implement faithfully and avoid rework.",
      "fr-fr":
        "Utilisé sur des projets avec Figma lié (ex. LunarBot) pour une implémentation fidèle.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "postman",
    category: "back",
    label: { "pt-br": "Postman", "en-us": "Postman", "fr-fr": "Postman" },
    description: {
      "pt-br": "Cliente HTTP para explorar, testar e documentar APIs antes de integrar no front.",
      "en-us": "HTTP client to explore, test, and document APIs before front-end integration.",
      "fr-fr": "Client HTTP pour explorer, tester et documenter les APIs avant intégration front.",
    },
    image: "/assets/skills/postman.png",
    usos: {
      "pt-br": [
        "Collections por ambiente (dev/stage)",
        "Testes de contrato e status codes",
        "Variáveis e pré-request scripts leves",
        "Compartilhamento de exemplos com o time",
      ],
      "en-us": [
        "Per-environment collections (dev/stage)",
        "Contract checks and status codes",
        "Variables and light pre-request scripts",
        "Sharing examples with the team",
      ],
      "fr-fr": [
        "Collections par environnement",
        "Tests de contrat et codes HTTP",
        "Variables et scripts pré-requête légers",
        "Partage d’exemples avec l’équipe",
      ],
    },
    aplicacao: {
      "pt-br":
        "Rotina em integrações Laravel/Node: validar payload antes de ligar botões e formulários na UI.",
      "en-us":
        "Routine on Laravel/Node integrations—validate payloads before wiring buttons and forms in the UI.",
      "fr-fr":
        "Routine sur intégrations Laravel/Node : valider les payloads avant de brancher l’UI.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
  {
    id: "vercel",
    category: "outros",
    label: { "pt-br": "Vercel", "en-us": "Vercel", "fr-fr": "Vercel" },
    description: {
      "pt-br": "Plataforma de hospedagem e CI otimizada para aplicações front-end e Next.js.",
      "en-us": "Hosting and CI platform optimized for front-end and Next.js apps.",
      "fr-fr": "Hébergement et CI optimisés pour le front-end et Next.js.",
    },
    image: "/assets/skills/vercel.png",
    usos: {
      "pt-br": [
        "Deploy contínuo a partir do Git",
        "Preview deployments por branch",
        "Variáveis de ambiente por stage",
        "Observabilidade básica de builds",
      ],
      "en-us": [
        "Continuous deploy from Git",
        "Per-branch preview deployments",
        "Per-stage environment variables",
        "Basic build observability",
      ],
      "fr-fr": [
        "Déploiement continu depuis Git",
        "Preview par branche",
        "Variables d’environnement par stage",
        "Observabilité basique des builds",
      ],
    },
    aplicacao: {
      "pt-br":
        "Hospedagem de landing pages e apps Next com feedback rápido em cada push.",
      "en-us":
        "Hosting landing pages and Next apps with fast feedback on every push.",
      "fr-fr":
        "Hébergement de landing pages et apps Next avec retour rapide à chaque push.",
    },
    nivel: { "pt-br": "Intermediário", "en-us": "Intermediate", "fr-fr": "Intermédiaire" },
  },
]
