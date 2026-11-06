import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-sm border border-transparent font-display text-[13px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-[background-color,color,border-color] duration-300 ease-editorial outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Nút chính — xanh điện trên nền tối, đen trên nền giấy (theo token --primary). */
        default: "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
        outline: "border-line-strong text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:bg-accent",
        /** Nút chữ có gạch chân, dùng cho liên kết phụ. */
        link: "h-auto rounded-none border-0 border-b border-current px-0 pb-1 text-foreground hover:text-primary",
        destructive: "bg-destructive/15 text-destructive hover:bg-destructive/25",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[12px]",
        lg: "h-14 px-8",
        icon: "size-12",
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
