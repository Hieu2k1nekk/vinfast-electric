"use client"

import { Calculator, CalendarCheck, CarFront, Phone } from "lucide-react"

import { anchors, isSectionVisible, siteConfig } from "@/config/site"
import { formatPrice, vehicles } from "@/data/vehicles"
import { requestLead } from "@/lib/lead-events"

const minPrice = Math.min(...vehicles.map((v) => v.priceFrom ?? Infinity))

/** Thanh thông tin nhanh nằm đè lên mép dưới banner: giá từ, trả góp, lái thử, hotline. */
export function QuickBar() {
  const itemClass =
    "group flex items-center gap-2.5 rounded-lg p-2.5 text-left transition-colors hover:bg-accent sm:gap-3 md:p-4"
  const iconClass =
    "hidden size-11 shrink-0 sm:grid place-items-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white"

  return (
    <div className="shell relative z-10 lg:-mt-14">
      <div className="card -mt-2 grid grid-cols-2 gap-1 p-1.5 sm:mt-0 sm:p-2 lg:grid-cols-4">
        <a href={`#${anchors.models}`} className={itemClass}>
          <span className={iconClass}>
            <CarFront className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] text-muted-foreground sm:text-[13px]">{vehicles.length} dòng xe · giá niêm yết từ</span>
            <span className="block text-[14px] font-bold text-foreground sm:text-base tabular">{formatPrice(minPrice)}</span>
          </span>
        </a>
        {isSectionVisible(anchors.finance) && (
          <a href={`#${anchors.finance}`} className={itemClass}>
            <span className={iconClass}>
              <Calculator className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] text-muted-foreground sm:text-[13px]">Ước tính khoản vay</span>
              <span className="block text-[14px] font-bold text-foreground sm:text-base">Tính trả góp hàng tháng</span>
            </span>
          </a>
        )}
        <button type="button" onClick={() => requestLead({ need: "lai-thu" })} className={itemClass}>
          <span className={iconClass}>
            <CalendarCheck className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] text-muted-foreground sm:text-[13px]">Showroom Hoa Lư</span>
            <span className="block text-[14px] font-bold text-foreground sm:text-base">Đăng ký lái thử</span>
          </span>
        </button>
        <a href={`tel:${siteConfig.hotline.tel}`} className={itemClass}>
          <span className={iconClass}>
            <Phone className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] text-muted-foreground sm:text-[13px]">Hotline tư vấn</span>
            <span className="block text-[14px] font-bold text-foreground sm:text-base tabular">{siteConfig.hotline.display}</span>
          </span>
        </a>
      </div>
    </div>
  )
}
