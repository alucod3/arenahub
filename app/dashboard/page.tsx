"use client"

import { useEffect, useState, useCallback } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TournamentCard, TournamentCardSkeleton } from "@/components/tournament-card"
import { Button } from "@/components/ui/button"
import { getUserSavedTournaments, removeSavedTournament, getOrCreateUserProfile } from "@/lib/supabase"
import type { SavedTournament, UserProfile } from "@/lib/types"
import { Trophy, Calendar, Star, Bookmark, Sparkles, Gamepad2, ArrowRight } from "lucide-react"
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
      <div className="min-h-screen bg-deep-space">
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-dark-void to-deep-space" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px]" />

      {/* Header section */}
      <div className="relative z-10 border-b border-gray-medium bg-dark-void/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-white">
                Meus Torneios
              </h1>
              <p className="text-gray-light">
                Olá, <span className="text-neon-cyan font-semibold">{user?.firstName || "Jogador"}</span>! 
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
            gradient="from-neon-purple to-neon-pink"
          />
          <StatCard
            icon={Calendar}
            value={upcomingCount}
            label="Próximos 7 dias"
            gradient="from-neon-cyan to-electric-blue"
          />
          <StatCard
            icon={Star}
            value={userProfile?.points || 0}
            label="Pontos"
            gradient="from-victory-gold to-yellow-400"
          />
        </div>

        {/* Saved tournaments section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-white">
            Torneios Salvos
          </h2>
          {savedTournaments.length > 0 && (
            <span className="text-sm text-gray-light">
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
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-dark border border-gray-medium mb-6">
              <Gamepad2 className="h-12 w-12 text-gray-light" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              Nenhum torneio salvo ainda
            </h3>
            <p className="text-gray-light max-w-md mx-auto mb-8">
              Explore os torneios disponíveis e salve seus favoritos para
              acompanhá-los por aqui.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-neon-pink font-heading font-bold"
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
  gradient,
}: {
  icon: any
  value: number
  label: string
  gradient: string
}) {
  return (
    <div className="glass-card p-6 flex items-center gap-4 group hover:scale-[1.02] transition-transform">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div>
        <p className="font-display text-3xl font-black text-white">{value}</p>
        <p className="text-sm text-gray-light font-heading">{label}</p>
      </div>
    </div>
  )
}
