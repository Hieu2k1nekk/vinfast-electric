import { vehicles, type Vehicle } from "@/data/vehicles"

/**
 * Nhóm phân khúc cho danh mục xe. Tách khỏi vehicles.ts để dữ liệu sản phẩm kế thừa giữ nguyên.
 * Thêm xe mới: thêm id vào đúng nhóm.
 */
export const categories = [
  { id: "mini", label: "Mini", description: "Xe đô thị cỡ nhỏ", ids: ["vf2", "vf3"] },
  { id: "suv", label: "SUV", description: "Từ hạng A đến full-size", ids: ["vf5", "vf6", "vf7", "vf8", "vf9"] },
  { id: "mpv", label: "MPV", description: "7 chỗ cho gia đình & dịch vụ", ids: ["limo", "mpv7"] },
  { id: "thuong-mai", label: "Thương mại", description: "Bán tải & xe van chở hàng", ids: ["wild", "ecvan"] },
] as const

export type CategoryId = (typeof categories)[number]["id"]

export function categoryOf(vehicle: Vehicle) {
  return categories.find((c) => (c.ids as readonly string[]).includes(vehicle.id)) ?? categories[0]
}

/** Số thứ tự hiển thị kiểu tạp chí: 01, 02… */
export function indexLabel(vehicle: Vehicle) {
  return String(vehicles.indexOf(vehicle) + 1).padStart(2, "0")
}

/** Ảnh màu sơn (ảnh tách nền có mã màu) — dùng cho bộ cấu hình màu. */
export function paintOptions(vehicle: Vehicle) {
  return vehicle.gallery.filter((g) => g.color)
}

/** Ảnh chụp thực tế / nội thất. */
export function photoOptions(vehicle: Vehicle) {
  return vehicle.gallery.filter((g) => !g.color)
}

export function neighbours(vehicle: Vehicle) {
  const i = vehicles.indexOf(vehicle)
  return {
    prev: vehicles[(i - 1 + vehicles.length) % vehicles.length],
    next: vehicles[(i + 1) % vehicles.length],
  }
}
