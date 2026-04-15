"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
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
  const imageAnimKey = `${projeto.id}-${plataformaAtiva}-${imageSrc || "empty"}`

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

  return (
    <motion.article
      role="region"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={cardPresenceTransition}
      className={cn(
        "overflow-hidden rounded-xl border p-6 shadow-sm sm:p-8",
        "bg-card/95 backdrop-blur-sm",
        tipo === "profissional" &&
          "border-white/10 shadow-black/20 ring-1 ring-white/5",
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
            <div className="flex flex-wrap items-start gap-3">
              <span
                className={cn(
                  "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
                  tipo === "profissional"
                    ? "border-white/15 bg-white/4 text-muted-foreground"
                    : "border-violet-500/30 bg-violet-500/8 text-violet-800 dark:text-violet-100/90",
                )}
              >
                {LABEL_CATEGORIA[projeto.categoria] ?? projeto.categoria}
              </span>
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
              onChange={setPlataformaAtiva}
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

          <motion.footer
            variants={narrativeItem}
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
        </motion.div>

        <motion.div
          key={`media-${narrativeKey}`}
          className="order-1 flex min-w-0 flex-col gap-6 lg:order-2 lg:sticky lg:top-24 lg:self-start"
        >
          <motion.div
            variants={narrativeImageColumn}
            initial="hidden"
            animate="show"
          >
            <figure className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-4/3 min-h-[200px] overflow-hidden rounded-lg border border-border/80 bg-muted/25 shadow-inner sm:aspect-16/10 sm:min-h-[220px]">
                <AnimatePresence initial={false} mode="sync">
                  {imageSrc ? (
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
                        src={imageSrc}
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
        </motion.div>
      </div>
    </motion.article>
  )
}

export function ProjectCard(props) {
  return <ProjectCardInner key={props.projeto.id} {...props} />
}
