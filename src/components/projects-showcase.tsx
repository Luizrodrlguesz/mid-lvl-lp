"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import FlexCarousel, { type FlexCarouselItem } from "@/components/projects/flex-carousel"
import {
  ExpandingScreen,
  type ExpandOrigin,
  type ExpandingScreenHandle,
} from "@/components/expandable-screen"
import { TechLogoList } from "@/components/projects/tech-logo-list"
import { MOCK_PROJECTS } from "@/data/projects"
import { useLocale, useT } from "@/lib/i18n"
import { localizeProject } from "@/lib/project-helpers"

/*
 * Projetos: carrossel (FlexCarousel) em largura total só com as logos dos
 * projetos. Ele gira com scroll lateral, arraste ou setas; o scroll vertical
 * passa direto e desce a página (captureWheel desligado). Clicar no projeto do
 * centro abre a tela expansível (a mesma do "Write a message") em vidro, com o
 * conteúdo do projeto direto nela.
 */

type ProjetoLocalizado = ReturnType<typeof localizeProject>

const TILE = 640
/** Área da logo dentro do quadrado de vidro. */
const LOGO_AREA = 0.62
/** Raio dos cantos dos cards: o modal nasce e volta com o mesmo raio. */
const CARD_RADIUS = 28

const LABEL = "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"

/** "#rrggbb" + alfa → "rgba(...)" (as cores de fundo dos projetos vêm em hex). */
function withAlpha(hex: string, alpha: number) {
  const n = Number.parseInt(hex.replace("#", "").padEnd(6, "f").slice(0, 6), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

/**
 * Monta cada logo (PNG sem fundo) sobre um quadrado de vidro: corpo translúcido
 * com um tom da cor do projeto, brilho dessa cor atrás da logo e reflexo
 * diagonal. A transparência chega até a tela (o fundo da página aparece atrás) e
 * a borda clara do vidro é desenhada pelo shader do carrossel (`glass`).
 */
function useLogoTiles(projetos: ProjetoLocalizado[], dark: boolean) {
  const [tiles, setTiles] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    const build = async (projeto: ProjetoLocalizado) => {
      if (!projeto.logoEmpresa) return null
      // `load` em vez de `img.decode()`: o decode não resolve com a aba em segundo plano.
      const img = new Image()
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`logo: ${projeto.logoEmpresa}`))
        img.src = projeto.logoEmpresa!
      })
      const canvas = document.createElement("canvas")
      canvas.width = TILE
      canvas.height = TILE
      const ctx = canvas.getContext("2d")
      if (!ctx) return null
      const custom = projeto.logoEmpresaTint
      const tint =
        (typeof custom === "string" ? custom : custom?.[dark ? "dark" : "light"]) ||
        projeto.logoEmpresaBackground ||
        (dark ? "#94a3b8" : "#ffffff")

      // Corpo do vidro: leitoso no light, escuro e sutil no dark, tingido pela cor do projeto.
      ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.4)"
      ctx.fillRect(0, 0, TILE, TILE)
      ctx.fillStyle = withAlpha(tint, dark ? 0.32 : 0.22)
      ctx.fillRect(0, 0, TILE, TILE)

      // Brilho da cor do projeto atrás da logo.
      const glow = ctx.createRadialGradient(TILE / 2, TILE / 2, 0, TILE / 2, TILE / 2, TILE * 0.55)
      glow.addColorStop(0, withAlpha(tint, dark ? 0.5 : 0.35))
      glow.addColorStop(1, withAlpha(tint, 0))
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, TILE, TILE)

      // Reflexo diagonal do vidro.
      const sheen = ctx.createLinearGradient(0, 0, TILE, TILE)
      sheen.addColorStop(0, `rgba(255, 255, 255, ${dark ? 0.16 : 0.35})`)
      sheen.addColorStop(0.45, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = sheen
      ctx.fillRect(0, 0, TILE, TILE)

      // A logo centralizada, com respiro.
      const fit = Math.min((TILE * LOGO_AREA) / img.width, (TILE * LOGO_AREA) / img.height)
      const w = img.width * fit
      const h = img.height * fit
      ctx.drawImage(img, (TILE - w) / 2, (TILE - h) / 2, w, h)
      return [projeto.id, canvas.toDataURL("image/png")] as const
    }

    Promise.all(projetos.map((p) => build(p).catch(() => null))).then((entries) => {
      if (cancelled) return
      setTiles(Object.fromEntries(entries.filter((e): e is readonly [string, string] => Boolean(e))))
    })
    return () => {
      cancelled = true
    }
  }, [projetos, dark])

  return tiles
}

