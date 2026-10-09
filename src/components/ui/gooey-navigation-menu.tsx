"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Adaptado do GooeyNavigationMenu original:
 * - ícones do lucide (o projeto não usa @tabler/icons-react);
 * - `triggerIcon` customizável (o + vira X ao abrir, em vez de girar);
 * - direções diagonais, para o menu abrir a partir de um canto da tela;
 * - item `active`, `iconScale` e rótulos do gatilho traduzíveis;
 * - o palco não bloqueia cliques na página (só os botões recebem ponteiro);
 * - fecha com Escape ou clique fora;
 * - tooltip nas cores de popover do tema (não existe `--surface` aqui).
 */

export interface GooeyMenuItem {
  /** Stable id for the item. */
  id: string;
  /** Icon or any element rendered on top of the petal. */
  icon: React.ReactNode;
  /** Tooltip / aria-label. */
  label: string;
  /** Marks the current option (ring + aria-current). */
  active?: boolean;
  /** Optional click handler. */
  onSelect?: () => void;
}

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

const BASE_ANGLE: Record<Direction, number> = {
  up: -90,
  down: 90,
  left: 180,
  right: 0,
  "up-left": -135,
  "up-right": -45,
  "down-left": 135,
  "down-right": 45,
};

export interface GooeyNavigationMenuProps {
  /** Child items that pop out of the FAB. 3–6 looks best. */
  items: GooeyMenuItem[];
  /** Distance (px) the children travel from the trigger center. */
  radius?: number;
  /** Arc, in degrees, the children fan across. 90 = quarter, 180 = half. */
  arc?: number;
  /** Direction the arc opens toward. */
  direction?: Direction;
  /** Diameter of the trigger button (px). */
  size?: number;
  /** Diameter of each child button (px). */
  childSize?: number;
  /** Render with the menu already fanned open. Uncontrolled. */
  defaultOpen?: boolean;
  /** Content of the closed trigger. Defaults to a + glyph. */
  triggerIcon?: React.ReactNode;
  /** Share of the petal the item icon fills (0–1). */
  iconScale?: number;
  /** aria-label of the trigger while closed / open. */
  openLabel?: string;
  closeLabel?: string;
  /** Classes for the blobs — the trigger and every petal. */
  blobClassName?: string;
  /** Classes for the glyphs riding on top of the blobs. */
  iconClassName?: string;
  /** Classes for the wrapper that reserves the menu's square stage. */
  className?: string;
}

/** Theme-inverted default: white blobs on dark, near-black on light. */
const DEFAULT_BLOB_CLASS = "bg-[var(--foreground)]";
const DEFAULT_ICON_CLASS = "text-[var(--background)]";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 15 };

/**
 * GooeyNavigationMenu
 *
 * A floating action button whose children stretch out of it like liquid
 * metal — the "metaball" effect, achieved with a tightly-scoped SVG
 * `<filter>` (Gaussian blur + alpha-channel contrast crush).
 *
 * The filter wraps only the small menu stage and is never animated; only
 * the children's transform/opacity animate.
 */
