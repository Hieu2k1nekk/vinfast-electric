"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, m } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { paintOptions, photoOptions } from "@/data/catalog"
import { formatCurrency, formatPrice, type Vehicle } from "@/data/vehicles"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-12">
      {/* Sân khấu ảnh */}
      <div className="relative overflow-hidden bg-surface lg:col-span-8">
        <div aria-hidden className="absolute inset-x-[10%] bottom-[12%] h-1/3 rounded-[50%] bg-volt/10 blur-[80px]" />
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <AnimatePresence initial={false} mode="popLayout">
            <m.div
              key={current.src}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={current.src}
                alt={`VinFast ${vehicle.name} — ${current.label}`}
                fill
                sizes="(min-width: 1024px) 64vw, 100vw"
                className={current.fit === "contain" ? "object-contain p-4 sm:p-10" : "object-cover"}
              />
            </m.div>
          </AnimatePresence>
        </div>
        <p className="absolute top-5 left-5 font-display text-[12px] font-semibold tabular text-muted-foreground">
          {String(active + 1).padStart(2, "0")} / {String(options.length).padStart(2, "0")}
        </p>
      </div>

      {/* Bảng chọn */}
      <div className="flex flex-col bg-background p-6 sm:p-8 lg:col-span-4 lg:p-10">
        <p className="kicker">{hasPaints ? "Màu ngoại thất" : "Góc nhìn"}</p>
        <p className="mt-3 font-display text-3xl font-bold tracking-[-0.02em]" aria-live="polite">
          {current.label}
        </p>

        <div role="radiogroup" aria-label={hasPaints ? "Chọn màu sơn" : "Chọn góc nhìn"} className="mt-6 flex flex-wrap gap-3">
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
                "relative size-12 shrink-0 rounded-full border border-line-strong p-1 transition-[border-color,transform] duration-300 hover:scale-105",
                i === active && "border-primary ring-1 ring-primary"
              )}
            >
              {o.color ? (
                <span className="block size-full rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255/0.15)]" style={{ backgroundColor: o.color }} />
              ) : (
                <span className="relative block size-full overflow-hidden rounded-full">
                  <Image src={o.src} alt="" fill sizes="48px" className="object-cover" />
                </span>
              )}
            </button>
          ))}
        </div>

        <dl className="mt-8 border-t border-line-strong">
          <div className="flex items-baseline justify-between gap-4 border-b border-border py-4">
            <dt className="text-sm text-muted-foreground">Giá niêm yết từ</dt>
            <dd className="font-display text-2xl font-bold tabular">{formatPrice(vehicle.priceFrom)}</dd>
          </div>
          {hasPaints && (
            <div className="flex items-baseline justify-between gap-4 border-b border-border py-4">
              <dt className="text-sm text-muted-foreground">Phụ phí màu nâng cao</dt>
              <dd className="text-right font-display text-[15px] font-semibold tabular">
                {vehicle.premiumPaintFee ? `+ ${formatCurrency(vehicle.premiumPaintFee)}` : "Liên hệ"}
              </dd>
            </div>
          )}
        </dl>
        {hasPaints && (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Phụ phí chỉ áp dụng cho màu thuộc nhóm nâng cao — chuyên viên xác nhận khi báo giá.
          </p>
        )}

        <div className="mt-auto pt-8">
          <Button size="lg" className="w-full" onClick={() => requestLead({ vehicle: vehicle.id, need: "mua-xe" })}>
            Nhận báo giá {hasPaints ? current.label.toLowerCase() : ""}
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
