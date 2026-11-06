# VinFast Electric — Landing page showroom Ninh Bình

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript strict · Tailwind CSS v4 · shadcn/ui (Radix) · motion · Swiper · React Hook Form + Zod · Sonner.

## Chạy dự án

```bash
npm install
npm run dev            # http://localhost:3000 (dùng -- -p 3100 nếu cổng 3000 đang bận)
npm run build && npm start
```

Sao chép `.env.example` thành `.env.local` và điền giá trị.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `src/app` | `page.tsx` (trang chủ), `xe/[id]` (trang chi tiết xe), `chinh-sach-bao-mat`, `api/lead` (nhận đăng ký), sitemap, robots |
| `src/proxy.ts` | Trả HTTP 404 cho mã xe không tồn tại |
| `src/components/layout` | Header sticky (hotline + Nhận báo giá), menu mobile, footer, thanh CTA đáy mobile (Gọi ngay / Nhận báo giá / Lái thử) |
| `src/components/marketing` | `HeroSlider`, `QuickBar`, ưu đãi, trả góp, `WhyChooseUs`, showroom + bản đồ, FAQ, form đăng ký |
| `src/components/vehicle` | `VehicleGrid` (lọc Mini/SUV/MPV/Thương mại) + `VehicleCard` (đổi màu), cấu hình màu, gallery, thông số |
| `src/components/calculator` | Bộ tính trả góp |
| `src/config/site.ts` | Tên đại lý, hotline, địa chỉ, mạng xã hội, bật/tắt section |
| `src/data` | `vehicles.ts` (giá, màu, ảnh — kế thừa), `catalog.ts`, `offers.ts`, `faqs.ts`, `finance.ts`, `marketing.ts`, `lead.ts` |
| `src/services` | Gửi lead (client) và chuyển tiếp webhook (server) |

## Cập nhật nội dung

- **Giá / xe / màu:** `src/data/vehicles.ts`. Ảnh tại `public/images/vehicles/<id>/`.
- **Ưu đãi:** `src/data/offers.ts` — chỉ ghi chương trình đã được xác nhận.
- **Lãi suất mặc định của bộ tính:** `src/data/finance.ts` (chỉ là giả định minh họa).
- **Banner hero:** `heroSlides` trong `src/data/marketing.ts`. Xe nổi bật trong lưới: `FEATURED_ID` trong `VehicleGrid.tsx`.
- **Ẩn một section:** `sectionVisibility` trong `src/config/site.ts`.

## Placeholder cần thay trước khi công bố

- `siteConfig.dealerName`, `NEXT_PUBLIC_SITE_URL` (domain).
- `LEAD_WEBHOOK_URL` — đặt trước khi `npm run build`. Chưa có thì form báo lỗi "chưa kết nối" và hướng khách gọi/Zalo (không hiển thị thành công giả).
- Giờ mở cửa (`siteConfig.openingHours`) — kế thừa, cần xác nhận.
- Ảnh showroom thật (`showroom.photos` trong `src/data/marketing.ts`) — hiện dùng ảnh phong cảnh Ninh Bình có ghi nguồn.
- Chính sách bảo hành trong `src/data/faqs.ts`.
- Tên pháp nhân và thời gian lưu trữ dữ liệu trong `src/app/chinh-sach-bao-mat/page.tsx`.
- Hạn ưu đãi (`validUntil` trong `src/data/offers.ts`) — để trống thì hiển thị "liên hệ để xác nhận".

Ảnh phong cảnh Ninh Bình dùng giấy phép CC0 / CC BY 4.0 — ghi nguồn ở footer (`imageCredits`).
