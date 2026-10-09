/** Número internacional sem símbolos — wa.me/5541988657834 */
export const WHATSAPP_PHONE = "5541988657834"

export type ContactLinkId = "email" | "github" | "linkedin" | "instagram" | "whatsapp" | "resume"

export type ContactLink = {
  id: ContactLinkId
  /** Nome de marca; e-mail e currículo são traduzidos na tela. */
  label: string
  detail: string
  href: string
  /** Cor de destaque no hover dos cards. */
  highlight: string
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "Luiz Rodrigues",
    href: "https://www.linkedin.com/in/luiz-rodrigues-372866256/",
    highlight: "#0a66c2",
  },
  {
    id: "github",
    label: "GitHub",
    detail: "@Luizrodrlguesz",
    href: "https://github.com/Luizrodrlguesz",
    // Segue o tema: escuro no light, claro no dark.
    highlight: "var(--foreground)",
  },
  {
    id: "instagram",
    label: "Instagram",
    detail: "@rodrlguesz",
    href: "https://www.instagram.com/rodrlguesz/",
    highlight: "#e4405f",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "+55 41 98865-7834",
    href: `https://wa.me/${WHATSAPP_PHONE}`,
    highlight: "#25d366",
  },
  {
    id: "email",
    label: "E-mail",
    detail: "luizh4321@gmail.com",
    href: "mailto:luizh4321@gmail.com",
    highlight: "#22b8cf",
  },
  {
    id: "resume",
    label: "CV",
    detail: "PDF",
    href: "/LuizRodriguesCV.pdf",
    highlight: "#8b7bff",
  },
]
