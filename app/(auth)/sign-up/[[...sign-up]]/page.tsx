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
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="mt-2 text-muted-foreground">
            Junte-se a milhares de jogadores no Arena Hub
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border border-white/10 shadow-xl",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "bg-white/5 border-white/10 text-foreground hover:bg-white/10",
              socialButtonsBlockButtonText: "text-foreground",
              dividerLine: "bg-white/10",
              dividerText: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput:
                "bg-background/50 border-white/10 text-foreground focus:ring-primary",
              footerActionLink: "text-primary hover:text-primary/80",
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-white",
              identityPreviewEditButton: "text-primary",
            },
          }}
        />
      </div>
    </div>
  )
}
