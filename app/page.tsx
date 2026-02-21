import { Hero } from "@/components/hero"
import { TournamentList } from "@/components/tournament-list"
import { ValuePropositions, OrganizerSection } from "@/components/value-propositions"

export default function HomePage() {
  return (
    <>
      <Hero />
      <TournamentList />
      <ValuePropositions />
      <OrganizerSection />
    </>
  )
}
