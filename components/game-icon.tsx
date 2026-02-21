"use client"

import { cn } from "@/lib/utils"
import type { Game } from "@/lib/types"

const GAME_CONFIG: Record<Game, {
  emoji: string
  gradient: string
  color: string
  bgColor: string
}> = {
  'League of Legends': {
    emoji: '⚔️',
    gradient: 'from-blue-500 to-cyan-400',
    color: '#0AC8B9',
    bgColor: 'bg-blue-500/20',
  },
  'Valorant': {
    emoji: '🎯',
    gradient: 'from-red-500 to-pink-500',
    color: '#FF4655',
    bgColor: 'bg-red-500/20',
  },
  'CS2': {
    emoji: '🔫',
    gradient: 'from-orange-500 to-yellow-500',
    color: '#F7941D',
    bgColor: 'bg-orange-500/20',
  },
  'Free Fire': {
    emoji: '🔥',
    gradient: 'from-orange-600 to-red-500',
    color: '#FF6600',
    bgColor: 'bg-orange-600/20',
  },
}

interface GameIconProps {
  game: Game
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showGlow?: boolean
  className?: string
}

export function GameIcon({ game, size = 'md', showGlow = false, className }: GameIconProps) {
  const config = GAME_CONFIG[game]
  if (!config) return null

  const sizes = {
    sm: { container: 'h-8 w-8', emoji: 'text-base' },
    md: { container: 'h-12 w-12', emoji: 'text-2xl' },
    lg: { container: 'h-16 w-16', emoji: 'text-3xl' },
    xl: { container: 'h-20 w-20', emoji: 'text-4xl' },
  }

  return (
    <div
      className={cn(
        "relative rounded-xl p-0.5",
        `bg-gradient-to-br ${config.gradient}`,
        showGlow && "shadow-lg",
        className
      )}
      style={showGlow ? { boxShadow: `0 0 20px ${config.color}40` } : undefined}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-[10px] bg-card-dark",
          sizes[size].container
        )}
      >
        <span className={sizes[size].emoji} role="img" aria-label={game}>
          {config.emoji}
        </span>
      </div>
    </div>
  )
}

export function GameBadge({ game, className }: { game: Game; className?: string }) {
  const config = GAME_CONFIG[game]
  if (!config) return null

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
        config.bgColor,
        className
      )}
      style={{ color: config.color }}
    >
      <span>{config.emoji}</span>
      <span>{game}</span>
    </div>
  )
}

export function getGameColor(game: Game): string {
  return GAME_CONFIG[game]?.color || '#A855F7'
}

export function getGameGradient(game: Game): string {
  return GAME_CONFIG[game]?.gradient || 'from-neon-purple to-neon-pink'
}
