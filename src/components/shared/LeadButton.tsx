"use client"

import { requestLead, type LeadPrefill } from "@/lib/lead-events"
import { Button } from "@/components/ui/button"

type LeadButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & { prefill?: LeadPrefill }

/** Nút CTA dùng được trong Server Component: cuộn tới form và điền sẵn thông tin. */
export function LeadButton({ prefill, ...props }: LeadButtonProps) {
  return <Button {...props} onClick={() => requestLead(prefill)} />
}
