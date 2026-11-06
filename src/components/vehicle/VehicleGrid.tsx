"use client"

import { useState } from "react"

import { categories, type CategoryId } from "@/data/catalog"
import { vehicles } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { VehicleCard } from "@/components/vehicle/VehicleCard"

type Filter = CategoryId | "all"

/** Xe nổi bật ở chế độ "Tất cả" — hiển thị đầu tiên, thẻ rộng 2 cột trên desktop. */
const FEATURED_ID = "vf8"

/** Lưới xe 1 / 2 / 3 cột, lọc theo phân khúc. */
export function VehicleGrid() {
  const [filter, setFilter] = useState<Filter>("all")
  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tất cả", count: vehicles.length },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: c.ids.length })),
  ]

  const ids: readonly string[] | null = filter === "all" ? null : categories.find((c) => c.id === filter)!.ids
  const list = ids
    ? vehicles.filter((v) => ids.includes(v.id))
    : [...vehicles].sort((a, b) => Number(b.id === FEATURED_ID) - Number(a.id === FEATURED_ID))

  return (
    <div>
      <div role="group" aria-label="Lọc theo phân khúc" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => {
          const active = t.id === filter
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(t.id)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors",
                active
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-card text-foreground hover:border-line-strong"
              )}
            >
              {t.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[12px] tabular",
                  active ? "bg-white/15 text-white" : "bg-surface text-muted-foreground"
                )}
              >
                {t.count}
              </span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Đang hiển thị {list.length} dòng xe
      </p>

      <div key={filter} className="mt-6 grid grid-cols-1 gap-5 animate-in fade-in duration-300 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {list.map((v) => (
          <VehicleCard key={v.id} vehicle={v} featured={filter === "all" && v.id === FEATURED_ID} />
        ))}
      </div>
    </div>
  )
}
