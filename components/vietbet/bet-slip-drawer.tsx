'use client'

import { useState } from 'react'
import { X, Ticket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatVnd, type BetSelection } from '@/lib/matches'

const QUICK_STAKES = [50_000, 100_000, 200_000, 500_000]

type Props = {
  selection: BetSelection | null
  remainingLimit: number
  onClose: () => void
}

export function BetSlipDrawer({ selection, remainingLimit, onClose }: Props) {
  const [stake, setStake] = useState(100_000)
  const open = selection !== null
  const isAsianOdds = selection ? selection.marketTitle !== '1X2' : false
  const payout = selection ? Math.round(stake * (isAsianOdds ? 1 + selection.value : selection.value)) : 0
  const exceedsLimit = stake > remainingLimit

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Phiếu cược"
      aria-hidden={!open}
      className={cn(
        'fixed inset-x-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-40 mx-auto max-w-[430px] px-2 transition-all duration-300 ease-out',
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <div className="rounded-t-2xl rounded-b-xl border border-brand-orange/40 bg-[#0e1420]/95 p-3 shadow-[0_-10px_40px_-8px_rgb(220_38_38/0.55)] backdrop-blur-md">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
        {selection && (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-start gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-brand-red to-brand-orange">
                  <Ticket className="size-4 text-white" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-white">{selection.matchLabel}</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    {selection.marketTitle} · <span className="font-semibold text-white">{selection.label}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-extrabold tabular-nums text-brand-orange text-glow-orange">
                  @{selection.value.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-6 items-center justify-center rounded-full bg-white/10"
                >
                  <X className="size-3.5 text-white" aria-hidden="true" />
                  <span className="sr-only">Đóng phiếu cược</span>
                </button>
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-4 gap-1.5">
              {QUICK_STAKES.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setStake(amount)}
                  aria-pressed={stake === amount}
                  className={cn(
                    'rounded-md border py-1.5 text-[11px] font-bold tabular-nums transition-colors',
                    stake === amount
                      ? 'border-brand-orange bg-brand-orange/15 text-brand-orange'
                      : 'border-white/10 bg-surface-2 text-white/80',
                  )}
                >
                  {amount / 1000}K
                </button>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">
                Tiền cược: <span className="font-bold text-white">{formatVnd(stake)} VNĐ</span>
              </span>
              <span className="text-muted-foreground">
                Thắng dự kiến: <span className="font-bold text-emerald-400">{formatVnd(payout)}</span>
              </span>
            </div>

            {exceedsLimit && (
              <p role="alert" className="mt-1.5 text-[10.5px] font-semibold text-brand-red">
                Vượt hạn mức còn lại ({formatVnd(remainingLimit)} VNĐ)
              </p>
            )}

            <button
              type="button"
              disabled={exceedsLimit}
              className="mt-2.5 w-full rounded-lg bg-gradient-to-r from-brand-red to-brand-orange py-2.5 text-[13px] font-extrabold uppercase tracking-wide text-white shadow-[0_0_18px_-4px_rgb(249_115_22/0.8)] transition-transform active:scale-[0.98] disabled:opacity-40"
            >
              Đặt cược
            </button>
          </>
        )}
      </div>
    </div>
  )
}
