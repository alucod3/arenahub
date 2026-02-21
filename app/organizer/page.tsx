"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Check, Trophy, Users, Zap, Sparkles, Crown, ArrowRight } from "lucide-react"
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
const formats: TournamentFormat[] = ["Online", "Presencial", "Híbrido"]

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

    if (!formData.name.trim()) {
      newErrors.name = "Nome do torneio é obrigatório"
    }

    if (!formData.prize_amount || parseInt(formData.prize_amount) < 0) {
      newErrors.prize_amount = "Premiação deve ser um valor válido"
    }

    if (!formData.date) {
      newErrors.date = "Data do torneio é obrigatória"
    } else if (formData.date < new Date()) {
      newErrors.date = "Data deve ser no futuro"
    }

    if (!formData.time) {
      newErrors.time = "Horário é obrigatório"
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline de inscrição é obrigatório"
    } else if (formData.date && formData.deadline >= formData.date) {
      newErrors.deadline = "Deadline deve ser antes da data do torneio"
    }

    if (!formData.registration_link.trim()) {
      newErrors.registration_link = "Link de inscrição é obrigatório"
    } else if (!isValidUrl(formData.registration_link)) {
      newErrors.registration_link = "URL inválida"
    }

    if (!formData.organizer_name.trim()) {
      newErrors.organizer_name = "Nome do organizador é obrigatório"
    }

    if (!formData.organizer_email.trim()) {
      newErrors.organizer_email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.organizer_email)) {
      newErrors.organizer_email = "Email inválido"
    }

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
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-dark-void to-deep-space" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-victory-gold/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px]" />

      {/* Header section */}
      <div className="relative z-10 border-b border-gray-medium bg-dark-void/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-victory-gold/10 border border-victory-gold/30 text-victory-gold text-sm font-semibold mb-4">
            <Crown className="h-4 w-4" />
            PARA ORGANIZADORES
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
            Divulgue seu <span className="text-gradient-gold">Torneio</span>
          </h1>
          <p className="text-gray-light text-lg max-w-2xl">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">
                    Informações do Torneio
                  </h2>
                  <p className="text-sm text-gray-light">
                    Preencha os dados do seu campeonato
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-white font-heading">
                      Nome do Torneio
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ex: Copa Verão 2024"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={cn(
                        "bg-gray-dark border-gray-medium text-white placeholder:text-gray-light focus:border-neon-purple",
                        errors.name && "border-danger-red"
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-danger-red">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white font-heading">Jogo</Label>
                    <Select
                      value={formData.game}
                      onValueChange={(value: Game) =>
                        setFormData({ ...formData, game: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-dark border-gray-medium text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card-dark border-gray-medium">
                        {games.map((game) => (
                          <SelectItem key={game} value={game} className="text-white hover:bg-neon-purple/20">
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="prize" className="text-white font-heading">
                      Premiação (R$)
                    </Label>
                    <Input
                      id="prize"
                      type="number"
                      min="0"
                      placeholder="1000"
                      value={formData.prize_amount}
                      onChange={(e) =>
                        setFormData({ ...formData, prize_amount: e.target.value })
                      }
                      className={cn(
                        "bg-gray-dark border-gray-medium text-white placeholder:text-gray-light",
                        errors.prize_amount && "border-danger-red"
                      )}
                    />
                    {errors.prize_amount && (
                      <p className="mt-1 text-sm text-danger-red">
                        {errors.prize_amount}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white font-heading">Data do Torneio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-dark border-gray-medium text-white",
                            !formData.date && "text-gray-light",
                            errors.date && "border-danger-red"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-neon-cyan" />
                          {formData.date
                            ? format(formData.date, "dd/MM/yyyy", { locale: ptBR })
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card-dark border-gray-medium" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) =>
                            setFormData({ ...formData, date })
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="mt-1 text-sm text-danger-red">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-white font-heading">
                      Horário
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className={cn(
                        "bg-gray-dark border-gray-medium text-white",
                        errors.time && "border-danger-red"
                      )}
                    />
                    {errors.time && (
                      <p className="mt-1 text-sm text-danger-red">{errors.time}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white font-heading">Formato</Label>
                    <Select
                      value={formData.format}
                      onValueChange={(value: TournamentFormat) =>
                        setFormData({ ...formData, format: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-dark border-gray-medium text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card-dark border-gray-medium">
                        {formats.map((format) => (
                          <SelectItem key={format} value={format} className="text-white hover:bg-neon-purple/20">
                            {format}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white font-heading">Deadline de Inscrição</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-dark border-gray-medium text-white",
                            !formData.deadline && "text-gray-light",
                            errors.deadline && "border-danger-red"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-neon-cyan" />
                          {formData.deadline
                            ? format(formData.deadline, "dd/MM/yyyy", {
                                locale: ptBR,
                              })
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card-dark border-gray-medium" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.deadline}
                          onSelect={(date) =>
                            setFormData({ ...formData, deadline: date })
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.deadline && (
                      <p className="mt-1 text-sm text-danger-red">
                        {errors.deadline}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="link" className="text-white font-heading">
                      Link de Inscrição
                    </Label>
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://..."
                      value={formData.registration_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registration_link: e.target.value,
                        })
                      }
                      className={cn(
                        "bg-gray-dark border-gray-medium text-white placeholder:text-gray-light",
                        errors.registration_link && "border-danger-red"
                      )}
                    />
                    {errors.registration_link && (
                      <p className="mt-1 text-sm text-danger-red">
                        {errors.registration_link}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organizer" className="text-white font-heading">
                      Nome do Organizador
                    </Label>
                    <Input
                      id="organizer"
                      placeholder="Seu nome ou organização"
                      value={formData.organizer_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organizer_name: e.target.value,
                        })
                      }
                      className={cn(
                        "bg-gray-dark border-gray-medium text-white placeholder:text-gray-light",
                        errors.organizer_name && "border-danger-red"
                      )}
                    />
                    {errors.organizer_name && (
                      <p className="mt-1 text-sm text-danger-red">
                        {errors.organizer_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white font-heading">
                      Email de Contato
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@email.com"
                      value={formData.organizer_email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organizer_email: e.target.value,
                        })
                      }
                      className={cn(
                        "bg-gray-dark border-gray-medium text-white placeholder:text-gray-light",
                        errors.organizer_email && "border-danger-red"
                      )}
                    />
                    {errors.organizer_email && (
                      <p className="mt-1 text-sm text-danger-red">
                        {errors.organizer_email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Featured option */}
                <div className="rounded-xl border border-victory-gold/30 bg-victory-gold/5 p-5">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="featured"
                      checked={formData.wantFeatured}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          wantFeatured: checked as boolean,
                        })
                      }
                      className="mt-1 border-victory-gold data-[state=checked]:bg-victory-gold data-[state=checked]:text-deep-space"
                    />
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer text-white font-heading text-base flex items-center gap-2">
                        <Crown className="h-4 w-4 text-victory-gold" />
                        Quero destaque para meu torneio (R$ 97)
                      </Label>
                      <p className="mt-1 text-sm text-gray-light">
                        Seu torneio aparecerá em destaque por 30 dias, com badge
                        especial e prioridade nos resultados de busca.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="xl"
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-pink font-heading font-bold text-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
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
              <h3 className="font-heading text-lg font-bold text-white mb-4">
                Dicas para sucesso
              </h3>
              <ul className="space-y-3">
                {[
                  "Use um nome atrativo e descritivo",
                  "Defina um deadline com antecedência",
                  "Link de inscrição fácil de acessar",
                  "Responda dúvidas rapidamente",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-light">
                    <Check className="h-5 w-5 shrink-0 text-success-green mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <SidebarStat
              icon={Trophy}
              value="500+"
              label="Torneios já cadastrados"
              gradient="from-neon-purple to-neon-pink"
            />

            <SidebarStat
              icon={Users}
              value="50k+"
              label="Jogadores alcançados"
              gradient="from-neon-cyan to-electric-blue"
            />

            <SidebarStat
              icon={Zap}
              value="5 min"
              label="Tempo médio de cadastro"
              gradient="from-victory-gold to-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Success dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-card-dark border-gray-medium">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-green/20 mb-4">
              <Check className="h-10 w-10 text-success-green" />
            </div>
            <DialogTitle className="text-center font-display text-2xl text-white">
              Torneio Cadastrado!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-light">
              Seu torneio já está visível para os jogadores. Você receberá um
              email de confirmação em breve.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowSuccess(false)}
              className="border-gray-medium"
            >
              Cadastrar Outro
            </Button>
            <Button
              className="bg-gradient-to-r from-neon-purple to-neon-pink"
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
  gradient,
}: {
  icon: any
  value: string
  label: string
  gradient: string
}) {
  return (
    <div className="glass-card p-6 flex items-center gap-4 group hover:scale-[1.02] transition-transform">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="font-display text-2xl font-black text-white">{value}</p>
        <p className="text-sm text-gray-light">{label}</p>
      </div>
    </div>
  )
}
