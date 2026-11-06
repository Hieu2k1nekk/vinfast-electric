/**
 * Giới hạn tần suất đơn giản trong bộ nhớ (cửa sổ trượt).
 * Đủ cho một tiến trình Node (Plesk / `node server.js`). Nếu chạy nhiều instance, thay bằng Redis.
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)

  if (recent.length >= limit) {
    hits.set(key, recent)
    return { ok: false as const, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) }
  }

  recent.push(now)
  hits.set(key, recent)

  // Dọn các khóa cũ để bộ nhớ không phình ra.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)
    }
  }
  return { ok: true as const }
}
