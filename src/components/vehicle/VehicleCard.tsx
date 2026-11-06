"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Images } from "lucide-react"

import { categoryOf, paintOptions, photoOptions } from "@/data/catalog"
import { formatPrice, type Vehicle } from "@/data/vehicles"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Thẻ xe: ảnh lớn, đổi màu sơn ngay trên thẻ, phân khúc, 3 thông số chính, giá từ và CTA.
 * `featured` → thẻ rộng 2 cột trên desktop, ảnh lớn hơn.
 */
export function VehicleCard({ vehicle, featured = false }: { vehicle: Vehicle; featured?: boolean }) {
  const paints = paintOptions(vehicle)
  const photos = photoOptions(vehicle)
  const [paint, setPaint] = useState<number | null>(null)
  const current = paint == null ? null : paints[paint]
  const image = current
    ? { src: current.src, alt: `VinFast ${vehicle.name} ${current.label.toLowerCase()}`, fit: current.fit }
    : { src: vehicle.image.src, alt: vehicle.image.alt, fit: "contain" as const }
  const href = `/xe/${vehicle.id}`

  return (
    <article
      className={cn(
        "card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift",
        featured && "md:col-span-2"
      )}
    >
      {/* Ảnh */}
      <div className={cn("stage relative", featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]")}>
        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0">
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"}
            className={cn(
              "animate-in fade-in duration-300",
              image.fit === "cover" ? "object-cover" : "object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]",
              featured && image.fit === "contain" && "md:px-16 md:py-6"
            )}
          />
        </Link>
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold text-foreground shadow-sm">
          {categoryOf(vehicle).label}
        </span>
        {featured && (
          <span className="absolute top-3 right-3 rounded-full bg-primary px-2.5 py-1 text-[12px] font-semibold text-white">
            Nổi bật
          </span>
        )}
        <span className="sr-only">{image.alt}</span>
      </div>

      {/* Nội dung */}
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:p-6")}>
        <p className="text-[13px] font-medium text-muted-foreground">{vehicle.segment}</p>
        <h3 className={cn("heading mt-1 text-2xl", featured && "md:text-[1.75rem]")}>
          <Link href={href} className="hover:text-primary">
            VinFast {vehicle.name}
          </Link>
        </h3>
        {featured && <p className="mt-2 hidden text-[15px] leading-relaxed text-muted-foreground md:line-clamp-2">{vehicle.description}</p>}

        {/* Màu sơn */}
        <div className="mt-4 min-h-[52px]">
          {paints.length > 0 ? (
            <>
              <div role="radiogroup" aria-label={`Màu sơn VinFast ${vehicle.name}`} className="flex flex-wrap gap-2">
                {paints.map((p, i) => {
                  const selected = paint === i
                  return (
                    <button
                      key={p.src}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={p.label}
                      title={p.label}
                      onClick={() => setPaint(selected ? null : i)}
                      className={cn(
                        "grid size-7 place-items-center rounded-full border transition-shadow",
                        selected ? "border-primary ring-2 ring-primary/25" : "border-border hover:border-line-strong"
                      )}
                    >
                      <span className="size-5 rounded-full border border-black/10" style={{ backgroundColor: p.color }} />
                    </button>
                  )
                })}
              </div>
              <p className="mt-1.5 text-[13px] text-muted-foreground" aria-live="polite">
                {current ? current.label : `${paints.length} màu sơn · bấm để xem`}
              </p>
            </>
          ) : (
            <Link href={`${href}#cau-hinh`} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline">
              <Images className="size-4" />
              Xem {photos.length} ảnh thực tế
            </Link>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3">
          {vehicle.highlights.map((h) => (
            <div key={h.label} className="min-w-0">
              <dt className="text-[12px] text-muted-foreground">{h.label}</dt>
              <dd className="mt-0.5 truncate text-[14px] font-semibold tabular">{h.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-4">
          <p className="text-[13px] text-muted-foreground">Giá niêm yết từ</p>
          <p className="heading text-[1.625rem] text-primary tabular">{formatPrice(vehicle.priceFrom)}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button onClick={() => requestLead({ vehicle: vehicle.id, need: "mua-xe" })}>Nhận báo giá</Button>
            <Button asChild variant="outline">
              <Link href={href} aria-label={`Chi tiết VinFast ${vehicle.name}`}>
                Chi tiết
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
