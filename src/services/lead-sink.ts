import "server-only"

import type { LeadPayload } from "@/lib/validations/lead"

/**
 * Nơi nhận lead phía máy chủ. Đặt biến môi trường LEAD_WEBHOOK_URL (Google Apps Script, Make, n8n, CRM…)
 * để bật gửi thật. Khi chưa cấu hình, API trả lỗi NOT_CONFIGURED — không giả vờ đã gửi thành công.
 */
export function isLeadSinkConfigured() {
  return Boolean(process.env.LEAD_WEBHOOK_URL)
}

export async function deliverLead(lead: Omit<LeadPayload, "website"> & { id: string; submittedAt: string }) {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return { ok: false as const, reason: "not-configured" as const }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(10_000),
  })
  return res.ok ? { ok: true as const } : { ok: false as const, reason: "upstream" as const }
}
