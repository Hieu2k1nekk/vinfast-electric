import { anchors, isSectionVisible } from "@/config/site"
import { HeroShowcase } from "@/components/marketing/HeroShowcase"
import { OffersSection } from "@/components/marketing/OffersSection"
import { FinanceSection } from "@/components/marketing/FinanceSection"
import { ShowroomSection } from "@/components/marketing/ShowroomSection"
import { FaqSection } from "@/components/marketing/FaqSection"
import { LeadSection } from "@/components/marketing/LeadSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ModelIndex } from "@/components/vehicle/ModelIndex"

export default function HomePage() {
  return (
    <>
      <HeroShowcase />

      {isSectionVisible(anchors.models) && (
        <section id={anchors.models} className="section-pad">
          <div className="shell">
            <SectionHeader
              index="01"
              kicker="Dòng xe"
              title="Mười một cách để đi bằng điện."
              intro="Từ xe đô thị 4 chỗ tới SUV 7 chỗ và xe thương mại. Chọn một mẫu để xem màu sơn, thông số và giá."
            />
            <div className="mt-14 md:mt-20">
              <ModelIndex />
            </div>
          </div>
        </section>
      )}

      {isSectionVisible(anchors.offers) && <OffersSection />}
      {isSectionVisible(anchors.finance) && <FinanceSection />}
      {isSectionVisible(anchors.showroom) && <ShowroomSection />}
      {isSectionVisible(anchors.faq) && <FaqSection />}
      {isSectionVisible(anchors.lead) && <LeadSection source="trang-chu" />}
    </>
  )
}
