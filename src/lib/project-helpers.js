/**
 * Helpers puros para projetos (filtros, URLs, plataformas).
 * Mantidos fora dos componentes para testes e reutilização futura.
 */

/**
 * @param {{ link?: string, imagem?: string } | undefined} entrada
 */
export function plataformaTemConteudo(entrada) {
  return !!(entrada?.link?.trim() || entrada?.imagem?.trim())
}

/**
 * Lista de chaves de plataforma com pelo menos link ou imagem.
 * @param {{ plataformas?: { web?: object, mobile?: object } }} projeto
 * @returns {('web' | 'mobile')[]}
 */
export function plataformasDisponiveis(projeto) {
  const p = projeto.plataformas
  const out = []
  if (plataformaTemConteudo(p?.web)) out.push("web")
  if (plataformaTemConteudo(p?.mobile)) out.push("mobile")
  return out
}

/**
 * @param {{ web?: { link?: string, imagem?: string }, mobile?: { link?: string, imagem?: string } } | undefined} plataformas
 * @param {'web' | 'mobile'} ativa
 * @returns {string | null}
 */
export function imagemParaPlataforma(plataformas, ativa) {
  const prim = plataformas?.[ativa]?.imagem?.trim()
  if (prim) return prim
  const outra = ativa === "web" ? "mobile" : "web"
  const fallback = plataformas?.[outra]?.imagem?.trim()
  return fallback || null
}

/**
 * URL de visita para a plataforma ativa; se vazia, usa a outra plataforma (fallback).
 * @param {{ web?: { link?: string, imagem?: string }, mobile?: { link?: string, imagem?: string } } | undefined} plataformas
 * @param {'web' | 'mobile'} ativa
 * @returns {string | null}
 */
export function visitUrlParaPlataforma(plataformas, ativa) {
  const prim = plataformas?.[ativa]?.link?.trim()
  if (prim) return prim
  const outra = ativa === "web" ? "mobile" : "web"
  const fallback = plataformas?.[outra]?.link?.trim()
  return fallback || null
}

/**
 * @param {Array<{ tipo: string }>} projetos
 * @param {'profissional' | 'pessoal'} tipo
 */
export function projetosPorTipo(projetos, tipo) {
  return projetos.filter((p) => p.tipo === tipo)
}

/**
 * @param {{ plataformas?: { web?: { link?: string }, mobile?: { link?: string } } }} projeto
 * @returns {string | null}
 */
export function urlVisitaPrincipal(projeto) {
  return visitUrlParaPlataforma(projeto.plataformas, "web")
}

/**
 * Há texto útil em algum campo de insights?
 * @param {{ desafio?: string, solucao?: string, resultado?: string } | undefined} insights
 */
export function insightsTemConteudo(insights) {
  if (!insights) return false
  return ["desafio", "solucao", "resultado"].some((k) => insights[k]?.trim())
}
