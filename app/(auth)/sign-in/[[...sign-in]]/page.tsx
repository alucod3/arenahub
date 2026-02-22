import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Entrar - Arena Hub",
  description: "Entre na sua conta Arena Hub para salvar torneios e acompanhar seus favoritos.",
}

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-arena-text">Bem-vindo de volta!</h1>
          <p className="mt-2 text-arena-muted">
            Entre para acessar seus torneios salvos
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-arena-card border border-arena-border shadow-xl",
              headerTitle: "text-arena-text",
              headerSubtitle: "text-arena-muted",
              socialButtonsBlockButton:
                "bg-white/[0.04] border-arena-border text-arena-text hover:bg-white/[0.08]",
              socialButtonsBlockButtonText: "text-arena-text",
              dividerLine: "bg-arena-border",
              dividerText: "text-arena-muted",
              formFieldLabel: "text-arena-text",
              formFieldInput:
                "bg-arena-surface border-arena-border text-arena-text focus:ring-arena-green",
              footerActionLink: "text-arena-green hover:text-arena-green-light",
              formButtonPrimary:
                "bg-arena-green hover:bg-arena-green-light text-arena-dark",
              identityPreviewEditButton: "text-arena-green",
            },
          }}
        />
      </div>
    </div>
  )
}
