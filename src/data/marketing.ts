/**
 * MARKETING — nội dung & ảnh quảng bá (hero, showroom, lý do chọn mua).
 * Ảnh xe trong hero lấy NGUYÊN BẢN từ public/images/vehicles/ (ảnh chính hãng, không chỉnh sửa).
 * Giá trong hero đọc từ src/data/vehicles.ts — không ghi cứng ở đây.
 */
import type { LeadPrefill } from "@/lib/lead-events"

export type HeroSlide = {
  id: string
  /** "photo": ảnh chụp toàn khung (object-cover). "studio": ảnh xe tách nền trên nền sáng (object-contain). */
  kind: "photo" | "studio"
  /** Mẫu xe gắn với slide — dùng để hiện giá và liên kết chi tiết. */
  vehicleId?: string
  image: { src: string; alt: string }
  /** Điểm lấy nét khi cắt ảnh (object-position). */
  focus?: string
  eyebrow: string
  title: string
  text: string
  primary: { label: string; href: string }
  secondary: { label: string; lead: LeadPrefill }
}

export const heroSlides: HeroSlide[] = [
  {
    id: "showroom",
    kind: "photo",
    image: { src: "/images/vehicles/vf9/xanh.webp", alt: "VinFast VF 9 màu xanh đỗ trước sảnh nhà" },
    focus: "62% 60%",
    eyebrow: "Đại lý VinFast tại Ninh Bình",
    title: "Mua xe điện VinFast tại Ninh Bình",
    text: "Tư vấn chọn xe, báo giá, ưu đãi và trả góp trong một buổi. Xem xe và lái thử tại showroom Hoa Lư.",
    primary: { label: "Xem bảng giá", href: "#dong-xe" },
    secondary: { label: "Đăng ký lái thử", lead: { need: "lai-thu" } },
  },
  {
    id: "vf8",
    kind: "studio",
    vehicleId: "vf8",
    image: { src: "/images/vehicles/vf8/xanh-duong.webp", alt: "VinFast VF 8 màu xanh dương nhìn ngang" },
    eyebrow: "SUV hạng D · Thế hệ mới",
    title: "VinFast VF 8",
    text: "SUV 5 chỗ rộng rãi cho gia đình. Chọn màu, nhận báo giá lăn bánh và phương án trả góp phù hợp.",
    primary: { label: "Xem chi tiết VF 8", href: "/xe/vf8" },
    secondary: { label: "Nhận báo giá", lead: { vehicle: "vf8", need: "mua-xe" } },
  },
  {
    id: "wild",
    kind: "photo",
    vehicleId: "wild",
    image: { src: "/images/vehicles/wild/dem.webp", alt: "VinFast VF Wild màu đen dưới bầu trời đêm" },
    focus: "65% 60%",
    eyebrow: "Bán tải điện",
    title: "VinFast VF Wild",
    text: "Bán tải điện cho công việc và những chuyến đi xa. Đăng ký để được tư vấn phiên bản và lịch xem xe.",
    primary: { label: "Xem chi tiết VF Wild", href: "/xe/wild" },
    secondary: { label: "Nhận báo giá", lead: { vehicle: "wild", need: "mua-xe" } },
  },
]

/** Lý do chọn mua — CHỈ những dịch vụ đại lý thực hiện (đối chiếu nội dung FAQ kế thừa). */
export const services = [
  {
    icon: "compass",
    title: "Tư vấn chọn xe",
    description: "So sánh 11 dòng xe theo nhu cầu, số chỗ và ngân sách. Xem màu sơn, giá niêm yết và thông số ngay tại showroom.",
  },
  {
    icon: "file",
    title: "Hỗ trợ thủ tục mua xe",
    description: "Hướng dẫn hồ sơ cá nhân / doanh nghiệp, hỗ trợ đăng ký, đăng kiểm và bàn giao xe.",
  },
  {
    icon: "wallet",
    title: "Tư vấn trả góp",
    description: "Hỗ trợ lập hồ sơ vay mua xe với ngân hàng. Lãi suất và tỷ lệ vay theo từng ngân hàng và hồ sơ.",
  },
  {
    icon: "steering",
    title: "Đăng ký lái thử",
    description: "Đặt lịch trải nghiệm xe thực tế. Vui lòng mang theo giấy phép lái xe hạng B trở lên.",
  },
  {
    icon: "pin",
    title: "Hỗ trợ khách hàng tại Ninh Bình",
    description: "Showroom tại Hoa Lư; hotline và Zalo hỗ trợ trong giờ làm việc.",
  },
] as const

export type ServiceIcon = (typeof services)[number]["icon"]

export const purchaseSteps = [
  { title: "Đăng ký tư vấn", description: "Để lại thông tin hoặc gọi hotline, chuyên viên liên hệ lại." },
  { title: "Lái thử & báo giá", description: "Trải nghiệm xe thực tế và nhận báo giá chi tiết." },
  { title: "Ký hợp đồng", description: "Hoàn thiện thủ tục mua xe hoặc hồ sơ vay ngân hàng." },
  { title: "Nhận xe", description: "Bàn giao xe, hướng dẫn sử dụng và kích hoạt dịch vụ." },
] as const

export const showroom = {
  title: "Showroom VinFast Hoa Lư",
  intro: "Đến xem xe tận nơi, ngồi thử từng hàng ghế và lái thử. Đội ngũ tư vấn hỗ trợ báo giá, thủ tục và trả góp.",
  /**
   * PLACEHOLDER — chưa có ảnh showroom thực tế. Khi có ảnh, đặt vào public/images/marketing/showroom/
   * và thêm vào mảng này; section Showroom sẽ dùng ảnh thật thay cho ảnh khu vực.
   */
  photos: [] as { src: string; alt: string }[],
  area: {
    src: "/images/marketing/lifestyle/trang-an.webp",
    alt: "Thuyền trên sông giữa núi đá vôi Tràng An, Ninh Bình",
    caption: "Tràng An, Ninh Bình — ảnh khu vực, không phải ảnh showroom",
  },
}

/**
 * Ghi nhận nguồn ảnh (bắt buộc theo giấy phép Creative Commons).
 * Khi thay bằng ảnh tự chụp, xóa mục tương ứng.
 */
export const imageCredits = [
  {
    file: "lifestyle/trang-an.webp",
    subject: "Quần thể Tràng An",
    author: "Jakub Hałun",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_Vietnam,_20240202_1433_5283.jpg",
  },
] as const
