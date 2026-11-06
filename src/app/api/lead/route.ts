import { NextResponse, type NextRequest } from "next/server"

import { rateLimit } from "@/lib/rate-limit"
import { leadPayloadSchema, normalizeVnPhone } from "@/lib/validations/lead"
import { deliverLead, isLeadSinkConfigured } from "@/services/lead-sink"
import type { SubmitResult } from "@/services/lead.service"

const json = (body: SubmitResult, status: number, headers?: HeadersInit) => NextResponse.json(body, { status, headers })

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(`lead:${clientIp(request)}`, { limit: 5, windowMs: 10 * 60_000 })
  if (!limit.ok) {
    return json(
      { ok: false, code: "RATE_LIMITED", message: "Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau ít phút hoặc gọi hotline." },
      429,
      { "Retry-After": String(limit.retryAfter) }
    )
  }

  const body = await request.json().catch(() => null)
  const parsed = leadPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, code: "INVALID", message: "Thông tin chưa hợp lệ, vui lòng kiểm tra lại." }, 400)
  }

  const { website, ...lead } = parsed.data
  const id = crypto.randomUUID()

  // Honeypot: bot điền trường ẩn → bỏ qua lặng lẽ để bot không dò được cơ chế chặn.
  if (website) return json({ ok: true, id }, 200)

  if (!isLeadSinkConfigured()) {
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message: "Kênh nhận đăng ký trực tuyến chưa được kết nối. Vui lòng gọi hotline hoặc nhắn Zalo để được hỗ trợ ngay.",
      },
      503
    )
  }

  try {
    const result = await deliverLead({ ...lead, phone: normalizeVnPhone(lead.phone), id, submittedAt: new Date().toISOString() })
    if (result.ok) return json({ ok: true, id }, 200)
  } catch {
    // rơi xuống trả lỗi bên dưới
  }
  return json({ ok: false, code: "UPSTREAM", message: "Không thể gửi đăng ký lúc này. Vui lòng thử lại hoặc gọi hotline." }, 502)
}
