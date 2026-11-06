"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { heroSlides, type HeroSlide } from "@/data/marketing"
import { formatPrice, getVehicle } from "@/data/vehicles"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const AUTOPLAY_MS = 7000

/**
 * Banner đầu trang (2–3 slide). Mọi slide đều có sẵn trong HTML (slide đầu là LCP),
 * chỉ slide đang chọn hiển thị. Tự chuyển 7 giây, dừng khi rê chuột / focus / người dùng tắt chuyển động.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = heroSlides.length

  const go = useCallback((i: number) => setIndex((i + count) % count), [count])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (paused || reduced || count < 2) return
    const t = window.setTimeout(() => go(index + 1), AUTOPLAY_MS)
    return () => window.clearTimeout(t)
  }, [index, paused, reduced, count, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Banner giới thiệu"
      className="relative bg-white lg:bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1)
        else if (e.key === "ArrowLeft") go(index - 1)
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const start = touchX.current
        const end = e.changedTouches[0]?.clientX
        touchX.current = null
        if (start == null || end == null || Math.abs(end - start) < 50) return
        go(end < start ? index + 1 : index - 1)
      }}
    >
      <div className="relative lg:h-[min(640px,calc(100svh-112px))] lg:min-h-[540px]">
        {heroSlides.map((slide, i) => (
          <Slide key={slide.id} slide={slide} active={i === index} first={i === 0} position={`${i + 1} / ${count}`} />
        ))}

        {/* Điều khiển */}
        {count > 1 && (
          <div className="shell relative z-10 flex items-center justify-center gap-3 pb-6 lg:absolute lg:inset-x-0 lg:bottom-20 lg:justify-start lg:pb-0">
            <Button variant="outline" size="icon-sm" className="hidden rounded-full lg:inline-flex lg:border-white/30 lg:bg-white/10 lg:text-white lg:hover:bg-white lg:hover:text-ink" aria-label="Banner trước" onClick={() => go(index - 1)}>
              <ChevronLeft />
            </Button>
            <div className="flex items-center gap-2" role="group" aria-label="Chọn banner">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Banner ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className="grid h-6 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-primary lg:bg-white" : "w-3 bg-line-strong lg:bg-white/40"
                    )}
                  />
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon-sm" className="hidden rounded-full lg:inline-flex lg:border-white/30 lg:bg-white/10 lg:text-white lg:hover:bg-white lg:hover:text-ink" aria-label="Banner sau" onClick={() => go(index + 1)}>
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function Slide({ slide, active, first, position }: { slide: HeroSlide; active: boolean; first: boolean; position: string }) {
  const vehicle = slide.vehicleId ? getVehicle(slide.vehicleId) : undefined
  const photo = slide.kind === "photo"
  const Title = first ? "h1" : "h2"
  const isAnchor = slide.primary.href.startsWith("#")

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={position}
      aria-hidden={!active}
      inert={!active}
      className={cn(
        "lg:absolute lg:inset-0",
        active ? "block animate-in fade-in duration-500" : "hidden lg:block lg:pointer-events-none lg:opacity-0 lg:transition-opacity lg:duration-500"
      )}
    >
      {/* Ảnh */}
      <div className={cn("relative aspect-[16/10] overflow-hidden sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto", !photo && "stage")}>
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          preload={first}
          loading={first ? undefined : "eager"}
          sizes="100vw"
          className={cn(photo ? "object-cover" : "object-contain px-4 pt-6 lg:left-[40%] lg:w-[58%] lg:px-0 lg:py-16")}
          style={photo && slide.focus ? { objectPosition: slide.focus } : undefined}
        />
        {photo && (
          <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-ink/85 via-ink/45 to-transparent lg:block" />
        )}
      </div>

      {/* Nội dung */}
      <div className="shell relative lg:flex lg:h-full lg:items-center">
        <div className={cn("max-w-xl py-6 lg:py-0 lg:pb-16", photo ? "lg:text-white" : "text-foreground")}>
          <p
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-[13px] font-semibold",
              photo ? "bg-primary-soft text-primary lg:bg-white/15 lg:text-white" : "bg-primary-soft text-primary"
            )}
          >
            {slide.eyebrow}
          </p>
          <Title className="heading mt-4 text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.08] text-balance">{slide.title}</Title>
          <p className={cn("mt-4 max-w-lg text-[15px] leading-relaxed md:text-[17px]", photo ? "text-muted-foreground lg:text-white/85" : "text-muted-foreground")}>
            {slide.text}
          </p>
          {vehicle && (
            <p className={cn("mt-5 text-[15px]", photo ? "lg:text-white/85" : "")}>
              Giá niêm yết từ{" "}
              <span className={cn("heading text-2xl tabular md:text-3xl", photo ? "text-primary lg:text-white" : "text-primary")}>
                {formatPrice(vehicle.priceFrom)}
              </span>
            </p>
          )}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex">
            <Button asChild size="lg">
              {isAnchor ? (
                <a href={slide.primary.href}>
                  {slide.primary.label}
                  <ArrowRight />
                </a>
              ) : (
                <Link href={slide.primary.href}>
                  {slide.primary.label}
                  <ArrowRight />
                </Link>
              )}
            </Button>
            <Button size="lg" variant="outline"className={cn(photo && "lg:border-transparent lg:bg-white lg:text-ink lg:hover:bg-white/90 lg:hover:text-ink")} onClick={() => requestLead(slide.secondary.lead)}>
              {slide.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
