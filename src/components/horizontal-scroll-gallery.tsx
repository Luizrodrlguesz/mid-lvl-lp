"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Bolt, Code, Computer, PaintbrushVertical } from "lucide-react"
import SplitText from "@/components/split-text"
import { skillShowcase } from "@/lib/content"
import { HorizontalGalleryCategoryPanel } from "@/components/horizontal-gallery-category-panel"
import { cn } from "@/lib/utils"

const GALLERY_LOCALE = "pt-br" as const

const GALLERY_CATEGORIES = [
  {
    category: "linguagens" as const,
    title: "Linguagens",
    icon: Code,
    iconClassName: "text-white",
    subtitle:
      "Apresentação das linguagens que uso no dia a dia: o papel de cada uma, onde aplico e como encaixam no meu fluxo de trabalho.",
  },
  {
    category: "front",
    title: "Front-end",
    icon: PaintbrushVertical,
    iconClassName: "text-blue-400",
    subtitle:
      "Ferramentas com que estruturo telas, navegação e experiência do utilizador — da marcação às frameworks que entregam o produto.",
  },
  {
    category: "back",
    title: "Back-end",
    icon: Computer,
    iconClassName: "text-red-400",
    subtitle:
      "Camada em que apoio integrações, APIs e validação de dados, alinhando o que a interface promete com o que o servidor garante.",
  },
  {
    category: "outros",
    title: "Outros",
    icon: Bolt,
    iconClassName: "text-green-400",
    subtitle:
      "Ecossistema em volta do código: estilização utilitária, design system, versionamento, deploy e tudo o que acelera a entrega com qualidade.",
  },
]

export function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [activePanel, setActivePanel] = useState(0)
  const panelCount = GALLERY_CATEGORIES.length

  const panelsData = useMemo(
    () =>
      GALLERY_CATEGORIES.map((row) => ({
        ...row,
        skills: skillShowcase.filter((s) => s.category === row.category),
      })),
    [],
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      const panels = gsap.utils.toArray<HTMLElement>(".gallery-panel", containerRef.current)

      const tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          scrub: 1,
          end: () => "+=" + (containerRef.current!.offsetWidth - window.innerWidth),
          onUpdate: (self) => {
            setActivePanel(Math.round(self.progress * (panels.length - 1)))
          },
        },
      })
      scrollTriggerRef.current = tween.scrollTrigger ?? null
    }, containerRef)

    return () => {
      scrollTriggerRef.current = null
      ctx.revert()
    }
  }, [])

  const navigateToPanel = useCallback(
    (index: number) => {
      const container = containerRef.current
      if (!container) return

      const scrollTrigger = scrollTriggerRef.current
      const progress = panelCount <= 1 ? 0 : index / (panelCount - 1)
      const scrollStart =
        scrollTrigger?.start ?? container.getBoundingClientRect().top + window.scrollY
      const scrollDistance =
        scrollTrigger && scrollTrigger.end > scrollTrigger.start
          ? scrollTrigger.end - scrollTrigger.start
          : container.offsetWidth - window.innerWidth

      window.scrollTo({
        top: scrollStart + scrollDistance * progress,
        behavior: "smooth",
      })
    },
    [panelCount],
  )

  return (
    <div>
      <div className="mx-auto w-full max-w-[95vw] space-y-3 px-6 pb-12 pt-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Habilidades
          </p>
          <SplitText
            id="heading-habilidades"
            className="font-orbitron-italic mt-2 text-3xl font-bold"
            text="Galeria horizontal"
            tag="h2"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Scroll vertical percorre os cards horizontalmente. Ao chegar no último, o scroll vertical
          volta ao normal.
        </p>
      </div>

      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflow: "hidden",
          height: "100vh",
          width: `${panelCount * 100}vw`,
        }}
      >
        {panelsData.map(({ category, title, subtitle, skills, icon: Icon, iconClassName }) => (
          <div
            key={category}
            className="gallery-panel"
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              padding: "clamp(1rem, 2.5vw, 2rem)",
              transform: "translateY(10px)",
            }}
          >
            <HorizontalGalleryCategoryPanel
              title={title}
              subtitle={subtitle}
              skills={skills}
              locale={GALLERY_LOCALE}
              icon={Icon}
              iconClassName={iconClassName}
            />
            <nav
              className="flex items-center justify-center gap-1 rounded-full border border-white/12 bg-black/20 p-1 backdrop-blur-[1px]"
              aria-label="Navegação das categorias de habilidades"
            >
              {GALLERY_CATEGORIES.map(({ category: itemCategory, title: itemTitle, icon: ItemIcon, iconClassName: itemIconClassName }, itemIndex) => {
                const active = itemIndex === activePanel

                return (
                  <button
                    key={itemCategory}
                    type="button"
                    onClick={() => navigateToPanel(itemIndex)}
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full border border-white/12 backdrop-blur-md transition",
                      active
                        ? "bg-white/12 shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                        : "bg-black/20 hover:bg-white/8",
                    )}
                    aria-label={`Ir para ${itemTitle}`}
                    aria-current={active ? "true" : undefined}
                  >
                    <ItemIcon className={cn("h-5 w-5", itemIconClassName)} aria-hidden />
                  </button>
                )
              })}
            </nav>
          </div>
        ))}
      </div>
    </div>
  )
}
