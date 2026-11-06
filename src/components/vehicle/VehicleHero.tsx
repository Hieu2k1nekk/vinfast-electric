import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { anchors } from "@/config/site"
import { categoryOf, indexLabel } from "@/data/catalog"
import { formatPrice, type Vehicle } from "@/data/vehicles"
import { LeadButton } from "@/components/shared/LeadButton"
import { Button } from "@/components/ui/button"

/** Cỡ chữ tên xe khổng lồ — co lại theo độ dài tên để không tràn ngang. */
function nameSize(name: string) {
  return `min(${Math.min(20, 128 / name.length).toFixed(2)}vw, 15rem)`
}

export function VehicleHero({ vehicle }: { vehicle: Vehicle }) {
  const category = categoryOf(vehicle)

  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-1/2 max-w-5xl rounded-[50%] bg-volt/10 blur-[120px]" />

      <div className="shell">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Trang chủ
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link href={`/#${anchors.models}`} className="hover:text-foreground">
                {category.label}
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="text-foreground">
              {vehicle.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 flex items-center gap-4">
          <span className="font-display text-[13px] font-semibold text-primary tabular">{indexLabel(vehicle)}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden />
          <p className="kicker">{vehicle.segment}</p>
        </div>

        <h1 className="display mt-4 leading-[0.82] whitespace-nowrap" style={{ fontSize: nameSize(vehicle.name) }}>
          <span className="sr-only">VinFast </span>
          {vehicle.name}
        </h1>
      </div>

      <div className="shell -mt-[4vw] md:-mt-[min(5vw,7svh)]">
        {/* Rộng tối đa theo chiều cao màn hình để tên + xe + giá nằm gọn trong màn đầu */}
        <div className="relative ml-auto aspect-[1200/560] w-full md:w-[85%] md:max-w-[min(1100px,calc((100svh-330px)*2.14))]">
          <Image
            src={vehicle.image.src}
            alt={vehicle.image.alt}
            fill
            preload
            sizes="(min-width: 1440px) 1100px, (min-width: 768px) 85vw, 100vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div className="shell grid grid-cols-1 gap-8 border-t border-border py-10 md:grid-cols-12 md:items-end md:py-12">
        <div className="md:col-span-6">
          <p className="font-display text-2xl font-bold tracking-[-0.02em] text-balance md:text-3xl">{vehicle.tagline}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{vehicle.description}</p>
        </div>
        <div className="md:col-span-3">
          <p className="kicker">Giá niêm yết từ</p>
          <p className="mt-2 font-display text-4xl font-bold tabular">{formatPrice(vehicle.priceFrom)}</p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-3">
          <LeadButton size="lg" prefill={{ vehicle: vehicle.id, need: "lai-thu" }}>
            Đăng ký lái thử
          </LeadButton>
          <Button asChild size="lg" variant="outline">
            <a href="#cau-hinh">Chọn màu & xem giá</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
