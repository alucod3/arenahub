"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Game } from "@/lib/types"

const GAME_CONFIG: Record<Game, {
  image: string
  gradient: string
  color: string
  bgColor: string
  label: string
}> = {
  'League of Legends': {
    image: '/images/games/lol.jpg',
    gradient: 'from-[#0AC8B9] to-[#0397AB]',
    color: '#0AC8B9',
    bgColor: 'bg-[#0AC8B9]/15',
    label: 'LoL',
  },
  'Valorant': {
    image: '/images/games/valorant.jpg',
    gradient: 'from-[#FF4655] to-[#BD3944]',
    color: '#FF4655',
    bgColor: 'bg-[#FF4655]/15',
    label: 'Valorant',
  },
  'CS2': {
    image: '/images/games/cs2.jpg',
    gradient: 'from-[#F7941D] to-[#DE6C00]',
    color: '#F7941D',
    bgColor: 'bg-[#F7941D]/15',
    label: 'CS2',
  },
  'Free Fire': {
    image: '/images/games/freefire.jpg',
    gradient: 'from-[#FF6600] to-[#FF3300]',
    color: '#FF6600',
    bgColor: 'bg-[#FF6600]/15',
    label: 'FF',
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
    sm: { container: 'h-8 w-8', image: 32 },
    md: { container: 'h-12 w-12', image: 48 },
    lg: { container: 'h-16 w-16', image: 64 },
    xl: { container: 'h-20 w-20', image: 80 },
  }

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden ring-1 ring-white/10",
        sizes[size].container,
        showGlow && "ring-2",
        className
      )}
      style={showGlow ? { boxShadow: `0 0 20px ${config.color}30`, ringColor: `${config.color}50` } : undefined}
    >
      <Image
        src={config.image}
        alt={game}
        width={sizes[size].image}
        height={sizes[size].image}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export function GameBadge({ game, className }: { game: Game; className?: string }) {
  const config = GAME_CONFIG[game]
  if (!config) return null

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border",
        config.bgColor,
        className
      )}
      style={{ color: config.color, borderColor: `${config.color}30` }}
    >
      <Image
        src={config.image}
        alt={game}
        width={16}
        height={16}
        className="h-4 w-4 rounded object-cover"
      />
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

export function getGameImage(game: Game): string {
  return GAME_CONFIG[game]?.image || '/images/games/lol.jpg'
}
