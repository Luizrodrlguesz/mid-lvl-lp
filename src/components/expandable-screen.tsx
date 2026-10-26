"use client"

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { useAnimate } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * Expandable Screen (inspirado no ExpandableScreen do cult-ui, reciclado da LP):
 * a tela cheia fica sempre no DOM, escondida atrás de um clip-path. Ao abrir,
 * o clip-path anima de um retângulo de origem (o botão, ou o ponto clicado)
 * até a tela toda — a origem parece crescer até cobrir a página. Fechar roda o
 * caminho inverso.
 *
 * Esc fecha, o foco vai para o primeiro campo e volta para quem abriu, e o
 * scroll da página fica travado enquanto está aberta.
 */

const OPEN_CLIP = "inset(10px 10px 10px 10px round 24px)"
const SPRING = { type: "spring", bounce: 0.12, duration: 0.65 } as const

/** Retângulo de onde a tela nasce (em coordenadas da janela) e o raio dos cantos. */
export type ExpandOrigin = { rect: DOMRect; radius: number }

export type ExpandingScreenHandle = {
  /** Abre a partir da origem; a função é lida de novo ao fechar (a origem pode ter mudado de lugar). */
  open: (getOrigin: () => ExpandOrigin) => Promise<void>
  close: () => Promise<void>
}

type ExpandingScreenProps = {
  ref?: Ref<ExpandingScreenHandle>
  /** Conteúdo da tela cheia; entra com fade depois da expansão. */
  children: ReactNode
  /** Classes da tela cheia (cor de fundo/texto). */
  screenClassName?: string
  /** Camada de fundo da tela (ex.: um padrão), já visível durante a expansão. */
  backdrop?: ReactNode
  closeLabel: string
  /** Avisa quando abre/fecha (ex.: esconder o botão de origem). */
  onOpenChange?: (open: boolean) => void
  /** Chamado ao terminar de fechar (ex.: devolver o foco). */
  onClosed?: () => void
  /** Nome acessível da tela. */
  label?: string
}

const toClip = ({ rect: r, radius }: ExpandOrigin) =>
  `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round ${radius}px)`

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** A tela que expande, controlada por ref (`open`/`close`). */
export function ExpandingScreen({
  ref,
  children,
  screenClassName,
  backdrop,
  closeLabel,
  onOpenChange,
  onClosed,
  label,
}: ExpandingScreenProps) {
  // `animate` recebe o elemento direto; a ref própria evita mexer no `scope` do hook.
  const screenRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<(() => ExpandOrigin) | null>(null)
  const [, animate] = useAnimate()
  const [open, setOpen] = useState(false)
  // Espelho síncrono de `open`: abrir e fechar rápido não pode ler um estado velho
  // (senão uma animação termina depois da outra e o scroll da página fica travado).
  const openRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const show = async (getOrigin: () => ExpandOrigin) => {
    const screen = screenRef.current
    if (openRef.current || !screen) return
    openRef.current = true
    originRef.current = getOrigin
    setOpen(true)
    onOpenChange?.(true)
    screen.scrollTop = 0
    screen.style.visibility = "visible"
    document.documentElement.style.overflow = "hidden"
    await animate(
      screen,
      { clipPath: [toClip(getOrigin()), OPEN_CLIP] },
      reduceMotion() ? { duration: 0 } : SPRING,
    )
    if (!openRef.current) return // fechou durante a abertura
    screen.querySelector<HTMLElement>("input, textarea, select, [data-autofocus]")?.focus()
  }

  const hide = async () => {
    const screen = screenRef.current
    const getOrigin = originRef.current
    if (!openRef.current || !screen || !getOrigin) return
    openRef.current = false
    setOpen(false)
    onOpenChange?.(false)
    await animate(
      screen,
      { clipPath: [OPEN_CLIP, toClip(getOrigin())] },
      reduceMotion() ? { duration: 0 } : { ...SPRING, bounce: 0 },
    )
    if (openRef.current) return // reabriu durante o fechamento
    screen.style.visibility = "hidden"
    document.documentElement.style.overflow = ""
    onClosed?.()
  }

  useImperativeHandle(ref, () => ({ open: show, close: hide }))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") void hide()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  })

  // Garante que o scroll volte se o componente sair da tela aberto.
  useEffect(() => () => {
    document.documentElement.style.overflow = ""
  }, [])

  if (!mounted) return null

  // Portal: o footer tem clip-path, que recortaria uma tela `fixed` dentro dele.
  return createPortal(
    <div
      ref={screenRef}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      aria-label={label}
      aria-hidden={!open}
      inert={!open}
      className={cn("fixed inset-0 z-[300] overflow-y-auto overscroll-contain", screenClassName)}
      style={{ visibility: "hidden", clipPath: "inset(50% 50% 50% 50% round 999px)" }}
    >
      {backdrop}

      <button
        type="button"
        onClick={hide}
        aria-label={closeLabel}
        className="fixed right-6 top-6 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-current/10 transition-colors hover:bg-current/20"
      >
        <X className="size-5" aria-hidden />
      </button>

      {/* Conteúdo entra depois que a expansão já começou. */}
      <div
        className={cn(
          // relative: acima do `backdrop` (que é posicionado).
          "relative transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
          open ? "translate-y-0 opacity-100 delay-[250ms]" : "translate-y-3 opacity-0",
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

type ExpandableScreenProps = {
  /** Conteúdo do botão (pílula). */
  trigger: ReactNode
  /** Conteúdo da tela cheia; entra com fade depois da expansão. */
  children: ReactNode
  /** Classes da pílula — a tela usa a mesma cor para a transição parecer contínua. */
  triggerClassName?: string
  /** Classes da tela cheia (cor de fundo/texto). */
  screenClassName?: string
  /** Camada de fundo da tela (ex.: um padrão), já visível durante a expansão. */
  backdrop?: ReactNode
  closeLabel: string
}

/** Versão com botão: a pílula é a origem e cresce até virar a tela. */
export function ExpandableScreen({
  trigger,
  children,
  triggerClassName,
  screenClassName,
  backdrop,
  closeLabel,
}: ExpandableScreenProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const screenRef = useRef<ExpandingScreenHandle>(null)
  const [open, setOpen] = useState(false)

  const fromTrigger = (): ExpandOrigin => {
    const rect = triggerRef.current!.getBoundingClientRect()
    return { rect, radius: rect.height / 2 }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => void screenRef.current?.open(fromTrigger)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ opacity: open ? 0 : 1 }}
        className={cn(
          "inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-6 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          triggerClassName,
        )}
      >
        {trigger}
      </button>

      <ExpandingScreen
        ref={screenRef}
        screenClassName={screenClassName}
        backdrop={backdrop}
        closeLabel={closeLabel}
        onOpenChange={setOpen}
        onClosed={() => triggerRef.current?.focus()}
      >
        {children}
      </ExpandingScreen>
    </>
  )
}
