import Link from "next/link"
import { Target, Bell, Shield, Zap, Trophy, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Target,
    title: "Tudo em Um Lugar",
    description:
      "Chega de procurar em 10 Discords diferentes. Todos os campeonatos brasileiros organizados para você.",
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    icon: Bell,
    title: "Nunca Perca Prazo",
    description:
      "Crie uma conta e salve seus torneios favoritos. Acompanhe deadlines e nunca perca uma inscrição.",
    gradient: "from-neon-cyan to-electric-blue",
  },
  {
    icon: Shield,
    title: "Organizadores Verificados",
    description:
      "Apenas campeonatos de organizadores confiáveis com histórico comprovado aparecem na plataforma.",
    gradient: "from-victory-gold to-yellow-400",
  },
]

const organizerFeatures = [
  {
    icon: Zap,
    title: "Cadastro Rápido",
    description: "Cadastre seu torneio em menos de 5 minutos com nossa interface simples e intuitiva.",
  },
  {
    icon: Trophy,
    title: "Destaque seu Torneio",
    description: "Opções de destaque para aumentar a visibilidade e atrair mais participantes.",
  },
  {
    icon: Users,
    title: "Alcance Jogadores",
    description: "Acesse uma comunidade ativa de jogadores buscando por torneios todos os dias.",
  },
]

export function ValuePropositions() {
  return (
    <section className="py-24 bg-gradient-to-b from-deep-space via-dark-void/50 to-deep-space relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            Por Que <span className="text-neon-cyan">Arena Hub</span>?
          </h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto">
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
  gradient,
  index,
}: {
  icon: any
  title: string
  description: string
  gradient: string
  index: number
}) {
  return (
    <div
      className="group relative p-8 rounded-2xl bg-card-dark border border-gray-medium hover:border-neon-purple/50 transition-all duration-500 hover:scale-105"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
          {title}
        </h3>

        <p className="text-gray-light leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function OrganizerSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-void via-deep-space to-dark-void" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-victory-gold/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-victory-gold/10 border border-victory-gold/30 text-victory-gold text-sm font-semibold mb-6">
              <Trophy className="h-4 w-4" />
              PARA ORGANIZADORES
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
              Divulgue seu torneio para{" "}
              <span className="text-gradient-gold">milhares de jogadores</span>
            </h2>

            <p className="text-lg text-gray-light mb-8 leading-relaxed">
              O Arena Hub conecta você diretamente com jogadores que estão
              ativamente procurando por torneios. Cadastre-se gratuitamente e
              comece a receber inscrições hoje mesmo.
            </p>

            <div className="space-y-6">
              {organizerFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-victory-gold/10 border border-victory-gold/30 group-hover:bg-victory-gold/20 transition-colors">
                      <Icon className="h-6 w-6 text-victory-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-light text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="glass-card p-8 lg:p-10 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-victory-gold/20 to-transparent rounded-bl-full" />

            <div className="relative z-10">
              <h3 className="font-display text-2xl font-black text-white mb-2">
                Comece Agora
              </h3>
              <p className="text-gray-light mb-8">
                Cadastrar seu torneio é grátis e leva apenas alguns minutos.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Preencha os dados do torneio",
                  "Adicione o link de inscrição",
                  "Pronto! Jogadores encontrarão seu torneio",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-pink font-display font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-victory-gold to-yellow-500 text-deep-space font-heading font-bold text-lg h-14 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300"
                asChild
              >
                <Link href="/organizer">
                  Cadastrar Torneio Grátis
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
