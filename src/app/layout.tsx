import type { Metadata } from "next"
import { Geist, Geist_Mono, Saira, Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/lib/i18n"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Fonte de display (títulos e textos de destaque): geometria quadrada com
// cantos curvos e itálico, na linha do logo/favicon. Variável (100–900).
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  style: ["normal", "italic"],
})

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Portfolio | Luiz Rodrigues",
  description:
    "Portfolio of Luiz Rodrigues, a front-end developer focused on digital experiences with performance.",
  icons: {
    icon: "/assets/lr-logo.png",
    shortcut: "/assets/lr-logo.png",
    apple: "/assets/lr-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${saira.variable} antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
