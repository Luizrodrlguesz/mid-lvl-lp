"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null)

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
      <div className="mx-auto max-w-6xl space-y-2 px-6 pb-12 pt-24">
        <h2 id="heading-variacoes" className="text-3xl font-bold">
          Galeria horizontal
        </h2>
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
          width: `${4 * 100}vw`,
        }}
      >
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="gallery-panel"
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <article className="flex min-h-[220px] w-full max-w-2xl flex-col rounded-2xl border border-border bg-card/80 p-8 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              <span className="mt-6 inline-flex w-fit rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                Placeholder
              </span>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}

const CARDS = [
  { title: "Bloco um", body: "Texto de apoio genérico para manter o ritmo visual." },
  { title: "Bloco dois", body: "Conteúdo placeholder até você definir o que entra em cada card." },
  { title: "Bloco três", body: "Mesma hierarquia de título e parágrafo nos quatro itens." },
  { title: "Bloco quatro", body: "Só para ocupar o quarto slot e ver alinhamento em telas largas." },
]
