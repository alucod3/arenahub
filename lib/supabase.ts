import { createClient } from '@supabase/supabase-js'
import type { Tournament, TournamentFilters, TournamentFormData, SavedTournament, UserProfile, StatsData } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getTournaments(filters?: TournamentFilters): Promise<Tournament[]> {
  let query = supabase
    .from('tournaments')
    .select('*')
    .eq('status', 'active')
    .order('date', { ascending: true })

  if (filters?.game && filters.game !== 'all') {
    query = query.eq('game', filters.game)
  }

  if (filters?.format && filters.format !== 'all') {
    query = query.eq('format', filters.format)
  }

  if (filters?.prizeRange && filters.prizeRange !== 'all') {
    switch (filters.prizeRange) {
      case 'under500':
        query = query.lt('prize_amount', 500)
        break
      case '500to2000':
        query = query.gte('prize_amount', 500).lte('prize_amount', 2000)
        break
      case 'over2000':
        query = query.gt('prize_amount', 2000)
        break
    }
  }

  if (filters?.dateRange && filters.dateRange !== 'all') {
    const today = new Date()
    let endDate: Date

    switch (filters.dateRange) {
      case '7days':
        endDate = new Date(today)
        endDate.setDate(endDate.getDate() + 7)
        query = query.gte('date', today.toISOString().split('T')[0])
                     .lte('date', endDate.toISOString().split('T')[0])
        break
      case 'thisMonth':
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        query = query.gte('date', today.toISOString().split('T')[0])
                     .lte('date', endDate.toISOString().split('T')[0])
        break
      case 'nextMonth':
        const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0)
        query = query.gte('date', nextMonthStart.toISOString().split('T')[0])
                     .lte('date', nextMonthEnd.toISOString().split('T')[0])
        break
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tournaments:', error)
    return []
  }

  return data || []
}

export async function getTournamentById(id: string): Promise<Tournament | null> {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching tournament:', error)
    return null
  }

  return data
}

export async function createTournament(tournamentData: TournamentFormData): Promise<Tournament | null> {
  const { data, error } = await supabase
    .from('tournaments')
    .insert([{
      ...tournamentData,
      tier: tournamentData.tier || 'free',
      status: 'active',
      views: 0,
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating tournament:', error)
    return null
  }

  return data
}

export async function incrementTournamentViews(tournamentId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_tournament_views', {
    tournament_id: tournamentId,
  })

  if (error) {
    console.error('Error incrementing views:', error)
  }
}

export async function getOrCreateUserProfile(userId: string, username?: string): Promise<UserProfile | null> {
  const { data: existing } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (existing) return existing

  const { data, error } = await supabase
    .from('user_profiles')
    .insert([{
      id: userId,
      username: username || null,
      tier: 'free',
      points: 0,
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating user profile:', error)
    return null
  }

  return data
}

export async function saveTournament(userId: string, tournamentId: string): Promise<boolean> {
  await getOrCreateUserProfile(userId)

  const { error } = await supabase
    .from('saved_tournaments')
    .insert([{
      user_id: userId,
      tournament_id: tournamentId,
    }])

  if (error) {
    if (error.code === '23505') {
      return true
    }
    console.error('Error saving tournament:', error)
    return false
  }

  return true
}

export async function removeSavedTournament(userId: string, tournamentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('saved_tournaments')
    .delete()
    .eq('user_id', userId)
    .eq('tournament_id', tournamentId)

  if (error) {
    console.error('Error removing saved tournament:', error)
    return false
  }

  return true
}

export async function getUserSavedTournaments(userId: string): Promise<SavedTournament[]> {
  const { data, error } = await supabase
    .from('saved_tournaments')
    .select(`
      *,
      tournament:tournaments(*)
    `)
    .eq('user_id', userId)
    .order('saved_at', { ascending: false })

  if (error) {
    console.error('Error fetching saved tournaments:', error)
    return []
  }

  return data || []
}

export async function getUserSavedTournamentIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('saved_tournaments')
    .select('tournament_id')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching saved tournament IDs:', error)
    return []
  }

  return data?.map(item => item.tournament_id) || []
}

export async function getStats(): Promise<StatsData> {
  const [tournamentsResult, organizersResult] = await Promise.all([
    supabase.from('tournaments').select('id', { count: 'exact', head: true }),
    supabase.from('tournaments').select('organizer_email', { count: 'exact', head: true }),
  ])

  const totalTournaments = tournamentsResult.count || 0
  
  const { data: uniqueOrganizers } = await supabase
    .from('tournaments')
    .select('organizer_email')
  
  const uniqueOrganizerCount = new Set(uniqueOrganizers?.map(o => o.organizer_email)).size

  return {
    totalTournaments,
    totalOrganizers: uniqueOrganizerCount || 0,
    totalPlayers: totalTournaments * 50,
  }
}

export async function expireOldTournaments(): Promise<void> {
  const { error } = await supabase.rpc('expire_old_tournaments')
  
  if (error) {
    console.error('Error expiring tournaments:', error)
  }
}
