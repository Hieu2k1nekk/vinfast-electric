import { paintOptions } from "@/data/catalog"
import { PRICE_DISCLAIMER, formatCurrency, formatPrice, type Vehicle } from "@/data/vehicles"
import { LeadButton } from "@/components/shared/LeadButton"

/** Thông số nổi bật, phiên bản, giá & phụ phí màu — dữ liệu lấy hoàn toàn từ vehicles.ts. */
export function SpecSheet({ vehicle }: { vehicle: Vehicle }) {
  const paints = paintOptions(vehicle)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-6">
      <div className="card p-5 sm:p-7">
        <h3 className="text-[16px] font-bold">Thông số nổi bật</h3>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {vehicle.highlights.map((h) => (
            <div key={h.label} className="rounded-lg bg-surface p-4">
              <dt className="text-[13px] text-muted-foreground">{h.label}</dt>
              <dd className="heading mt-1 text-2xl tabular">{h.value}</dd>
            </div>
          ))}
        </dl>

        <dl className="mt-5">
          <Row label="Phân khúc" value={vehicle.segment} />
          <Row label="Phiên bản" value={vehicle.versions?.length ? vehicle.versions.join(" · ") : "Liên hệ để biết phiên bản đang phân phối"} />
          <Row label="Màu sơn" value={paints.length ? `${paints.length} lựa chọn` : "Liên hệ"} />
        </dl>
        <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
          Thông số theo công bố của VinFast; có thể khác nhau giữa các phiên bản. Thông số kỹ thuật đầy đủ: liên hệ tư vấn viên.
        </p>
      </div>

      <div className="card flex flex-col p-5 sm:p-7">
        <h3 className="text-[16px] font-bold">Bảng giá</h3>
        <p className="mt-3 text-[13px] text-muted-foreground">Giá niêm yết từ</p>
        <p className="heading text-[2.25rem] leading-tight text-primary tabular">{formatPrice(vehicle.priceFrom)}</p>
        <p className="mt-1 text-[13px] text-muted-foreground">{vehicle.priceNote}</p>

        <dl className="mt-4">
          {vehicle.priceFrom !== null && <Row label="Giá niêm yết từ" value={formatCurrency(vehicle.priceFrom)} />}
          <Row label="Phụ phí màu nâng cao" value={vehicle.premiumPaintFee ? `+ ${formatCurrency(vehicle.premiumPaintFee)}` : "Liên hệ"} />
        </dl>
        <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">{PRICE_DISCLAIMER}</p>

        <div className="mt-auto grid gap-2 pt-6">
          <LeadButton size="lg" prefill={{ vehicle: vehicle.id, need: "mua-xe" }}>
            Nhận báo giá lăn bánh
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
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-[14px] text-muted-foreground">{label}</dt>
      <dd className="text-right text-[15px] font-semibold tabular">{value}</dd>
    </div>
  )
}
