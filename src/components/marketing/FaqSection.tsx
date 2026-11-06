import { Phone } from "lucide-react"

import { anchors, siteConfig } from "@/config/site"
import { faqs } from "@/data/faqs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Button } from "@/components/ui/button"

export function FaqSection() {
  return (
    <section id={anchors.faq} className="section-pad bg-white">
      <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            eyebrow="Hỏi đáp"
            title="Câu hỏi thường gặp"
            intro="Chưa thấy câu trả lời bạn cần? Gọi hotline hoặc nhắn Zalo — tư vấn viên trả lời trong giờ làm việc."
          />
          <Button asChild variant="outline" className="mt-6">
            <a href={`tel:${siteConfig.hotline.tel}`}>
              <Phone />
              {siteConfig.hotline.display}
            </a>
          </Button>
        </div>

        <Accordion type="single" collapsible className="gap-3">
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5 not-last:border-b data-[state=open]:border-primary/40 data-[state=open]:shadow-card">
              <AccordionTrigger className="py-4 text-[16px] font-semibold hover:text-primary">{f.question}</AccordionTrigger>
              <AccordionContent>
                <p className="pb-2 text-[15px] leading-relaxed text-muted-foreground">{f.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
