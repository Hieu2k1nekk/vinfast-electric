"use client"

import { LazyMotion, MotionConfig, domAnimation } from "motion/react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "!rounded-sm !border-white/15 !bg-[#17191e] !text-[#f5f5f2] !font-sans !text-[14px]",
              description: "!text-[#96989f]",
              actionButton: "!rounded-sm !bg-[#3ddc97] !text-[#06140d] !font-semibold",
            },
          }}
        />
      </MotionConfig>
    </LazyMotion>
  )
}
