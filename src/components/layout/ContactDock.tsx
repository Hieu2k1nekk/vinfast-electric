"use client"

import { useEffect, useState } from "react"
import { CalendarCheck, FileText, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { ZaloIcon } from "@/components/shared/SocialIcons"

/**
 * Liên hệ nhanh.
 * Mobile: thanh cố định đáy màn hình — Gọi ngay · Nhận báo giá · Lái thử.
 * Desktop: nút Zalo + Gọi tròn ở góc phải dưới, hiện sau khi cuộn qua hero.
 */
export function ContactDock() {
  const [pastFold, setPastFold] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.5)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-10px_rgb(15_23_42/0.25)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`tel:${siteConfig.hotline.tel}`}
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg bg-ink text-[12px] font-semibold text-white"
          >
            <Phone className="size-4" />
            Gọi ngay
          </a>
          <button
            type="button"
            onClick={() => requestLead({ need: "mua-xe" })}
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg bg-primary text-[12px] font-semibold text-white"
          >
            <FileText className="size-4" />
            Nhận báo giá
          </button>
          <button
            type="button"
            onClick={() => requestLead({ need: "lai-thu" })}
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg border border-primary/30 bg-primary-soft text-[12px] font-semibold text-primary"
          >
            <CalendarCheck className="size-4" />
            Lái thử
          </button>
        </div>
      </div>

      <div
        inert={!pastFold}
        className={cn(
          "fixed right-5 bottom-6 z-30 hidden flex-col gap-3 transition-[opacity,translate] duration-300 md:flex",
          pastFold ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <a
          href={siteConfig.social.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo"
          className="grid size-13 place-items-center rounded-full bg-[#0068ff] text-white shadow-lift transition-transform hover:scale-105"
        >
          <ZaloIcon className="size-7 [--zalo-text:#0068ff]" />
        </a>
        <a
          href={`tel:${siteConfig.hotline.tel}`}
          aria-label={`Gọi hotline ${siteConfig.hotline.display}`}
          className="grid size-13 place-items-center rounded-full bg-primary text-white shadow-lift transition-transform hover:scale-105"
        >
          <Phone className="size-5" />
        </a>
      </div>
    </>
  )
}
