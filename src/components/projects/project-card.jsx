"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  descricaoParaModoVisual,
  imagemParaPlataforma,
  insightsTemConteudo,
  plataformasDisponiveis,
  visitUrlParaPlataforma,
} from "@/lib/project-helpers"
import {
  cardPresenceTransition,
  imageCrossfadeTransition,
  narrativeContainer,
  narrativeImageColumn,
  narrativeItem,
  springTransition,
} from "@/lib/projects-motion"
import { ProjectEvolution } from "./project-evolution"
import { ProjectInsights } from "./project-insights"
import { ProjectPlatformSwitcher } from "./project-platform-switcher"
import { ProjectTechnicalDetails } from "./project-technical-details"
import { ProjectTechnologies } from "./project-technologies"

const LABEL_CATEGORIA = {
  web: "Web",
  app: "App",
  sistema: "Sistema",
}

const LABEL_PLATAFORMA = {
  web: "Web",
  mobile: "Mobile",
}

const PROJECT_PREVIEW_SWAP_MS = 2000

function previewImagesParaPlataforma(projeto, plataformaAtiva) {
  const previewImages = projeto.previewImages
  if (Array.isArray(previewImages)) {
    return plataformaAtiva === "web" ? previewImages : null
  }

  return previewImages?.[plataformaAtiva] ?? null
}

const ctaMotion = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: springTransition,
}

function CtaWrap({ children, disabled }) {
  if (disabled) {
    return <span className="inline-flex">{children}</span>
  }
  return (
    <motion.span className="inline-flex will-change-transform" {...ctaMotion}>
      {children}
    </motion.span>
  )
}

function plataformaInicialParaProjeto(projeto) {
  const lista = plataformasDisponiveis(projeto)
  if (lista.includes("web")) return "web"
  if (lista.includes("mobile")) return "mobile"
  return "web"
}

/**
 * Card do projeto: grelha, stagger narrativo (texto → imagem) e modo visual/técnico.
 */
