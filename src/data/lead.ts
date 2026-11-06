/** Lựa chọn trong form đăng ký. */
export const regions = [
  "Ninh Bình",
  "Hà Nội",
  "Nam Định",
  "Hà Nam",
  "Thanh Hóa",
  "Miền Bắc (tỉnh khác)",
  "Miền Trung",
  "Miền Nam",
] as const

export const needs = [
  { value: "mua-xe", label: "Mua xe", description: "Báo giá & ưu đãi" },
  { value: "lai-thu", label: "Lái thử", description: "Đặt lịch trải nghiệm" },
  { value: "tra-gop", label: "Trả góp", description: "Phương án tài chính" },
] as const

export type NeedValue = (typeof needs)[number]["value"]
