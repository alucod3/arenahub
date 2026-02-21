"use client"

import { DollarSign, Calendar, Gamepad2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TournamentFilters, Game, TournamentFormat } from "@/lib/types"

const games: { value: Game | "all"; label: string; emoji: string; gradient: string }[] = [
  { value: "all", label: "Todos", emoji: "🎮", gradient: "from-neon-purple to-neon-cyan" },
  { value: "League of Legends", label: "LoL", emoji: "⚔️", gradient: "from-blue-500 to-cyan-400" },
  { value: "Valorant", label: "Valorant", emoji: "🎯", gradient: "from-red-500 to-pink-500" },
  { value: "CS2", label: "CS2", emoji: "🔫", gradient: "from-orange-500 to-yellow-500" },
  { value: "Free Fire", label: "Free Fire", emoji: "🔥", gradient: "from-orange-600 to-red-500" },
]

const prizeRanges = [
  { value: "all", label: "Todas as Premiações" },
  { value: "under500", label: "Até R$ 500" },
  { value: "500to2000", label: "R$ 500 - R$ 2.000" },
  { value: "over2000", label: "Acima de R$ 2.000" },
]

const dateRanges = [
  { value: "all", label: "Todas as Datas" },
  { value: "7days", label: "Próximos 7 dias" },
  { value: "thisMonth", label: "Este mês" },
  { value: "nextMonth", label: "Próximo mês" },
]

const formats: { value: TournamentFormat | "all"; label: string }[] = [
  { value: "all", label: "Todos os Formatos" },
  { value: "Online", label: "Online" },
  { value: "Presencial", label: "Presencial" },
  { value: "Híbrido", label: "Híbrido" },
]

interface TournamentFiltersProps {
  filters: TournamentFilters
  onFiltersChange: (filters: TournamentFilters) => void
}

export function TournamentFiltersComponent({
  filters,
  onFiltersChange,
}: TournamentFiltersProps) {
  const handleGameChange = (value: Game | "all") => {
    onFiltersChange({ ...filters, game: value })
  }

  const handlePrizeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      prizeRange: value as TournamentFilters["prizeRange"],
    })
  }

  const handleDateChange = (value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: value as TournamentFilters["dateRange"],
    })
  }

  const handleFormatChange = (value: TournamentFormat | "all") => {
    onFiltersChange({ ...filters, format: value })
  }

  const isGameSelected = (gameValue: Game | "all") => {
    if (gameValue === "all") return !filters.game || filters.game === "all"
    return filters.game === gameValue
  }

  return (
    <div className="space-y-6">
      {/* Game filter pills */}
      <div className="flex flex-wrap gap-3">
        {games.map((game) => (
          <button
            key={game.value}
            onClick={() => handleGameChange(game.value)}
            className={cn(
              "group flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-300",
              isGameSelected(game.value)
                ? `bg-gradient-to-r ${game.gradient} text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]`
                : "bg-gray-dark border border-gray-medium text-gray-light hover:border-neon-purple/50 hover:text-white"
            )}
          >
            <span className="text-lg">{game.emoji}</span>
            <span>{game.label}</span>
            {isGameSelected(game.value) && (
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Other filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FilterDropdown
          icon={DollarSign}
          value={filters.prizeRange || "all"}
          onValueChange={handlePrizeChange}
          options={prizeRanges}
          placeholder="Premiação"
        />
        <FilterDropdown
          icon={Calendar}
          value={filters.dateRange || "all"}
          onValueChange={handleDateChange}
          options={dateRanges}
          placeholder="Data"
        />
        <FilterDropdown
          icon={Gamepad2}
          value={filters.format || "all"}
          onValueChange={handleFormatChange}
          options={formats}
          placeholder="Formato"
        />
      </div>
    </div>
  )
}

function FilterDropdown({
  icon: Icon,
  value,
  onValueChange,
  options,
  placeholder,
}: {
  icon: any
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-gray-dark border-gray-medium hover:border-neon-purple/50 text-white font-heading transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-neon-cyan" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-card-dark border-gray-medium">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="font-heading hover:bg-neon-purple/20 focus:bg-neon-purple/20"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
