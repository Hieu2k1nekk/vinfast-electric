import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Lỗi 404</p>
      <h1 className="heading mt-3 text-title">Không tìm thấy trang</h1>
      <p className="mt-4 max-w-md text-muted-foreground">Mẫu xe hoặc đường dẫn bạn tìm không tồn tại. Xem toàn bộ dòng xe đang phân phối.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/#dong-xe">Xem dòng xe</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </section>
  )
}
