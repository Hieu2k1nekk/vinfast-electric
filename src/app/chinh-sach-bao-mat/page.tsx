import type { Metadata } from "next"
import Link from "next/link"

import { privacyPath, siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin",
  description: "Cách chúng tôi thu thập và sử dụng thông tin khi bạn đăng ký tư vấn, báo giá hoặc lái thử xe VinFast.",
  alternates: { canonical: privacyPath },
}

/**
 * Nội dung chung, trung thực về việc dùng dữ liệu form.
 * CẦN ĐẠI LÝ XÁC NHẬN: tên pháp nhân, thời gian lưu trữ và đầu mối xử lý yêu cầu trước khi công bố.
 */
export default function PrivacyPage() {
  return (
    <article className="shell max-w-3xl py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="text-[13px] text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Trang chủ
        </Link>{" "}
        / Chính sách bảo mật
      </nav>
      <h1 className="heading mt-4 text-title">Chính sách bảo mật thông tin</h1>
      <p className="mt-3 text-[15px] text-muted-foreground">Áp dụng cho website của {siteConfig.dealerName}.</p>

      <div className="mt-8 space-y-7 text-[15px] leading-relaxed [&_h2]:text-[18px] [&_h2]:font-bold [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        <section>
          <h2>1. Thông tin chúng tôi thu thập</h2>
          <p className="mt-2">Khi bạn gửi form đăng ký tư vấn, báo giá, lái thử hoặc trả góp, chúng tôi nhận:</p>
          <ul>
            <li>Họ và tên, số điện thoại;</li>
            <li>Dòng xe quan tâm, nhu cầu và ngày lái thử mong muốn (nếu có).</li>
          </ul>
          <p className="mt-2">Website không yêu cầu đăng nhập và không thu thập thông tin thanh toán.</p>
        </section>

        <section>
          <h2>2. Mục đích sử dụng</h2>
          <p className="mt-2">
            Thông tin chỉ được dùng để liên hệ tư vấn theo đúng yêu cầu bạn gửi: báo giá, xếp lịch lái thử, tư vấn phương án trả góp và
            chương trình ưu đãi. Chúng tôi không bán hoặc chia sẻ thông tin cho bên thứ ba vì mục đích quảng cáo.
          </p>
        </section>

        <section>
          <h2>3. Lưu trữ và bảo vệ</h2>
          <p className="mt-2">
            Thông tin được chuyển tới hệ thống tiếp nhận của đại lý qua kết nối mã hoá (HTTPS) và chỉ nhân viên tư vấn phụ trách được truy cập.
          </p>
        </section>

        <section>
          <h2>4. Quyền của bạn</h2>
          <p className="mt-2">
            Bạn có thể yêu cầu xem, chỉnh sửa hoặc xoá thông tin đã gửi, hoặc yêu cầu ngừng liên hệ, bằng cách gọi hotline{" "}
            <a href={`tel:${siteConfig.hotline.tel}`} className="font-semibold text-primary hover:underline">
              {siteConfig.hotline.display}
            </a>{" "}
            hoặc đến showroom tại {siteConfig.address}.
          </p>
        </section>

        <section>
          <h2>5. Cập nhật chính sách</h2>
          <p className="mt-2">Chính sách có thể được cập nhật khi có thay đổi về cách xử lý thông tin. Phiên bản mới nhất luôn được đăng tại trang này.</p>
        </section>
      </div>
    </article>
  )
}
