"use client"

import Image from "next/image"
import { useState } from "react"

import { paintOptions, photoOptions } from "@/data/catalog"
import { formatCurrency, type Vehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"

/**
 * Bộ chọn màu: bấm ô màu → đổi đúng ảnh màu tương ứng trong vehicles.ts.
 * Ảnh tách nền dùng object-contain, ảnh chụp dùng object-cover (theo trường `fit`).
 * Xe chưa có ảnh màu (VD: VF Wild) hiển thị các góc chụp thực tế thay thế.
 */
export function VehicleConfigurator({ vehicle }: { vehicle: Vehicle }) {
  const paints = paintOptions(vehicle)
  const hasPaints = paints.length > 0
  const options = hasPaints ? paints : photoOptions(vehicle)
  const [active, setActive] = useState(0)
  const current = options[active]

  if (!current) return null

  return (
    <div className="card overflow-hidden">
      <div className="stage relative aspect-[16/10]">
        <Image
          key={current.src}
          src={current.src}
          alt={`VinFast ${vehicle.name} — ${current.label}`}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className={cn("animate-in fade-in duration-300", current.fit === "contain" ? "object-contain p-4 sm:p-8" : "object-cover")}
        />
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold text-muted-foreground shadow-sm tabular">
          {active + 1} / {options.length}
        </span>
      </div>

      <div className="flex flex-col gap-4 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-[13px] text-muted-foreground">{hasPaints ? "Màu ngoại thất" : "Ảnh thực tế"}</p>
          <p className="text-[17px] font-bold" aria-live="polite">
            {current.label}
          </p>
        </div>
        <div role="radiogroup" aria-label={hasPaints ? "Chọn màu sơn" : "Chọn góc nhìn"} className="flex flex-wrap gap-2">
          {options.map((o, i) => (
            <button
              key={o.src}
              type="button"
              role="radio"
              aria-checked={i === active}
              aria-label={o.label}
              title={o.label}
              onClick={() => setActive(i)}
              className={cn(
                "relative size-10 shrink-0 rounded-full border p-1 transition-shadow",
                i === active ? "border-primary ring-2 ring-primary/25" : "border-border hover:border-line-strong"
              )}
            >
              {o.color ? (
                <span className="block size-full rounded-full border border-black/10" style={{ backgroundColor: o.color }} />
              ) : (
                <span className="relative block size-full overflow-hidden rounded-full">
                  <Image src={o.src} alt="" fill sizes="40px" className="object-cover" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {hasPaints && (
        <p className="border-t border-border bg-surface/60 px-4 py-2.5 text-[12px] text-muted-foreground sm:px-5">
          {vehicle.premiumPaintFee
            ? `Màu nhóm nâng cao phụ phí + ${formatCurrency(vehicle.premiumPaintFee)} — tư vấn viên xác nhận khi báo giá.`
            : "Phụ phí màu nâng cao (nếu có): liên hệ để được xác nhận."}
        </p>
      )}
    </div>
  )
}
