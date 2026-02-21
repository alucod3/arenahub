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
  'Online': 'border-success-green/50 text-success-green bg-success-green/10',
  'Presencial': 'border-electric-blue/50 text-electric-blue bg-electric-blue/10',
  'Híbrido': 'border-neon-purple/50 text-neon-purple bg-neon-purple/10',
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

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-gray-medium bg-gradient-to-br from-card-dark to-gray-dark transition-all duration-300",
        "hover:border-neon-purple/50 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
        tier === "featured" && "ring-1 ring-victory-gold/50",
        tier === "premium" && "ring-1 ring-neon-purple/50"
      )}
    >
      {/* Featured badge */}
      {tier !== "free" && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-victory-gold to-yellow-500 text-deep-space text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
            <Crown className="h-3 w-3" />
            DESTAQUE
          </div>
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-neon-purple/5 to-neon-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-5 relative z-10">
        {/* Header with game icon */}
        <div className="flex items-start justify-between mb-4">
          <GameIcon game={game} size="md" showGlow />
          <Badge className={cn("border text-xs font-semibold", formatColors[format])}>
            {format}
          </Badge>
        </div>

        {/* Tournament name */}
        <h3
          className="font-heading text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-neon-cyan transition-colors"
          title={name}
        >
          {truncateText(name, 50)}
        </h3>

        {/* Prize pool */}
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-victory-gold/10 to-yellow-500/5 border border-victory-gold/30">
          <div className="text-xs text-gray-light mb-1 font-heading uppercase tracking-wider">
            Premiação
          </div>
          <div className="font-display text-3xl font-black text-victory-gold">
            {formatCurrency(prizeAmount)}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <InfoItem icon={Calendar} label="Data" value={formatDate(date)} />
          <InfoItem icon={Clock} label="Horário" value={time} />
        </div>

        {/* Deadline countdown */}
        <div className="mb-4 flex items-center gap-2 p-2 rounded-lg bg-white/5">
          <Timer
            className={cn(
              "h-4 w-4",
              daysUntilDeadline <= 3 ? "text-danger-red animate-pulse" : "text-gray-light"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              daysUntilDeadline <= 3 ? "text-danger-red" : "text-gray-light"
            )}
          >
            {daysUntilDeadline <= 3 && "⚡ "}
            {deadlineStatus.text}
          </span>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 mb-5 text-sm text-gray-light">
          <User className="h-4 w-4" />
          <span>{organizerName}</span>
          <CheckCircle2 className="h-4 w-4 text-success-green" />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-1 font-heading font-semibold transition-all",
              isSaved
                ? "bg-neon-purple hover:bg-neon-purple/80"
                : "border-gray-medium hover:border-neon-purple hover:bg-neon-purple/10"
            )}
            onClick={handleSaveClick}
            disabled={!isAuthenticated}
            title={!isAuthenticated ? "Faça login para salvar" : isSaved ? "Remover dos salvos" : "Salvar torneio"}
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
            className="flex-1 bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] font-heading font-semibold transition-all"
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

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-neon-cyan shrink-0" />
      <div className="min-w-0">
        <div className="text-xs text-gray-light font-heading uppercase tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-white truncate">{value}</div>
      </div>
    </div>
  )
}

export function TournamentCardSkeleton() {
  return (
    <Card className="border border-gray-medium bg-gradient-to-br from-card-dark to-gray-dark overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-gray-medium animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-gray-medium animate-pulse" />
        </div>
        <div className="h-6 w-3/4 rounded bg-gray-medium animate-pulse mb-4" />
        <div className="h-24 w-full rounded-xl bg-gray-medium animate-pulse mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-12 w-full rounded bg-gray-medium animate-pulse" />
          <div className="h-12 w-full rounded bg-gray-medium animate-pulse" />
        </div>
        <div className="h-10 w-full rounded-lg bg-gray-medium animate-pulse mb-4" />
        <div className="h-4 w-2/3 rounded bg-gray-medium animate-pulse mb-5" />
        <div className="flex gap-3">
          <div className="h-10 flex-1 rounded-lg bg-gray-medium animate-pulse" />
          <div className="h-10 flex-1 rounded-lg bg-gray-medium animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
