import { useId, type CSSProperties } from "react"

import { SHARPSTAR_RASTER_DATA_URI } from "@/assets/sharpstar-raster-data-uri"
import { cn } from "@/lib/utils"

type SharpStarIconInlineProps = {
  className?: string
  style?: CSSProperties
}

/** Same artwork as `public/assets/sharpstar-icon.svg`, without fixed width/height so CSS can size it. */
export function SharpStarIconInline({ className, style }: SharpStarIconInlineProps) {
  const uid = useId().replace(/:/g, "")
  const rasterId = `sharpstar-raster-${uid}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 612 408"
      className={cn("block max-h-none max-w-none", className)}
      style={style}
      aria-hidden
    >
      <defs>
        <image
          id={rasterId}
          width={306}
          height={304}
          href={SHARPSTAR_RASTER_DATA_URI}
        />
      </defs>
      <use href={`#${rasterId}`} x={153} y={40} />
    </svg>
  )
}
