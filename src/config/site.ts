/**
 * Thông tin đại lý.
 * PLACEHOLDER — cần cập nhật trước khi triển khai: `dealerName` và `url` (hoặc đặt NEXT_PUBLIC_SITE_URL).
 */
export const siteConfig = {
  name: "VinFast Electric",
  dealerName: "Đại lý VinFast [Tên đại lý — cần cập nhật]",
  shortDescription:
    "Showroom ô tô điện VinFast tại Ninh Bình — xem xe, chọn màu, tính trả góp và đăng ký lái thử.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinfast-electric.example.com",
  locale: "vi_VN",
  hotline: {
    display: "086.727.1960",
    tel: "0867271960",
  },
  address: "Số 492, Đường 30/6, Phố Phúc Trì, Phường Hoa Lư, Tỉnh Ninh Bình",
  /** Kế thừa từ dự án cũ — cần xác nhận giờ mở cửa thực tế. */
  openingHours: "08:00 – 20:00, tất cả các ngày trong tuần",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Số 492 Đường 30/6, Phúc Trì, Hoa Lư, Ninh Bình"),
  social: {
    zalo: "https://zalo.me/0867271960",
    facebook: "https://www.facebook.com/profile.php?id=61596056886051",
  },
} as const

/** Mã neo của các section trên trang chủ. */
export const anchors = {
  models: "dong-xe",
  offers: "uu-dai",
  finance: "tra-gop",
  showroom: "showroom",
  faq: "hoi-dap",
  lead: "lien-he",
} as const

export type SectionId = (typeof anchors)[keyof typeof anchors]

/** Bật / tắt từng section mà không cần sửa giao diện. */
export const sectionVisibility: Record<SectionId, boolean> = {
  "dong-xe": true,
  "uu-dai": true,
  "tra-gop": true,
  showroom: true,
  "hoi-dap": true,
  "lien-he": true,
}

export function isSectionVisible(id: SectionId) {
  return sectionVisibility[id]
}

const allNavItems: { label: string; id: SectionId }[] = [
  { label: "Dòng xe", id: anchors.models },
  { label: "Ưu đãi", id: anchors.offers },
  { label: "Trả góp", id: anchors.finance },
  { label: "Showroom", id: anchors.showroom },
  { label: "Liên hệ", id: anchors.lead },
]

/** Liên kết dạng "/#id" để dùng được cả từ trang chi tiết xe. */
export const navItems = allNavItems
  .filter((item) => isSectionVisible(item.id))
  .map((item) => ({ ...item, href: `/#${item.id}` }))
