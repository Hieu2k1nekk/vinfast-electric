/**
 * MARKETING ASSETS — ảnh & nội dung quảng bá (KHÔNG phải ảnh sản phẩm).
 * Ảnh nằm trong public/images/marketing/. Ảnh sản phẩm chỉ lấy từ src/data/vehicles.ts.
 */

export const heroCopy = {
  title: "Showroom ô tô điện VinFast tại Ninh Bình",
  kicker: "Electric Night · Ninh Bình",
  lead: "Chọn chiếc VinFast của bạn. Xem màu thật, tính trả góp và hẹn lái thử ngay tại showroom Hoa Lư.",
  /** Mẫu xe hiển thị đầu tiên ở hero. */
  defaultModel: "vf7",
  backdrop: {
    src: "/images/marketing/hero/hang-mua.webp",
    alt: "Toàn cảnh núi đá vôi và đồng lúa Ninh Bình nhìn từ Hang Múa",
  },
}

export const manifesto = [
  { value: "11", label: "Dòng xe điện đang phân phối" },
  { value: "01", label: "Showroom tại Hoa Lư, Ninh Bình" },
  { value: "08–20h", label: "Mở cửa mỗi ngày" },
] as const

export const showroom = {
  title: "Showroom Hoa Lư",
  intro:
    "Đến xem xe tận nơi, ngồi thử từng hàng ghế và lái thử trên cung đường Ninh Bình. Đội ngũ tư vấn hỗ trợ báo giá, thủ tục và trả góp trong một buổi.",
  /**
   * PLACEHOLDER — chưa có ảnh showroom thực tế. Khi có ảnh, đặt vào public/images/marketing/showroom/
   * và thêm vào mảng này; section Showroom sẽ ưu tiên ảnh thật thay cho ảnh phong cảnh.
   */
  photos: [] as { src: string; alt: string }[],
  scenery: {
    main: { src: "/images/marketing/showroom/hoa-lu-dem.webp", alt: "Hoa Lư, Ninh Bình về đêm với tháp sáng đèn phản chiếu trên mặt sông" },
    side: { src: "/images/marketing/lifestyle/trang-an.webp", alt: "Thuyền trên sông giữa núi đá vôi Tràng An, Ninh Bình" },
  },
}

export const offersBanner = {
  src: "/images/marketing/banners/dong-lua-nui-da.webp",
  alt: "Cánh đồng lúa xanh dưới dãy núi đá vôi Tam Cốc, Ninh Bình",
}

export const purchaseSteps = [
  { title: "Đăng ký", description: "Để lại thông tin hoặc gọi hotline, chuyên viên sẽ liên hệ lại." },
  { title: "Lái thử & báo giá", description: "Trải nghiệm xe thực tế và nhận báo giá chi tiết." },
  { title: "Ký hợp đồng", description: "Hoàn thiện thủ tục mua xe hoặc hồ sơ vay ngân hàng." },
  { title: "Nhận xe", description: "Bàn giao xe, hướng dẫn sử dụng và kích hoạt dịch vụ." },
] as const

/**
 * Ghi nhận nguồn ảnh (bắt buộc theo giấy phép Creative Commons).
 * Khi thay bằng ảnh tự chụp, xóa mục tương ứng.
 */
export const imageCredits = [
  {
    file: "hero/hang-mua.webp",
    subject: "Hang Múa, Ninh Bình",
    author: "lumoplank",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Ninh_Binh_-_NinhBinh1648.jpg",
  },
  {
    file: "showroom/hoa-lu-dem.webp",
    subject: "Hoa Lư về đêm",
    author: "JakobHosp",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Ninh_Binh_Hoa_Lu_(60591).jpg",
  },
  {
    file: "lifestyle/trang-an.webp",
    subject: "Quần thể Tràng An",
    author: "Jakub Hałun",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_Vietnam,_20240202_1433_5283.jpg",
  },
  {
    file: "banners/dong-lua-nui-da.webp",
    subject: "Tam Cốc, Ninh Bình",
    author: "Andre Hospers",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Tam_Coc_Ninh_Binh_(29079).jpg",
  },
] as const
