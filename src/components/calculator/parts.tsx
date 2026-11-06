import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function FieldRow({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="kicker">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function ResultLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-3.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={cn("text-right font-display tabular", strong ? "text-lg font-bold" : "text-[15px] font-semibold")}>{value}</dd>
    </div>
  )
}
