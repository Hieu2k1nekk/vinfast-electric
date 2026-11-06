import { ArrowUpRight, Phone } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { purchaseSteps } from "@/data/marketing"
import { isLeadSinkConfigured } from "@/services/lead-sink"
import { LeadForm } from "@/components/marketing/LeadForm"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ZaloIcon } from "@/components/shared/SocialIcons"

/**
 * Section đăng ký tư vấn / lái thử. Server Component: kiểm tra backend nhận lead đã cấu hình hay chưa.
 * Trang được prerender nên thông báo này phản ánh biến môi trường LÚC BUILD — đặt LEAD_WEBHOOK_URL trước khi `npm run build`.
 */
export function LeadSection({ index = "06", defaultVehicle, source }: { index?: string; defaultVehicle?: string; source: string }) {
  const online = isLeadSinkConfigured()

  return (
    <section id={anchors.lead} className="section-pad scroll-mt-16 border-t border-border">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index={index}
            kicker="Đăng ký"
            title="Tư vấn & lái thử."
            intro="Để lại thông tin, chuyên viên sẽ gọi lại để báo giá, xếp lịch lái thử hoặc lập phương án trả góp."
            className="lg:block"
          />

          <ol className="mt-12 border-t border-line-strong">
            {purchaseSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] border-b border-border py-4">
                <span className="font-display text-[12px] font-semibold text-primary tabular">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-[15px] font-semibold">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
            <a href={`tel:${siteConfig.hotline.tel}`} className="flex items-center gap-3 bg-background p-5 transition-colors hover:bg-accent">
              <Phone className="size-5 text-primary" />
              <span>
                <span className="kicker block">Hotline</span>
                <span className="font-display text-lg font-bold tabular">{siteConfig.hotline.display}</span>
              </span>
            </a>
            <a
              href={siteConfig.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-background p-5 transition-colors hover:bg-accent [--zalo-text:var(--background)]"
            >
              <ZaloIcon className="size-6 text-primary" />
              <span>
                <span className="kicker block">Nhắn Zalo</span>
                <span className="inline-flex items-center gap-1 font-display text-lg font-bold">
                  Chat ngay <ArrowUpRight className="size-4" />
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-border bg-surface p-6 sm:p-10">
            {!online && (
              <p role="status" className="mb-8 border-l-2 border-primary bg-background px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                Hệ thống nhận đăng ký trực tuyến đang được hoàn thiện. Để được hỗ trợ ngay, vui lòng gọi{" "}
                <a href={`tel:${siteConfig.hotline.tel}`} className="font-semibold text-foreground underline underline-offset-4">
                  {siteConfig.hotline.display}
                </a>{" "}
                hoặc nhắn Zalo.
              </p>
            )}
            <LeadForm defaultVehicle={defaultVehicle} source={source} />
          </div>
        </div>
      </div>
    </section>
  )
}
