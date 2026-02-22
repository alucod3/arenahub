"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Check, Trophy, Users, Zap, Crown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createTournament } from "@/lib/supabase"
import { isValidUrl, cn } from "@/lib/utils"
import type { TournamentFormData, Game, TournamentFormat } from "@/lib/types"

const games: Game[] = ["League of Legends", "Valorant", "CS2", "Free Fire"]
const formats: TournamentFormat[] = ["Online", "Presencial", "Hibrido" as TournamentFormat]

interface FormData {
  name: string
  game: Game
  prize_amount: string
  date: Date | undefined
  time: string
  format: TournamentFormat
  deadline: Date | undefined
  registration_link: string
  organizer_name: string
  organizer_email: string
  wantFeatured: boolean
}

export default function OrganizerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    name: "",
    game: "League of Legends",
    prize_amount: "",
    date: undefined,
    time: "",
    format: "Online",
    deadline: undefined,
    registration_link: "",
    organizer_name: "",
    organizer_email: "",
    wantFeatured: false,
  })

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nome do torneio e obrigatorio"
    if (!formData.prize_amount || parseInt(formData.prize_amount) < 0) newErrors.prize_amount = "Premiacao deve ser um valor valido"
    if (!formData.date) newErrors.date = "Data do torneio e obrigatoria"
    else if (formData.date < new Date()) newErrors.date = "Data deve ser no futuro"
    if (!formData.time) newErrors.time = "Horario e obrigatorio"
    if (!formData.deadline) newErrors.deadline = "Deadline de inscricao e obrigatorio"
    else if (formData.date && formData.deadline >= formData.date) newErrors.deadline = "Deadline deve ser antes da data do torneio"
    if (!formData.registration_link.trim()) newErrors.registration_link = "Link de inscricao e obrigatorio"
    else if (!isValidUrl(formData.registration_link)) newErrors.registration_link = "URL invalida"
    if (!formData.organizer_name.trim()) newErrors.organizer_name = "Nome do organizador e obrigatorio"
    if (!formData.organizer_email.trim()) newErrors.organizer_email = "Email e obrigatorio"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.organizer_email)) newErrors.organizer_email = "Email invalido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const tournamentData: TournamentFormData = {
        name: formData.name,
        game: formData.game,
        prize_amount: parseInt(formData.prize_amount),
        date: formData.date!.toISOString().split("T")[0],
        time: formData.time,
        format: formData.format,
        deadline: formData.deadline!.toISOString().split("T")[0],
        registration_link: formData.registration_link,
        organizer_name: formData.organizer_name,
        organizer_email: formData.organizer_email,
        tier: formData.wantFeatured ? "featured" : "free",
      }

      const result = await createTournament(tournamentData)
      if (result) {
        setShowSuccess(true)
        setFormData({
          name: "",
          game: "League of Legends",
          prize_amount: "",
          date: undefined,
          time: "",
          format: "Online",
          deadline: undefined,
          registration_link: "",
          organizer_name: "",
          organizer_email: "",
          wantFeatured: false,
        })
      }
    } catch (error) {
      console.error("Error creating tournament:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-arena-gold/[0.03] rounded-full blur-[180px]" />

      {/* Header section */}
      <div className="relative z-10 border-b border-arena-border bg-arena-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-arena-gold/10 border border-arena-gold/20 text-arena-gold text-sm font-semibold mb-4">
            <Crown className="h-4 w-4" />
            PARA ORGANIZADORES
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black text-arena-text mb-4">
            Divulgue seu <span className="text-gradient-gold">Torneio</span>
          </h1>
          <p className="text-arena-muted text-lg max-w-2xl">
            Cadastre seu torneio gratuitamente e alcance milhares de jogadores
            buscando por campeonatos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-arena-green/10 border border-arena-green/20">
                  <Trophy className="h-5 w-5 text-arena-green" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-arena-text">
                    Informacoes do Torneio
                  </h2>
                  <p className="text-sm text-arena-muted">
                    Preencha os dados do seu campeonato
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-arena-text font-heading">
                      Nome do Torneio
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ex: Copa Verao 2024"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        "bg-arena-surface border-arena-border text-arena-text placeholder:text-arena-muted focus:border-arena-green",
                        errors.name && "border-arena-red"
                      )}
                    />
                    {errors.name && <p className="mt-1 text-sm text-arena-red">{errors.name}</p>}
                  </div>

                  <div>
                    <Label className="text-arena-text font-heading">Jogo</Label>
                    <Select
                      value={formData.game}
                      onValueChange={(value: Game) => setFormData({ ...formData, game: value })}
                    >
                      <SelectTrigger className="bg-arena-surface border-arena-border text-arena-text">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-arena-card border-arena-border">
                        {games.map((game) => (
                          <SelectItem key={game} value={game} className="text-arena-text hover:bg-arena-green/10">
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="prize" className="text-arena-text font-heading">
                      Premiacao (R$)
                    </Label>
                    <Input
                      id="prize"
                      type="number"
                      min="0"
                      placeholder="1000"
                      value={formData.prize_amount}
                      onChange={(e) => setFormData({ ...formData, prize_amount: e.target.value })}
                      className={cn(
                        "bg-arena-surface border-arena-border text-arena-text placeholder:text-arena-muted",
                        errors.prize_amount && "border-arena-red"
                      )}
                    />
                    {errors.prize_amount && <p className="mt-1 text-sm text-arena-red">{errors.prize_amount}</p>}
                  </div>

                  <div>
                    <Label className="text-arena-text font-heading">Data do Torneio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-arena-surface border-arena-border text-arena-text",
                            !formData.date && "text-arena-muted",
                            errors.date && "border-arena-red"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-arena-green" />
                          {formData.date
                            ? format(formData.date, "dd/MM/yyyy", { locale: ptBR })
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-arena-card border-arena-border" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData({ ...formData, date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && <p className="mt-1 text-sm text-arena-red">{errors.date}</p>}
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-arena-text font-heading">Horario</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={cn(
                        "bg-arena-surface border-arena-border text-arena-text",
                        errors.time && "border-arena-red"
                      )}
                    />
                    {errors.time && <p className="mt-1 text-sm text-arena-red">{errors.time}</p>}
                  </div>

                  <div>
                    <Label className="text-arena-text font-heading">Formato</Label>
                    <Select
                      value={formData.format}
                      onValueChange={(value: TournamentFormat) => setFormData({ ...formData, format: value })}
                    >
                      <SelectTrigger className="bg-arena-surface border-arena-border text-arena-text">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-arena-card border-arena-border">
                        {formats.map((fmt) => (
                          <SelectItem key={fmt} value={fmt} className="text-arena-text hover:bg-arena-green/10">
                            {fmt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-arena-text font-heading">Deadline de Inscricao</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-arena-surface border-arena-border text-arena-text",
                            !formData.deadline && "text-arena-muted",
                            errors.deadline && "border-arena-red"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-arena-green" />
                          {formData.deadline
                            ? format(formData.deadline, "dd/MM/yyyy", { locale: ptBR })
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-arena-card border-arena-border" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.deadline}
                          onSelect={(date) => setFormData({ ...formData, deadline: date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.deadline && <p className="mt-1 text-sm text-arena-red">{errors.deadline}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="link" className="text-arena-text font-heading">
                      Link de Inscricao
                    </Label>
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://..."
                      value={formData.registration_link}
                      onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                      className={cn(
                        "bg-arena-surface border-arena-border text-arena-text placeholder:text-arena-muted",
                        errors.registration_link && "border-arena-red"
                      )}
                    />
                    {errors.registration_link && <p className="mt-1 text-sm text-arena-red">{errors.registration_link}</p>}
                  </div>

                  <div>
                    <Label htmlFor="organizer" className="text-arena-text font-heading">
                      Nome do Organizador
                    </Label>
                    <Input
                      id="organizer"
                      placeholder="Seu nome ou organizacao"
                      value={formData.organizer_name}
                      onChange={(e) => setFormData({ ...formData, organizer_name: e.target.value })}
                      className={cn(
                        "bg-arena-surface border-arena-border text-arena-text placeholder:text-arena-muted",
                        errors.organizer_name && "border-arena-red"
                      )}
                    />
                    {errors.organizer_name && <p className="mt-1 text-sm text-arena-red">{errors.organizer_name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-arena-text font-heading">
                      Email de Contato
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@email.com"
                      value={formData.organizer_email}
                      onChange={(e) => setFormData({ ...formData, organizer_email: e.target.value })}
                      className={cn(
                        "bg-arena-surface border-arena-border text-arena-text placeholder:text-arena-muted",
                        errors.organizer_email && "border-arena-red"
                      )}
                    />
                    {errors.organizer_email && <p className="mt-1 text-sm text-arena-red">{errors.organizer_email}</p>}
                  </div>
                </div>

                {/* Featured option */}
                <div className="rounded-xl border border-arena-gold/20 bg-arena-gold/[0.05] p-5">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="featured"
                      checked={formData.wantFeatured}
                      onCheckedChange={(checked) => setFormData({ ...formData, wantFeatured: checked as boolean })}
                      className="mt-1 border-arena-gold data-[state=checked]:bg-arena-gold data-[state=checked]:text-arena-dark"
                    />
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer text-arena-text font-heading text-base flex items-center gap-2">
                        <Crown className="h-4 w-4 text-arena-gold" />
                        Quero destaque para meu torneio (R$ 97)
                      </Label>
                      <p className="mt-1 text-sm text-arena-muted">
                        Seu torneio aparecera em destaque por 30 dias, com badge
                        especial e prioridade nos resultados de busca.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-arena-green hover:bg-arena-green-light text-arena-dark font-heading font-bold text-lg h-14 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Cadastrando..."
                  ) : (
                    <>
                      Cadastrar Torneio
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-heading text-lg font-bold text-arena-text mb-4">
                Dicas para sucesso
              </h3>
              <ul className="space-y-3">
                {[
                  "Use um nome atrativo e descritivo",
                  "Defina um deadline com antecedencia",
                  "Link de inscricao facil de acessar",
                  "Responda duvidas rapidamente",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-arena-muted">
                    <Check className="h-5 w-5 shrink-0 text-arena-green mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <SidebarStat
              icon={Trophy}
              value="500+"
              label="Torneios ja cadastrados"
              accent="text-arena-green"
              accentBg="bg-arena-green/10 border-arena-green/20"
            />

            <SidebarStat
              icon={Users}
              value="50k+"
              label="Jogadores alcancados"
              accent="text-arena-blue"
              accentBg="bg-arena-blue/10 border-arena-blue/20"
            />

            <SidebarStat
              icon={Zap}
              value="5 min"
              label="Tempo medio de cadastro"
              accent="text-arena-gold"
              accentBg="bg-arena-gold/10 border-arena-gold/20"
            />
          </div>
        </div>
      </div>

      {/* Success dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-arena-card border-arena-border">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-arena-green/15 mb-4">
              <Check className="h-10 w-10 text-arena-green" />
            </div>
            <DialogTitle className="text-center font-display text-2xl text-arena-text">
              Torneio Cadastrado!
            </DialogTitle>
            <DialogDescription className="text-center text-arena-muted">
              Seu torneio ja esta visivel para os jogadores. Voce recebera um
              email de confirmacao em breve.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowSuccess(false)}
              className="border-arena-border text-arena-text"
            >
              Cadastrar Outro
            </Button>
            <Button
              className="bg-arena-green hover:bg-arena-green-light text-arena-dark"
              asChild
            >
              <a href="/tournaments">Ver Torneios</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SidebarStat({
  icon: Icon,
  value,
  label,
  accent,
  accentBg,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  accent: string
  accentBg: string
}) {
  return (
    <div className="glass-card p-6 flex items-center gap-4 group hover:border-white/10 transition-all">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accentBg} group-hover:scale-110 transition-transform`}>
        <Icon className={`h-6 w-6 ${accent}`} />
      </div>
      <div>
        <p className="font-display text-2xl font-black text-arena-text">{value}</p>
        <p className="text-sm text-arena-muted">{label}</p>
      </div>
    </div>
  )
}
