import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { anchors, isSectionVisible, siteConfig } from "@/config/site"
import { photoOptions, paintOptions } from "@/data/catalog"
import { formatPrice, getVehicle, vehicles } from "@/data/vehicles"
import { FinanceSection } from "@/components/marketing/FinanceSection"
import { LeadSection } from "@/components/marketing/LeadSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ModelPager } from "@/components/vehicle/ModelPager"
import { PhotoGallery } from "@/components/vehicle/PhotoGallery"
import { SpecSheet } from "@/components/vehicle/SpecSheet"
import { VehicleConfigurator } from "@/components/vehicle/VehicleConfigurator"
import { VehicleHero } from "@/components/vehicle/VehicleHero"

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }))
}

export async function generateMetadata({ params }: PageProps<"/xe/[id]">): Promise<Metadata> {
  const { id } = await params
  const vehicle = getVehicle(id)
  if (!vehicle) return {}

  const title = `VinFast ${vehicle.name} — Giá từ ${formatPrice(vehicle.priceFrom)}, màu sơn & trả góp`
  const description = `${vehicle.description} Giá niêm yết từ ${formatPrice(vehicle.priceFrom)}. Đăng ký lái thử tại Ninh Bình.`
  return {
    title,
    description,
    alternates: { canonical: `/xe/${vehicle.id}` },
    openGraph: {
      type: "website",
      url: `/xe/${vehicle.id}`,
      title,
      description,
      images: [{ url: vehicle.image.src, alt: vehicle.image.alt }],
    },
  }
}

export default async function VehiclePage({ params }: PageProps<"/xe/[id]">) {
  const { id } = await params
  const vehicle = getVehicle(id)
  if (!vehicle) notFound()

  const photos = photoOptions(vehicle)
  // Khi xe không có ảnh màu, bộ cấu hình đã dùng ảnh chụp — không lặp lại ở gallery.
  const showGallery = paintOptions(vehicle).length > 0 && photos.length > 0

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `VinFast ${vehicle.name}`,
    brand: { "@type": "Brand", name: "VinFast" },
    description: vehicle.description,
    image: new URL(vehicle.image.src, siteConfig.url).toString(),
    fuelType: "Electric",
    ...(vehicle.priceFrom !== null && {
      offers: {
        "@type": "Offer",
        priceCurrency: "VND",
        price: vehicle.priceFrom,
        availability: "https://schema.org/InStock",
        seller: { "@type": "AutoDealer", name: siteConfig.dealerName },
      },
    }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VehicleHero vehicle={vehicle} />

      <section id="cau-hinh" className="section-pad scroll-mt-16">
        <div className="shell">
          <SectionHeader index="A" kicker="Cấu hình" title="Chọn màu của bạn." />
          <div className="mt-12 border border-border md:mt-16">
            <VehicleConfigurator vehicle={vehicle} />
          </div>
        </div>
      </section>

      {showGallery && (
        <section className="overflow-hidden pb-20 md:pb-28">
          <div className="shell">
            <SectionHeader index="B" kicker="Hình ảnh" title="Bên trong khoang xe." />
            <div className="mt-10">
              <PhotoGallery name={vehicle.name} photos={photos} />
            </div>
          </div>
        </section>
      )}

      <section className="theme-paper section-pad">
        <div className="shell">
          <SectionHeader index={showGallery ? "C" : "B"} kicker="Thông số & giá" title={`${vehicle.name} trong con số.`} />
          <div className="mt-12 border border-border md:mt-16">
            <SpecSheet vehicle={vehicle} />
          </div>
        </div>
      </section>

      {isSectionVisible(anchors.finance) && <FinanceSection index={showGallery ? "D" : "C"} defaultVehicleId={vehicle.id} />}
      {isSectionVisible(anchors.lead) && <LeadSection index={showGallery ? "E" : "D"} defaultVehicle={vehicle.id} source={`xe/${vehicle.id}`} />}
      <ModelPager vehicle={vehicle} />
    </>
  )
}