function ProjectCardInner({ projeto, tipo = "profissional", viewMode = "visual" }) {
  const isTecnico = viewMode === "tecnico"

  const disponiveis = useMemo(
    () => plataformasDisponiveis(projeto),
    [projeto],
  )

  const [plataformaAtiva, setPlataformaAtiva] = useState(() =>
    plataformaInicialParaProjeto(projeto),
  )
  const [isPreviewHovered, setIsPreviewHovered] = useState(false)
  const [previewFrame, setPreviewFrame] = useState(0)

  const handlePlatformChange = (nextPlatform) => {
    setIsPreviewHovered(false)
    setPreviewFrame(0)
    setPlataformaAtiva(nextPlatform)
  }

  const opcoesPlataforma = useMemo(
    () =>
      disponiveis.map((id) => ({
        id,
        label: LABEL_PLATAFORMA[id] ?? id,
      })),
    [disponiveis],
  )

  const visitUrl = visitUrlParaPlataforma(projeto.plataformas, plataformaAtiva)
  const imageSrc = imagemParaPlataforma(projeto.plataformas, plataformaAtiva)
  const previewImages = previewImagesParaPlataforma(projeto, plataformaAtiva)
  const displayedImageSrc = previewImages?.[previewFrame] ?? imageSrc
  const imageAnimKey = `${projeto.id}-${plataformaAtiva}-${displayedImageSrc || "empty"}`

  const platformHeadingId = `platform-label-${projeto.id}`
  const titleId = `project-card-title-${projeto.id}`

  const textoDescricao = isTecnico
    ? projeto.descricao
    : descricaoParaModoVisual(projeto)

  const tecnologiasVisiveis = useMemo(() => {
    if (isTecnico) return projeto.tecnologias
    return projeto.tecnologias.slice(0, 5)
  }, [isTecnico, projeto.tecnologias])

  const techHidden =
    !isTecnico && projeto.tecnologias.length > tecnologiasVisiveis.length
      ? projeto.tecnologias.length - tecnologiasVisiveis.length
      : 0

  const narrativeKey = `${projeto.id}-${viewMode}`

  useEffect(() => {
    if (!isPreviewHovered || !previewImages?.length) return

    const id = window.setInterval(() => {
      setPreviewFrame((frame) => (frame + 1) % previewImages.length)
    }, PROJECT_PREVIEW_SWAP_MS)

    return () => window.clearInterval(id)
  }, [isPreviewHovered, previewImages])

  return (
    <motion.article
      role="region"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={cardPresenceTransition}
      className={cn(
        "overflow-hidden rounded-[32px] border p-6 shadow-sm sm:p-8",
        "bg-white/10 backdrop-blur-[25px] dark:bg-black/10",
        tipo === "profissional" &&
          "border-border shadow-black/20 ring-1 ring-black/5 dark:ring-white/5",
        tipo === "pessoal" &&
          "border-violet-500/20 shadow-violet-900/10 ring-1 ring-violet-500/15 dark:shadow-violet-950/25",
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,43fr)_minmax(0,57fr)] lg:items-start lg:gap-10">
        <motion.div
          key={narrativeKey}
          variants={narrativeContainer}
          initial="hidden"
          animate="show"
          className="order-2 flex min-w-0 flex-col gap-6 lg:order-1 lg:gap-7"
        >
          <motion.header variants={narrativeItem} className="space-y-3">
            {projeto.destaque && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground/70">{projeto.destaque}</span>
                {projeto.status && (
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary/90">
                    {projeto.status}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-start gap-3">
              {projeto.logoEmpresa ? (
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-transparent shadow-sm ring-1 ring-black/5 dark:border-border sm:h-12 sm:w-12",
                    projeto.logoEmpresaBackground ? "" : "bg-white/95",
                    projeto.logoEmpresaSemPadding ? "p-0" : "p-2",
                  )}
                  style={
                    projeto.logoEmpresaBackground
                      ? { backgroundColor: projeto.logoEmpresaBackground }
                      : undefined
                  }
                >
                  <img
                    src={projeto.logoEmpresa}
                    alt={`Logo ${projeto.nome}`}
                    className={cn(
                      "h-full w-full",
                      projeto.logoEmpresaSemPadding ? "object-cover" : "object-contain",
                    )}
                    loading="lazy"
                  />
                </span>
              ) : (
                <span
                  className={cn(
                    "hidden shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest sm:inline-flex",
                    tipo === "profissional"
                      ? "bg-slate-800/5 text-muted-foreground dark:bg-foreground/5"
                      : "border border-violet-500/30 bg-violet-500/8 text-violet-800 dark:text-violet-100/90",
                  )}
                >
                  {LABEL_CATEGORIA[projeto.categoria] ?? projeto.categoria}
                </span>
              )}
              <div className="min-w-0 flex-1 space-y-2">
                <h3
                  id={titleId}
                  className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem] sm:leading-tight"
                >
                  {projeto.nome}
                </h3>
                <p className="text-sm font-medium leading-snug text-foreground/80">
                  {projeto.resumo}
                </p>
              </div>
            </div>
          </motion.header>

          <motion.div variants={narrativeItem} className="space-y-2">
            <p
              id={platformHeadingId}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Plataforma
            </p>
            <ProjectPlatformSwitcher
              value={plataformaAtiva}
              onChange={handlePlatformChange}
              options={opcoesPlataforma}
              labelledBy={platformHeadingId}
            />
            {opcoesPlataforma.length < 2 ? (
              <p className="text-xs text-muted-foreground/90">
                {disponiveis.length === 0
                  ? "Sem referência web ou mobile neste registo."
                  : `Conteúdo mostrado para ${LABEL_PLATAFORMA[disponiveis[0]] ?? disponiveis[0]}.`}
              </p>
            ) : null}
          </motion.div>

          <motion.div variants={narrativeItem}>
            <h4 className="sr-only">Sobre o projeto</h4>
            <p
              className={cn(
                "max-w-2xl leading-relaxed",
                isTecnico
                  ? "text-sm text-muted-foreground/95"
                  : "text-sm text-muted-foreground/85",
              )}
            >
              {textoDescricao}
            </p>
          </motion.div>

          {!isTecnico && projeto.metricas?.length > 0 && (
            <motion.div variants={narrativeItem} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {projeto.metricas.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-1 rounded-xl bg-slate-800/6 px-4 py-3 dark:bg-white/4"
                >
                  <span className="text-[11px] text-muted-foreground/70">{m.label}</span>
                  <span className="text-lg font-bold leading-tight tracking-tight text-foreground">{m.valor}</span>
                </div>
              ))}
            </motion.div>
          )}

          {!isTecnico && projeto.responsabilidade?.length > 0 && (
            <motion.div variants={narrativeItem} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                Minha responsabilidade
              </h4>
              <ul className="space-y-2.5">
                {projeto.responsabilidade.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground/85">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {isTecnico ? (
            <>
              <motion.div variants={narrativeItem}>
                <ProjectTechnicalDetails
                  projectId={projeto.id}
                  conteudo={projeto.conteudoTecnico}
                />
              </motion.div>
              <motion.div variants={narrativeItem}>
                <ProjectTechnologies
                  projectId={projeto.id}
                  tecnologias={tecnologiasVisiveis}
                />
              </motion.div>
              <motion.div variants={narrativeItem}>
                <ProjectEvolution projectId={projeto.id} evolucao={projeto.evolucao} />
              </motion.div>
            </>
          ) : (
            <motion.div variants={narrativeItem}>
              <ProjectTechnologies
                projectId={projeto.id}
                tecnologias={tecnologiasVisiveis}
              />
              {techHidden > 0 ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  +{techHidden} tecnologias na vista técnica
                </p>
              ) : null}
            </motion.div>
          )}

        </motion.div>

        <motion.div
          key={`media-${narrativeKey}`}
          className="order-1 flex min-w-0 flex-col gap-6 lg:order-2 lg:self-start"
        >
          <motion.div
            variants={narrativeImageColumn}
            initial="hidden"
            animate="show"
          >
            <figure
              className={cn(
                "relative mx-auto w-full",
                plataformaAtiva === "mobile"
                  ? "max-w-[180px] sm:max-w-[220px]"
                  : "max-w-lg lg:max-w-none",
              )}
            >
              <div
                className={cn(
                  "relative min-h-[200px] overflow-hidden rounded-lg border border-transparent bg-muted/25 shadow-inner dark:border-border/80 sm:min-h-[220px]",
                  plataformaAtiva === "mobile"
                    ? "aspect-[8/16]"
                    : "aspect-[4/2.88] sm:aspect-[16/9.7]",
                )}
                onPointerEnter={() => {
                  if (!previewImages?.length) return
                  setIsPreviewHovered(true)
                  setPreviewFrame(previewImages.length > 1 ? 1 : 0)
                }}
                onPointerLeave={() => {
                  setIsPreviewHovered(false)
                  setPreviewFrame(0)
                }}
              >
                <AnimatePresence initial={false} mode="sync">
                  {displayedImageSrc ? (
                    <motion.div
                      key={imageAnimKey}
                      role="group"
                      aria-label={`Pré-visualização ${plataformaAtiva}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={imageCrossfadeTransition}
                      className="absolute inset-0"
                    >
                      <img
                        src={displayedImageSrc}
                        alt={`Pré-visualização (${plataformaAtiva}) — ${projeto.nome}`}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${imageAnimKey}-placeholder`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={imageCrossfadeTransition}
                      className="absolute inset-0 flex items-center justify-center p-4 text-center"
                    >
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Sem imagem para esta plataforma. Adicione URL em{" "}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">plataformas</code>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </figure>
          </motion.div>

          {isTecnico && insightsTemConteudo(projeto.insights) ? (
            <motion.div
              key={`insights-right-${projeto.id}`}
              variants={narrativeItem}
              initial="hidden"
              animate="show"
              className="min-w-0"
            >
              <ProjectInsights projectId={projeto.id} insights={projeto.insights} />
            </motion.div>
          ) : null}

          {isTecnico ? (
            <motion.footer
              key={`technical-actions-${projeto.id}`}
              variants={narrativeItem}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 border-t border-border/70 pt-5"
            >
              <CtaWrap disabled={!visitUrl}>
                {visitUrl ? (
                  <Button asChild variant="default" size="sm" className="shadow-sm">
                    <a href={visitUrl} target="_blank" rel="noopener noreferrer">
                      Visitar projeto
                    </a>
                  </Button>
                ) : (
                  <Button type="button" size="sm" disabled variant="secondary">
                    Visitar projeto
                  </Button>
                )}
              </CtaWrap>
              {projeto.figmaLink?.trim() ? (
                <CtaWrap>
                  <Button asChild variant="outline" size="sm" className="border-border/80 bg-transparent">
                    <a href={projeto.figmaLink} target="_blank" rel="noopener noreferrer">
                      Ver no Figma
                    </a>
                  </Button>
                </CtaWrap>
              ) : null}
            </motion.footer>
          ) : null}

          {!isTecnico ? (
            <motion.div
              key={`visual-actions-${projeto.id}`}
              variants={narrativeItem}
              initial="hidden"
              animate="show"
              className="space-y-5"
            >
              {projeto.insights?.resultado ? (
                <div className="space-y-2 rounded-xl border border-transparent bg-slate-800/[0.03] p-4 dark:border-border/60 dark:bg-foreground/[0.03]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Resultado
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground/85">
                    {projeto.insights.resultado}
                  </p>
                </div>
              ) : null}

              <footer className="flex flex-wrap gap-3 border-t border-border/70 pt-5">
                <CtaWrap disabled={!visitUrl}>
                  {visitUrl ? (
                    <Button asChild variant="default" size="sm" className="shadow-sm">
                      <a href={visitUrl} target="_blank" rel="noopener noreferrer">
                        Visitar projeto
                      </a>
                    </Button>
                  ) : (
                    <Button type="button" size="sm" disabled variant="secondary">
                      Visitar projeto
                    </Button>
                  )}
                </CtaWrap>
                {projeto.figmaLink?.trim() ? (
                  <CtaWrap>
                    <Button asChild variant="outline" size="sm" className="border-border/80 bg-transparent">
                      <a href={projeto.figmaLink} target="_blank" rel="noopener noreferrer">
                        Ver no Figma
                      </a>
                    </Button>
                  </CtaWrap>
                ) : null}
              </footer>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </motion.article>
  )
}

export function ProjectCard(props) {
  return <ProjectCardInner key={props.projeto.id} {...props} />
}
