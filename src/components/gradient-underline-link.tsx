import type { ReactNode } from "react"

/*
 * Gradient Underline Button: rótulo em caixa alta com uma linha em gradiente
 * embaixo que cresce da esquerda para a direita no hover/foco. Como link
 * (`href`); o gradiente usa o azul e o verde do parallax das estrelas.
 */
export function GradientUnderlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex h-10 items-center text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground outline-none transition-colors hover:text-[var(--stage-foreground)] focus-visible:text-[var(--stage-foreground)]"
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1.5 h-[2px] origin-left scale-x-[0.3] rounded-full bg-gradient-to-r from-[#2798EE] to-[#31E18E] transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  )
}
