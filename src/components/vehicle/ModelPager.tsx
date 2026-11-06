import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { neighbours } from "@/data/catalog"
import { formatPrice, type Vehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"

/** Chuyển sang mẫu xe trước / sau. */
export function ModelPager({ vehicle }: { vehicle: Vehicle }) {
  const { prev, next } = neighbours(vehicle)

  return (
    <nav aria-label="Mẫu xe khác" className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
      <PagerLink vehicle={prev} direction="prev" />
      <PagerLink vehicle={next} direction="next" />
    </nav>
  )
}

function PagerLink({ vehicle, direction }: { vehicle: Vehicle; direction: "prev" | "next" }) {
  const isNext = direction === "next"
  return (
    <Link
      href={`/xe/${vehicle.id}`}
      className={cn("group flex items-center gap-5 bg-background px-5 py-8 transition-colors hover:bg-accent sm:px-10", isNext && "sm:flex-row-reverse sm:text-right")}
    >
      <span className="inline-flex size-11 shrink-0 items-center justify-center border border-line-strong transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
        {isNext ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="kicker block">{isNext ? "Mẫu tiếp theo" : "Mẫu trước"}</span>
        <span className="mt-1 block font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">{vehicle.name}</span>
        <span className="mt-1 block text-sm text-muted-foreground tabular">Từ {formatPrice(vehicle.priceFrom)}</span>
      </span>
      <span className="relative hidden aspect-[1200/640] w-36 shrink-0 transition-transform duration-500 ease-editorial group-hover:scale-105 md:block">
        <Image src={vehicle.image.src} alt="" fill sizes="144px" className="object-contain" />
      </span>
    </Link>
  )
}
