"use client"

import { useEffect, useState, useCallback } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TournamentCard, TournamentCardSkeleton } from "@/components/tournament-card"
import { Button } from "@/components/ui/button"
import { getUserSavedTournaments, removeSavedTournament, getOrCreateUserProfile } from "@/lib/supabase"
import type { SavedTournament, UserProfile } from "@/lib/types"
import { Trophy, Calendar, Star, Bookmark, Gamepad2, ArrowRight } from "lucide-react"
import { calculateDaysUntil } from "@/lib/utils"

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth()
  const { user } = useUser()
  const [savedTournaments, setSavedTournaments] = useState<SavedTournament[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const [saved, profile] = await Promise.all([
        getUserSavedTournaments(userId),
        getOrCreateUserProfile(userId, user?.username || undefined),
      ])

      const sortedSaved = saved
        .filter((s) => s.tournament)
        .sort((a, b) => {
          const dateA = new Date(a.tournament!.date)
          const dateB = new Date(b.tournament!.date)
          return dateA.getTime() - dateB.getTime()
        })

      setSavedTournaments(sortedSaved)
      setUserProfile(profile)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [userId, user?.username])

  useEffect(() => {
    if (isLoaded && !userId) {
      redirect("/sign-in")
    }
    if (userId) {
      fetchData()
    }
  }, [isLoaded, userId, fetchData])

  const handleRemoveSaved = async (tournamentId: string) => {
    if (!userId) return

    const success = await removeSavedTournament(userId, tournamentId)
    if (success) {
      setSavedTournaments((prev) =>
        prev.filter((s) => s.tournament_id !== tournamentId)
      )
    }
  }

  const upcomingCount = savedTournaments.filter((s) => {
    if (!s.tournament) return false
    const days = calculateDaysUntil(s.tournament.date)
    return days >= 0 && days <= 7
  }).length

  if (!isLoaded || !userId) {
    return (
      <div className="min-h-screen bg-arena-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <TournamentCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Subtle bg */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-arena-green/[0.03] rounded-full blur-[180px]" />

      {/* Header section */}
      <div className="relative z-10 border-b border-arena-border bg-arena-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arena-green/10 border border-arena-green/20">
              <Trophy className="h-6 w-6 text-arena-green" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-arena-text">
                Meus Torneios
              </h1>
              <p className="text-arena-muted">
                Ola, <span className="text-arena-green font-semibold">{user?.firstName || "Jogador"}</span>!
                Acompanhe seus torneios salvos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Stats cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Bookmark}
            value={savedTournaments.length}
            label="Torneios Salvos"
            accent="text-arena-green"
            accentBg="bg-arena-green/10 border-arena-green/20"
          />
          <StatCard
            icon={Calendar}
            value={upcomingCount}
            label="Proximos 7 dias"
            accent="text-arena-blue"
            accentBg="bg-arena-blue/10 border-arena-blue/20"
          />
          <StatCard
            icon={Star}
            value={userProfile?.points || 0}
            label="Pontos"
            accent="text-arena-gold"
            accentBg="bg-arena-gold/10 border-arena-gold/20"
          />
        </div>

        {/* Saved tournaments section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-arena-text">
            Torneios Salvos
          </h2>
          {savedTournaments.length > 0 && (
            <span className="text-sm text-arena-muted">
              {savedTournaments.length} torneio{savedTournaments.length !== 1 && 's'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <TournamentCardSkeleton key={i} />
            ))}
          </div>
        ) : savedTournaments.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedTournaments.map((saved, index) => {
              if (!saved.tournament) return null
              const t = saved.tournament
              return (
                <div
                  key={saved.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TournamentCard
                    id={t.id}
                    name={t.name}
                    game={t.game}
                    prizeAmount={t.prize_amount}
                    date={t.date}
                    time={t.time}
                    format={t.format}
                    deadline={t.deadline}
                    registrationLink={t.registration_link}
                    organizerName={t.organizer_name}
                    tier={t.tier}
                    isSaved={true}
                    onSaveToggle={handleRemoveSaved}
                    isAuthenticated={true}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-arena-surface border border-arena-border mb-6">
              <Gamepad2 className="h-12 w-12 text-arena-muted" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-arena-text mb-3">
              Nenhum torneio salvo ainda
            </h3>
            <p className="text-arena-muted max-w-md mx-auto mb-8">
              Explore os torneios disponiveis e salve seus favoritos para
              acompanha-los por aqui.
            </p>
            <Button
              size="lg"
              className="bg-arena-green hover:bg-arena-green-light text-arena-dark font-heading font-bold"
              asChild
            >
              <Link href="/tournaments">
                Explorar Torneios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
  accent,
  accentBg,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number
  label: string
  accent: string
  accentBg: string
}) {
  return (
    <div className="glass-card p-6 flex items-center gap-4 group hover:border-white/10 transition-all">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl border ${accentBg} group-hover:scale-110 transition-transform`}>
        <Icon className={`h-7 w-7 ${accent}`} />
      </div>
      <div>
        <p className="font-display text-3xl font-black text-arena-text">{value}</p>
        <p className="text-sm text-arena-muted font-heading">{label}</p>
      </div>
    </div>
  )
}
