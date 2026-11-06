import { CalendarClock, MessageCircleQuestion, Tag } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { OFFERS_DISCLAIMER, offers, type Offer } from "@/data/offers"
import { LeadButton } from "@/components/shared/LeadButton"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Button } from "@/components/ui/button"

/** Ưu đãi: banner tổng quan + thẻ chương trình có điều kiện, mức ưu đãi và thời hạn rõ ràng. */
export function OffersSection() {
  return (
    <section id={anchors.offers} className="section-pad bg-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Ưu đãi"
          title="Chương trình ưu đãi đang áp dụng"
          intro="Mỗi chương trình có điều kiện riêng. Gửi thông tin để được kiểm tra bạn thuộc nhóm nào và mức ưu đãi cụ thể cho dòng xe bạn chọn."
        />

        {/* Banner */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-6 rounded-2xl bg-primary p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">
                <Tag className="size-3.5" />
                {offers.length} chương trình
              </p>
              <p className="heading mt-3 text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-balance">
                Ưu đãi đến 9% giá niêm yết (MSRP) cho khách hàng đủ điều kiện
              </p>
              <p className="mt-2 text-[15px] text-white/80">
                Áp dụng cho nhóm Công an – Bộ đội, nhân viên VN POST và khách đổi xe xăng sang điện. Mức cụ thể tuỳ dòng xe.
              </p>
            </div>
            <div className="grid shrink-0 gap-2 sm:grid-cols-2 md:grid-cols-1">
              <LeadButton size="lg" variant="light" prefill={{ need: "mua-xe" }}>
                Kiểm tra ưu đãi của tôi
              </LeadButton>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <a href={`tel:${siteConfig.hotline.tel}`}>Gọi {siteConfig.hotline.display}</a>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>

        <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">{OFFERS_DISCLAIMER}</p>
      </div>
    </section>
  )
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Reveal className="card flex flex-col p-6 sm:p-7">
      <article className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="heading text-xl leading-snug text-balance">{offer.title}</h3>
          <div className="shrink-0 rounded-lg bg-primary-soft px-3 py-2 text-right">
            <p className="heading text-2xl leading-none text-primary tabular">{offer.headline.value}</p>
            <p className="mt-1 text-[11px] font-medium text-primary/80">{offer.headline.caption}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[13px] font-semibold text-foreground">Điều kiện</p>
          <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{offer.eligibility}</p>
        </div>

        <dl className="mt-4 overflow-hidden rounded-lg border border-border">
          {offer.tiers.map((t) => (
            <div key={t.models} className="flex items-baseline justify-between gap-4 border-b border-border px-4 py-2.5 last:border-b-0 odd:bg-surface/60">
              <dt className="text-[14px]">{t.models}</dt>
              <dd className="shrink-0 text-[14px] font-bold tabular">{t.value}</dd>
            </div>
          ))}
        </dl>
        {offer.note && <p className="mt-3 text-[13px] text-muted-foreground">{offer.note}</p>}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <p className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <CalendarClock className="size-4 shrink-0" />
            {offer.validUntil ? (
              <>
                Thời hạn: <span className="font-semibold text-foreground">đến {offer.validUntil}</span>
              </>
            ) : (
              "Thời hạn: liên hệ để xác nhận"
            )}
          </p>
          <LeadButton variant="outline" size="sm" prefill={{ need: "mua-xe" }}>
            <MessageCircleQuestion />
            Hỏi ưu đãi này
          </LeadButton>
        </div>
      </article>
    </Reveal>
  )
}
