import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

/** Logo chữ VinFast (kế thừa, màu đen gốc) + nhãn địa phương. `invert` cho nền tối. */
export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link href="/" aria-label="VinFast Ninh Bình — về trang chủ" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/brand/vinfast-wordmark.png"
        alt="VinFast"
        width={112}
        height={13}
        className={cn("h-auto w-[104px] md:w-[118px]", invert && "invert")}
        preload
      />
      <span
        className={cn(
          "rounded-md px-2 py-1 text-[11px] leading-none font-semibold whitespace-nowrap",
          invert ? "bg-white/10 text-white" : "bg-primary-soft text-primary"
        )}
      >
        Ninh Bình
      </span>
    </Link>
  )
}
