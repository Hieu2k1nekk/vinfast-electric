"use client"

import { useId, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { FINANCE_DISCLAIMER, financeDefaults, repaymentMethods, type RepaymentMethod } from "@/data/finance"
import { formatCurrency, getVehicle, vehicles } from "@/data/vehicles"
import { clamp, estimateLoan, formatMoneyInput, parseMoney } from "@/lib/finance"
import { requestLead } from "@/lib/lead-events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldRow, ResultLine } from "@/components/calculator/parts"

const CUSTOM = "tu-nhap"
const MAX_PRICE = 20_000_000_000

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

  return (
    <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-12">
      {/* Thông số đầu vào */}
      <div className="space-y-9 bg-background p-6 sm:p-10 lg:col-span-7">
        <FieldRow label="Mẫu xe" htmlFor={`${id}-vehicle`}>
          <Select value={vehicleId} onValueChange={changeVehicle}>
            <SelectTrigger id={`${id}-vehicle`} className="font-display text-lg font-semibold">
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

        <FieldRow label="Giá xe (VNĐ)" htmlFor={`${id}-price`} hint="Giá niêm yết tham khảo — có thể sửa">
          <Input
            id={`${id}-price`}
            inputMode="numeric"
            autoComplete="off"
            value={formatMoneyInput(price)}
            onChange={(e) => changePrice(e.target.value)}
            className="font-display text-lg font-semibold tabular"
          />
        </FieldRow>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <Label htmlFor={`${id}-ratio`} className="kicker">
              Tỷ lệ trả trước
            </Label>
            <span className="font-display text-2xl font-bold tabular">{ratio}%</span>
          </div>
          <input
            id={`${id}-ratio`}
            type="range"
            min={financeDefaults.minRatio}
            max={financeDefaults.maxRatio}
            step={financeDefaults.ratioStep}
            value={clamp(ratio, financeDefaults.minRatio, financeDefaults.maxRatio)}
            onChange={(e) => setDownPayment((price * Number(e.target.value)) / 100)}
            className="range mt-4"
            style={{ "--fill": `${(clamp(ratio, 0, financeDefaults.maxRatio) / financeDefaults.maxRatio) * 100}%` } as React.CSSProperties}
            aria-valuetext={`${ratio}%`}
          />
          <div className="mt-5">
            <FieldRow label="Số tiền trả trước (VNĐ)" htmlFor={`${id}-down`}>
              <Input
                id={`${id}-down`}
                inputMode="numeric"
                autoComplete="off"
                value={formatMoneyInput(downPayment)}
                onChange={(e) => setDownPayment(Math.min(parseMoney(e.target.value), price))}
                className="font-display text-lg font-semibold tabular"
              />
            </FieldRow>
          </div>
        </div>

        <fieldset>
          <legend className="kicker mb-4">Thời hạn vay</legend>
          <div className="grid grid-cols-4 gap-px border border-border bg-border sm:grid-cols-8">
            {financeDefaults.terms.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={t === months}
                onClick={() => setMonths(t)}
                className={cn(
                  "flex h-14 flex-col items-center justify-center bg-background font-display transition-colors",
                  t === months ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
              >
                <span className="text-base font-bold tabular">{t / 12}</span>
                <span className="text-[10px] opacity-70">năm</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-9 sm:grid-cols-2">
          <FieldRow label="Lãi suất (%/năm)" htmlFor={`${id}-rate`} hint="Giả định — nhập theo ngân hàng bạn chọn">
            <Input
              id={`${id}-rate`}
              inputMode="decimal"
              autoComplete="off"
              value={rateText}
              onChange={(e) => setRateText(e.target.value.replace(/[^\d.,]/g, "").slice(0, 5))}
              className="font-display text-lg font-semibold tabular"
            />
          </FieldRow>

          <fieldset>
            <legend className="kicker mb-3">Cách tính</legend>
            <div className="grid grid-cols-2 gap-px border border-border bg-border">
              {repaymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={m.id === method}
                  title={m.hint}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "min-h-12 bg-background px-2 text-[12px] font-semibold transition-colors",
                    m.id === method ? "bg-foreground text-background" : "hover:bg-accent"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{repaymentMethods.find((m) => m.id === method)?.hint}</p>
          </fieldset>
        </div>
      </div>

      {/* Kết quả */}
      <div className="bg-surface p-6 sm:p-10 lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="kicker">{method === "declining" ? "Ước tính tháng đầu tiên" : "Ước tính mỗi tháng"}</p>
          <p className="display mt-4 text-[clamp(2.5rem,6vw,4.25rem)] text-primary tabular" aria-live="polite">
            {formatCurrency(result.firstPayment)}
          </p>
          {method === "declining" && result.principal > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Giảm dần tới khoảng <span className="text-foreground tabular">{formatCurrency(result.lastPayment)}</span> ở tháng thứ {months}
            </p>
          )}

          <dl className="mt-8 border-t border-line-strong">
            <ResultLine label="Trả trước" value={formatCurrency(downPayment)} />
            <ResultLine label="Khoản vay" value={formatCurrency(result.principal)} />
            <ResultLine label={`Tổng lãi ước tính (${months} tháng)`} value={formatCurrency(result.totalInterest)} />
            <ResultLine label="Tổng gốc + lãi" value={formatCurrency(result.totalPayable)} strong />
          </dl>

          <Button
            size="lg"
            className="mt-8 w-full"
            onClick={() => requestLead({ need: "tra-gop", vehicle: vehicleId === CUSTOM ? undefined : vehicleId })}
          >
            Nhận phương án trả góp thực tế
            <ArrowUpRight />
          </Button>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{FINANCE_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  )
}
