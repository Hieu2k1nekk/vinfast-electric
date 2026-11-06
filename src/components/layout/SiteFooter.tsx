import Link from "next/link"
import { Clock, MapPin, Phone } from "lucide-react"

import { navItems, privacyPath, siteConfig } from "@/config/site"
import { categories } from "@/data/catalog"
import { imageCredits } from "@/data/marketing"
import { OFFERS_DISCLAIMER } from "@/data/offers"
import { PRICE_DISCLAIMER, getVehicle } from "@/data/vehicles"
import { Logo } from "@/components/shared/Logo"
import { FacebookIcon, ZaloIcon } from "@/components/shared/SocialIcons"

export function SiteFooter() {
  return (
    <footer className="theme-dark bg-background pb-20 text-foreground md:pb-0">
      <div className="shell grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_0.8fr] lg:gap-12 lg:py-16">
        {/* Đại lý */}
        <div>
          <Logo invert />
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">{siteConfig.shortDescription}</p>
          <p className="mt-3 text-[14px] text-muted-foreground">{siteConfig.dealerName}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={siteConfig.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#0068ff] [--zalo-text:#0f172a]"
            >
              <ZaloIcon className="size-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#1877f2]"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        {/* Liên hệ */}
        <div>
          <h2 className="text-[15px] font-bold text-white">Liên hệ</h2>
          <address className="mt-4 space-y-3.5 text-[14px] leading-relaxed not-italic">
            <a href={`tel:${siteConfig.hotline.tel}`} className="flex gap-3 hover:text-white">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="block text-[17px] font-bold text-white tabular">{siteConfig.hotline.display}</span>
                <span className="text-muted-foreground">Hotline / Zalo</span>
              </span>
            </a>
            <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-muted-foreground hover:text-white">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {siteConfig.address}
            </a>
            <p className="flex gap-3 text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              {siteConfig.openingHours}
            </p>
          </address>
        </div>

        {/* Dòng xe */}
        <nav aria-label="Dòng xe">
          <h2 className="text-[15px] font-bold text-white">Dòng xe</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
            {categories.map((c) => (
              <div key={c.id}>
                <p className="text-[12px] font-semibold tracking-wide text-muted-foreground uppercase">{c.label}</p>
                <ul className="mt-2 space-y-1.5 text-[14px]">
                  {c.ids.map((id) => {
                    const v = getVehicle(id)
                    return v ? (
                      <li key={id}>
                        <Link href={`/xe/${id}`} className="text-foreground/85 transition-colors hover:text-white">
                          VinFast {v.name}
                        </Link>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Liên kết */}
        <nav aria-label="Liên kết">
          <h2 className="text-[15px] font-bold text-white">Thông tin</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="text-foreground/85 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={privacyPath} className="text-foreground/85 transition-colors hover:text-white">
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="shell space-y-2 py-6 text-[12px] leading-relaxed text-muted-foreground">
          <p>{PRICE_DISCLAIMER}</p>
          <p>{OFFERS_DISCLAIMER}</p>
          <p>Hình ảnh xe: ảnh chính hãng VinFast.</p>
          <details>
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
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-between">
            <p>© {siteConfig.name}. Bảo lưu mọi quyền.</p>
            <Link href={privacyPath} className="hover:text-foreground">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
