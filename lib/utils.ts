import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Game, TournamentFormat } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateDaysUntil(dateString: string): number {
  const targetDate = parseISO(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return differenceInDays(targetDate, today)
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, "dd 'de' MMMM", { locale: ptBR })
}

export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, "dd/MM/yyyy", { locale: ptBR })
}

export function getGameIcon(game: Game): string {
  const icons: Record<Game, string> = {
    'League of Legends': '🎮',
    'Valorant': '🎯',
    'CS2': '🔫',
    'Free Fire': '🔥',
  }
  return icons[game]
}

export function getGameColor(game: Game): string {
  const colors: Record<Game, string> = {
    'League of Legends': 'from-blue-500 to-cyan-500',
    'Valorant': 'from-red-500 to-pink-500',
    'CS2': 'from-orange-500 to-yellow-500',
    'Free Fire': 'from-green-500 to-emerald-500',
  }
  return colors[game]
}

export function getFormatColor(format: TournamentFormat): string {
  const colors: Record<TournamentFormat, string> = {
    'Online': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Presencial': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Híbrido': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }
  return colors[format]
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function getDeadlineStatus(deadline: string): {
  text: string
  color: string
  urgent: boolean
} {
  const daysUntil = calculateDaysUntil(deadline)
  
  if (daysUntil < 0) {
    return { text: 'Encerrado', color: 'text-gray-500', urgent: false }
  }
  if (daysUntil === 0) {
    return { text: 'Último dia!', color: 'text-red-500', urgent: true }
  }
  if (daysUntil <= 3) {
    return { text: `${daysUntil} dia${daysUntil > 1 ? 's' : ''} restante${daysUntil > 1 ? 's' : ''}`, color: 'text-red-400', urgent: true }
  }
  if (daysUntil <= 7) {
    return { text: `${daysUntil} dias restantes`, color: 'text-yellow-400', urgent: false }
  }
  return { text: `${daysUntil} dias restantes`, color: 'text-gray-400', urgent: false }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
