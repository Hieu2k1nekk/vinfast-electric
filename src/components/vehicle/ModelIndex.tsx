"use client"

import { useState } from "react"
import { AnimatePresence, m } from "motion/react"

import { categories, type CategoryId } from "@/data/catalog"
import { vehicles } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { ModelRow } from "@/components/vehicle/ModelRow"

type Filter = CategoryId | "all"

/** Danh mục xe dạng hàng ngang lớn, lọc theo phân khúc. */
export function ModelIndex() {
  const [filter, setFilter] = useState<Filter>("all")
  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tất cả", count: vehicles.length },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: c.ids.length })),
  ]
  const ids: readonly string[] | null = filter === "all" ? null : categories.find((c) => c.id === filter)!.ids
  const list = ids ? vehicles.filter((v) => ids.includes(v.id)) : vehicles
  const activeCategory = categories.find((c) => c.id === filter)

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border md:flex-row md:items-end md:justify-between">
        <div role="group" aria-label="Lọc theo phân khúc" className="no-scrollbar -mx-5 flex overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {tabs.map((t) => {
            const active = t.id === filter
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t.id)}
                className={cn(
                  "relative shrink-0 px-4 pt-2 pb-4 font-display text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors first:pl-0",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
                <sup className="ml-1 text-[10px] text-primary tabular">{String(t.count).padStart(2, "0")}</sup>
                {active && (
                  <m.span
                    layoutId="model-filter"
                    className="absolute inset-x-4 -bottom-px h-0.5 bg-primary group-first:left-0"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            )
          })}
        </div>
        <p className="hidden pb-4 text-sm text-muted-foreground md:block" aria-live="polite">
          {activeCategory ? activeCategory.description : "Toàn bộ dòng xe điện VinFast"}
        </p>
      </div>

      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((v) => (
            <m.li
              key={v.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-border"
            >
              <ModelRow vehicle={v} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
