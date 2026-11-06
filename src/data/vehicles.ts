/**
 * Danh sách dòng xe — thêm / sửa / xóa xe tại đây. Thứ tự trong mảng = thứ tự hiển thị.
 *
 * GIÁ & THÔNG SỐ: theo trang chính hãng vinfastauto.com (đối chiếu 11/2026).
 * Giá thay đổi thường xuyên — BẮT BUỘC đối chiếu bảng giá chính hãng trước khi công bố.
 * ẢNH: ảnh chính hãng VinFast, lưu tại public/images/vehicles/<id>/ (avatar.webp = ảnh tách nền cho thẻ xe).
 */

export type VehicleSpec = {
  label: string
  value: string
}

export type GalleryImage = {
  src: string
  label: string
  /** "contain" cho ảnh xe tách nền (màu sơn), "cover" cho ảnh chụp thực tế / nội thất. */
  fit: "contain" | "cover"
  /** Mã màu hiển thị ở ô chọn màu — chỉ có ở ảnh thể hiện một màu sơn. */
  color?: string
}

export type Vehicle = {
  id: string
  name: string
  segment: string
  tagline: string
  description: string
  /** Giá niêm yết thấp nhất (VNĐ). `null` → hiển thị "Liên hệ". */
  priceFrom: number | null
  priceNote: string
  /** Phụ phí màu sơn nâng cao (VNĐ). Bỏ trống nếu chưa có thông tin. */
  premiumPaintFee?: number
  /** Ảnh xe tách nền dùng cho thẻ sản phẩm. */
  image: {
    src: string
    alt: string
  }
  gallery: GalleryImage[]
  highlights: VehicleSpec[]
  versions?: string[]
}

const PRICE_NOTE = "Giá niêm yết theo vinfastauto.com, cập nhật 11/2026"

/**
 * Ảnh trong public/images/vehicles/<id>/ — "c" = ảnh màu sơn tách nền, "p" = ảnh chụp.
 * Mã màu (tùy chọn) → ảnh xuất hiện trong dòng "Chọn màu" ở trang chi tiết.
 */
function gallery(id: string, items: [file: string, label: string, kind: "c" | "p", color?: string][]): GalleryImage[] {
  return items.map(([file, label, kind, color]) => ({
    src: `/images/vehicles/${id}/${file}.webp`,
    label,
    fit: kind === "c" ? "contain" : "cover",
    color,
  }))
}

function avatar(id: string, name: string, color: string) {
  return { src: `/images/vehicles/${id}/avatar.webp`, alt: `VinFast ${name} màu ${color} nhìn ngang` }
}

