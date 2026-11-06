import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { anchors } from "@/config/site"
import { offersBanner } from "@/data/marketing"
import { OFFERS_DISCLAIMER, offers, type Offer } from "@/data/offers"
import { cn } from "@/lib/utils"
import { LeadButton } from "@/components/shared/LeadButton"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeader } from "@/components/shared/SectionHeader"

/** Ưu đãi kiểu editorial trên nền giấy: con số lớn, bố cục bất đối xứng, dải banner ngang. */
export function OffersSection() {
  const [lead, ...rest] = offers

  return (
    <section id={anchors.offers} className="theme-paper section-pad">
      <div className="shell">
        <SectionHeader
          index="02"
          kicker="Ưu đãi"
          title={<>Lên xe điện, nhẹ hơn bạn nghĩ.</>}
          intro={OFFERS_DISCLAIMER}
        />

        <div className="mt-14 grid grid-cols-1 gap-px bg-border md:mt-20 lg:grid-cols-12">
          {lead && <OfferBlock offer={lead} featured className="lg:col-span-7 lg:row-span-2" />}
          {rest.map((o, i) => (
            <OfferBlock key={o.id} offer={o} className={cn("lg:col-span-5", i === 2 && "lg:col-span-12")} wide={i === 2} />
          ))}
        </div>
      </div>

      {/* Banner ngang */}
      <Reveal className="shell mt-16 md:mt-24">
        <div className="relative isolate overflow-hidden bg-night text-[#f5f5f2]">
          <Image
            src={offersBanner.src}
            alt={offersBanner.alt}
            fill
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="-z-10 object-cover opacity-55"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/70 to-transparent" />
          <div className="grid gap-8 p-8 sm:p-12 md:grid-cols-[1.3fr_1fr] md:items-end md:p-16">
            <p className="display text-[clamp(2rem,4.4vw,3.75rem)] text-balance">
              Ưu đãi nào hợp với bạn? Hỏi trực tiếp, nhận câu trả lời trong ngày.
            </p>
            <div className="md:justify-self-end">
              <LeadButton size="lg" className="bg-volt text-night hover:bg-[#f5f5f2] hover:text-night" prefill={{ need: "mua-xe" }}>
                Nhận tư vấn ưu đãi
                <ArrowUpRight />
              </LeadButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function OfferBlock({ offer, featured, wide, className }: { offer: Offer; featured?: boolean; wide?: boolean; className?: string }) {
  return (
    <Reveal className={cn("flex flex-col bg-background p-7 sm:p-10", featured && "lg:p-14", className)}>
      <article className={cn("flex h-full flex-col", wide && "lg:grid lg:grid-cols-12 lg:gap-10")}>
        <div className={cn(wide && "lg:col-span-5")}>
          <p
            className={cn(
              "display tabular",
              featured ? "text-[clamp(5rem,14vw,11rem)]" : "text-[clamp(3.5rem,8vw,5.5rem)]"
            )}
          >
            {offer.headline.value}
          </p>
          <p className="kicker mt-3">{offer.headline.caption}</p>
          <h3 className={cn("mt-6 font-display font-bold tracking-[-0.02em] text-balance", featured ? "text-3xl md:text-4xl" : "text-2xl")}>
            {offer.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offer.eligibility}</p>
        </div>

        <div className={cn("mt-8 flex flex-1 flex-col", wide && "lg:col-span-7 lg:mt-0")}>
          <dl className="border-t border-line-strong">
            {offer.tiers.map((t) => (
              <div key={t.models} className="flex items-baseline justify-between gap-6 border-b border-border py-3.5">
                <dt className="text-sm">{t.models}</dt>
                <dd className="shrink-0 font-display text-sm font-bold tabular">{t.value}</dd>
              </div>
            ))}
          </dl>
          {offer.note && <p className="mt-3 text-xs text-muted-foreground">{offer.note}</p>}
          <div className="mt-auto pt-8">
            <LeadButton variant="link" prefill={{ need: "mua-xe" }}>
              Hỏi về ưu đãi này
              <ArrowUpRight />
            </LeadButton>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
