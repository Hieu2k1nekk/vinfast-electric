import { anchors } from "@/config/site"
import { FinanceCalculator } from "@/components/calculator/FinanceCalculator"
import { SectionHeader } from "@/components/shared/SectionHeader"

export function FinanceSection({ defaultVehicleId, className }: { defaultVehicleId?: string; className?: string }) {
  return (
    <section id={anchors.finance} className={className ?? "section-pad"}>
      <div className="shell">
        <SectionHeader
          eyebrow="Trả góp"
          title="Ước tính trả góp hàng tháng"
          intro="Chọn mẫu xe, tỷ lệ trả trước và thời hạn vay. Con số chỉ để tham khảo — tư vấn viên sẽ gửi phương án theo ngân hàng thực tế."
        />
        <div className="mt-10">
          <FinanceCalculator defaultVehicleId={defaultVehicleId} />
        </div>
      </div>
    </section>
  )
}
