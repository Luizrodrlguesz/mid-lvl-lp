/*
 * "Imagens" dos cards do processo: ilustrações em SVG (sem arquivo), uma por
 * etapa, no azul-marinho do site com brilhos azul e verde do parallax.
 * 0 Entender (radar com lupa) · 1 Desenhar (wireframe com cursor) ·
 * 2 Construir (editor de código) · 3 Entregar (gráfico subindo).
 * Preenchem o contêiner cortando as sobras (slice), como uma foto de capa; o
 * canto de baixo à esquerda fica livre para o título do card.
 * Hoje todas as etapas usam imagem (PHOTOS, abaixo); as ilustrações ficam como
 * reserva para uma etapa sem imagem.
 */

const BLUE = "#2798EE"
const GREEN = "#31E18E"

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="260">
          <stop offset="0" stopColor="#0d1a2c" />
          <stop offset="1" stopColor="#14263d" />
        </linearGradient>
        <radialGradient id={`${id}-glow-a`} gradientUnits="userSpaceOnUse" cx="328" cy="47" r="240">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.45" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glow-b`} gradientUnits="userSpaceOnUse" cx="48" cy="247" r="220">
          <stop offset="0" stopColor={GREEN} stopOpacity="0.28" />
          <stop offset="1" stopColor={GREEN} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={BLUE} />
          <stop offset="1" stopColor={GREEN} />
        </linearGradient>
      </defs>
      {/* Fundo e brilhos (em coordenadas fixas) passam das bordas: no modo
          "contain" eles preenchem as laterais sem deixar um retângulo visível.
          No light o fundo é só o azul-escuro, sem os brilhos. */}
      <rect x="-1200" width="2800" height="260" fill="#14263d" className="dark:hidden" />
      <g className="hidden dark:inline">
        <rect x="-1200" width="2800" height="260" fill={`url(#${id}-bg)`} />
        <rect x="-1200" width="2800" height="260" fill={`url(#${id}-glow-a)`} />
        <rect x="-1200" width="2800" height="260" fill={`url(#${id}-glow-b)`} />
      </g>
    </>
  )
}

function Understand({ id }: { id: string }) {
  return (
    <g>
      {[110, 80, 52, 26].map((r, i) => (
        <circle key={r} cx="270" cy="105" r={r} fill="none" stroke="#fff" strokeOpacity={0.06 + i * 0.04} />
      ))}
      <path d="M270 105 L360 60 A110 110 0 0 1 378 118 Z" fill={`url(#${id}-line)`} fillOpacity="0.25" />
      {[
        [228, 70],
        [312, 150],
        [300, 52],
        [222, 138],
        [345, 96],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 5 : 3} fill={i % 2 ? GREEN : BLUE} />
      ))}
      <circle cx="150" cy="100" r="34" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="7" />
      <path d="M174 124 L204 154" stroke="#fff" strokeOpacity="0.85" strokeWidth="11" strokeLinecap="round" />
      <circle cx="150" cy="100" r="27" fill={BLUE} fillOpacity="0.15" />
    </g>
  )
}

function Design({ id }: { id: string }) {
  return (
    <g>
      <rect x="150" y="40" width="210" height="150" rx="14" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.2" />
      <rect x="166" y="56" width="70" height="10" rx="5" fill="#fff" fillOpacity="0.5" />
      <rect x="166" y="76" width="120" height="6" rx="3" fill="#fff" fillOpacity="0.18" />
      <rect x="166" y="98" width="86" height="76" rx="10" fill={`url(#${id}-line)`} fillOpacity="0.55" />
      <rect x="262" y="98" width="82" height="34" rx="8" fill="#fff" fillOpacity="0.1" />
      <rect x="262" y="140" width="82" height="34" rx="8" fill="#fff" fillOpacity="0.1" />
      <rect x="40" y="58" width="92" height="96" rx="12" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.15" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={62 + i * 24} cy="84" r="8" fill={[BLUE, GREEN, "#fff"][i]} fillOpacity={i === 2 ? 0.6 : 1} />
      ))}
      <rect x="54" y="108" width="64" height="6" rx="3" fill="#fff" fillOpacity="0.2" />
      <rect x="54" y="122" width="44" height="6" rx="3" fill="#fff" fillOpacity="0.2" />
      <path d="M300 170 L300 214 L311 203 L320 222 L328 218 L319 199 L334 199 Z" fill="#fff" />
    </g>
  )
}

