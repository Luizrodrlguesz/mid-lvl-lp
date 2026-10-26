/**
 * Logos das tecnologias usadas nos projetos (linha do tempo e modal do carrossel).
 * `mono`: logo de uma cor só; a branca é invertida no tema claro e a preta no escuro.
 */
export type TechIcon = { src: string; mono?: "white" | "black" }

export const TECH_ICONS: Record<string, TechIcon> = {
  "HTML5 & CSS3": { src: "/assets/skills/htmlcss.png" },
  "Ant Design": { src: "/assets/skills/ant-design.png" },
  Bootstrap: { src: "/assets/skills/bootstrap.png" },
  "CSS Modules": { src: "/assets/skills/css-modules.svg", mono: "white" },
  Dart: { src: "/assets/skills/dart.png" },
  Docker: { src: "/assets/skills/docker.png" },
  Figma: { src: "/assets/skills/figma.png" },
  Flutter: { src: "/assets/skills/flutter.png" },
  Git: { src: "/assets/skills/git.png" },
  GitHub: { src: "/assets/skills/github.png", mono: "black" },
  JavaScript: { src: "/assets/skills/js.png" },
  "Laravel (PHP)": { src: "/assets/skills/laravel.png" },
  // O Motion nasceu como Framer Motion; usa a marca da Framer.
  Motion: { src: "/assets/skills/motion.svg", mono: "white" },
  MUI: { src: "/assets/skills/mui.png" },
  "Next.js": { src: "/assets/skills/next.png", mono: "white" },
  "Node.js": { src: "/assets/skills/node.png" },
  PHP: { src: "/assets/skills/php.png" },
  Postman: { src: "/assets/skills/postman.png" },
  React: { src: "/assets/skills/react.png" },
  "React Native": { src: "/assets/skills/react.png" },
  "React Router": { src: "/assets/skills/reactrouter.png" },
  "REST API": { src: "/assets/skills/apirest.png" },
  "SCSS Modules": { src: "/assets/skills/sass.svg" },
  "shadcn/ui": { src: "/assets/skills/shadcn.png", mono: "white" },
  "Tailwind CSS": { src: "/assets/skills/tailwind.png" },
  "TanStack Query": { src: "/assets/skills/tanstack-query.svg" },
  TypeScript: { src: "/assets/skills/ts.png" },
  Vercel: { src: "/assets/skills/vercel.png", mono: "white" },
  Vite: { src: "/assets/skills/vite.png" },
}
