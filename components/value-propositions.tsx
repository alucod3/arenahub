import Link from "next/link"
import { Target, Bell, Shield, Zap, Trophy, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Target,
    title: "Tudo em Um Lugar",
    description:
      "Chega de procurar em 10 Discords diferentes. Todos os campeonatos brasileiros organizados para voce.",
    accent: "text-arena-green",
    accentBg: "bg-arena-green/10 border-arena-green/20",
  },
  {
    icon: Bell,
    title: "Nunca Perca Prazo",
    description:
      "Crie uma conta e salve seus torneios favoritos. Acompanhe deadlines e nunca perca uma inscricao.",
    accent: "text-arena-blue",
    accentBg: "bg-arena-blue/10 border-arena-blue/20",
  },
  {
    icon: Shield,
    title: "Organizadores Verificados",
    description:
      "Apenas campeonatos de organizadores confiaveis com historico comprovado aparecem na plataforma.",
    accent: "text-arena-gold",
    accentBg: "bg-arena-gold/10 border-arena-gold/20",
  },
]

const organizerFeatures = [
  {
    icon: Zap,
    title: "Cadastro Rapido",
    description: "Cadastre seu torneio em menos de 5 minutos com nossa interface simples e intuitiva.",
  },
  {
    icon: Trophy,
    title: "Destaque seu Torneio",
    description: "Opcoes de destaque para aumentar a visibilidade e atrair mais participantes.",
  },
  {
    icon: Users,
    title: "Alcance Jogadores",
    description: "Acesse uma comunidade ativa de jogadores buscando por torneios todos os dias.",
  },
]

export function ValuePropositions() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-arena-green/[0.02] rounded-full blur-[180px] -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-arena-text">
            Por Que <span className="text-arena-green">Arena Hub</span>?
          </h2>
          <p className="text-arena-muted text-lg max-w-2xl mx-auto">
            A plataforma completa para quem quer competir ou organizar torneios
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ValueCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
  accent,
  accentBg,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  accent: string
  accentBg: string
  index: number
}) {
  return (
    <div
      className="group relative p-8 rounded-2xl bg-arena-card border border-arena-border hover:border-white/10 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative z-10">
        <div
          className={`inline-flex p-4 rounded-xl border ${accentBg} mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`h-7 w-7 ${accent}`} />
        </div>

        <h3 className="font-heading text-2xl font-bold text-arena-text mb-3 group-hover:text-arena-green transition-colors">
          {title}
        </h3>

        <p className="text-arena-muted leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function OrganizerSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-arena-gold/[0.02] rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-arena-gold/10 border border-arena-gold/20 text-arena-gold text-sm font-semibold mb-6">
              <Trophy className="h-4 w-4" />
              PARA ORGANIZADORES
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 text-arena-text">
              Divulgue seu torneio para{" "}
              <span className="text-gradient-gold">milhares de jogadores</span>
            </h2>

            <p className="text-lg text-arena-muted mb-8 leading-relaxed">
              O Arena Hub conecta voce diretamente com jogadores que estao
              ativamente procurando por torneios. Cadastre-se gratuitamente e
              comece a receber inscricoes hoje mesmo.
            </p>

            <div className="space-y-6">
              {organizerFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-arena-gold/10 border border-arena-gold/20 group-hover:bg-arena-gold/15 transition-colors">
                      <Icon className="h-6 w-6 text-arena-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-arena-text mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-arena-muted text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="glass-card p-8 lg:p-10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-black text-arena-text mb-2">
                Comece Agora
              </h3>
              <p className="text-arena-muted mb-8">
                Cadastrar seu torneio e gratis e leva apenas alguns minutos.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Preencha os dados do torneio",
                  "Adicione o link de inscricao",
                  "Pronto! Jogadores encontrarao seu torneio",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-arena-green text-arena-dark font-display font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-arena-text font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-arena-gold hover:bg-yellow-400 text-arena-dark font-heading font-bold text-lg h-14 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
                asChild
              >
                <Link href="/organizer">
                  Cadastrar Torneio Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
