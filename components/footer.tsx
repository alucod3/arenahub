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
    { name: "Planos e Preços", href: "#" },
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
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-[#1DA1F2]" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-[#E4405F]" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-[#FF0000]" },
  { name: "Discord", icon: MessageCircle, href: "#", color: "hover:text-[#5865F2]" },
]

export function Footer() {
  return (
    <footer className="border-t border-gray-medium bg-card-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Trophy className="h-7 w-7 text-neon-purple group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all" />
              <span className="font-display text-xl font-black">
                ARENA<span className="text-neon-cyan">HUB</span>
              </span>
            </Link>
            <p className="text-gray-light text-sm mb-6 leading-relaxed">
              Seu centro de competições amadoras de games. Conectando jogadores e
              organizadores desde 2024.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gray-dark border border-gray-medium text-gray-light transition-all duration-300 ${social.color} hover:border-gray-light hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Jogadores
            </h3>
            <ul className="space-y-3">
              {footerLinks.jogadores.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-light hover:text-neon-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Organizadores
            </h3>
            <ul className="space-y-3">
              {footerLinks.organizadores.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-light hover:text-neon-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-light hover:text-neon-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-medium pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-light text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Arena Hub. Feito com{" "}
            <Heart className="h-4 w-4 text-danger-red fill-current inline animate-pulse" />{" "}
            para a comunidade gamer BR
          </p>
          <div className="flex gap-6 text-sm text-gray-light">
            <Link href="#" className="hover:text-neon-cyan transition-colors">
              Termos
            </Link>
            <Link href="#" className="hover:text-neon-cyan transition-colors">
              Privacidade
            </Link>
            <Link href="#" className="hover:text-neon-cyan transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
