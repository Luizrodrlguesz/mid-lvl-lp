import type Lenis from "lenis"

/*
 * Instância do Lenis da página (a /new liga a rolagem suave). Rolagens feitas
 * por código devem passar por aqui: com o Lenis ativo, um window.scrollTo
 * "smooth" disputa com ele e às vezes é desfeito.
 */

let current: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  current = lenis
}

/** Rola suavemente até `top` (px), pelo Lenis quando ele estiver ativo. */
export function smoothScrollTo(top: number) {
  if (current) current.scrollTo(top)
  else window.scrollTo({ top, behavior: "smooth" })
}
