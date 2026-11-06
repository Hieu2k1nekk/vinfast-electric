"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { navItems } from "@/config/site"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/MobileNav"

/** Header trong suốt ở đầu trang, chuyển sang nền tối khi cuộn. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial",
        scrolled ? "border-border bg-night/85 backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Logo />

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="group relative font-display text-[12px] font-semibold tracking-[0.14em] text-foreground/80 uppercase transition-colors hover:text-foreground"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-editorial group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => requestLead({ need: "lai-thu" })}>
            Lái thử
            <ArrowUpRight />
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
