export type Game = 'League of Legends' | 'Valorant' | 'CS2' | 'Free Fire'

export type TournamentFormat = 'Online' | 'Presencial' | 'Híbrido'

export type TournamentTier = 'free' | 'featured' | 'premium'

export type TournamentStatus = 'active' | 'expired' | 'cancelled'

export type UserTier = 'free' | 'pro' | 'team'

export interface Tournament {
  id: string
  name: string
  game: Game
  prize_amount: number
  date: string
  time: string
  format: TournamentFormat
  deadline: string
  registration_link: string
  organizer_name: string
  organizer_email: string
  tier: TournamentTier
  status: TournamentStatus
  views: number
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  username: string | null
  tier: UserTier
  points: number
  created_at: string
}

export interface SavedTournament {
  id: string
  user_id: string
  tournament_id: string
  saved_at: string
  reminder_sent: boolean
  tournament?: Tournament
}

export interface TournamentFilters {
  game?: Game | 'all'
  prizeRange?: 'all' | 'under500' | '500to2000' | 'over2000'
  dateRange?: 'all' | '7days' | 'thisMonth' | 'nextMonth'
  format?: TournamentFormat | 'all'
}

export interface TournamentFormData {
  name: string
  game: Game
  prize_amount: number
  date: string
  time: string
  format: TournamentFormat
  deadline: string
  registration_link: string
  organizer_name: string
  organizer_email: string
  tier?: TournamentTier
}

export interface StatsData {
  totalTournaments: number
  totalOrganizers: number
  totalPlayers: number
}
