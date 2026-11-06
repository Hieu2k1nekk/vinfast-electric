import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

/** Logo chữ VinFast (kế thừa) + tên site. Logo gốc màu đen nên đảo màu trên nền tối. */
export function Logo({ className, invert = true }: { className?: string; invert?: boolean }) {
  return (
    <Link href="/" aria-label="VinFast Electric — về trang chủ" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/brand/vinfast-wordmark.png"
        alt="VinFast"
        width={112}
        height={13}
        className={cn("h-auto w-[96px] md:w-[112px]", invert && "invert")}
        preload
      />
      <span className="hidden border-l border-line-strong pl-3 font-display text-[10px] font-semibold tracking-[0.3em] text-muted-foreground uppercase sm:inline">
        Electric
      </span>
    </Link>
  )
}
