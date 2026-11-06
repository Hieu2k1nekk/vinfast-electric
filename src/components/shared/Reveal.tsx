"use client"

import { m, type HTMLMotionProps } from "motion/react"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  /** Quãng đường (px) phần tử đi lên khi xuất hiện. */
  y?: number
}

/** Hiện dần nhẹ một lần khi cuộn tới (tôn trọng prefers-reduced-motion qua MotionConfig). */
export function Reveal({ delay = 0, y = 16, children, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </m.div>
  )
}
