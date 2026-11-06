"use client"

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { ZaloIcon } from "@/components/shared/SocialIcons"

/**
 * Thanh liên hệ: dính đáy trên mobile (Gọi · Zalo · Lái thử),
 * trên desktop thu gọn thành cột dọc nhỏ bên phải, chỉ hiện sau khi cuộn qua màn đầu
 * (để không che nội dung hero).
 */
export function ContactDock() {
  const [pastFold, setPastFold] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1fr_1.4fr] border-t border-border bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <a href={`tel:${siteConfig.hotline.tel}`} className="flex h-14 items-center justify-center gap-2 font-display text-[12px] font-semibold tracking-[0.08em] uppercase">
          <Phone className="size-4 text-primary" />
          Gọi
        </a>
        <a
          href={siteConfig.social.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 items-center justify-center gap-2 border-x border-border font-display text-[12px] font-semibold tracking-[0.08em] uppercase"
        >
          <ZaloIcon className="size-5 text-primary [--zalo-text:#0e0f12]" />
          Zalo
        </a>
        <button
          type="button"
          onClick={() => requestLead({ need: "lai-thu" })}
          className="h-14 bg-primary font-display text-[12px] font-semibold tracking-[0.08em] text-primary-foreground uppercase"
        >
          Lái thử
        </button>
      </div>

      <div
        inert={!pastFold}
        className={cn(
          "fixed right-5 bottom-6 z-30 hidden flex-col border border-border bg-night/90 backdrop-blur-xl transition-[opacity,translate] duration-500 md:flex",
          pastFold ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <a
          href={siteConfig.social.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo"
          className="grid size-12 place-items-center transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ZaloIcon className="size-6 [--zalo-text:#0e0f12]" />
        </a>
        <a
          href={`tel:${siteConfig.hotline.tel}`}
          aria-label={`Gọi hotline ${siteConfig.hotline.display}`}
          className="grid size-12 place-items-center border-t border-border transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Phone className="size-5" />
        </a>
      </div>
    </>
  )
}
