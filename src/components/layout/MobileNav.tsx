"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Menu, Phone, X } from "lucide-react"

import { navItems, siteConfig } from "@/config/site"
import { requestLead, type LeadPrefill } from "@/lib/lead-events"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ZaloIcon } from "@/components/shared/SocialIcons"
import { Logo } from "@/components/shared/Logo"

/** Menu trượt từ phải cho mobile & tablet: liên kết + CTA + liên hệ nhanh. */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  function lead(prefill: LeadPrefill) {
    setOpen(false)
    // Đợi sheet đóng để thanh cuộn của trang được trả lại rồi mới cuộn tới form.
    window.setTimeout(() => requestLead(prefill), 320)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Mở menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-[min(88vw,380px)] gap-0 bg-white p-0">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Logo />
          <SheetClose asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Đóng menu">
              <X />
            </Button>
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Điều hướng tới các phần của trang</SheetDescription>

        <nav aria-label="Điều hướng trên di động" className="flex-1 overflow-y-auto px-3 py-3">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[16px] font-medium transition-colors hover:bg-accent active:text-primary"
                >
                  {item.label}
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-2 px-2">
            <Button size="lg" onClick={() => lead({ need: "mua-xe" })}>
              Nhận báo giá
            </Button>
            <Button size="lg" variant="outline" onClick={() => lead({ need: "lai-thu" })}>
              Đăng ký lái thử
            </Button>
          </div>
        </nav>

        <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a href={`tel:${siteConfig.hotline.tel}`} className="flex items-center justify-center gap-2 rounded-lg bg-ink py-3 text-sm font-semibold text-white">
            <Phone className="size-4" />
            {siteConfig.hotline.display}
          </a>
          <a
            href={siteConfig.social.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-soft py-3 text-sm font-semibold text-primary"
          >
            <ZaloIcon className="size-5 [--zalo-text:#e8f0fe]" />
            Chat Zalo
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
