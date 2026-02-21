import type { Metadata } from "next"
import { Inter, Orbitron, Rajdhani } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ptBR } from "@clerk/localizations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["700", "900"],
})

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  title: "Arena Hub - Torneios Amadores de Games",
  description:
    "Descubra torneios de League of Legends, Valorant, CS2 e Free Fire. Salve seus favoritos, receba lembretes e nunca perca uma inscrição.",
  keywords: [
    "torneios",
    "games",
    "esports",
    "League of Legends",
    "Valorant",
    "CS2",
    "Free Fire",
    "campeonatos",
    "competitivo",
  ],
  authors: [{ name: "Arena Hub" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://arenahub.com.br",
    siteName: "Arena Hub",
    title: "Arena Hub - Torneios Amadores de Games",
    description:
      "Descubra torneios de League of Legends, Valorant, CS2 e Free Fire. Salve seus favoritos, receba lembretes e nunca perca uma inscrição.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Hub - Torneios Amadores de Games",
    description:
      "Descubra torneios de League of Legends, Valorant, CS2 e Free Fire.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={`dark scroll-smooth ${inter.variable} ${orbitron.variable} ${rajdhani.variable}`}>
        <body className="font-body">
          <div className="flex min-h-screen flex-col bg-deep-space">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
