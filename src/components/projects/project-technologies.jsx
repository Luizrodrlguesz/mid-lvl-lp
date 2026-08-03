/**
 * Lista de tecnologias usadas no projeto.
 */
import Image from "next/image"

import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const TECH_ICON_MAP = {
  "HTML5 & CSS3": "/assets/skills/htmlcss.png",
  Bootstrap: "/assets/skills/bootstrap.png",
  Dart: "/assets/skills/dart.png",
  Figma: "/assets/skills/figma.png",
  Flutter: "/assets/skills/flutter.png",
  Git: "/assets/skills/git.png",
  GitHub: "/assets/skills/github.png",
  JavaScript: "/assets/skills/js.png",
  "Laravel (PHP)": "/assets/skills/laravel.png",
  MUI: "/assets/skills/mui.png",
  "Next.js": "/assets/skills/next.png",
  "Node.js": "/assets/skills/node.png",
  Postman: "/assets/skills/postman.png",
  React: "/assets/skills/react.png",
  "React Native": "/assets/skills/react.png",
  "REST API": "/assets/skills/apirest.png",
  "shadcn/ui": "/assets/skills/shadcn.png",
  "Tailwind CSS": "/assets/skills/tailwind.png",
  TypeScript: "/assets/skills/ts.png",
  Vercel: "/assets/skills/vercel.png",
  Vite: "/assets/skills/vite.png",
}

export function ProjectTechnologies({ projectId, tecnologias }) {
  const t = useT()

  if (!tecnologias?.length) return null

  const headingId = `tech-heading-${projectId}`

  return (
    <section aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t.projects.technologies}
      </h4>
      <ul className="flex flex-wrap gap-2">
        {tecnologias.map((t) => {
          const iconSrc = TECH_ICON_MAP[t]

          return (
          <li
            key={t}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-md border border-transparent bg-muted/25 dark:border-border/60",
              "transition-colors hover:border-foreground/25 hover:bg-foreground/8",
            )}
            title={t}
          >
            {iconSrc ? (
              <Image
                src={iconSrc}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
                aria-hidden
              />
            ) : (
              <span className="text-[10px] font-semibold text-foreground">
                {t.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span className="sr-only">{t}</span>
          </li>
          )
        })}
      </ul>
    </section>
  )
}
