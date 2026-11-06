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
    <nav aria-label="Mẫu xe khác" className="shell grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 md:pb-20">
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
      className={cn("card group flex items-center gap-4 p-4 transition-shadow hover:shadow-lift sm:p-5", isNext && "sm:flex-row-reverse sm:text-right")}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
        {isNext ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] text-muted-foreground">{isNext ? "Mẫu tiếp theo" : "Mẫu trước"}</span>
        <span className="block text-[18px] font-bold group-hover:text-primary">VinFast {vehicle.name}</span>
        <span className="block text-[14px] text-muted-foreground tabular">Từ {formatPrice(vehicle.priceFrom)}</span>
      </span>
      <span className="relative hidden aspect-[2/1] w-32 shrink-0 md:block">
        <Image src={vehicle.image.src} alt="" fill sizes="128px" className="object-contain" />
      </span>
    </Link>
  )
}