function Build({ id }: { id: string }) {
  const lines: [number, number, string][] = [
    [0, 90, BLUE],
    [16, 140, "#fff"],
    [16, 110, GREEN],
    [32, 160, "#fff"],
    [32, 80, BLUE],
    [16, 120, "#fff"],
    [0, 60, GREEN],
  ]
  return (
    <g>
      <rect x="70" y="36" width="260" height="190" rx="14" fill="#0a1422" fillOpacity="0.85" stroke="#fff" strokeOpacity="0.15" />
      <rect x="70" y="36" width="260" height="28" rx="14" fill="#fff" fillOpacity="0.05" />
      {["#ff6b6b", "#ffd166", GREEN].map((c, i) => (
        <circle key={c} cx={88 + i * 16} cy="50" r="5" fill={c} fillOpacity="0.8" />
      ))}
      {lines.map(([indent, w, c], i) => (
        <rect
          key={i}
          x={92 + indent}
          y={80 + i * 19}
          width={w}
          height="8"
          rx="4"
          fill={c}
          fillOpacity={c === "#fff" ? 0.25 : 0.85}
        />
      ))}
      <text x="300" y="214" fontFamily="monospace" fontSize="30" fill={`url(#${id}-line)`} textAnchor="end">
        {"</>"}
      </text>
    </g>
  )
}

function Ship({ id }: { id: string }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="40" x2="360" y1={70 + i * 42} y2={70 + i * 42} stroke="#fff" strokeOpacity="0.06" />
      ))}
      <path d="M40 210 C 110 205, 140 170, 190 160 S 270 110, 360 50 L360 230 L40 230 Z" fill={`url(#${id}-line)`} fillOpacity="0.12" />
      <path
        d="M40 210 C 110 205, 140 170, 190 160 S 270 110, 360 50"
        fill="none"
        stroke={`url(#${id}-line)`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[
        [115, 196],
        [190, 160],
        [275, 108],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill="#0d1a2c" stroke="#fff" strokeWidth="3" />
      ))}
      <g transform="translate(352 46) rotate(45)">
        <path d="M0 -26 C 10 -14, 10 8, 6 16 L-6 16 C -10 8, -10 -14, 0 -26 Z" fill="#fff" />
        <circle cx="0" cy="-6" r="4" fill={BLUE} />
        <path d="M-4 18 L0 32 L4 18 Z" fill={GREEN} />
      </g>
    </g>
  )
}

const ARTS = [Understand, Design, Build, Ship]

/**
 * `cover` corta as sobras (cards); `contain` mostra a arte inteira, centralizada,
 * com o fundo continuando pelas laterais (faixa larga do modal).
 */
/*
 * Etapas com imagem (PNG com fundo transparente) no lugar da ilustração: ela
 * fica centrada sobre o mesmo fundo, num quadrado no meio do viewBox.
 */
const PHOTOS: Record<number, string> = {
  0: "/assets/process/entender.png",
  1: "/assets/process/desenhar.png",
  2: "/assets/process/construir.png",
  3: "/assets/process/entregar.png",
}

export function ProcessArt({
  index,
  fit = "cover",
  gingado = false,
  className,
}: {
  index: number
  fit?: "cover" | "contain"
  /** Imagem balançando sempre (no card ela só balança no hover; ver globals.css). */
  gingado?: boolean
  className?: string
}) {
  const Art = ARTS[index % ARTS.length]
  const id = `process-art-${index}`
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
      overflow="visible"
      aria-hidden
      className={className}
    >
      <Backdrop id={id} />
      {PHOTOS[index] ? (
        <image
          href={PHOTOS[index]}
          x="85"
          y="15"
          width="230"
          height="230"
          preserveAspectRatio="xMidYMid meet"
          className="process-gingado"
          data-gingado={gingado || undefined}
        />
      ) : (
        <Art id={id} />
      )}
    </svg>
  )
}
