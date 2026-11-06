"use client"

import Link from "next/link"
import { useEffect, useId, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, startOfToday } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarDays, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

import { privacyPath, siteConfig } from "@/config/site"
import { needs } from "@/data/lead"
import { vehicles } from "@/data/vehicles"
import { onLeadRequest } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { leadFormSchema, type LeadFormInput, type LeadFormValues } from "@/lib/validations/lead"
import { submitLead } from "@/services/lead.service"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input, fieldClassName } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const EMPTY: LeadFormInput = {
  fullName: "",
  phone: "",
  vehicle: "",
  need: "mua-xe",
  testDriveDate: undefined,
}

/**
 * Form rút gọn: Họ tên · SĐT · Dòng xe · Nhu cầu (+ ngày lái thử khi chọn "Lái thử").
 * Chỉ báo thành công khi API trả về ok — không có thông báo thành công giả.
 */
export function LeadForm({ defaultVehicle, source }: { defaultVehicle?: string; source: string }) {
  const id = useId()
  const [website, setWebsite] = useState("")
  const [dateOpen, setDateOpen] = useState(false)

  const { register, control, handleSubmit, setValue, watch, reset, formState } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { ...EMPTY, vehicle: defaultVehicle ?? "" },
  })
  const { errors, isSubmitting } = formState
  const need = watch("need")

  // Các CTA trên trang điền sẵn dòng xe / nhu cầu.
  useEffect(
    () =>
      onLeadRequest((prefill) => {
        if (prefill.vehicle) setValue("vehicle", prefill.vehicle, { shouldValidate: !!errors.vehicle })
        if (prefill.need) setValue("need", prefill.need)
        window.setTimeout(() => document.getElementById(`${id}-name`)?.focus({ preventScroll: true }), 700)
      }),
    [id, setValue, errors.vehicle]
  )

  async function onSubmit(values: LeadFormValues) {
    const result = await submitLead(
      { ...values, testDriveDate: values.need === "lai-thu" ? values.testDriveDate : undefined },
      { source, website }
    )
    if (result.ok) {
      toast.success("Đã nhận thông tin của bạn", { description: "Chuyên viên sẽ liên hệ lại trong giờ làm việc." })
      reset({ ...EMPTY, vehicle: values.vehicle })
      return
    }
    const userFixable = result.code === "INVALID" || result.code === "RATE_LIMITED"
    toast.error(userFixable ? result.message : "Chưa gửi được đăng ký", {
      description: userFixable
        ? undefined
        : result.code === "NOT_CONFIGURED"
          ? `${result.message} Hotline: ${siteConfig.hotline.display}.`
          : `${result.message} Vui lòng gọi ${siteConfig.hotline.display} hoặc nhắn Zalo.`,
      duration: 12_000,
      action: {
        label: "Gọi ngay",
        onClick: () => {
          window.location.href = `tel:${siteConfig.hotline.tel}`
        },
      },
      cancel: {
        label: "Zalo",
        onClick: () => window.open(siteConfig.social.zalo, "_blank", "noopener,noreferrer"),
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      {/* Honeypot: ẩn với người dùng và trình đọc màn hình */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <fieldset>
        <legend className="text-[14px] font-semibold">Bạn cần</legend>
        <Controller
          control={control}
          name="need"
          render={({ field }) => (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {needs.map((n) => {
                const active = field.value === n.value
                return (
                  <button
                    key={n.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => field.onChange(n.value)}
                    className={cn(
                      "rounded-lg border px-2 py-2.5 text-center transition-colors sm:px-3",
                      active ? "border-primary bg-primary-soft text-primary ring-1 ring-primary" : "border-input bg-card hover:border-primary/60"
                    )}
                  >
                    <span className="block text-[15px] font-bold">{n.label}</span>
                    <span className={cn("mt-0.5 hidden text-[12px] sm:block", active ? "text-primary/80" : "text-muted-foreground")}>
                      {n.description}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        />
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" htmlFor={`${id}-name`} error={errors.fullName?.message}>
          <Input id={`${id}-name`} autoComplete="name" placeholder="Nguyễn Văn A" aria-invalid={!!errors.fullName} {...register("fullName")} />
        </Field>
        <Field label="Số điện thoại" htmlFor={`${id}-phone`} error={errors.phone?.message}>
          <Input
            id={`${id}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0912 345 678"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className={cn("grid grid-cols-1 gap-5", need === "lai-thu" && "sm:grid-cols-2")}>
        <Field label="Dòng xe quan tâm" htmlFor={`${id}-vehicle`} error={errors.vehicle?.message}>
          <Controller
            control={control}
            name="vehicle"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={`${id}-vehicle`} className="h-12 w-full" aria-invalid={!!errors.vehicle} onBlur={field.onBlur}>
                  <SelectValue placeholder="Chọn dòng xe" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      VinFast {v.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="chua-chon">Chưa chọn — cần tư vấn</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        {need === "lai-thu" && (
          <Field label="Ngày lái thử (không bắt buộc)" htmlFor={`${id}-date`}>
            <Controller
              control={control}
              name="testDriveDate"
              render={({ field }) => (
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <button
                      id={`${id}-date`}
                      type="button"
                      className={cn(fieldClassName, "flex h-12 items-center justify-between px-4 text-left", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "EEEE, dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                      <CalendarDays className="size-4 opacity-60" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={vi}
                      selected={field.value}
                      onSelect={(d) => {
                        field.onChange(d)
                        setDateOpen(false)
                      }}
                      disabled={{ before: startOfToday() }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </Field>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
        {isSubmitting ? "Đang gửi…" : need === "lai-thu" ? "Đăng ký lái thử" : need === "tra-gop" ? "Nhận phương án trả góp" : "Nhận báo giá"}
      </Button>
      <p className="text-center text-[12px] leading-relaxed text-muted-foreground">
        Thông tin chỉ dùng để liên hệ tư vấn. Xem{" "}
        <Link href={privacyPath} className="underline underline-offset-2 hover:text-foreground">
          chính sách bảo mật
        </Link>
        .
      </p>
    </form>
  )
}

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="text-[14px] font-semibold">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
