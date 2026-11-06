import { format } from "date-fns"

import { normalizeVnPhone, type LeadFormValues } from "@/lib/validations/lead"

export type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; code: "NOT_CONFIGURED" | "RATE_LIMITED" | "INVALID" | "UPSTREAM" | "NETWORK"; message: string }

/** Gửi đăng ký tới Route Handler /api/lead. Không bao giờ giả lập thành công. */
export async function submitLead(values: LeadFormValues, extra: { source: string; website: string }): Promise<SubmitResult> {
  const payload = {
    ...values,
    phone: normalizeVnPhone(values.phone),
    // Định dạng theo giờ địa phương — toISOString() sẽ lùi một ngày ở UTC+7.
    testDriveDate: values.testDriveDate ? format(values.testDriveDate, "yyyy-MM-dd") : undefined,
    ...extra,
  }
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => null)) as SubmitResult | null
    if (data && typeof data.ok === "boolean") return data
    return { ok: false, code: "UPSTREAM", message: "Máy chủ đang bận, vui lòng thử lại sau." }
  } catch {
    return { ok: false, code: "NETWORK", message: "Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại." }
  }
}
