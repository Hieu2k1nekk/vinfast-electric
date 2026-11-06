import { NextResponse, type NextRequest } from "next/server"

import { vehicles } from "@/data/vehicles"

const knownIds = new Set(vehicles.map((v) => v.id))

/**
 * Trang /xe/[id] được prerender một phần (Cache Components), nên notFound() trong page
 * chạy sau khi response đã bắt đầu stream với mã 200. Kiểm tra id ở đây để mã xe không tồn tại
 * nhận đúng HTTP 404 (rewrite tới một đường dẫn không có route → giao diện not-found.tsx).
 */
export function proxy(request: NextRequest) {
  const id = decodeURIComponent(request.nextUrl.pathname.split("/")[2] ?? "")
  if (knownIds.has(id)) return NextResponse.next()
  return NextResponse.rewrite(new URL("/_khong-tim-thay", request.url))
}

export const config = {
  matcher: "/xe/:id",
}
