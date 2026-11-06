import { anchors, isSectionVisible, siteConfig } from "@/config/site"
import type { NeedValue } from "@/data/lead"

export type LeadPrefill = { vehicle?: string; need?: NeedValue }

const EVENT = "lead:prefill"

/**
 * Cuộn tới form đăng ký và điền sẵn dòng xe / nhu cầu — mọi CTA trên trang gọi hàm này.
 * Nếu section form đang tắt, mở Zalo thay thế.
 */
export function requestLead(prefill: LeadPrefill = {}) {
  const form = document.getElementById(anchors.lead)
  if (!isSectionVisible(anchors.lead) || !form) {
    // Phải chạy đồng bộ trong sự kiện click, nếu không trình duyệt sẽ chặn cửa sổ mới.
    window.open(siteConfig.social.zalo, "_blank", "noopener,noreferrer")
    return
  }
  window.dispatchEvent(new CustomEvent<LeadPrefill>(EVENT, { detail: prefill }))
  window.setTimeout(() => {
    requestAnimationFrame(() => form.scrollIntoView({ behavior: "smooth", block: "start" }))
  }, 50)
}

export function onLeadRequest(handler: (prefill: LeadPrefill) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<LeadPrefill>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
