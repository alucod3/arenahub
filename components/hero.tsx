"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Zap, Users, Sparkles, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStats } from "@/lib/supabase"
import type { StatsData } from "@/lib/types"

export function Hero() {
  const [stats, setStats] = useState<StatsData>({
    totalTournaments: 0,
    totalOrganizers: 0,
    totalPlayers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-deep-space via-dark-void to-deep-space">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-neon-purple/20 blur-[150px] animate-orb" />
      <div className="absolute bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-neon-cyan/15 blur-[120px] animate-orb animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-neon-pink/10 blur-[180px] animate-orb animation-delay-1000" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Hex pattern overlay */}
      <div className="absolute inset-0 hex-pattern" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-5 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-victory-gold animate-pulse" />
            <span className="text-sm font-medium text-gray-light">
              +{isLoading ? "..." : stats.totalTournaments} torneios ativos
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
            Nunca Mais
            <br />
            <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent animate-gradient">
              Perca um Campeonato
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Todos os torneios amadores de{" "}
            <span className="text-neon-cyan font-semibold">LoL</span>,{" "}
            <span className="text-neon-pink font-semibold">Valorant</span>,{" "}
            <span className="text-electric-blue font-semibold">CS2</span> e{" "}
            <span className="text-victory-gold font-semibold">Free Fire</span>{" "}
            em um só lugar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 text-lg px-8 h-14 font-heading font-bold"
              asChild
            >
              <Link href="/tournaments">
                <Zap className="mr-2 h-5 w-5" />
                Ver Campeonatos
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-victory-gold/50 text-victory-gold hover:bg-victory-gold/10 hover:border-victory-gold text-lg px-8 h-14 font-heading font-bold transition-all duration-300"
              asChild
            >
              <Link href="/organizer">
                <Trophy className="mr-2 h-5 w-5" />
                Sou Organizador
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <StatCard
              icon={Trophy}
              number={isLoading ? "..." : `${stats.totalTournaments}+`}
              label="Torneios"
              color="text-neon-purple"
            />
            <StatCard
              icon={Users}
              number={isLoading ? "..." : `${stats.totalOrganizers}+`}
              label="Organizadores"
              color="text-neon-cyan"
            />
            <StatCard
              icon={Calendar}
              number={isLoading ? "..." : `${stats.totalPlayers}+`}
              label="Jogadores"
              color="text-victory-gold"
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-space to-transparent" />
    </section>
  )
}

function StatCard({
  icon: Icon,
  number,
  label,
  color,
}: {
  icon: any
  number: string
  label: string
  color: string
}) {
  return (
    <div className="text-center group">
      <div className={`inline-flex p-3 rounded-xl bg-white/5 mb-3 ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <div className="font-display text-2xl md:text-4xl font-black text-white mb-1">
        {number}
      </div>
      <div className="text-xs md:text-sm text-gray-light uppercase tracking-wider font-heading">
        {label}
      </div>
    </div>
  )
}
