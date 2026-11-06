"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { AnimatePresence, m } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { heroCopy } from "@/data/marketing"
import { categoryOf, indexLabel } from "@/data/catalog"
import { formatPrice, vehicles } from "@/data/vehicles"
import { requestLead } from "@/lib/lead-events"
import { Button } from "@/components/ui/button"

const ease = [0.16, 1, 0.3, 1] as const

/** Cỡ chữ tên xe khổng lồ — tên dài thì nhỏ lại để không tràn ngang. */
function megaSize(name: string) {
  return `min(${Math.min(19, 132 / name.length).toFixed(2)}vw, 17rem, 24svh)`
}

export function HeroShowcase() {
  const initial = Math.max(0, vehicles.findIndex((v) => v.id === heroCopy.defaultModel))
  const [index, setIndex] = useState(initial)
  const tabsRef = useRef<HTMLDivElement>(null)
  const vehicle = vehicles[index]

  function select(i: number, focus = false) {
    const next = (i + vehicles.length) % vehicles.length
    setIndex(next)
    const tab = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]
    tab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
    if (focus) tab?.focus()
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") select(index + 1, true)
    else if (e.key === "ArrowLeft") select(index - 1, true)
    else if (e.key === "Home") select(0, true)
    else if (e.key === "End") select(vehicles.length - 1, true)
    else return
    e.preventDefault()
  }

  return (
    <section aria-label="Giới thiệu các dòng xe" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Nền: phong cảnh Ninh Bình mờ tối + quầng sáng xanh dưới sàn */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={heroCopy.backdrop.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-[0.16] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night" />
        <div className="absolute inset-x-0 bottom-[18%] mx-auto h-[38%] max-w-5xl rounded-[50%] bg-volt/10 blur-[120px]" />
      </div>

      <div className="shell flex flex-1 flex-col pt-24 md:pt-28">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-md">
            <h1 className="sr-only">{heroCopy.title}</h1>
            <p className="kicker text-primary">{heroCopy.kicker}</p>
            <p className="mt-4 hidden text-[15px] leading-relaxed text-muted-foreground sm:block">{heroCopy.lead}</p>
          </div>
          <p className="shrink-0 font-display text-[13px] font-semibold tabular" aria-live="polite">
            <span className="text-primary">{indexLabel(vehicle)}</span>
            <span className="text-muted-foreground"> / {String(vehicles.length).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Sân khấu: tên khổng lồ phía sau + ảnh xe tách nền phía trước */}
        <div className="relative mt-6 flex flex-1 flex-col justify-center md:mt-2">
          <div className="relative grid place-items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.p
                key={vehicle.id}
                initial={{ y: "40%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-30%", opacity: 0 }}
                transition={{ duration: 0.8, ease }}
                className="display w-full text-center leading-[0.8] whitespace-nowrap uppercase select-none"
                style={{ fontSize: megaSize(vehicle.name) }}
              >
                <span className="sr-only">VinFast </span>
                {vehicle.name}
              </m.p>
            </AnimatePresence>

            <div className="relative -mt-[9vw] w-full max-w-[1080px] md:-mt-[min(7vw,9svh)] md:max-w-[min(1080px,calc((100svh-540px)*2.14))]">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={vehicle.id}
                  initial={{ x: "18%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-14%", opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="relative aspect-[1200/560]"
                >
                  <Image
                    src={vehicle.image.src}
                    alt={vehicle.image.alt}
                    fill
                    preload={index === initial}
                    sizes="(min-width: 1280px) 1080px, 96vw"
                    className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                  />
                </m.div>
              </AnimatePresence>
              {/* Sàn phản chiếu */}
              <div aria-hidden className="mx-auto h-px w-[86%] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            </div>
          </div>
        </div>

        {/* Thông tin mẫu đang chọn */}
        <div className="mt-6 grid grid-cols-1 gap-6 border-t border-border pt-6 md:mt-5 md:pt-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-4">
            <p className="kicker">{categoryOf(vehicle).label} · {vehicle.segment}</p>
            <p className="mt-2 font-display text-lg font-semibold text-balance md:text-xl">{vehicle.tagline}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 md:col-span-4">
            {vehicle.highlights.map((h) => (
              <div key={h.label}>
                <dt className="text-[11px] text-muted-foreground">{h.label}</dt>
                <dd className="mt-1 font-display text-[15px] font-semibold tabular md:text-base">{h.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
            <p className="text-sm text-muted-foreground">
              Giá từ{" "}
              <span className="font-display text-2xl font-bold text-foreground tabular">{formatPrice(vehicle.priceFrom)}</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Button asChild variant="outline">
                <Link href={`/xe/${vehicle.id}`}>
                  Khám phá
                  <ArrowRight />
                </Link>
              </Button>
              <Button onClick={() => requestLead({ vehicle: vehicle.id, need: "lai-thu" })}>
                Lái thử
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bộ chọn mẫu 01–11 */}
      <div className="mt-8 border-t border-border md:mt-6">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Chọn mẫu xe"
          onKeyDown={onKeyDown}
          className="shell no-scrollbar flex snap-x overflow-x-auto xl:grid xl:grid-cols-11"
        >
          {vehicles.map((v, i) => {
            const active = i === index
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => select(i)}
                className="group relative flex min-w-[112px] shrink-0 snap-start flex-col items-start gap-1 border-r border-border px-4 py-4 text-left transition-colors first:border-l hover:bg-accent xl:min-w-0"
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-primary transition-transform duration-500 ease-editorial ${active ? "scale-x-100" : "scale-x-0"}`}
                />
                <span className={`font-display text-[11px] font-semibold tabular ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-display text-[13px] font-semibold whitespace-nowrap ${active ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                  {v.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
