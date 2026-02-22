"use client"

import Image from "next/image"
import { DollarSign, Calendar, Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TournamentFilters, Game, TournamentFormat } from "@/lib/types"

const games: { value: Game | "all"; label: string; image?: string; color: string }[] = [
  { value: "all", label: "Todos", color: "#10B981" },
  { value: "League of Legends", label: "LoL", image: "/images/games/lol.jpg", color: "#0AC8B9" },
  { value: "Valorant", label: "Valorant", image: "/images/games/valorant.jpg", color: "#FF4655" },
  { value: "CS2", label: "CS2", image: "/images/games/cs2.jpg", color: "#F7941D" },
  { value: "Free Fire", label: "Free Fire", image: "/images/games/freefire.jpg", color: "#FF6600" },
]

const prizeRanges = [
  { value: "all", label: "Todas as Premiacoes" },
  { value: "under500", label: "Ate R$ 500" },
  { value: "500to2000", label: "R$ 500 - R$ 2.000" },
  { value: "over2000", label: "Acima de R$ 2.000" },
]

const dateRanges = [
  { value: "all", label: "Todas as Datas" },
  { value: "7days", label: "Proximos 7 dias" },
  { value: "thisMonth", label: "Este mes" },
  { value: "nextMonth", label: "Proximo mes" },
]

const formats: { value: TournamentFormat | "all"; label: string }[] = [
  { value: "all", label: "Todos os Formatos" },
  { value: "Online", label: "Online" },
  { value: "Presencial", label: "Presencial" },
  { value: "Hibrido" as TournamentFormat, label: "Hibrido" },
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
      {/* Game filter pills with icons */}
      <div className="flex flex-wrap gap-3">
        {games.map((game) => (
          <button
            key={game.value}
            onClick={() => handleGameChange(game.value)}
            className={cn(
              "group flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-300",
              isGameSelected(game.value)
                ? "bg-white/[0.08] text-arena-text ring-1 shadow-sm"
                : "bg-white/[0.03] border border-arena-border text-arena-muted hover:border-white/10 hover:text-arena-text"
            )}
            style={isGameSelected(game.value) ? { ringColor: `${game.color}50`, boxShadow: `0 0 20px ${game.color}15` } : undefined}
          >
            {game.image ? (
              <Image
                src={game.image}
                alt={game.label}
                width={24}
                height={24}
                className="h-6 w-6 rounded object-cover"
              />
            ) : (
              <Gamepad2 className="h-5 w-5" />
            )}
            <span>{game.label}</span>
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
          placeholder="Premiacao"
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
  icon: React.ComponentType<{ className?: string }>
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-arena-card border-arena-border hover:border-white/10 text-arena-text font-heading transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-arena-green" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-arena-card border-arena-border">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="font-heading text-arena-text hover:bg-arena-green/10 focus:bg-arena-green/10"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
