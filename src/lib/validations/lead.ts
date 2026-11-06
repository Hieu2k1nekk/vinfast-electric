import { z } from "zod"

import { needs } from "@/data/lead"
import { vehicles } from "@/data/vehicles"

/** Di động Việt Nam: 10 số, đầu 03/05/07/08/09. Chấp nhận +84 / 84, khoảng trắng, dấu chấm, gạch ngang. */
const VN_PHONE_REGEX = /^0(3|5|7|8|9)\d{8}$/

export function normalizeVnPhone(raw: string): string {
  const digits = raw.replace(/[\s.\-()]/g, "")
  if (digits.startsWith("+84")) return "0" + digits.slice(3)
  if (digits.startsWith("84") && digits.length === 11) return "0" + digits.slice(2)
  return digits
}

const needValues = needs.map((n) => n.value) as [string, ...string[]]
const vehicleIds: [string, ...string[]] = ["chua-chon", ...vehicles.map((v) => v.id)]

/** Trường dùng chung giữa form (client) và Route Handler (server). */
const baseFields = {
  fullName: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập họ và tên")
    .min(2, "Họ và tên quá ngắn")
    .max(60, "Họ và tên tối đa 60 ký tự")
    .regex(/^[\p{L}\s'.-]+$/u, "Họ và tên chỉ gồm chữ cái"),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại")
    .refine((v) => VN_PHONE_REGEX.test(normalizeVnPhone(v)), {
      message: "Số điện thoại không hợp lệ (VD: 0912 345 678)",
    }),
  vehicle: z.enum(vehicleIds, { message: "Vui lòng chọn dòng xe quan tâm" }),
  /** Không còn trên form rút gọn — giữ tùy chọn để tương thích dữ liệu webhook cũ. */
  region: z.string().trim().max(60).optional(),
  need: z.enum(needValues, { message: "Vui lòng chọn nhu cầu" }),
  note: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự").optional(),
}

export const leadFormSchema = z.object({
  ...baseFields,
  testDriveDate: z.date().optional(),
})

/** Dữ liệu gửi lên /api/lead. `website` là bẫy honeypot — người dùng thật luôn để trống. */
export const leadPayloadSchema = z.object({
  ...baseFields,
  testDriveDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  source: z.string().max(120).optional(),
  website: z.string().max(200).optional(),
})

export type LeadFormInput = z.input<typeof leadFormSchema>
export type LeadFormValues = z.output<typeof leadFormSchema>
export type LeadPayload = z.output<typeof leadPayloadSchema>
