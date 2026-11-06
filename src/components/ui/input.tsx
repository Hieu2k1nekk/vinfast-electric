import * as React from "react"
import { cn } from "@/lib/utils"

/** Kiểu ô nhập dùng chung cho Input, Textarea và Select: chỉ có gạch chân, phong cách editorial. */
export const fieldClassName =
  "w-full min-w-0 rounded-none border-0 border-b border-input bg-transparent text-base text-foreground transition-[border-color,background-color] duration-200 outline-none placeholder:text-muted-foreground/70 hover:border-line-strong focus-visible:border-primary focus-visible:bg-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClassName, "h-12 px-1", className)}
      {...props}
    />
  )
}

export { Input }
