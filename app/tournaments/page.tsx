import { Metadata } from "next"
import { TournamentList } from "@/components/tournament-list"
import { Trophy } from "lucide-react"

export const metadata: Metadata = {
  title: "Torneios - Arena Hub",
  description: "Encontre torneios de League of Legends, Valorant, CS2 e Free Fire. Filtre por jogo, premiacao, data e formato.",
}

export default function TournamentsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Subtle bg effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-arena-green/[0.03] rounded-full blur-[180px]" />

      {/* Header section */}
      <div className="relative z-10 border-b border-arena-border bg-arena-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arena-green/10 border border-arena-green/20">
              <Trophy className="h-6 w-6 text-arena-green" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-black text-arena-text">
              Encontre seu proximo{" "}
              <span className="text-gradient">Campeonato</span>
            </h1>
          </div>
          <p className="text-arena-muted text-lg max-w-2xl">
            Explore todos os torneios disponiveis e encontre o perfeito para voce.
            Use os filtros para refinar sua busca.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <TournamentList />
      </div>
    </div>
  )
}
