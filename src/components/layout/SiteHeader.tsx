"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Clock, MapPin, Phone } from "lucide-react"

import { navItems, siteConfig } from "@/config/site"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/MobileNav"
import { FacebookIcon, ZaloIcon } from "@/components/shared/SocialIcons"

/** Thanh thông tin trên cùng (desktop) + header trắng dính đầu trang. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="hidden bg-ink text-[13px] text-white/80 lg:block">
        <div className="shell flex h-10 items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-6">
            <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 hover:text-white">
              <MapPin className="size-3.5 shrink-0 text-[#7aa7ff]" />
              <span className="truncate">{siteConfig.address}</span>
            </a>
            <span className="hidden items-center gap-2 xl:flex">
              <Clock className="size-3.5 shrink-0 text-[#7aa7ff]" />
              {siteConfig.openingHours}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <a href={siteConfig.social.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white">
              <ZaloIcon className="size-4 [--zalo-text:#0f172a]" /> Zalo
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white">
              <FacebookIcon className="size-4" /> Facebook
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow duration-200",
          scrolled ? "border-transparent shadow-[0_4px_20px_-8px_rgb(15_23_42/0.18)]" : "border-border"
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo />

          <nav aria-label="Điều hướng chính" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${siteConfig.hotline.tel}`} className="group hidden items-center gap-2.5 xl:flex" aria-label={`Gọi hotline ${siteConfig.hotline.display}`}>
              <span className="grid size-10 place-items-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Phone className="size-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[12px] text-muted-foreground">Hotline tư vấn</span>
                <span className="block text-[17px] font-bold text-foreground tabular">{siteConfig.hotline.display}</span>
              </span>
            </a>
            <Button asChild variant="outline" size="icon-sm" className="rounded-full xl:hidden">
              <a href={`tel:${siteConfig.hotline.tel}`} aria-label={`Gọi hotline ${siteConfig.hotline.display}`}>
                <Phone />
              </a>
            </Button>
            <Button className="hidden sm:inline-flex" onClick={() => requestLead({ need: "mua-xe" })}>
              Nhận báo giá
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  )
}
