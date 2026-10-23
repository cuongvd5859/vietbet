import { ChevronRight, RefreshCw, Scale } from 'lucide-react'
import { formatVnd } from '@/lib/matches'

export function LimitControlCard({ used, limit }: { used: number; limit: number }) {
  const percent = Math.round(Math.min(used / limit, 1) * 100)
  const remaining = Math.max(limit - used, 0)

  return (
    <section aria-labelledby="limit-control-title" className="rounded-xl bg-card p-3 ring-1 ring-white/8">
      <div className="flex items-start justify-between gap-2">
        <h2 id="limit-control-title" className="flex items-start gap-1.5 text-[12px] font-extrabold leading-snug text-white">
          <Scale className="mt-px size-4 shrink-0 text-brand-orange" aria-hidden="true" />
          Kiểm soát Hạn mức Nghị định 06/2017/NĐ-CP
        </h2>
        <span className="shrink-0 rounded bg-brand-orange/15 px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums text-brand-orange">
          {percent}%
        </span>
      </div>

      <p className="mt-2 text-[14px] font-extrabold tabular-nums">
        <span className="text-brand-orange">{formatVnd(used)}</span>
        <span className="text-white/40"> / {formatVnd(limit)} VNĐ</span>
      </p>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Đã dùng ${percent}% hạn mức hôm nay`}
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/8"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-orange shadow-[0_0_10px_1px_rgb(249_115_22/0.8)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        Hạn mức còn lại hôm nay:{' '}
        <span className="font-bold text-emerald-400">{formatVnd(remaining)} VNĐ</span>.{' '}
        <span className="inline-flex items-center gap-0.5">
          <RefreshCw className="size-3" aria-hidden="true" />
          Tự động làm mới lúc 00:00
        </span>
      </p>

      <a
        href="#"
        className="mt-2 flex items-center justify-between rounded-lg bg-surface-2 px-2.5 py-2 text-[11px] font-semibold text-white/80 hover:text-brand-orange"
      >
        Điều chỉnh hạn mức cá nhân
        <ChevronRight className="size-3.5" aria-hidden="true" />
      </a>
    </section>
  )
}
