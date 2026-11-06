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

      {showGallery && (
        <section id="hinh-anh" className="overflow-hidden bg-white py-14 md:py-20">
          <div className="shell">
            <SectionHeader eyebrow="Hình ảnh thực tế" title={`Ảnh chụp thực tế VinFast ${vehicle.name}`} />
            <div className="mt-6">
              <PhotoGallery name={vehicle.name} photos={photos} />
            </div>
          </div>
        </section>
      )}

      <section id="thong-so" className="section-pad">
        <div className="shell">
          <SectionHeader eyebrow="Thông số & giá" title={`VinFast ${vehicle.name}: thông số và bảng giá`} />
          <div className="mt-8">
            <SpecSheet vehicle={vehicle} />
          </div>
        </div>
      </section>

      {isSectionVisible(anchors.finance) && <FinanceSection defaultVehicleId={vehicle.id} className="section-pad bg-white" />}
      {isSectionVisible(anchors.lead) && <LeadSection defaultVehicle={vehicle.id} source={`xe/${vehicle.id}`} />}
      <ModelPager vehicle={vehicle} />
    </>
  )
}
