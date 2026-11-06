import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent text-[15px] font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** CTA chính — xanh VinFast. */
        default: "bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_rgb(20_100_244/0.55)] hover:bg-brand-dark",
        /** CTA phụ nền đậm. */
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        outline: "border-line-strong bg-card text-foreground hover:border-primary hover:text-primary",
        /** Dùng trên ảnh / nền tối. */
        light: "bg-white text-ink hover:bg-white/90",
        ghost: "text-foreground hover:bg-accent",
        link: "h-auto border-0 px-0 text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-[14px]",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
        "icon-sm": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
