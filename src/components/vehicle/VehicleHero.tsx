import Link from "next/link"
import { Calculator, CalendarCheck, ChevronRight, Phone } from "lucide-react"

import { anchors, isSectionVisible, siteConfig } from "@/config/site"
import { categoryOf } from "@/data/catalog"
import { formatPrice, type Vehicle } from "@/data/vehicles"
import { LeadButton } from "@/components/shared/LeadButton"
import { Button } from "@/components/ui/button"
import { VehicleConfigurator } from "@/components/vehicle/VehicleConfigurator"

/** Đầu trang chi tiết: ảnh + chọn màu bên trái, thông tin bán hàng (giá, thông số, CTA) bên phải. */
export function VehicleHero({ vehicle }: { vehicle: Vehicle }) {
  const category = categoryOf(vehicle)

  return (
    <section id="cau-hinh" className="pt-5 pb-14 md:pt-8 md:pb-20">
      <div className="shell">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">
                Trang chủ
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link href={`/#${anchors.models}`} className="hover:text-primary">
                Dòng xe {category.label}
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="font-medium text-foreground">
              VinFast {vehicle.name}
            </li>
          </ol>
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
          <div className="order-2 lg:order-1">
            <VehicleConfigurator vehicle={vehicle} />
          </div>

          <div className="order-1 lg:order-2">
            <p className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-[13px] font-semibold text-primary">{vehicle.segment}</p>
            <h1 className="heading mt-3 text-[clamp(2rem,4vw,3rem)] leading-tight">VinFast {vehicle.name}</h1>
            <p className="mt-2 text-[17px] font-medium text-foreground/80">{vehicle.tagline}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{vehicle.description}</p>

            <div className="mt-5 rounded-xl border border-primary/20 bg-primary-soft p-4 sm:p-5">
              <p className="text-[13px] font-medium text-primary/80">Giá niêm yết từ</p>
              <p className="heading text-[2rem] leading-tight text-primary tabular">{formatPrice(vehicle.priceFrom)}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{vehicle.priceNote}. Chưa gồm ưu đãi và chi phí lăn bánh.</p>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2">
              {vehicle.highlights.map((h) => (
                <div key={h.label} className="rounded-lg border border-border bg-card px-3 py-2.5">
                  <dt className="text-[12px] text-muted-foreground">{h.label}</dt>
                  <dd className="mt-0.5 text-[15px] font-bold tabular">{h.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <LeadButton size="lg" prefill={{ vehicle: vehicle.id, need: "mua-xe" }}>
                Nhận báo giá
              </LeadButton>
              <LeadButton size="lg" variant="outline" prefill={{ vehicle: vehicle.id, need: "lai-thu" }}>
                <CalendarCheck />
                Đăng ký lái thử
              </LeadButton>
              {isSectionVisible(anchors.finance) && (
                <Button asChild size="lg" variant="ghost" className="border border-transparent hover:border-border">
                  <a href={`#${anchors.finance}`}>
                    <Calculator />
                    Tính trả góp
                  </a>
                </Button>
              )}
              <Button asChild size="lg" variant="ghost" className="border border-transparent hover:border-border">
                <a href={`tel:${siteConfig.hotline.tel}`}>
                  <Phone />
                  {siteConfig.hotline.display}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
