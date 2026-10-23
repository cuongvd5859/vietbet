'use client'

import { useState } from 'react'
import { ArrowUpRight, Eye, EyeOff, Plus, Wallet } from 'lucide-react'
import { formatVnd } from '@/lib/matches'

export function WalletCard({ balance }: { balance: number }) {
  const [hidden, setHidden] = useState(false)

  return (
    <section
      aria-label="Ví tiền"
      className="rounded-xl bg-gradient-to-br from-[#1a1010] via-card to-card p-3 ring-1 ring-brand-orange/25"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
          <Wallet className="size-3.5 text-brand-orange" aria-hidden="true" />
          Số dư khả dụng
        </span>
        <button
          type="button"
          onClick={() => setHidden((h) => !h)}
          aria-pressed={hidden}
          className="flex size-6 items-center justify-center rounded-full bg-white/8"
        >
          {hidden ? (
            <EyeOff className="size-3.5 text-white/60" aria-hidden="true" />
          ) : (
            <Eye className="size-3.5 text-white/60" aria-hidden="true" />
          )}
          <span className="sr-only">{hidden ? 'Hiện số dư' : 'Ẩn số dư'}</span>
        </button>
      </div>

      <p className="mt-1 text-[26px] font-black leading-tight tabular-nums text-brand-orange text-glow-orange">
        {hidden ? '••••••••' : formatVnd(balance)}
        <span className="ml-1 text-[13px] font-extrabold text-brand-orange/80">VNĐ</span>
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-red py-2.5 text-[13px] font-extrabold text-white shadow-[0_0_16px_-4px_rgb(220_38_38/0.9)] transition-transform active:scale-[0.98]"
        >
          <Plus className="size-4" strokeWidth={3} aria-hidden="true" />
          Nạp Tiền
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/3 py-2.5 text-[13px] font-extrabold text-white transition-colors hover:border-brand-orange/60 active:scale-[0.98]"
        >
          <ArrowUpRight className="size-4" strokeWidth={3} aria-hidden="true" />
          Rút Tiền
        </button>
      </div>
    </section>
  )
}
