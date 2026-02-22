import Link from "next/link"
import { Trophy, Twitter, Instagram, Youtube, MessageCircle, Heart } from "lucide-react"

const footerLinks = {
  jogadores: [
    { name: "Encontrar Torneios", href: "/tournaments" },
    { name: "Meus Torneios", href: "/dashboard" },
    { name: "Como Funciona", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  organizadores: [
    { name: "Cadastrar Torneio", href: "/organizer" },
    { name: "Planos e Precos", href: "#" },
    { name: "Recursos", href: "#" },
    { name: "Suporte", href: "#" },
  ],
  legal: [
    { name: "Termos de Uso", href: "#" },
    { name: "Privacidade", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Contato", href: "#" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Discord", icon: MessageCircle, href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-arena-border bg-arena-card relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-arena-green">
                <Trophy className="h-4 w-4 text-arena-dark" />
              </div>
              <span className="font-display text-xl font-black text-arena-text">
                ARENA<span className="text-arena-green">HUB</span>
              </span>
            </Link>
            <p className="text-arena-muted text-sm mb-6 leading-relaxed">
              Seu centro de competicoes amadoras de games. Conectando jogadores e
              organizadores desde 2024.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-arena-surface border border-arena-border text-arena-muted transition-all duration-300 hover:text-arena-green hover:border-arena-green/30 hover:bg-arena-green/10"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-heading text-sm font-bold text-arena-text uppercase tracking-wider mb-4">
              Jogadores
            </h3>
            <ul className="space-y-3">
              {footerLinks.jogadores.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-arena-muted hover:text-arena-green transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-arena-text uppercase tracking-wider mb-4">
              Organizadores
            </h3>
            <ul className="space-y-3">
              {footerLinks.organizadores.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-arena-muted hover:text-arena-green transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-arena-text uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-arena-muted hover:text-arena-green transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-arena-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-arena-muted text-sm flex items-center gap-1">
            {new Date().getFullYear()} Arena Hub. Feito com{" "}
            <Heart className="h-3.5 w-3.5 text-arena-red fill-current inline" />{" "}
            para a comunidade gamer BR
          </p>
          <div className="flex gap-6 text-sm text-arena-muted">
            <Link href="#" className="hover:text-arena-green transition-colors">
              Termos
            </Link>
            <Link href="#" className="hover:text-arena-green transition-colors">
              Privacidade
            </Link>
            <Link href="#" className="hover:text-arena-green transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
