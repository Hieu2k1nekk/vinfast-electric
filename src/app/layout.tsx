import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"

import { siteConfig } from "@/config/site"
import { vehicles } from "@/data/vehicles"
import { Providers } from "@/components/shared/Providers"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { ContactDock } from "@/components/layout/ContactDock"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

const title = "Ô tô điện VinFast tại Ninh Bình — Giá, màu xe, trả góp & lái thử"
const description =
  "11 dòng ô tô điện VinFast từ VF 2 đến VF 9, Limo Green, MPV 7, VF Wild, EC Van. Xem giá niêm yết, chọn màu, ước tính trả góp và đăng ký lái thử tại showroom Hoa Lư, Ninh Bình."

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description,
  keywords: ["VinFast", "VinFast Ninh Bình", "ô tô điện", "xe điện Ninh Bình", "giá xe VinFast", ...vehicles.map((v) => `VinFast ${v.name}`)],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: "/images/marketing/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#0e0f12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const dealerJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: siteConfig.dealerName,
  description: siteConfig.shortDescription,
  url: siteConfig.url,
  telephone: siteConfig.hotline.tel,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressRegion: "Ninh Bình",
    addressCountry: "VN",
  },
  brand: { "@type": "Brand", name: "VinFast" },
  sameAs: Object.values(siteConfig.social),
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body>
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:text-primary-foreground"
        >
          Bỏ qua đến nội dung chính
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }} />
        <Providers>
          <SiteHeader />
          <main id="noi-dung">{children}</main>
          <SiteFooter />
          <ContactDock />
        </Providers>
      </body>
    </html>
  )
}
