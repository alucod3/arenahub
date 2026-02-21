import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neon-purple text-white hover:bg-neon-purple/90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
        destructive:
          "bg-danger-red text-white hover:bg-danger-red/90",
        outline:
          "border-2 border-gray-medium bg-transparent text-white hover:border-neon-purple hover:bg-neon-purple/10",
        secondary:
          "bg-neon-cyan text-white hover:bg-neon-cyan/90 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
        ghost:
          "text-gray-light hover:bg-white/5 hover:text-white",
        link:
          "text-neon-cyan underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02]",
        gold:
          "bg-gradient-to-r from-victory-gold to-yellow-500 text-deep-space font-bold hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