export const vehicles: Vehicle[] = [
  {
    id: "vf2",
    name: "VF 2",
    segment: "Xe đô thị cỡ nhỏ",
    tagline: "Ô tô đầu đời, ước mơ trong tầm với",
    description:
      "Mẫu xe điện mini 4 chỗ nhỏ gọn, dễ lái và dễ đỗ — lựa chọn lý tưởng để lên đời bốn bánh với chi phí sử dụng thấp.",
    priceFrom: 188_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 8_000_000,
    image: avatar("vf2", "VF 2", "be"),
    gallery: gallery("vf2", [
      ["be", "Màu be", "c", "#D8C29E"],
      ["vang", "Màu vàng", "c", "#F2D33C"],
      ["xanh-mint", "Màu xanh mint", "c", "#9EC48C"],
      ["hong", "Màu hồng", "c", "#E6B9D5"],
      ["trang", "Màu trắng", "c", "#F4F4F2"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe-sau", "Nội thất · Hàng ghế sau", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "210 km" },
      { label: "Số chỗ", value: "4 chỗ" },
      { label: "Công suất", value: "30 kW" },
    ],
  },
  {
    id: "vf3",
    name: "VF 3",
    segment: "Xe đô thị cỡ nhỏ",
    tagline: "Nhỏ gọn, cá tính cho phố thị",
    description:
      "Mẫu xe điện cỡ nhỏ với thiết kế vuông vức trẻ trung, dễ dàng xoay trở và đỗ xe trong đô thị đông đúc.",
    priceFrom: 285_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 8_000_000,
    image: avatar("vf3", "VF 3", "vàng"),
    gallery: gallery("vf3", [
      ["vang", "Màu vàng", "c", "#F2D33C"],
      ["do", "Màu đỏ", "c", "#E0342E"],
      ["xanh-urban", "Màu xanh urban", "c", "#8E9A86"],
      ["trang", "Màu trắng", "c", "#F4F4F2"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "215 km" },
      { label: "Số chỗ", value: "4 chỗ" },
      { label: "Công suất", value: "30 kW" },
    ],
    versions: ["Eco", "Plus"],
  },
  {
    id: "vf5",
    name: "VF 5",
    segment: "SUV đô thị · Hạng A",
    tagline: "Năng động, linh hoạt mỗi ngày",
    description:
      "SUV điện hạng A với khoang cabin rộng rãi, trang bị tiện nghi hiện đại, lý tưởng cho gia đình trẻ.",
    priceFrom: 496_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 8_000_000,
    image: avatar("vf5", "VF 5", "bạc"),
    gallery: gallery("vf5", [
      ["do", "Màu đỏ", "c", "#E0262E"],
      ["vang", "Màu vàng", "c", "#F2CF1F"],
      ["xanh-duong", "Màu xanh dương", "c", "#6DB3DC"],
      ["xam", "Màu xám", "c", "#77797C"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "326 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "100 kW" },
    ],
  },
  {
    id: "vf6",
    name: "VF 6",
    segment: "SUV · Hạng B",
    tagline: "Thiết kế tinh tế, công nghệ thông minh",
    description:
      "Đường nét thanh lịch, nội thất tối giản cùng hệ thống hỗ trợ lái nâng cao — cân bằng giữa phong cách và thực dụng.",
    priceFrom: 646_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 8_000_000,
    image: avatar("vf6", "VF 6", "đỏ"),
    gallery: gallery("vf6", [
      ["do", "Màu đỏ", "c", "#A3202B"],
      ["xanh-mint", "Màu xanh rêu", "c", "#4D5C45"],
      ["bac", "Màu bạc", "c", "#9DA3AC"],
      ["den", "Màu đen", "c", "#1E1F21"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe-sau", "Nội thất · Hàng ghế sau", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "Đến 485 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "Đến 150 kW" },
    ],
    versions: ["Eco", "Plus"],
  },
  {
    id: "vf7",
    name: "VF 7",
    segment: "SUV coupé · Hạng C",
    tagline: "Thể thao, phá cách, đầy cảm xúc",
    description:
      "Ngôn ngữ thiết kế “Asymmetric Aeroflow” đậm chất thể thao, khoang lái hướng về người lái cùng hiệu năng mạnh mẽ.",
    priceFrom: 740_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 12_000_000,
    image: avatar("vf7", "VF 7", "đen"),
    gallery: gallery("vf7", [
      ["den", "Màu đen", "c", "#1E1F21"],
      ["do", "Màu đỏ", "c", "#C3202B"],
      ["trang", "Màu trắng", "c", "#F4F4F2"],
      ["xanh-mint", "Màu xanh rêu", "c", "#55633F"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe-truoc", "Nội thất · Hàng ghế trước", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "Đến 500 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "Đến 260 kW" },
    ],
    versions: ["Eco", "Plus 1 cầu", "Plus 2 cầu"],
  },
  {
    id: "vf8",
    name: "VF 8",
    segment: "SUV · Hạng D · Thế hệ mới",
    tagline: "Bản lĩnh. Phong cách. Công nghệ",
    description:
      "VF 8 thế hệ mới theo triết lý thiết kế Tech Fluid — dải đèn hình cánh chim, nội thất khoáng đạt và quãng đường tới 480 km mỗi lần sạc.",
    priceFrom: 899_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 12_000_000,
    image: avatar("vf8", "VF 8", "xanh dương"),
    gallery: gallery("vf8", [
      ["xanh-duong", "Màu xanh dương", "c", "#86A6C6"],
      ["trang", "Màu trắng", "c", "#E3E6EB"],
      ["den", "Màu đen", "c", "#1C1D20"],
      ["do", "Màu đỏ", "c", "#9C1B2B"],
      ["cam", "Màu cam", "c", "#B4471E"],
      ["tim", "Màu tím", "c", "#5B1E3B"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe-truoc", "Nội thất · Hàng ghế trước", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "480 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "170 kW" },
    ],
  },
  {
    id: "vf9",
    name: "VF 9",
    segment: "SUV full-size · Hạng E",
    tagline: "Đỉnh cao không gian & tiện nghi",
    description:
      "SUV điện cỡ lớn 7 chỗ với không gian ba hàng ghế rộng rãi, trang bị tiện nghi cao cấp và quãng đường di chuyển vượt trội.",
    priceFrom: 1_348_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 12_000_000,
    image: avatar("vf9", "VF 9", "xám"),
    gallery: gallery("vf9", [
      ["xanh", "Màu xanh", "p", "#2C4A3B"],
      ["den", "Màu đen", "p", "#1E1F21"],
      ["do", "Màu đỏ", "p", "#B3222C"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe", "Nội thất · Vô lăng", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "626 km" },
      { label: "Số chỗ", value: "6–7 chỗ" },
      { label: "Công suất", value: "300 kW" },
    ],
    versions: ["Eco", "Plus"],
  },
  {
    id: "limo",
    name: "Limo Green",
    segment: "MPV 7 chỗ",
    tagline: "Tương lai của di chuyển xanh",
    description:
      "Xe điện MPV 7 chỗ rộng rãi, vận hành êm ái và tiết kiệm — phù hợp cho gia đình đông người và kinh doanh dịch vụ.",
    priceFrom: 699_000_000,
    priceNote: PRICE_NOTE,
    image: avatar("limo", "Limo Green", "bạc"),
    gallery: gallery("limo", [
      ["bac", "Màu bạc", "c", "#C2C4C6"],
      ["trang", "Màu trắng", "c", "#F4F4F2"],
      ["den", "Màu đen", "c", "#1E1F21"],
      ["do", "Màu đỏ", "c", "#C8202B"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe-truoc", "Nội thất · Hàng ghế trước", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "450 km" },
      { label: "Số chỗ", value: "7 chỗ" },
      { label: "Công suất", value: "150 kW" },
    ],
  },
  {
    id: "mpv7",
    name: "MPV 7",
    segment: "MPV 7 chỗ",
    tagline: "Xe gia đình quốc dân thế hệ mới",
    description:
      "MPV điện 7 chỗ với ba hàng ghế linh hoạt, khoang hành lý rộng và tiện nghi cho mọi chuyến đi của cả gia đình.",
    priceFrom: 750_000_000,
    priceNote: PRICE_NOTE,
    premiumPaintFee: 10_000_000,
    image: avatar("mpv7", "MPV 7", "nâu"),
    gallery: gallery("mpv7", [
      ["nau", "Màu nâu", "c", "#4A3A32"],
      ["den", "Màu đen", "c", "#1E1F21"],
      ["do", "Màu đỏ", "c", "#C8202B"],
      ["trang", "Màu trắng", "c", "#D9DEE4"],
      ["xanh-duong", "Màu xanh dương", "c", "#2C4A73"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe-sau", "Nội thất · Hàng ghế sau", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "450 km" },
      { label: "Số chỗ", value: "7 chỗ" },
      { label: "Công suất", value: "150 kW" },
    ],
  },
  {
    id: "wild",
    name: "VF Wild",
    segment: "Bán tải điện",
    tagline: "Chất của người dẫn đầu",
    description:
      "Bán tải điện mạnh mẽ: chạy thuần điện trên 250 km, lên tới 1.000 km khi kết hợp xăng & điện, tải trọng thùng 750 kg.",
    priceFrom: 860_000_000,
    priceNote: PRICE_NOTE,
    image: avatar("wild", "VF Wild", "xám"),
    gallery: gallery("wild", [
      ["sa-mac", "Ngoại thất", "p"],
      ["dem", "Ngoại thất", "p"],
      ["noi-that", "Nội thất · Khoang lái", "p"],
      ["ghe", "Nội thất · Hàng ghế trước", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "Đến 1.000 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "160 kW" },
    ],
  },
  {
    id: "ecvan",
    name: "EC Van",
    segment: "Xe van chở hàng",
    tagline: "Biểu tượng mới của vận chuyển xanh",
    description:
      "Xe van điện nhỏ gọn, linh hoạt lưu thông nội đô — giải pháp vận tải hàng hóa tiết kiệm cho cửa hàng và doanh nghiệp.",
    priceFrom: 248_000_000,
    priceNote: PRICE_NOTE,
    image: avatar("ecvan", "EC Van", "trắng"),
    gallery: gallery("ecvan", [
      ["trang", "Màu trắng", "c", "#F4F4F2"],
      ["do", "Màu đỏ", "c", "#C2352B"],
      ["vang", "Màu vàng", "c", "#F2C81E"],
      ["xanh-mint", "Màu xanh rêu", "c", "#7FA05A"],
      ["thuc-te", "Ngoại thất", "p"],
    ]),
    highlights: [
      { label: "Quãng đường", value: "175 km" },
      { label: "Số chỗ", value: "2 chỗ" },
      { label: "Công suất", value: "30 kW" },
    ],
  },
]

export const PRICE_DISCLAIMER =
  "Giá niêm yết tham khảo, đã bao gồm VAT, chưa bao gồm ưu đãi và chi phí lăn bánh. Giá có thể thay đổi theo chính sách của VinFast — vui lòng liên hệ để nhận báo giá chính xác."

export function formatPrice(value: number | null): string {
  if (value === null) return "Liên hệ"
  if (value >= 1_000_000_000) {
    const ty = value / 1_000_000_000
    return `${ty.toLocaleString("vi-VN", { maximumFractionDigits: 3 })} tỷ`
  }
  return `${Math.round(value / 1_000_000).toLocaleString("vi-VN")} triệu`
}

export function formatCurrency(value: number): string {
  return `${Math.round(value).toLocaleString("vi-VN")} ₫`
}

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id)
}
