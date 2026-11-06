import { ArrowUpRight } from "lucide-react"

import { paintOptions } from "@/data/catalog"
import { PRICE_DISCLAIMER, formatCurrency, formatPrice, type Vehicle } from "@/data/vehicles"
import { LeadButton } from "@/components/shared/LeadButton"

/** Thông số nổi bật, phiên bản, giá & phụ phí màu — dữ liệu lấy hoàn toàn từ vehicles.ts. */
export function SpecSheet({ vehicle }: { vehicle: Vehicle }) {
  const paints = paintOptions(vehicle)

  return (
    <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-12">
      <div className="bg-background p-6 sm:p-10 lg:col-span-7">
        <p className="kicker">Thông số nổi bật</p>
        <dl className="mt-8 grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {vehicle.highlights.map((h) => (
            <div key={h.label} className="bg-background py-5 sm:px-5 sm:first:pl-0">
              <dt className="text-sm text-muted-foreground">{h.label}</dt>
              <dd className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] leading-none font-bold tracking-[-0.03em] tabular">{h.value}</dd>
            </div>
          ))}
        </dl>

        <dl className="mt-10 border-t border-line-strong">
          <Row label="Phân khúc" value={vehicle.segment} />
          <Row label="Phiên bản" value={vehicle.versions?.length ? vehicle.versions.join(" · ") : "Liên hệ để biết phiên bản đang phân phối"} />
          <Row label="Màu sơn" value={paints.length ? `${paints.length} lựa chọn` : "Liên hệ"} />
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Thông số theo công bố của VinFast; có thể khác nhau giữa các phiên bản. Thông số kỹ thuật đầy đủ: liên hệ chuyên viên.
        </p>
      </div>

      <div className="flex flex-col bg-surface p-6 sm:p-10 lg:col-span-5">
        <p className="kicker">Bảng giá</p>
        <p className="display mt-6 text-[clamp(3rem,7vw,5rem)] tabular">{formatPrice(vehicle.priceFrom)}</p>
        <p className="mt-2 text-sm text-muted-foreground">{vehicle.priceNote}</p>

        <dl className="mt-8 border-t border-line-strong">
          {vehicle.priceFrom !== null && <Row label="Giá niêm yết từ" value={formatCurrency(vehicle.priceFrom)} />}
          <Row label="Phụ phí màu nâng cao" value={vehicle.premiumPaintFee ? `+ ${formatCurrency(vehicle.premiumPaintFee)}` : "Liên hệ"} />
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{PRICE_DISCLAIMER}</p>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <LeadButton size="lg" prefill={{ vehicle: vehicle.id, need: "mua-xe" }}>
            Nhận báo giá lăn bánh
            <ArrowUpRight />
          </LeadButton>
          <LeadButton size="lg" variant="outline" prefill={{ vehicle: vehicle.id, need: "lai-thu" }}>
            Đặt lịch lái thử
          </LeadButton>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-border py-3.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-[15px] font-semibold tabular">{value}</dd>
    </div>
  )
}
