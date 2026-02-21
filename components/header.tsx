"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Trophy, Menu, X, Gamepad2, Users, Bell, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Torneios", href: "/tournaments", icon: Gamepad2 },
  { name: "Organizadores", href: "/organizer", icon: Users },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark-void/95 backdrop-blur-xl border-b border-neon-purple/20 shadow-lg shadow-neon-purple/5"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="relative">
            <Trophy className="h-8 w-8 text-neon-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            <div className="absolute inset-0 animate-ping">
              <Trophy className="h-8 w-8 text-neon-purple opacity-20" />
            </div>
          </div>
          <span className="font-display text-2xl font-black tracking-tight">
            ARENA<span className="text-neon-cyan">HUB</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider transition-all",
                  isActive
                    ? "text-neon-cyan"
                    : "text-gray-light hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-neon-cyan" : "text-gray-light group-hover:text-neon-purple"
                  )}
                />
                {item.name}
                {isActive && (
                  <Sparkles className="h-3 w-3 text-neon-cyan animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <SignedOut>
            <Button
              variant="ghost"
              className="font-heading font-semibold text-gray-light hover:text-white hover:bg-white/5"
              asChild
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-neon-purple to-neon-pink font-heading font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
              asChild
            >
              <Link href="/sign-up">Cadastrar</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-light hover:text-white hover:bg-white/5"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger-red text-[10px] font-bold">
                3
              </span>
            </Button>
            <Button
              variant="outline"
              className="border-neon-purple/50 font-heading font-semibold hover:bg-neon-purple/10 hover:border-neon-purple"
              asChild
            >
              <Link href="/dashboard">Meus Torneios</Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-neon-purple/50",
                },
              }}
            />
          </SignedIn>
        </div>

        <button
          type="button"
          className="md:hidden text-gray-light hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neon-purple/20 bg-dark-void/98 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 py-3 font-heading text-lg font-semibold transition-colors",
                    isActive ? "text-neon-cyan" : "text-gray-light"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            <div className="border-t border-gray-medium pt-4 space-y-3">
              <SignedOut>
                <Button
                  variant="outline"
                  className="w-full border-gray-medium font-heading font-semibold"
                  asChild
                >
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-pink font-heading font-semibold"
                  asChild
                >
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    Cadastrar
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  variant="outline"
                  className="w-full border-neon-purple/50 font-heading font-semibold"
                  asChild
                >
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Meus Torneios
                  </Link>
                </Button>
                <div className="flex items-center justify-center pt-2">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-10 w-10 ring-2 ring-neon-purple/50",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
