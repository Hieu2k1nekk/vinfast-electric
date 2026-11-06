import { anchors, isSectionVisible } from "@/config/site"
import { PRICE_DISCLAIMER } from "@/data/vehicles"
import { HeroSlider } from "@/components/marketing/HeroSlider"
import { QuickBar } from "@/components/marketing/QuickBar"
import { OffersSection } from "@/components/marketing/OffersSection"
import { FinanceSection } from "@/components/marketing/FinanceSection"
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs"
import { ShowroomSection } from "@/components/marketing/ShowroomSection"
import { FaqSection } from "@/components/marketing/FaqSection"
import { LeadSection } from "@/components/marketing/LeadSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { LeadButton } from "@/components/shared/LeadButton"
import { VehicleGrid } from "@/components/vehicle/VehicleGrid"

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <QuickBar />

      {isSectionVisible(anchors.models) && (
        <section id={anchors.models} className="section-pad">
          <div className="shell">
            <SectionHeader
              eyebrow="Dòng xe & bảng giá"
              title="Chọn mẫu xe phù hợp với bạn"
              intro="Bấm vào ô màu để xem xe theo từng màu sơn. Giá là giá niêm yết tham khảo — nhận báo giá để biết ưu đãi áp dụng cho bạn."
              aside={
                <LeadButton variant="outline" prefill={{ vehicle: "chua-chon", need: "mua-xe" }}>
                  Cần tư vấn chọn xe?
                </LeadButton>
              }
            />
            <div className="mt-8">
              <VehicleGrid />
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">{PRICE_DISCLAIMER}</p>
          </div>
        </section>
      )}

      {isSectionVisible(anchors.offers) && <OffersSection />}
      {isSectionVisible(anchors.finance) && <FinanceSection />}
      <WhyChooseUs />
      {isSectionVisible(anchors.showroom) && <ShowroomSection />}
      {isSectionVisible(anchors.lead) && <LeadSection source="trang-chu" />}
      {isSectionVisible(anchors.faq) && <FaqSection />}
    </>
  )
}
