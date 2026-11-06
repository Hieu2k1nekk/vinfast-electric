import { anchors } from "@/config/site"
import { faqs } from "@/data/faqs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Reveal } from "@/components/shared/Reveal"

export function FaqSection() {
  return (
    <section id={anchors.faq} className="theme-paper section-pad">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12">
        <SectionHeader
          index="05"
          kicker="Hỏi đáp"
          title="Câu hỏi thường gặp"
          intro="Chưa thấy câu trả lời bạn cần? Gọi hotline hoặc nhắn Zalo — chuyên viên trả lời trong giờ làm việc."
          className="lg:col-span-5 lg:block lg:self-start"
        />
        <Reveal delay={0.1} className="lg:col-span-7">
          <Accordion type="single" collapsible className="border-t border-line-strong">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex gap-5">
                    <span className="pt-1 font-display text-[12px] font-semibold text-muted-foreground tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{f.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-10 text-[15px] leading-relaxed text-muted-foreground">{f.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
