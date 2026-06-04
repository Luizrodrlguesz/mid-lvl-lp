"use client"

import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "@/components/split-text"
import { skillShowcase } from "@/lib/content"
import { HorizontalGalleryCategoryPanel } from "@/components/horizontal-gallery-category-panel"

const GALLERY_LOCALE = "pt-br" as const

const GALLERY_CATEGORIES = [
  {
    category: "linguagens" as const,
    title: "Linguagens",
    subtitle:
      "Apresentação das linguagens que uso no dia a dia: o papel de cada uma, onde aplico e como encaixam no meu fluxo de trabalho.",
  },
  {
    category: "front",
    title: "Front-end",
    subtitle:
      "Ferramentas com que estruturo telas, navegação e experiência do utilizador — da marcação às frameworks que entregam o produto.",
  },
  {
    category: "back",
    title: "Back-end",
    subtitle:
      "Camada em que apoio integrações, APIs e validação de dados, alinhando o que a interface promete com o que o servidor garante.",
  },
  {
    category: "outros",
    title: "Outros",
    subtitle:
      "Ecossistema em volta do código: estilização utilitária, design system, versionamento, deploy e tudo o que acelera a entrega com qualidade.",
  },
]

export function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
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

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          scrub: 1,
          end: () => "+=" + (containerRef.current!.offsetWidth - window.innerWidth),
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

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
        {panelsData.map(({ category, title, subtitle, skills }) => (
          <div
            key={category}
            className="gallery-panel"
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(1rem, 2.5vw, 2rem)",
            }}
          >
            <HorizontalGalleryCategoryPanel
              title={title}
              subtitle={subtitle}
              skills={skills}
              locale={GALLERY_LOCALE}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
