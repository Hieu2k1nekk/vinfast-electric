"use client"

import { useId, useState } from "react"
import { ArrowRight, Info } from "lucide-react"

import { FINANCE_DISCLAIMER, financeDefaults, repaymentMethods, type RepaymentMethod } from "@/data/finance"
import { formatCurrency, getVehicle, vehicles } from "@/data/vehicles"
import { clamp, estimateLoan, formatMoneyInput, parseMoney } from "@/lib/finance"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldRow, ResultLine } from "@/components/calculator/parts"

const CUSTOM = "tu-nhap"
const MAX_PRICE = 20_000_000_000

/** Bộ tính trả góp: cột nhập liệu (trắng) + cột kết quả (nền tối) với số tiền hàng tháng nổi bật. */
export function FinanceCalculator({ defaultVehicleId = "vf7" }: { defaultVehicleId?: string }) {
  const id = useId()
  const start = getVehicle(defaultVehicleId) ?? vehicles[0]
  const [vehicleId, setVehicleId] = useState<string>(start.id)
  const [price, setPrice] = useState(start.priceFrom ?? 0)
  const [downPayment, setDownPayment] = useState(((start.priceFrom ?? 0) * financeDefaults.downPaymentRatio) / 100)
  const [months, setMonths] = useState<number>(financeDefaults.defaultTerm)
  const [rateText, setRateText] = useState(String(financeDefaults.assumedRate))
  const [method, setMethod] = useState<RepaymentMethod>("declining")

  const ratio = price > 0 ? Math.round((downPayment / price) * 100) : 0
  const rate = clamp(Number(rateText.replace(",", ".")) || 0, 0, financeDefaults.maxRate)
  const result = estimateLoan({ price, downPayment, months, annualRate: rate, method })

  function changeVehicle(next: string) {
    setVehicleId(next)
    const v = getVehicle(next)
    if (v?.priceFrom) {
      setPrice(v.priceFrom)
      setDownPayment((v.priceFrom * ratio) / 100)
    }
  }

  function changePrice(raw: string) {
    const next = Math.min(parseMoney(raw), MAX_PRICE)
    setVehicleId(CUSTOM)
    setPrice(next)
    setDownPayment((next * ratio) / 100)
  }

  const moneyInput = "text-[16px] font-semibold tabular"

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-6">
      {/* Nhập liệu */}
      <div className="card space-y-6 p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldRow label="Mẫu xe" htmlFor={`${id}-vehicle`}>
            <Select value={vehicleId} onValueChange={changeVehicle}>
              <SelectTrigger id={`${id}-vehicle`} className="h-12 w-full text-[16px] font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    VinFast {v.name}
                  </SelectItem>
                ))}
                <SelectItem value={CUSTOM}>Tự nhập giá</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>

          <FieldRow label="Giá xe (VNĐ)" htmlFor={`${id}-price`} hint="Giá niêm yết tham khảo, có thể sửa">
            <Input
              id={`${id}-price`}
              inputMode="numeric"
              autoComplete="off"
              value={formatMoneyInput(price)}
              onChange={(e) => changePrice(e.target.value)}
              className={moneyInput}
            />
          </FieldRow>
        </div>

        <div className="rounded-xl bg-surface p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${id}-ratio`} className="text-[14px] font-semibold">
              Trả trước
            </label>
            <span className="text-[15px] font-bold text-primary tabular">{ratio}%</span>
          </div>
          <input
            id={`${id}-ratio`}
            type="range"
            min={financeDefaults.minRatio}
            max={financeDefaults.maxRatio}
            step={financeDefaults.ratioStep}
            value={clamp(ratio, financeDefaults.minRatio, financeDefaults.maxRatio)}
            onChange={(e) => setDownPayment((price * Number(e.target.value)) / 100)}
            className="range mt-3"
            style={{ "--fill": `${(clamp(ratio, 0, financeDefaults.maxRatio) / financeDefaults.maxRatio) * 100}%` } as React.CSSProperties}
            aria-valuetext={`${ratio}%`}
          />
          <div className="mt-1 flex justify-between text-[12px] text-muted-foreground tabular">
            <span>{financeDefaults.minRatio}%</span>
            <span>{financeDefaults.maxRatio}%</span>
          </div>
          <FieldRow label="Số tiền trả trước (VNĐ)" htmlFor={`${id}-down`} className="mt-3">
            <Input
              id={`${id}-down`}
              inputMode="numeric"
              autoComplete="off"
              value={formatMoneyInput(downPayment)}
              onChange={(e) => setDownPayment(Math.min(parseMoney(e.target.value), price))}
              className={moneyInput}
            />
          </FieldRow>
        </div>

        <fieldset>
          <legend className="text-[14px] font-semibold">Thời hạn vay</legend>
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {financeDefaults.terms.map((t) => {
              const active = t === months
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${t / 12} năm (${t} tháng)`}
                  onClick={() => setMonths(t)}
                  className={cn(
                    "flex h-12 flex-col items-center justify-center rounded-lg border text-[15px] font-bold tabular transition-colors",
                    active ? "border-primary bg-primary text-white" : "border-border bg-card hover:border-primary hover:text-primary"
                  )}
                >
                  {t / 12}
                  <span className={cn("text-[11px] font-medium", active ? "text-white/80" : "text-muted-foreground")}>năm</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldRow
            label="Lãi suất (%/năm)"
            htmlFor={`${id}-rate`}
            aside={<span className="rounded bg-[#fff4e5] px-1.5 py-0.5 text-[11px] font-semibold text-[#9a5b00]">Giả định</span>}
            hint="Nhập theo ngân hàng bạn chọn"
          >
            <Input
              id={`${id}-rate`}
              inputMode="decimal"
              autoComplete="off"
              value={rateText}
              onChange={(e) => setRateText(e.target.value.replace(/[^\d.,]/g, "").slice(0, 5))}
              className={moneyInput}
            />
          </FieldRow>

          <fieldset>
            <legend className="text-[14px] font-semibold">Cách tính lãi</legend>
            <div className="mt-2 grid h-12 grid-cols-2 gap-1 rounded-lg bg-surface p-1">
              {repaymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={m.id === method}
                  title={m.hint}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "rounded-md px-2 text-[13px] font-semibold transition-colors",
                    m.id === method ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[12px] text-muted-foreground">{repaymentMethods.find((m) => m.id === method)?.hint}</p>
          </fieldset>
        </div>
      </div>

      {/* Kết quả */}
      <div className="theme-dark rounded-xl bg-background p-5 text-foreground sm:p-7 lg:p-8">
        <div className="lg:sticky lg:top-28">
          <p className="text-[14px] font-medium text-muted-foreground">
            {method === "declining" ? "Trả tháng đầu tiên (ước tính)" : "Trả mỗi tháng (ước tính)"}
          </p>
          <p className="heading mt-2 text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-white tabular" aria-live="polite">
            {formatCurrency(result.firstPayment)}
          </p>
          {method === "declining" && result.principal > 0 && (
            <p className="mt-2 text-[14px] text-muted-foreground">
              Giảm dần còn khoảng <span className="font-semibold text-foreground tabular">{formatCurrency(result.lastPayment)}</span> ở tháng thứ {months}
            </p>
          )}

          <dl className="mt-6 rounded-lg border border-border px-4">
            <ResultLine label="Trả trước" value={formatCurrency(downPayment)} />
            <ResultLine label="Khoản vay" value={formatCurrency(result.principal)} />
            <ResultLine label={`Tổng lãi (${months} tháng)`} value={formatCurrency(result.totalInterest)} />
            <ResultLine label="Tổng gốc + lãi" value={formatCurrency(result.totalPayable)} strong />
          </dl>

          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={() => requestLead({ need: "tra-gop", vehicle: vehicleId === CUSTOM ? undefined : vehicleId })}
          >
            Nhận phương án trả góp
            <ArrowRight />
          </Button>
          <p className="mt-4 flex gap-2 text-[12px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            {FINANCE_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  )
}
