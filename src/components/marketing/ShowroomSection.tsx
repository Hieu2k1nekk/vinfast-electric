import Image from "next/image"
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { showroom } from "@/data/marketing"
import { Button } from "@/components/ui/button"
import { LeadButton } from "@/components/shared/LeadButton"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { FacebookIcon, ZaloIcon } from "@/components/shared/SocialIcons"

/**
 * Showroom Ninh Bình. Khi chưa có ảnh showroom thật (showroom.photos rỗng)
 * dùng ảnh phong cảnh Ninh Bình với chú thích trung thực — không giả làm ảnh showroom.
 */
export function ShowroomSection() {
  const realPhoto = showroom.photos[0]
  const main = realPhoto ?? showroom.scenery.main
  const caption = realPhoto ? "Showroom" : "Hoa Lư, Ninh Bình — cách showroom vài phút"

  return (
    <section id={anchors.showroom} className="section-pad">
      <div className="shell">
        <SectionHeader index="04" kicker="Showroom" title={showroom.title} intro={showroom.intro} />

        <div className="mt-14 grid grid-cols-1 gap-px bg-border md:mt-20 lg:grid-cols-12">
          <Reveal className="relative min-h-[320px] overflow-hidden bg-surface sm:min-h-[440px] lg:col-span-7 lg:min-h-[620px]">
            <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
              <p className="kicker text-[#f5f5f2]/80">{caption}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col bg-background p-6 sm:p-10 lg:col-span-5">
            <dl className="divide-y divide-border border-y border-border">
              <InfoLine icon={<MapPin />} label="Địa chỉ">
                <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {siteConfig.address}
                </a>
              </InfoLine>
              <InfoLine icon={<Clock />} label="Giờ mở cửa">
                {siteConfig.openingHours}
              </InfoLine>
              <InfoLine icon={<Phone />} label="Hotline">
                <a href={`tel:${siteConfig.hotline.tel}`} className="font-display text-2xl font-bold tabular hover:text-primary">
                  {siteConfig.hotline.display}
                </a>
              </InfoLine>
            </dl>

            <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border">
              <a
                href={siteConfig.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2 bg-background text-sm font-semibold transition-colors hover:bg-accent [--zalo-text:var(--background)]"
              >
                <ZaloIcon className="size-5" /> Zalo
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2 bg-background text-sm font-semibold transition-colors hover:bg-accent"
              >
                <FacebookIcon className="size-5" /> Facebook
              </a>
            </div>

            <div className="relative mt-8 hidden aspect-[16/9] overflow-hidden sm:block">
              <Image
                src={showroom.scenery.side.src}
                alt={showroom.scenery.side.alt}
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <LeadButton size="lg" className="flex-1" prefill={{ need: "lai-thu" }}>
                Hẹn lái thử
                <ArrowUpRight />
              </LeadButton>
              <Button asChild size="lg" variant="outline" className="flex-1">
                <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer">
                  Chỉ đường
                  <MapPin />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InfoLine({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1.25rem_1fr] gap-x-4 py-5 [&_svg]:size-4 [&_svg]:text-primary">
      <span className="pt-0.5">{icon}</span>
      <div>
        <dt className="kicker">{label}</dt>
        <dd className="mt-1.5 text-[15px] leading-relaxed">{children}</dd>
      </div>
    </div>
  )
}
