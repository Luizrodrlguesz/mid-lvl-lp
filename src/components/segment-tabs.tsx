"use client"

import RubberSegment, { type RubberSegmentProps } from "@/components/RubberSegment"
import { cn } from "@/lib/utils"

/**
 * RubberSegment com o visual do site: pílula monocromática que segue o tema
 * (thumb na cor do texto, texto ativo na cor do fundo), igual ao menu.
 */
export function SegmentTabs(props: RubberSegmentProps) {
  return (
    <RubberSegment
      trackColor="color-mix(in oklab, var(--background) 10%, transparent)"
      thumbColor="var(--foreground)"
      textColor="var(--foreground)"
      activeTextColor="var(--background)"
      // Pílula mais alta e com espaço entre os itens: o vão entre a pílula ativa e
      // o próximo texto fica parecido com o vão entre os textos, e a folga
      // vertical da pílula fica mais próxima da horizontal.
      size="md"
      height={40}
      pad={12}
      gap={4}
      radius={999}
      inset={5}
      equalSlots={false}
      {...props}
      className={cn("shadow-sm ring-1 ring-border/60 backdrop-blur-[25px]", props.className)}
    />
  )
}
