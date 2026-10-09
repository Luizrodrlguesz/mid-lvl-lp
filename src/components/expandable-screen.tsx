"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { useAnimate } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * Expandable Screen (inspirado no ExpandableScreen do cult-ui, reciclado da LP):
 * a tela cheia fica sempre no DOM, escondida atrás de um clip-path. Ao abrir,
 * o clip-path anima do retângulo exato do botão (pílula) até a tela toda — a
 * pílula parece crescer até cobrir a página. Fechar roda o caminho inverso.
 *
 * Esc fecha, o foco vai para o primeiro campo e volta para o botão, e o scroll
 * da página fica travado enquanto está aberta.
 */

const OPEN_CLIP = "inset(10px 10px 10px 10px round 24px)"
const SPRING = { type: "spring", bounce: 0.12, duration: 0.65 } as const

type ExpandableScreenProps = {
  /** Conteúdo do botão (pílula). */
  trigger: ReactNode
  /** Conteúdo da tela cheia; entra com fade depois da expansão. */
  children: ReactNode
  /** Classes da pílula — a tela usa a mesma cor para a transição parecer contínua. */
  triggerClassName?: string
  /** Classes da tela cheia (cor de fundo/texto). */
  screenClassName?: string
  closeLabel: string
}

export function ExpandableScreen({
  trigger,
  children,
  triggerClassName,
  screenClassName,
  closeLabel,
}: ExpandableScreenProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  // `animate` recebe o elemento direto; a ref própria evita mexer no `scope` do hook.
  const screenRef = useRef<HTMLDivElement>(null)
  const [, animate] = useAnimate()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  /** Recorte que coincide com o botão na tela, em pílula. */
  const triggerClip = () => {
    const r = triggerRef.current!.getBoundingClientRect()
    return `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round ${r.height / 2}px)`
  }

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const show = async () => {
    const screen = screenRef.current
    if (open || !screen) return
    setOpen(true)
    screen.style.visibility = "visible"
    document.documentElement.style.overflow = "hidden"
    await animate(
      screen,
      { clipPath: [triggerClip(), OPEN_CLIP] },
      reduceMotion() ? { duration: 0 } : SPRING,
    )
    screen.querySelector<HTMLElement>("input, textarea, select")?.focus()
  }

  const hide = async () => {
    const screen = screenRef.current
    if (!open || !screen) return
    setOpen(false)
    await animate(
      screen,
      { clipPath: [OPEN_CLIP, triggerClip()] },
      reduceMotion() ? { duration: 0 } : { ...SPRING, bounce: 0 },
    )
    screen.style.visibility = "hidden"
    document.documentElement.style.overflow = ""
    triggerRef.current?.focus()
  }

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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
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

      {/* Portal: o footer tem clip-path, que recortaria uma tela `fixed` dentro dele. */}
      {mounted
        ? createPortal(
            <div
              ref={screenRef}
              role="dialog"
              aria-modal="true"
              aria-hidden={!open}
              inert={!open}
              className={cn("fixed inset-0 z-[300] overflow-y-auto", screenClassName)}
              style={{ visibility: "hidden", clipPath: "inset(50% 50% 50% 50% round 999px)" }}
            >
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
                  "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
                  open ? "translate-y-0 opacity-100 delay-[250ms]" : "translate-y-3 opacity-0",
                )}
              >
                {children}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
