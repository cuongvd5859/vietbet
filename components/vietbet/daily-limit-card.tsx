import { AlertTriangle, Gauge } from 'lucide-react'
import { formatVnd } from '@/lib/matches'

const WARNING_THRESHOLD = 0.7

export function DailyLimitCard({ used, limit }: { used: number; limit: number }) {
  const ratio = Math.min(used / limit, 1)
  const percent = Math.round(ratio * 100)
  const isNearLimit = ratio >= WARNING_THRESHOLD

  return (
    <section aria-label="Hạn mức cược" className="px-3">
      <div className="rounded-xl bg-card px-3 py-2.5 ring-1 ring-border">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Gauge className="size-3.5 text-brand-orange" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-white/80">Hạn mức cược hôm nay</span>
          </div>
          {isNearLimit ? (
            <span className="flex items-center gap-0.5 rounded bg-brand-red px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
              <AlertTriangle className="size-2.5" aria-hidden="true" />
              Sắp đạt hạn mức
            </span>
          ) : (
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-emerald-400">
              An toàn
            </span>
          )}
        </div>

        <p className="mt-1 text-[13px] font-bold tabular-nums">
          <span className="text-brand-orange">{formatVnd(used)}</span>
          <span className="text-white/40"> / {formatVnd(limit)} VNĐ</span>
        </p>

        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Đã dùng ${percent}% hạn mức`}
          className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-red shadow-[0_0_10px_rgb(249_115_22/0.8)]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[9.5px] text-muted-foreground">
          <span>Đã dùng {percent}%</span>
          <span>Còn lại {formatVnd(limit - used)} VNĐ</span>
        </div>
      </div>
    </section>
  )
}
