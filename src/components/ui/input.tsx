import * as React from "react"
import { cn } from "@/lib/utils"

/** Kiểu ô nhập dùng chung cho Input, Textarea, Select và nút chọn ngày: ô viền bo góc, nền trắng. */
export const fieldClassName =
  "w-full min-w-0 rounded-lg border border-input bg-card text-[15px] text-foreground shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-muted-foreground/70 hover:border-line-strong focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/10"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClassName, "h-12 px-4", className)} {...props} />
}

export { Input }
