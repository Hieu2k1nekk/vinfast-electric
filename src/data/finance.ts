/**
 * Thông số mặc định của bộ tính trả góp.
 * KHÔNG phải lãi suất / điều kiện vay của ngân hàng nào. Người dùng tự nhập lãi suất theo ngân hàng họ chọn.
 */
export const financeDefaults = {
  /** Tỷ lệ trả trước ban đầu (%). */
  downPaymentRatio: 30,
  minRatio: 0,
  maxRatio: 90,
  ratioStep: 5,
  /** Lựa chọn thời hạn vay (tháng). */
  terms: [12, 24, 36, 48, 60, 72, 84, 96],
  defaultTerm: 60,
  /** Lãi suất GIẢ ĐỊNH để minh họa (%/năm) — người dùng phải nhập lãi suất thực tế. */
  assumedRate: 9,
  maxRate: 30,
} as const

export const FINANCE_DISCLAIMER =
  "Kết quả chỉ là ƯỚC TÍNH dựa trên số liệu bạn nhập, không phải báo giá tài chính chính thức. Lãi suất, tỷ lệ trả trước và thời hạn vay thực tế do ngân hàng quyết định. Giá xe là giá niêm yết tham khảo, chưa gồm phí màu nâng cao, ưu đãi và chi phí lăn bánh."

export type RepaymentMethod = "annuity" | "declining"

export const repaymentMethods: { id: RepaymentMethod; label: string; hint: string }[] = [
  { id: "declining", label: "Dư nợ giảm dần", hint: "Gốc trả đều, lãi tính trên dư nợ còn lại — tháng đầu cao nhất" },
  { id: "annuity", label: "Trả đều hàng tháng", hint: "Gốc + lãi bằng nhau mỗi tháng" },
]
