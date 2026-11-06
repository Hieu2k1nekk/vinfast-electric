import Image from "next/image"
import { CalendarCheck, Clock, MapPin, Navigation, Phone } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { showroom } from "@/data/marketing"
import { Button } from "@/components/ui/button"
import { LeadButton } from "@/components/shared/LeadButton"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { FacebookIcon, ZaloIcon } from "@/components/shared/SocialIcons"

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`

/**
 * Showroom: thẻ thông tin (ảnh, địa chỉ, giờ mở cửa, hotline, Zalo) + bản đồ Google.
 * Chưa có ảnh showroom thật → dùng ảnh khu vực kèm chú thích trung thực.
 */
export function ShowroomSection() {
  const photo = showroom.photos[0]
  const image = photo ?? showroom.area
  const caption = photo ? showroom.title : showroom.area.caption

  return (
    <section id={anchors.showroom} className="section-pad bg-white">
      <div className="shell">
        <SectionHeader eyebrow="Showroom" title={showroom.title} intro={showroom.intro} />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-6">
          <div className="card flex flex-col overflow-hidden">
            <figure className="relative aspect-[16/9]">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
              <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-md bg-ink/75 px-2.5 py-1 text-[12px] text-white">
                {caption}
              </figcaption>
            </figure>

            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <dl className="space-y-4">
                <InfoLine icon={<MapPin />} label="Địa chỉ">
                  {siteConfig.address}
                </InfoLine>
                <InfoLine icon={<Clock />} label="Giờ mở cửa">
                  {siteConfig.openingHours}
                </InfoLine>
                <InfoLine icon={<Phone />} label="Hotline">
                  <a href={`tel:${siteConfig.hotline.tel}`} className="text-xl font-bold text-primary tabular hover:underline">
                    {siteConfig.hotline.display}
                  </a>
                </InfoLine>
              </dl>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <a href={siteConfig.social.zalo} target="_blank" rel="noopener noreferrer" className="[--zalo-text:#fff]">
                    <ZaloIcon className="size-5 text-[#0068ff]" /> Zalo
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">
                    <FacebookIcon className="size-5 text-[#1877f2]" /> Facebook
                  </a>
                </Button>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-2">
                <Button asChild size="lg" variant="secondary">
                  <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation />
                    Chỉ đường
                  </a>
                </Button>
                <LeadButton size="lg" prefill={{ need: "lai-thu" }}>
                  <CalendarCheck />
                  Hẹn lái thử
                </LeadButton>
              </div>
            </div>
          </div>

          <div className="card relative min-h-[320px] overflow-hidden sm:min-h-[420px]">
            <iframe
              title={`Bản đồ đường tới ${showroom.title}`}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoLine({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary [&_svg]:size-4">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[13px] text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 text-[15px] leading-relaxed font-medium">{children}</dd>
      </div>
    </div>
  )
}
