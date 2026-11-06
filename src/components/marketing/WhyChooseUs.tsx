import { Compass, FileText, KeyRound, MapPin, Wallet, type LucideIcon } from "lucide-react"

import { purchaseSteps, services, type ServiceIcon } from "@/data/marketing"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { LeadButton } from "@/components/shared/LeadButton"

const icons: Record<ServiceIcon, LucideIcon> = {
  compass: Compass,
  file: FileText,
  wallet: Wallet,
  steering: KeyRound,
  pin: MapPin,
}

/** Vì sao chọn đại lý: 5 dịch vụ thực tế + quy trình mua xe 4 bước. */
export function WhyChooseUs() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionHeader
          eyebrow="Dịch vụ tại đại lý"
          title="Hỗ trợ trọn quá trình mua xe"
          intro="Từ lúc chọn xe tới khi nhận xe, bạn làm việc với một tư vấn viên tại Ninh Bình."
          aside={
            <LeadButton variant="outline" prefill={{ need: "mua-xe" }}>
              Đặt lịch tư vấn
            </LeadButton>
          }
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <li key={s.title}>
                <Reveal delay={i * 0.05} className="card h-full p-5">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{s.description}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-12">
          <h3 className="heading text-xl">Quy trình mua xe</h3>
          <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {purchaseSteps.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 rounded-xl border border-border bg-white p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-bold text-white tabular">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold">{step.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
