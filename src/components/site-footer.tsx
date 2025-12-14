 export function SiteFooter() {
   return (
     <footer className="border-t border-border/60 bg-background/70 backdrop-blur">
       <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-muted-foreground md:flex-row">
         <p>© {new Date().getFullYear()} Luiz Henrique. Todos os direitos reservados.</p>
         <p className="text-xs">
           Feito com Next.js, Tailwind, shadcn/ui e Three.js.
         </p>
       </div>
     </footer>
   )
 }

