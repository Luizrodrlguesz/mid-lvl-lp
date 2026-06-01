/**
 * Presets partilhados — mesma curva e ritmo em toda a secção Projetos.
 */

export const PROJECTS_EASE = [0.22, 1, 0.36, 1]

/** @param {number} [duration] */
export function projectsTransition(duration = 0.28) {
  return { duration, ease: PROJECTS_EASE }
}

export const cardPresenceTransition = {
  duration: 0.28,
  ease: PROJECTS_EASE,
}

export const imageCrossfadeTransition = {
  duration: 0.24,
  ease: [0.33, 1, 0.68, 1],
}

/** Stagger do conteúdo textual (leitura guiada). */
export const narrativeContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.03,
    },
  },
}

export const narrativeItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: PROJECTS_EASE },
  },
}

/** Coluna de media entra depois do texto. */
export const narrativeImageColumn = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: PROJECTS_EASE, delay: 0.32 },
  },
}

export const springTransition = { type: "spring", stiffness: 480, damping: 30 }
