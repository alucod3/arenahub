import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar Conta - Arena Hub",
  description: "Crie sua conta no Arena Hub para salvar torneios e nunca perder um campeonato.",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-arena-text">Crie sua conta</h1>
          <p className="mt-2 text-arena-muted">
            Junte-se a milhares de jogadores no Arena Hub
          </p>
        </div>
        <SignUp
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
