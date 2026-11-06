import { cn } from "@/lib/utils"
import { Reveal } from "@/components/shared/Reveal"

type SectionHeaderProps = {
  /** Số chương kiểu tạp chí, VD "02". */
  index: string
  kicker: string
  title: React.ReactNode
  intro?: React.ReactNode
  className?: string
  /** Nội dung phụ bên phải (nút, bộ lọc…). */
  aside?: React.ReactNode
}

/** Đầu section kiểu editorial: số chương + kẻ ngang + tiêu đề lớn. */
export function SectionHeader({ index, kicker, title, intro, aside, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <div className="mb-6 flex items-center gap-4 md:mb-8">
          <span className="font-display text-[13px] font-semibold text-primary tabular">{index}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden />
          <p className="kicker">{kicker}</p>
        </div>
        <h2 className="display text-title text-balance">{title}</h2>
        {intro && <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">{intro}</p>}
      </div>
      {aside && <div className="lg:col-span-4 lg:justify-self-end">{aside}</div>}
    </Reveal>
  )
}
