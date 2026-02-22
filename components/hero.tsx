"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trophy, Zap, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStats } from "@/lib/supabase"
import type { StatsData, Game } from "@/lib/types"

const GAMES: { name: Game; image: string; color: string }[] = [
  { name: "League of Legends", image: "/images/games/lol.jpg", color: "#0AC8B9" },
  { name: "Valorant", image: "/images/games/valorant.jpg", color: "#FF4655" },
  { name: "CS2", image: "/images/games/cs2.jpg", color: "#F7941D" },
  { name: "Free Fire", image: "/images/games/freefire.jpg", color: "#FF6600" },
]

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-arena-green/[0.04] blur-[180px] animate-orb" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-arena-gold/[0.03] blur-[150px] animate-orb animation-delay-2000" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Live badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-arena-green/20 bg-arena-green/[0.08] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arena-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-arena-green" />
            </span>
            <span className="text-sm font-medium text-arena-muted">
              {isLoading ? "..." : `${stats.totalTournaments}+`} torneios ativos agora
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight text-arena-text text-balance">
            Nunca Mais
            <br />
            <span className="text-gradient">
              Perca um Campeonato
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-arena-muted mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            Todos os torneios amadores de{" "}
            <span className="text-[#0AC8B9] font-semibold">LoL</span>,{" "}
            <span className="text-[#FF4655] font-semibold">Valorant</span>,{" "}
            <span className="text-[#F7941D] font-semibold">CS2</span> e{" "}
            <span className="text-[#FF6600] font-semibold">Free Fire</span>{" "}
            em um so lugar.
          </p>

          {/* Game icons row */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {GAMES.map((game) => (
              <div
                key={game.name}
                className="group relative"
                title={game.name}
              >
                <div
                  className="h-14 w-14 md:h-16 md:w-16 rounded-xl overflow-hidden ring-2 ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:scale-110"
                  style={{ ["--ring-color" as string]: game.color }}
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  style={{ color: game.color }}
                >
                  {game.name === "League of Legends" ? "LoL" : game.name}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 mt-4">
            <Button
              size="lg"
              className="bg-arena-green hover:bg-arena-green-light text-arena-dark text-lg px-8 h-14 font-heading font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
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
              className="border-2 border-arena-border text-arena-text hover:bg-white/[0.04] hover:border-arena-muted text-lg px-8 h-14 font-heading font-bold transition-all duration-300"
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
            />
            <StatCard
              icon={Users}
              number={isLoading ? "..." : `${stats.totalOrganizers}+`}
              label="Organizadores"
            />
            <StatCard
              icon={Calendar}
              number={isLoading ? "..." : `${stats.totalPlayers}+`}
              label="Jogadores"
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-arena-dark to-transparent" />
    </section>
  )
}

function StatCard({
  icon: Icon,
  number,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  number: string
  label: string
}) {
  return (
    <div className="text-center group">
      <div className="inline-flex p-3 rounded-xl bg-white/[0.04] border border-arena-border mb-3 text-arena-green group-hover:bg-arena-green/10 transition-colors">
        <Icon className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <div className="font-display text-2xl md:text-4xl font-black text-arena-text mb-1">
        {number}
      </div>
      <div className="text-xs md:text-sm text-arena-muted uppercase tracking-wider font-heading">
        {label}
      </div>
    </div>
  )
}
