import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { indexLabel } from "@/data/catalog"
import { formatPrice, type Vehicle } from "@/data/vehicles"

/**
 * Một hàng trong danh mục xe. Cả hàng là một liên kết tới /xe/[id].
 * Desktop: số · tên khổng lồ · thông số · giá · ảnh trượt nhẹ khi hover.
 * Mobile: xếp dọc — ảnh trên, thông tin dưới.
 */
export function ModelRow({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/xe/${vehicle.id}`}
      className="group relative isolate grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-5 py-8 transition-colors md:gap-x-8 md:py-10 lg:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.3fr)] lg:py-6"
    >
      {/* Nền sáng nhẹ khi hover, tràn ra hai bên */}
      <span aria-hidden className="absolute inset-y-0 -inset-x-3 -z-10 bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:-inset-x-6" />

      <span className="self-start pt-2 font-display text-[12px] font-semibold text-primary tabular lg:self-center lg:pt-0">
        {indexLabel(vehicle)}
      </span>

      <div className="min-w-0">
        <p className="kicker mb-2">{vehicle.segment}</p>
        <h3 className="display text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[0.9] transition-colors duration-300 group-hover:text-primary">
          {vehicle.name}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">{vehicle.tagline}</p>
      </div>

      <div className="col-span-2 order-last grid grid-cols-[1fr_auto] items-end gap-4 lg:order-none lg:col-span-1 lg:grid-cols-1 lg:items-start">
        <dl className="grid grid-cols-3 gap-3 lg:gap-4">
          {vehicle.highlights.map((h) => (
            <div key={h.label}>
              <dt className="text-[11px] text-muted-foreground">{h.label}</dt>
              <dd className="mt-1 text-[13px] font-semibold tabular md:text-sm">{h.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-end gap-4 lg:justify-between">
          <p className="hidden text-sm text-muted-foreground sm:block lg:block">
            Giá từ <span className="font-display text-xl font-bold text-foreground tabular">{formatPrice(vehicle.priceFrom)}</span>
          </p>
          <span className="inline-flex size-11 shrink-0 items-center justify-center border border-line-strong transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="size-4" />
            <span className="sr-only">Khám phá {vehicle.name}</span>
          </span>
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <div className="relative aspect-[1200/600] w-full transition-transform duration-700 ease-editorial group-hover:translate-x-3 group-hover:scale-[1.03]">
          <Image
            src={vehicle.image.src}
            alt={vehicle.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-contain"
          />
        </div>
        <p className="mt-1 text-right text-sm text-muted-foreground sm:hidden">
          Giá từ <span className="font-display text-lg font-bold text-foreground tabular">{formatPrice(vehicle.priceFrom)}</span>
        </p>
      </div>
    </Link>
  )
}
