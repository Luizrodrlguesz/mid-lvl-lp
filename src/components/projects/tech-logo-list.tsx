import Image from "next/image"

import { TECH_ICONS } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

/**
 * Tecnologias como logos em quadradinhos; o nome fica no tooltip e para leitores de tela.
 * Sem logo cadastrada, o quadradinho mostra o nome por extenso.
 */
export function TechLogoList({ tecnologias, className }: { tecnologias: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tecnologias.map((tech) => {
        const icon = TECH_ICONS[tech]
        return (
          <li
            key={tech}
            title={tech}
            className={cn(
              "grid h-10 place-items-center rounded-md border border-transparent bg-muted/25 dark:border-border/60",
              "transition-colors hover:border-foreground/25 hover:bg-foreground/8",
              icon ? "w-10" : "px-3",
            )}
          >
            {icon ? (
              <Image
                src={icon.src}
                alt=""
                width={24}
                height={24}
                aria-hidden
                className={cn(
                  "h-6 w-6 object-contain",
                  icon.mono === "white" && "invert dark:invert-0",
                  icon.mono === "black" && "dark:invert",
                )}
              />
            ) : (
              <span className="text-xs font-medium text-foreground">{tech}</span>
            )}
            {icon ? <span className="sr-only">{tech}</span> : null}
          </li>
        )
      })}
    </ul>
  )
}