export function GooeyNavigationMenu({
  items,
  radius = 96,
  arc = 180,
  direction = "up",
  size = 60,
  childSize = 44,
  defaultOpen = false,
  triggerIcon,
  iconScale = 0.58,
  openLabel = "Open menu",
  closeLabel = "Close menu",
  blobClassName = DEFAULT_BLOB_CLASS,
  iconClassName = DEFAULT_ICON_CLASS,
  className,
}: GooeyNavigationMenuProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);

  // A menu that renders open should already *be* open, not pop out on mount:
  // `<AnimatePresence initial={false}>` skips the enter spring on first render.
  const enterFrom = { x: 0, y: 0, opacity: 0, scale: 0.4 };

  // Fecha com Escape ou clique fora do menu.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = e.target as Node;
      const insideButton = Array.from(root.querySelectorAll("button")).some(
        (b) => b.contains(target)
      );
      if (!insideButton) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Per-item polar offset (x, y) along an arc centered on the trigger.
  const offsets = React.useMemo(() => {
    const n = items.length;
    if (n === 0) return [];
    const half = arc / 2;
    return items.map((_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const rad = ((BASE_ANGLE[direction] - half + t * arc) * Math.PI) / 180;
      return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
    });
  }, [items, arc, direction, radius]);

  // Reserve a square area large enough to contain trigger + arc + child radius.
  const pad = childSize / 2 + 8;
  const stageSize = (radius + pad) * 2;

  // SVG filter id is suffixed per-instance so multiple copies coexist.
  const filterId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: stageSize, height: stageSize }}
    >
      {/* SVG filter is INLINE and SCOPED to the wrapper. Never global. */}
      <svg
        aria-hidden
        width={0}
        height={0}
        className="absolute inset-0"
        focusable={false}
      >
        <defs>
          <filter id={`goo-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              // Crush the alpha channel: blurred halos become hard edges,
              // intersecting halos form the curved liquid bridges.
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Goo layer — only solid blobs, so the bridges form cleanly. */}
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ filter: `url(#goo-${filterId})` }}
        aria-hidden
      >
        <AnimatePresence initial={false}>
          {open &&
            items.map((it, i) => {
              const o = offsets[i];
              return (
                <motion.span
                  key={`blob-${it.id}`}
                  initial={enterFrom}
                  animate={{
                    x: o.x,
                    y: o.y,
                    opacity: 1,
                    scale: 1,
                    transition: reduce
                      ? { duration: 0 }
                      : { ...SPRING, delay: 0.02 * i },
                  }}
                  exit={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.4,
                    transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] },
                  }}
                  className={cn("absolute block rounded-full", blobClassName)}
                  style={{
                    width: childSize,
                    height: childSize,
                    willChange: "transform, opacity",
                  }}
                />
              );
            })}
        </AnimatePresence>

        {/* Trigger blob (always present, lives in the goo so it bridges). */}
        <span
          className={cn("relative z-10 block rounded-full", blobClassName)}
          style={{ width: size, height: size }}
        />
      </div>

      {/* Overlay: interactive buttons + crisp icons (NOT filtered). */}
      <div className="absolute inset-0 grid place-items-center">
        <AnimatePresence initial={false}>
          {open &&
            items.map((it, i) => {
              const o = offsets[i];
              const len = Math.hypot(o.x, o.y) || 1;
              // Label sits outward from the button along the same radial vector.
              const labelOffset = childSize / 2 + 14;
              return (
                <ChildButton
                  key={`btn-${it.id}`}
                  item={it}
                  index={i}
                  offset={o}
                  childSize={childSize}
                  iconScale={iconScale}
                  labelDx={(o.x / len) * labelOffset}
                  labelDy={(o.y / len) * labelOffset}
                  iconClassName={iconClassName}
                  enterFrom={enterFrom}
                  reduce={reduce ?? false}
                  onSelect={() => {
                    it.onSelect?.();
                    setOpen(false);
                  }}
                />
              );
            })}
        </AnimatePresence>

        {/* Trigger button — handles input, renders its glyph crisply. */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? closeLabel : openLabel}
          className={cn(
            "pointer-events-auto relative z-10 inline-flex cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
            iconClassName
          )}
          style={{ width: size, height: size, willChange: "transform" }}
          whileTap={{ scale: 0.92 }}
        >
          {open ? (
            <X size={Math.round(size * 0.42)} strokeWidth={2.4} />
          ) : (
            (triggerIcon ?? <Plus size={Math.round(size * 0.42)} strokeWidth={2.4} />)
          )}
        </motion.button>
      </div>
    </div>
  );
}

/* ── Single petal button + its hover tooltip ───────────────────────── */

interface ChildButtonProps {
  item: GooeyMenuItem;
  index: number;
  offset: { x: number; y: number };
  childSize: number;
  iconScale: number;
  labelDx: number;
  labelDy: number;
  iconClassName: string;
  enterFrom: { x: number; y: number; opacity: number; scale: number };
  reduce: boolean;
  onSelect: () => void;
}

function ChildButton({
  item,
  index,
  offset,
  childSize,
  iconScale,
  labelDx,
  labelDy,
  iconClassName,
  enterFrom,
  reduce,
  onSelect,
}: ChildButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  const iconSize = `${Math.round(iconScale * 100)}%`;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={enterFrom}
      animate={{
        x: offset.x,
        y: offset.y,
        opacity: 1,
        scale: 1,
        transition: reduce ? { duration: 0 } : { ...SPRING, delay: 0.02 * index },
      }}
      exit={{
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.4,
        transition: { duration: 0.16, ease: [0.7, 0, 0.84, 0] },
      }}
      aria-label={item.label}
      aria-current={item.active ? "true" : undefined}
      className={cn(
        "pointer-events-auto absolute inline-flex cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        iconClassName
      )}
      style={{
        width: childSize,
        height: childSize,
        willChange: "transform, opacity",
      }}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full [&>svg]:h-full [&>svg]:w-full",
          item.active && "ring-2 ring-[var(--background)]"
        )}
        style={{ width: iconSize, height: iconSize }}
      >
        {item.icon}
      </span>

      {/* Hover tooltip — outside the petal, away from the trigger. */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.92,
          x: labelDx,
          y: labelDy,
        }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] font-medium tracking-tight text-popover-foreground shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)]"
        style={{ willChange: "transform, opacity" }}
      >
        {item.label}
      </motion.span>
    </motion.button>
  );
}