/** Filtro por categoria vindo das abas da seção ("all" mostra todos). */
export type ProjectCategoryFilter = "all" | "sistema" | "lp"

const byCategory = (category: ProjectCategoryFilter) => (p: (typeof MOCK_PROJECTS)[number]) =>
  category === "all" || p.categoria === category

export function ProjectsShowcase({ category = "all" }: { category?: ProjectCategoryFilter }) {
  const t = useT()
  const { locale } = useLocale()
  const screenRef = useRef<ExpandingScreenHandle>(null)
  // Retângulo do card clicado (na tela): o modal nasce dele e volta para ele.
  const cardRectRef = useRef<DOMRect | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Só os projetos com logo (a imagem do carrossel é a logo).
  const comLogo = useMemo(
    () => MOCK_PROJECTS.filter((p) => p.logoEmpresa).filter(byCategory(category)).map((p) => localizeProject(p, "en-us")),
    [category],
  )
  const { resolvedTheme } = useTheme()
  const tiles = useLogoTiles(comLogo, resolvedTheme === "dark")

  const projetos = useMemo(
    () => MOCK_PROJECTS.filter((p) => p.logoEmpresa).filter(byCategory(category)).map((p) => localizeProject(p, locale)),
    [locale, category],
  )
  const selected = projetos.find((p) => p.id === selectedId) ?? null

  const items: FlexCarouselItem[] = useMemo(
    () =>
      projetos
        .filter((p) => tiles[p.id])
        .map((p) => ({ src: tiles[p.id], alt: p.nome, title: p.nome, subtitle: p.status })),
    [projetos, tiles],
  )
  const ready = items.length === projetos.length && items.length > 0

  /**
   * O modal nasce exatamente do card clicado (mesma posição, tamanho e cantos)
   * e encolhe de volta para ele. Sem o retângulo, cai no centro do carrossel.
   */
  const origin = (): ExpandOrigin => {
    if (cardRectRef.current) return { rect: cardRectRef.current, radius: CARD_RADIUS }
    const box = carouselRef.current?.getBoundingClientRect()
    const size = 280
    const x = box ? box.left + box.width / 2 : window.innerWidth / 2
    const y = box ? box.top + box.height / 2 : window.innerHeight / 2
    return { rect: new DOMRect(x - size / 2, y - size / 2, size, size), radius: CARD_RADIUS }
  }

  return (
    <>
      <div
        ref={carouselRef}
        // Mais alto que os cards: a curva dos cards das pontas passa da faixa
        // central e era cortada com 560px. cardHeight compensa (≈ 280px de card).
        // No mobile a faixa é mais baixa: os cards (proporcionais a ela) ficam menores.
        className="relative h-[36rem] w-full sm:h-[44rem] lg:h-[51.25rem]"
      >
        {ready ? (
          <FlexCarousel
            items={items}
            preset="liquid"
            intro="rise"
            cardHeight={0.34}
            gap={12}
            squeeze={0.2}
            focusOnClick={false}
            captions
            fit="natural"
            radius={CARD_RADIUS}
            glass
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={false}
            interval={4}
            // Só o scroll lateral gira o carrossel; o vertical desce a página.
            captureWheel={false}
            onSelect={(index, _item, rect) => {
              const projeto = projetos[index]
              if (!projeto) return
              cardRectRef.current = rect ?? null
              setSelectedId(projeto.id)
              void screenRef.current?.open(origin)
            }}
          />
        ) : null}
      </div>

      <ExpandingScreen
        ref={screenRef}
        label={selected?.nome}
        closeLabel={t.contact.closeForm}
        // Vidro: o próprio modal é o card do projeto, com a página desfocada atrás.
        screenClassName="border border-white/40 bg-white/60 text-foreground backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/55"
        onClosed={() => carouselRef.current?.querySelector<HTMLElement>("[role=region]")?.focus()}
      >
        {selected ? <ProjectDetail projeto={selected} /> : null}
      </ExpandingScreen>
    </>
  )
}

