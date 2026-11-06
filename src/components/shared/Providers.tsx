"use client"

import { LazyMotion, MotionConfig, domAnimation } from "motion/react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster
          theme="light"
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: "!rounded-xl !font-sans !text-[14px] !shadow-lift",
              actionButton: "!rounded-md !bg-[#1464f4] !text-white !font-semibold",
              cancelButton: "!rounded-md !font-semibold",
            },
          }}
        />
      </MotionConfig>
    </LazyMotion>
  )
}
