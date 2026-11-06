/**
 * Chương trình ưu đãi — KẾ THỪA NGUYÊN VĂN từ dự án cũ (langding-vin/src/data/content.ts).
 * CẦN XÁC NHẬN với chính sách VinFast hiện hành trước khi công bố. Không tự thêm chương trình mới.
 * `headline` chỉ lấy lại con số lớn nhất đã có trong `tiers`, không phải số liệu mới.
 */
export type Offer = {
  id: string
  title: string
  headline: { value: string; caption: string }
  eligibility: string
  tiers: { models: string; value: string }[]
  note?: string
}

export const offers: Offer[] = [
  {
    id: "cong-an-bo-doi",
    title: "Công an – Bộ đội và nhân viên VN POST",
    headline: { value: "9%", caption: "MSRP · mức cao nhất" },
    eligibility:
      "Khách hàng đang phục vụ (đã biên chế) trong Quân đội nhân dân và Công an nhân dân Việt Nam và người thân (Vợ chồng/con cái/ tứ thân phụ mẫu)",
    tiers: [
      { models: "VF 2, VF 3 & Minio Green", value: "6% MSRP" },
      { models: "VF 9, VF 8 Thế hệ mới, Lạc Hồng 900 LX, EC Van & VF Wild", value: "7% MSRP" },
      { models: "Các dòng xe còn lại", value: "9% MSRP" },
    ],
  },
  {
    id: "doi-xang-sang-dien",
    title: "Đổi xăng sang điện",
    headline: { value: "9%", caption: "MSRP · mức cao nhất" },
    eligibility:
      "Khách hàng đang sở hữu xe ô tô xăng / xe máy xăng / xe máy điện VinFast / ô tô điện VinFast.",
    tiers: [
      { models: "VF 2, VF 3 & Minio Green", value: "3% MSRP" },
      { models: "VF 9, VF 8 Thế hệ mới, Lạc Hồng 900 LX, EC Van & VF Wild", value: "5% MSRP" },
      { models: "Các dòng xe còn lại", value: "9% MSRP" },
    ],
  },
  {
    id: "voucher-xe-xang",
    title: "Voucher xe xăng VinFast",
    headline: { value: "80tr", caption: "Voucher · mức cao nhất" },
    eligibility: "Khách hàng mua xe mới Fadil, Lux A, Lux SA sẽ được tặng voucher giảm giá.",
    tiers: [
      { models: "Fadil", value: "30 triệu" },
      { models: "Lux A", value: "60 triệu" },
      { models: "Lux SA", value: "80 triệu" },
    ],
    note: "Lưu ý: không cộng dồn với các chương trình khác.",
  },
  {
    id: "mien-phi-sac",
    title: "Miễn phí sạc",
    headline: { value: "2029", caption: "Miễn phí đến 10/02/2029" },
    eligibility: "Liên hệ để nhận hướng dẫn cụ thể.",
    tiers: [
      { models: "Thời hạn", value: "Đến 10/02/2029" },
      { models: "Áp dụng", value: "Tất cả các dòng xe" },
    ],
  },
]

export const OFFERS_DISCLAIMER =
  "Ưu đãi áp dụng theo chính sách VinFast từng thời kỳ và có thể thay đổi. Vui lòng liên hệ đại lý để xác nhận điều kiện và thời hạn trước khi mua."