function ProjectDetail({ projeto }: { projeto: ProjetoLocalizado }) {
  const t = useT()
  const web = projeto.plataformas?.web
  const mobile = projeto.plataformas?.mobile
  const imagem = web?.imagem?.trim() || mobile?.imagem?.trim()
  const { stackDetalhada, decisoesTecnicas, desafiosExtras } = projeto.conteudoTecnico
  const insights = projeto.insights

  return (
    <article className="mx-auto w-[90%] max-w-6xl space-y-10 py-24">
      <header className="flex flex-wrap items-center gap-4">
        <span
          className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-sm"
          style={{ backgroundColor: projeto.logoEmpresaBackground || "#ffffff" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- logos de tamanhos variados */}
          <img
            src={projeto.logoEmpresa}
            alt=""
            className={projeto.logoEmpresaSemPadding ? "size-full object-cover" : "size-full object-contain p-2"}
          />
        </span>
        <div className="min-w-0 flex-1">
          {projeto.destaque ? <p className={LABEL}>{projeto.destaque}</p> : null}
          <h2 data-autofocus tabIndex={-1} className="font-display text-3xl font-bold outline-none sm:text-4xl">
            {projeto.nome}
          </h2>
          {projeto.resumo ? <p className="mt-1 text-muted-foreground">{projeto.resumo}</p> : null}
        </div>
        {projeto.status ? (
          <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium">{projeto.status}</span>
        ) : null}
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6 text-sm leading-relaxed">
          {projeto.descricao ? <p className="text-base">{projeto.descricao}</p> : null}

          {projeto.metricas?.length ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {projeto.metricas.map((m: { label: string; valor: string }) => (
                <li key={m.label} className="rounded-2xl bg-foreground/[0.06] px-4 py-3">
                  <p className="text-lg font-bold">{m.valor}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <List title={t.projects.card.responsibility} items={projeto.responsabilidade} />

          {projeto.tecnologias?.length ? (
            <div className="space-y-2">
              <p className={LABEL}>{t.projects.technologies}</p>
              <TechLogoList tecnologias={projeto.tecnologias} />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {web?.link?.trim() ? <LinkPill href={web.link}>{t.projects.card.visit} ({t.projects.platformLabels.web})</LinkPill> : null}
            {mobile?.link?.trim() ? (
              <LinkPill href={mobile.link}>{t.projects.card.visit} ({t.projects.platformLabels.mobile})</LinkPill>
            ) : null}
            {projeto.figmaLink?.trim() ? <LinkPill href={projeto.figmaLink}>{t.projects.card.viewFigma}</LinkPill> : null}
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          {imagem ? (
            // eslint-disable-next-line @next/next/no-img-element -- dimensões variam por projeto
            <img src={imagem} alt={projeto.nome} loading="lazy" className="w-full rounded-2xl border border-foreground/10 shadow-lg" />
          ) : null}

          {insights ? (
            <div className="space-y-2">
              <p className={LABEL}>{t.projects.insights.heading}</p>
              {(["desafio", "solucao", "resultado"] as const).map((k) =>
                insights[k]?.trim() ? (
                  <p key={k}>
                    <strong>{t.projects.insights[k]}:</strong> {insights[k]}
                  </p>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-8 border-t border-foreground/10 pt-8 text-sm leading-relaxed md:grid-cols-2">
        {stackDetalhada.length ? (
          <div className="space-y-2">
            <p className={LABEL}>{t.projects.technical.stack}</p>
            <p>{stackDetalhada.join(" · ")}</p>
          </div>
        ) : null}
        <List title={t.projects.technical.decisions} items={decisoesTecnicas} />
        <List title={t.projects.technical.challenges} items={desafiosExtras} />
        <List title={t.projects.evolution} items={projeto.evolucao} />
      </div>
    </article>
  )
}

function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
    >
      {children}
    </a>
  )
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div className="space-y-2">
      <p className={LABEL}>{title}</p>
      <ul className="list-disc space-y-1 pl-5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
