import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  /** Nội dung phụ bên phải (nút, liên kết…). */
  aside?: React.ReactNode
  align?: "left" | "center"
  className?: string
  /** Dùng thẻ h1 thay vì h2 (trang con). */
  as?: "h1" | "h2"
}

/** Đầu section: nhãn nhỏ màu xanh + tiêu đề + mô tả ngắn. */
export function SectionHeader({ eyebrow, title, intro, aside, align = "left", className, as: Tag = "h2" }: SectionHeaderProps) {
  const centered = align === "center"
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", centered && "items-center text-center md:flex-col md:items-center", className)}>
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        <p className="eyebrow">
          <span aria-hidden className="h-0.5 w-5 rounded-full bg-primary" />
          {eyebrow}
        </p>
        <Tag className="heading mt-3 text-title leading-[1.15] text-balance">{title}</Tag>
        {intro && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">{intro}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}
