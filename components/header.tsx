"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Trophy, Menu, X, Gamepad2, Users, Bell } from "lucide-react"
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
          ? "bg-arena-dark/95 backdrop-blur-xl border-b border-arena-border shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-arena-green">
            <Trophy className="h-5 w-5 text-arena-dark" />
          </div>
          <span className="font-display text-xl font-black tracking-tight text-arena-text">
            ARENA<span className="text-arena-green">HUB</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-heading text-sm font-semibold uppercase tracking-wider transition-all",
                  isActive
                    ? "text-arena-green bg-arena-green/10"
                    : "text-arena-muted hover:text-arena-text hover:bg-white/[0.04]"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          <SignedOut>
            <Button
              variant="ghost"
              className="font-heading font-semibold text-arena-muted hover:text-arena-text hover:bg-white/[0.04]"
              asChild
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              className="bg-arena-green hover:bg-arena-green-light text-arena-dark font-heading font-bold transition-all"
              asChild
            >
              <Link href="/sign-up">Cadastrar</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-arena-muted hover:text-arena-text hover:bg-white/[0.04]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-arena-red text-[10px] font-bold text-white">
                3
              </span>
            </Button>
            <Button
              variant="outline"
              className="border-arena-border font-heading font-semibold text-arena-text hover:bg-arena-green/10 hover:border-arena-green/50 hover:text-arena-green"
              asChild
            >
              <Link href="/dashboard">Meus Torneios</Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-arena-green/40",
                },
              }}
            />
          </SignedIn>
        </div>

        <button
          type="button"
          className="md:hidden text-arena-muted hover:text-arena-text transition-colors"
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
        <div className="md:hidden border-t border-arena-border bg-arena-dark/98 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-base font-semibold transition-colors",
                    isActive ? "text-arena-green bg-arena-green/10" : "text-arena-muted hover:text-arena-text"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            <div className="border-t border-arena-border pt-4 space-y-3">
              <SignedOut>
                <Button
                  variant="outline"
                  className="w-full border-arena-border font-heading font-semibold text-arena-text"
                  asChild
                >
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  className="w-full bg-arena-green hover:bg-arena-green-light text-arena-dark font-heading font-bold"
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
                  className="w-full border-arena-border font-heading font-semibold text-arena-text"
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
                        avatarBox: "h-10 w-10 ring-2 ring-arena-green/40",
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
