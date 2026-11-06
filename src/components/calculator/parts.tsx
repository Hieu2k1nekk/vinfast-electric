import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function FieldRow({
  label,
  htmlFor,
  hint,
  aside,
  children,
  className,
}: {
  label: string
  htmlFor: string
  hint?: string
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor} className="text-[14px] font-semibold text-foreground">
          {label}
        </Label>
        {aside}
      </div>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-[12px] text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function ResultLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-[14px] text-muted-foreground">{label}</dt>
      <dd className={cn("text-right tabular", strong ? "text-[17px] font-bold" : "text-[15px] font-semibold")}>{value}</dd>
    </div>
  )
}
