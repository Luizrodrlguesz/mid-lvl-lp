"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ContactMessage } from "@/components/contact-message"
import AccretionDisc from "@/components/originkit/accretion-disc"
import { SocialHighlightCards } from "@/components/social-highlight-cards"
import { useT } from "@/lib/i18n"

const SECTIONS = ["inicio", "sobre", "habilidades", "projetos", "processo"] as const

/** Config do buraco negro do footer (editor da Originkit). */
const FOOTER_DISC = {
  baseColor: "#2798EE",
  accentColor: "#B6F2D3",
  density: 61,
  dotSize: 37,
  speed: 13,
  // O canvas tem o dobro da altura do footer (o centro fica na borda de baixo),
  // e o tamanho da esfera acompanha a altura: 220 aqui equivale aos 110 de antes.
  distance: 220,
  field: { scatter: 236, blur: 108 },
  disc: { tilt: 45, core: 27, arms: 8 },
  jets: { amount: 0, length: 0, spread: 0 },
}

/**
 * Footer "revelado" com o contato da página: o conteúdo fica fixo no fundo da
 * tela e a página rola por cima dele. Como o conteúdo acima é transparente
 * (fundo de partículas/nuvens), em vez de `sticky` atrás de um bloco opaco
 * usamos `clip-path` no invólucro: o filho `fixed` só aparece dentro da área
 * do footer. No mobile o conteúdo é mais alto que a tela, então ele flui normal.
 *
 * Fundo off-white no light e preto no dark (--stage, o mesmo do hero e da
 * cortina do About). No dark, um buraco negro com o centro na borda de baixo:
 * só a metade de cima aparece, "saindo" do rodapé do footer.
 */
export function RevealFooter() {
  const t = useT()
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  // No desktop o conteúdo é `fixed` (está sempre "na tela" para o navegador),
  // então quem diz se o footer aparece é o próprio <footer>, que fica no fluxo.
  const [visible, setVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="contato"
      aria-labelledby="heading-contato"
      // overflow-hidden: no mobile o conteúdo flui normal e o canvas do buraco negro
      // (que passa da borda de baixo) esticava a página — o clip-path só corta o
      // desenho, não a área de rolagem. Não afeta o filho `fixed` do desktop.
      className="relative z-10 overflow-hidden bg-[var(--stage)] text-[var(--stage-foreground)] md:h-[27rem]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="relative w-full bg-[var(--stage)] md:fixed md:bottom-0 md:left-0 md:h-[27rem]">
        {/*
          Buraco negro (só no dark), atrás do conteúdo: o canvas tem o dobro da altura
          do footer e é centralizado na borda de baixo, então só a metade de cima
          aparece (o clip-path do footer corta o resto). Só anima com o footer na tela.
        */}
        {mounted && resolvedTheme === "dark" ? (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[200%] translate-y-1/2">
            <AccretionDisc {...FOOTER_DISC} background="transparent" active={visible} />
          </div>
        ) : null}

        {/*
          Personagem do loading caminhando pelo rodapé, da borda esquerda até a
          direita, no ritmo do loading (~20px/s). Pausa com o footer fora da tela.
          Só no desktop.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 size-20 max-md:hidden motion-reduce:hidden"
          style={{ animation: "footer-walk 75s linear infinite", animationPlayState: visible ? "running" : "paused" }}
        >
          <div
            className="relative size-full"
            style={{
              animation: "footer-walk-sway 3.6s linear infinite alternate",
              animationPlayState: visible ? "running" : "paused",
            }}
          >
            <Image src="/assets/avatar/pxl-loading.png" alt="" fill sizes="80px" className="object-contain" />
          </div>
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row md:justify-between md:px-12">
          <div className="flex max-w-xl flex-col gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t.contact.eyebrow}
              </p>
              <h2 id="heading-contato" className="font-display text-3xl font-bold sm:text-4xl">
                {t.contact.title}
              </h2>
              <p className="text-muted-foreground">{t.contact.intro}</p>
            </div>

            <SocialHighlightCards
              label={t.contact.linksAria}
              getLabel={(id, fallback) =>
                id === "email" ? t.contact.emailLabel : id === "resume" ? t.contact.resumeLabel : fallback
              }
            />

            <div>
              <ContactMessage />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 md:items-end">
            <nav className="text-base md:text-right md:text-lg" aria-label={t.common.sectionsNav}>
              <ul className="space-y-1.5">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                      {t.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="text-xs text-muted-foreground">{t.contact.footerRights(year)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
