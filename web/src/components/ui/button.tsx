import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/60 focus-visible:ring-[3px] uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-crimson-bright shadow-[inset_-3px_-3px_0_rgba(73,0,13,0.7)] hover:bg-crimson-bright hover:shadow-[0_0_22px_rgba(200,16,46,0.55)]",
        destructive:
          "bg-destructive text-white border-2 border-crimson-bright hover:brightness-110",
        outline:
          "border-2 border-border bg-secondary/40 text-foreground shadow-inset-arcade hover:border-crimson-bright hover:text-white",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-steel/60 hover:border-mist",
        ghost: "hover:bg-secondary/60 hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 px-6 text-base has-[>svg]:px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
