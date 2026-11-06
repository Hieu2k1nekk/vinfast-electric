import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { categories } from "@/data/catalog"
import { imageCredits } from "@/data/marketing"
import { getVehicle } from "@/data/vehicles"
import { Logo } from "@/components/shared/Logo"

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border pb-20 md:pb-0">
      {/* Câu chốt cỡ lớn */}
      <div className="shell pt-20 md:pt-28">
        <p className="kicker mb-6">Hẹn gặp bạn tại showroom</p>
        <Link href={`/#${anchors.lead}`} className="group block">
          <span className="display block text-[clamp(2.6rem,9.6vw,9.5rem)] leading-[0.88] text-balance uppercase">
            Your next journey
            <span className="block text-primary">
              starts here.
              <ArrowUpRight
                aria-hidden
                className="ml-2 inline size-[0.7em] align-[-0.06em] transition-transform duration-500 ease-editorial group-hover:translate-x-2 group-hover:-translate-y-2"
              />
            </span>
          </span>
          <span className="sr-only">Đăng ký tư vấn và lái thử</span>
        </Link>
      </div>

      <div className="shell mt-16 grid grid-cols-1 gap-12 border-t border-border py-14 md:mt-24 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{siteConfig.shortDescription}</p>
          <p className="mt-4 text-sm text-muted-foreground">{siteConfig.dealerName}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="kicker mb-5">Showroom</h2>
          <address className="space-y-3 text-sm leading-relaxed not-italic">
            <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-primary">
              {siteConfig.address}
            </a>
            <p className="text-muted-foreground">{siteConfig.openingHours}</p>
          </address>
        </div>

        <div className="lg:col-span-2">
          <h2 className="kicker mb-5">Liên hệ</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${siteConfig.hotline.tel}`} className="font-display text-lg font-semibold tabular transition-colors hover:text-primary">
                {siteConfig.hotline.display}
              </a>
              <p className="text-xs text-muted-foreground">Hotline / Zalo</p>
            </li>
            <li>
              <a href={siteConfig.social.zalo} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                Zalo
              </a>
            </li>
            <li>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Dòng xe" className="md:col-span-2 lg:col-span-3">
          <h2 className="kicker mb-5">Dòng xe</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {categories.map((c) => (
              <div key={c.id}>
                <p className="mb-2 text-xs text-muted-foreground">{c.label}</p>
                <ul className="space-y-1.5 text-sm">
                  {c.ids.map((id) => {
                    const v = getVehicle(id)
                    return v ? (
                      <li key={id}>
                        <Link href={`/xe/${id}`} className="transition-colors hover:text-primary">
                          {v.name}
                        </Link>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div className="shell border-t border-border py-8 text-[11px] leading-relaxed text-muted-foreground">
        <p>
          Giá xe tham khảo theo vinfastauto.com, cần đối chiếu trước khi mua. Hình ảnh xe: ảnh chính hãng VinFast.
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer select-none hover:text-foreground">Nguồn ảnh phong cảnh</summary>
          <ul className="mt-2 space-y-1">
            {imageCredits.map((c) => (
              <li key={c.file}>
                {c.subject} — {c.author},{" "}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                  {c.license}
                </a>
                , Wikimedia Commons
              </li>
            ))}
          </ul>
        </details>
        <p className="mt-3">© {siteConfig.name}. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  )
}
