"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Keyboard, Navigation } from "swiper/modules"
import { ArrowLeft, ArrowRight } from "lucide-react"
import "swiper/css"

import type { GalleryImage } from "@/data/vehicles"
import { useMounted } from "@/lib/use-mounted"

/** Ảnh chụp thực tế / nội thất — vuốt ngang. Swiper chỉ mount ở client. */
export function PhotoGallery({ name, photos }: { name: string; photos: GalleryImage[] }) {
  const mounted = useMounted()
  const prevId = `gallery-prev-${name.replace(/\W/g, "")}`
  const nextId = `gallery-next-${name.replace(/\W/g, "")}`

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button id={prevId} type="button" aria-label="Ảnh trước" className="inline-flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-primary hover:text-primary disabled:opacity-30">
          <ArrowLeft className="size-4" />
        </button>
        <button id={nextId} type="button" aria-label="Ảnh sau" className="inline-flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-primary hover:text-primary disabled:opacity-30">
          <ArrowRight className="size-4" />
        </button>
      </div>

      {mounted ? (
        <Swiper
          modules={[Navigation, Keyboard, A11y]}
          navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
          keyboard
          spaceBetween={12}
          slidesPerView={1.08}
          breakpoints={{ 768: { slidesPerView: 1.6, spaceBetween: 16 }, 1280: { slidesPerView: 2.2, spaceBetween: 20 } }}
          a11y={{ prevSlideMessage: "Ảnh trước", nextSlideMessage: "Ảnh sau" }}
          className="!overflow-visible"
        >
          {photos.map((p) => (
            <SwiperSlide key={p.src}>
              <Figure name={name} photo={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-[92%] overflow-hidden md:grid-cols-[62%]">
          {photos[0] && <Figure name={name} photo={photos[0]} />}
        </div>
      )}
    </div>
  )
}

function Figure({ name, photo }: { name: string; photo: GalleryImage }) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={photo.src}
          alt={`VinFast ${name} — ${photo.label}`}
          fill
          sizes="(min-width: 1280px) 45vw, (min-width: 768px) 62vw, 92vw"
          className={photo.fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{photo.label}</figcaption>
    </figure>
  )
}
