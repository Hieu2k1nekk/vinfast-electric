import type { RepaymentMethod } from "@/data/finance"

export type LoanInput = {
  price: number
  downPayment: number
  months: number
  /** Lãi suất %/năm. */
  annualRate: number
  method: RepaymentMethod
}

export type LoanResult = {
  principal: number
  /** Số tiền tháng đầu tiên. */
  firstPayment: number
  /** Số tiền tháng cuối (bằng tháng đầu với phương thức trả đều). */
  lastPayment: number
  totalInterest: number
  totalPayable: number
}

/** Ước tính khoản vay. Chỉ mang tính minh họa, không thay thế bảng tính của ngân hàng. */
export function estimateLoan({ price, downPayment, months, annualRate, method }: LoanInput): LoanResult {
  const principal = Math.max(0, price - downPayment)
  const r = Math.max(0, annualRate) / 100 / 12
  const n = Math.max(1, Math.round(months))

  if (principal === 0) {
    return { principal: 0, firstPayment: 0, lastPayment: 0, totalInterest: 0, totalPayable: 0 }
  }

  if (method === "annuity") {
    const payment = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n))
    const totalPayable = payment * n
    return { principal, firstPayment: payment, lastPayment: payment, totalInterest: totalPayable - principal, totalPayable }
  }

  // Dư nợ giảm dần: gốc chia đều, lãi tính trên dư nợ đầu kỳ.
  const principalPart = principal / n
  const totalInterest = r * principal * ((n + 1) / 2)
  return {
    principal,
    firstPayment: principalPart + principal * r,
    lastPayment: principalPart + principalPart * r,
    totalInterest,
    totalPayable: principal + totalInterest,
  }
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** Đọc số từ chuỗi người dùng nhập ("1.250.000.000" → 1250000000). */
export function parseMoney(raw: string) {
  const digits = raw.replace(/\D/g, "")
  return digits ? Number(digits) : 0
}

export function formatMoneyInput(value: number) {
  return value ? Math.round(value).toLocaleString("vi-VN") : ""
}
