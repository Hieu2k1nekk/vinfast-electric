import { CheckCircle2, Info, Phone } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { isLeadSinkConfigured } from "@/services/lead-sink"
import { LeadForm } from "@/components/marketing/LeadForm"
import { ZaloIcon } from "@/components/shared/SocialIcons"

const benefits = [
  "Báo giá chi tiết theo phiên bản và màu sơn",
  "Kiểm tra chương trình ưu đãi bạn đủ điều kiện",
  "Xếp lịch lái thử tại showroom Hoa Lư",
  "Phương án trả góp theo ngân hàng",
]

/**
 * Section đăng ký tư vấn / lái thử. Server Component: kiểm tra backend nhận lead đã cấu hình hay chưa.
 * Trang được prerender nên thông báo này phản ánh biến môi trường LÚC BUILD — đặt LEAD_WEBHOOK_URL trước khi `npm run build`.
 */
export function LeadSection({ defaultVehicle, source }: { defaultVehicle?: string; source: string }) {
  const online = isLeadSinkConfigured()

  return (
    <section id={anchors.lead} className="section-pad">
      <div className="shell">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Thông tin */}
          <div className="theme-dark bg-background p-6 text-foreground sm:p-8 lg:p-10">
            <p className="eyebrow">Đăng ký tư vấn</p>
            <h2 className="heading mt-3 text-title text-white text-balance">Nhận báo giá & đặt lịch lái thử</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Để lại số điện thoại, tư vấn viên sẽ gọi lại trong giờ làm việc.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3 text-[15px]">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-[14px] text-muted-foreground">Cần hỗ trợ ngay?</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a
                  href={`tel:${siteConfig.hotline.tel}`}
                  className="flex h-12 items-center justify-center gap-2 rounded-lg bg-white text-[15px] font-bold text-ink transition-colors hover:bg-white/90"
                >
                  <Phone className="size-4" />
                  {siteConfig.hotline.display}
                </a>
                <a
                  href={siteConfig.social.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0068ff] text-[15px] font-bold text-white transition-colors hover:bg-[#0058d8] [--zalo-text:#0068ff]"
                >
                  <ZaloIcon className="size-5" />
                  Chat Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 lg:p-10">
            {!online && (
              <p role="status" className="mb-6 flex gap-3 rounded-lg border border-[#f5d9a8] bg-[#fff8eb] px-4 py-3 text-[14px] leading-relaxed text-[#7a4b00]">
                <Info className="mt-0.5 size-4 shrink-0" />
                <span>
                  Hệ thống nhận đăng ký trực tuyến đang được hoàn thiện. Để được hỗ trợ ngay, vui lòng gọi{" "}
                  <a href={`tel:${siteConfig.hotline.tel}`} className="font-semibold underline underline-offset-2">
                    {siteConfig.hotline.display}
                  </a>{" "}
                  hoặc nhắn Zalo.
                </span>
              </p>
            )}
            <LeadForm defaultVehicle={defaultVehicle} source={source} />
          </div>
        </div>
      </div>
    </section>
  )
}
