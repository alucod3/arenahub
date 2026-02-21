import { Metadata } from "next"
import { TournamentList } from "@/components/tournament-list"
import { Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Torneios - Arena Hub",
  description: "Encontre torneios de League of Legends, Valorant, CS2 e Free Fire. Filtre por jogo, premiação, data e formato.",
}

export default function TournamentsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-dark-void to-deep-space" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px]" />

      {/* Header section */}
      <div className="relative z-10 border-b border-gray-medium bg-dark-void/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white">
              Encontre seu próximo{" "}
              <span className="text-gradient">Campeonato</span>
            </h1>
          </div>
          <p className="text-gray-light text-lg max-w-2xl">
            Explore todos os torneios disponíveis e encontre o perfeito para você.
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
