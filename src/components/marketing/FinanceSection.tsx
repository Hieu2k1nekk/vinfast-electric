import { anchors } from "@/config/site"
import { FinanceCalculator } from "@/components/calculator/FinanceCalculator"
import { SectionHeader } from "@/components/shared/SectionHeader"

export function FinanceSection({ index = "03", defaultVehicleId }: { index?: string; defaultVehicleId?: string }) {
  return (
    <section id={anchors.finance} className="section-pad">
      <div className="shell">
        <SectionHeader
          index={index}
          kicker="Trả góp"
          title="Tính trước khoản trả hàng tháng."
          intro="Chọn mẫu xe, kéo tỷ lệ trả trước và nhập lãi suất bạn được ngân hàng báo. Mọi con số đều là ước tính để bạn hình dung trước khi gặp tư vấn."
        />
        <div className="mt-14 border border-border md:mt-20">
          <FinanceCalculator defaultVehicleId={defaultVehicleId} />
        </div>
      </div>
    </section>
  )
}
