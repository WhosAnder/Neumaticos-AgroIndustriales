import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Neumáticos Agroindustriales",
  description: "Llantas para maquinaria agrícola e industrial.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Neumáticos Agroindustriales",
    description: "Llantas para maquinaria agrícola e industrial.",
    url: "https://TU_DOMINIO_O_PAGES_URL",
    siteName: "Neumáticos Agroindustriales",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "es_MX",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
