import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neon-purple text-white",
        secondary:
          "border-transparent bg-neon-cyan text-white",
        destructive:
          "border-transparent bg-danger-red text-white",
        outline: 
          "text-foreground border-gray-medium",
        featured: 
          "border-victory-gold/50 bg-victory-gold/20 text-victory-gold",
        premium: 
          "border-neon-purple/50 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-neon-purple",
        online: 
          "border-success-green/50 bg-success-green/20 text-success-green",
        presencial: 
          "border-electric-blue/50 bg-electric-blue/20 text-electric-blue",
        hibrido: 
          "border-neon-purple/50 bg-neon-purple/20 text-neon-purple",
        gold:
          "border-victory-gold/50 bg-gradient-to-r from-victory-gold to-yellow-500 text-deep-space font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
