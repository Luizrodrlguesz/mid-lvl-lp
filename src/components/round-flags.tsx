import type { Locale } from "@/lib/i18n"

/**
 * Bandeiras circulares em SVG inline (sem imagens), simplificadas para ficarem
 * legíveis em ~40px. Todas usam viewBox 64x64 recortado num círculo.
 */

type FlagProps = { className?: string }

function Round({ id, children, className }: FlagProps & { id: string; children: React.ReactNode }) {
  const clip = `flag-clip-${id}`
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>{children}</g>
    </svg>
  )
}

const US_STRIPE = 64 / 13

function FlagUS({ className }: FlagProps) {
  return (
    <Round id="us" className={className}>
      <rect width="64" height="64" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * US_STRIPE} width="64" height={US_STRIPE} fill="#b22234" />
      ))}
      <rect width="32" height={US_STRIPE * 7} fill="#3c3b6e" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={6 + col * 7 + (row % 2) * 3.5}
            cy={5 + row * 7.5}
            r="1.3"
            fill="#fff"
          />
        )),
      )}
    </Round>
  )
}

function FlagBR({ className }: FlagProps) {
  return (
    <Round id="br" className={className}>
      <rect width="64" height="64" fill="#009c3b" />
      <path d="M32 10 L60 32 L32 54 L4 32 Z" fill="#ffdf00" />
      <circle cx="32" cy="32" r="12" fill="#002776" />
      <path d="M20.5 29.5 Q32 25 43.6 34" stroke="#fff" strokeWidth="2.6" fill="none" />
    </Round>
  )
}

function FlagFR({ className }: FlagProps) {
  return (
    <Round id="fr" className={className}>
      <rect width="22" height="64" fill="#002654" />
      <rect x="21" width="22" height="64" fill="#fff" />
      <rect x="42" width="22" height="64" fill="#ce1126" />
    </Round>
  )
}

export const ROUND_FLAGS: Record<Locale, (props: FlagProps) => React.JSX.Element> = {
  "en-us": FlagUS,
  "pt-br": FlagBR,
  "fr-fr": FlagFR,
}
