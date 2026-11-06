import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldClassName } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldClassName, "field-sizing-content min-h-28 resize-none px-1 py-3", className)}
      {...props}
    />
  )
}

export { Textarea }
