"use client"

import { Calendar, Clock, User, Bookmark, BookmarkCheck, ExternalLink, Timer, Crown, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GameIcon } from "@/components/game-icon"
import { formatCurrency, formatDate, getDeadlineStatus, truncateText, calculateDaysUntil, cn } from "@/lib/utils"
import type { TournamentTier, TournamentFormat, Game } from "@/lib/types"

interface TournamentCardProps {
  id: string
  name: string
  game: Game
  prizeAmount: number
  date: string
  time: string
  format: TournamentFormat
  deadline: string
  registrationLink: string
  organizerName: string
  tier: TournamentTier
  isSaved?: boolean
  onSaveToggle?: (id: string) => void
  isAuthenticated?: boolean
}

const formatColors: Record<TournamentFormat, string> = {
  'Online': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  'Presencial': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  'Híbrido': 'border-amber-500/30 text-amber-400 bg-amber-500/10',
}

export function TournamentCard({
  id,
  name,
  game,
  prizeAmount,
  date,
  time,
  format,
  deadline,
  registrationLink,
  organizerName,
  tier,
  isSaved = false,
  onSaveToggle,
  isAuthenticated = false,
}: TournamentCardProps) {
  const deadlineStatus = getDeadlineStatus(deadline)
  const daysUntilDeadline = calculateDaysUntil(deadline)

  const handleSaveClick = () => {
    if (onSaveToggle) {
      onSaveToggle(id)
    }
  }

  const formatKey = format === "Hibrido" ? "Hibrido" : format

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-arena-border bg-arena-card transition-all duration-300",
        "hover:border-arena-green/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.06)]",
        tier === "featured" && "ring-1 ring-arena-gold/40",
        tier === "premium" && "ring-1 ring-arena-green/40"
      )}
    >
      {/* Featured badge */}
      {tier !== "free" && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-arena-gold text-arena-dark text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
            <Crown className="h-3 w-3" />
            DESTAQUE
          </div>
        </div>
      )}

      <CardContent className="p-5 relative z-10">
        {/* Header with game icon */}
        <div className="flex items-start justify-between mb-4">
          <GameIcon game={game} size="md" showGlow />
          <Badge className={cn("border text-xs font-semibold", formatColors[formatKey] || formatColors['Online'])}>
            {format}
          </Badge>
        </div>

        {/* Tournament name */}
        <h3
          className="font-heading text-xl font-bold text-arena-text mb-4 line-clamp-2 group-hover:text-arena-green transition-colors"
          title={name}
        >
          {truncateText(name, 50)}
        </h3>

        {/* Prize pool */}
        <div className="mb-4 p-4 rounded-xl bg-arena-gold/[0.06] border border-arena-gold/20">
          <div className="text-xs text-arena-muted mb-1 font-heading uppercase tracking-wider">
            Premiacao
          </div>
          <div className="font-display text-3xl font-black text-arena-gold">
            {formatCurrency(prizeAmount)}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <InfoItem icon={Calendar} label="Data" value={formatDate(date)} />
          <InfoItem icon={Clock} label="Horario" value={time} />
        </div>

        {/* Deadline countdown */}
        <div className="mb-4 flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-arena-border">
          <Timer
            className={cn(
              "h-4 w-4",
              daysUntilDeadline <= 3 ? "text-arena-red animate-pulse" : "text-arena-muted"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              daysUntilDeadline <= 3 ? "text-arena-red" : "text-arena-muted"
            )}
          >
            {deadlineStatus.text}
          </span>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 mb-5 text-sm text-arena-muted">
          <User className="h-4 w-4" />
          <span>{organizerName}</span>
          <CheckCircle2 className="h-4 w-4 text-arena-green" />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-1 font-heading font-semibold transition-all",
              isSaved
                ? "bg-arena-green/15 text-arena-green border border-arena-green/30 hover:bg-arena-green/25"
                : "border-arena-border text-arena-muted hover:border-arena-green/30 hover:text-arena-green hover:bg-arena-green/[0.06]"
            )}
            onClick={handleSaveClick}
            disabled={!isAuthenticated}
            title={!isAuthenticated ? "Faca login para salvar" : isSaved ? "Remover dos salvos" : "Salvar torneio"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 mr-2 fill-current" />
            ) : (
              <Bookmark className="h-4 w-4 mr-2" />
            )}
            {isSaved ? "Salvo" : "Salvar"}
          </Button>

          <Button
            size="sm"
            className="flex-1 bg-arena-green hover:bg-arena-green-light text-arena-dark font-heading font-semibold transition-all"
            asChild
          >
            <a href={registrationLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Inscrever-se
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-arena-green shrink-0" />
      <div className="min-w-0">
        <div className="text-xs text-arena-muted font-heading uppercase tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-arena-text truncate">{value}</div>
      </div>
    </div>
  )
}

export function TournamentCardSkeleton() {
  return (
    <Card className="border border-arena-border bg-arena-card overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-arena-surface animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-arena-surface animate-pulse" />
        </div>
        <div className="h-6 w-3/4 rounded bg-arena-surface animate-pulse mb-4" />
        <div className="h-24 w-full rounded-xl bg-arena-surface animate-pulse mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-12 w-full rounded bg-arena-surface animate-pulse" />
          <div className="h-12 w-full rounded bg-arena-surface animate-pulse" />
        </div>
        <div className="h-10 w-full rounded-lg bg-arena-surface animate-pulse mb-4" />
        <div className="h-4 w-2/3 rounded bg-arena-surface animate-pulse mb-5" />
        <div className="flex gap-3">
          <div className="h-10 flex-1 rounded-lg bg-arena-surface animate-pulse" />
          <div className="h-10 flex-1 rounded-lg bg-arena-surface animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
