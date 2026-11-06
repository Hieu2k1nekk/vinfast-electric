"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Menu, Phone, X } from "lucide-react"

import { navItems, siteConfig } from "@/config/site"
import { requestLead } from "@/lib/lead-events"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FacebookIcon, ZaloIcon } from "@/components/shared/SocialIcons"
import { Logo } from "@/components/shared/Logo"

/** Menu toàn màn hình cho mobile & tablet: liên kết cỡ lớn, đánh số, kèm liên hệ nhanh. */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Mở menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="gap-0 border-0 bg-night p-0 data-[side=top]:h-dvh"
      >
        <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-border">
          <Logo />
          <SheetClose asChild>
            <Button variant="outline" size="icon-sm" aria-label="Đóng menu">
              <X />
            </Button>
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Điều hướng tới các phần của trang</SheetDescription>

        <nav aria-label="Điều hướng trên di động" className="shell flex-1 overflow-y-auto py-6">
          <ol>
            {navItems.map((item, i) => (
              <li key={item.id} className="border-b border-border">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-5 font-display text-[clamp(1.75rem,8vw,2.75rem)] leading-none font-bold tracking-[-0.03em] transition-colors active:text-primary"
                >
                  <span className="w-7 text-[12px] font-semibold tracking-normal text-primary tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>

          <Button
            size="lg"
            className="mt-8 w-full"
            onClick={() => {
              setOpen(false)
              // Đợi sheet đóng để thanh cuộn của trang được trả lại rồi mới cuộn tới form.
              window.setTimeout(() => requestLead({ need: "lai-thu" }), 320)
            }}
          >
            Đăng ký lái thử
            <ArrowUpRight />
          </Button>
        </nav>

        <div className="shell grid shrink-0 grid-cols-3 border-t border-border pb-[env(safe-area-inset-bottom)]">
          <a href={`tel:${siteConfig.hotline.tel}`} className="flex flex-col items-center gap-1.5 py-4 text-[12px] text-muted-foreground">
            <Phone className="size-5 text-foreground" />
            Gọi
          </a>
          <a
            href={siteConfig.social.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 border-x border-border py-4 text-[12px] text-muted-foreground"
          >
            <ZaloIcon className="size-5 text-foreground [--zalo-text:#0e0f12]" />
            Zalo
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 py-4 text-[12px] text-muted-foreground"
          >
            <FacebookIcon className="size-5 text-foreground" />
            Facebook
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
