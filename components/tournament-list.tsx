"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { TournamentCard, TournamentCardSkeleton } from "./tournament-card"
import { TournamentFiltersComponent } from "./tournament-filters"
import { Button } from "@/components/ui/button"
import { getTournaments, getUserSavedTournamentIds, saveTournament, removeSavedTournament } from "@/lib/supabase"
import type { Tournament, TournamentFilters } from "@/lib/types"
import { Gamepad2, Sparkles, ChevronDown } from "lucide-react"

const ITEMS_PER_PAGE = 9

export function TournamentList() {
  const { userId, isSignedIn } = useAuth()
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [filters, setFilters] = useState<TournamentFilters>({})
  const [isLoading, setIsLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  const fetchTournaments = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getTournaments(filters)
      setTournaments(data)
    } catch (error) {
      console.error("Error fetching tournaments:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const fetchSavedIds = useCallback(async () => {
    if (userId) {
      const ids = await getUserSavedTournamentIds(userId)
      setSavedIds(ids)
    }
  }, [userId])

  useEffect(() => {
    fetchTournaments()
  }, [fetchTournaments])

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchSavedIds()
    }
  }, [isSignedIn, userId, fetchSavedIds])

  const handleFiltersChange = (newFilters: TournamentFilters) => {
    setFilters(newFilters)
    setDisplayCount(ITEMS_PER_PAGE)
  }

  const handleSaveToggle = async (tournamentId: string) => {
    if (!userId) return

    const isSaved = savedIds.includes(tournamentId)

    if (isSaved) {
      const success = await removeSavedTournament(userId, tournamentId)
      if (success) {
        setSavedIds((prev) => prev.filter((id) => id !== tournamentId))
      }
    } else {
      const success = await saveTournament(userId, tournamentId)
      if (success) {
        setSavedIds((prev) => [...prev, tournamentId])
      }
    }
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
  }

  const displayedTournaments = tournaments.slice(0, displayCount)
  const hasMore = displayCount < tournaments.length

  return (
    <section className="py-16 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-dark-void/30 to-deep-space" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">
              Torneios Disponíveis
            </h2>
          </div>
          <p className="text-gray-light text-lg">
            Encontre o campeonato perfeito para você
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <TournamentFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Tournament grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TournamentCardSkeleton key={i} />
            ))}
          </div>
        ) : displayedTournaments.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedTournaments.map((tournament, index) => (
                <div
                  key={tournament.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TournamentCard
                    id={tournament.id}
                    name={tournament.name}
                    game={tournament.game}
                    prizeAmount={tournament.prize_amount}
                    date={tournament.date}
                    time={tournament.time}
                    format={tournament.format}
                    deadline={tournament.deadline}
                    registrationLink={tournament.registration_link}
                    organizerName={tournament.organizer_name}
                    tier={tournament.tier}
                    isSaved={savedIds.includes(tournament.id)}
                    onSaveToggle={handleSaveToggle}
                    isAuthenticated={isSignedIn || false}
                  />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple font-heading font-bold px-8"
                >
                  <ChevronDown className="mr-2 h-5 w-5" />
                  Carregar mais torneios
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-dark border border-gray-medium mb-6">
              <Gamepad2 className="h-12 w-12 text-gray-light" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              Nenhum torneio encontrado
            </h3>
            <p className="text-gray-light max-w-md mx-auto">
              Tente ajustar os filtros para encontrar mais torneios, ou volte
              mais tarde para novas oportunidades.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
