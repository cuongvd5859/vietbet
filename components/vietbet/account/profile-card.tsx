'use client'

import { useState } from 'react'
import { BadgeCheck, Check, Copy, ShieldCheck } from 'lucide-react'

const USER_ID = 'VB-0968214'

export function ProfileCard() {
  const [copied, setCopied] = useState(false)

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(USER_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section aria-label="Hồ sơ người dùng" className="overflow-hidden rounded-xl bg-card ring-1 ring-white/8">
      <div className="h-1 bg-gradient-to-r from-brand-red via-brand-orange to-brand-red" aria-hidden="true" />
      <div className="flex items-center gap-3 px-3 pt-3 pb-2.5">
        <div className="relative shrink-0">
          <div className="rounded-full bg-gradient-to-br from-brand-red to-brand-orange p-[2px] shadow-[0_0_16px_-2px_rgb(249_115_22/0.6)]">
            <div className="flex size-14 items-center justify-center rounded-full bg-surface-2 text-[18px] font-black text-white">
              VC
            </div>
          </div>
          <span className="absolute -bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-full bg-emerald-500 px-1.5 py-px text-[8px] font-extrabold text-white ring-2 ring-card">
            <BadgeCheck className="size-2.5" aria-hidden="true" />
            Đã eKYC
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-[16px] font-extrabold tracking-tight text-white">
            VŨ ĐÌNH CƯỜNG
            <BadgeCheck className="size-4 fill-emerald-500 text-card" aria-label="Đã xác thực" />
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>
              ID: <span className="font-bold tabular-nums text-white/85">{USER_ID}</span>
            </span>
            <button
              type="button"
              onClick={copyId}
              className="flex size-5 items-center justify-center rounded bg-white/8 hover:bg-white/15"
            >
              {copied ? (
                <Check className="size-3 text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="size-3 text-white/60" aria-hidden="true" />
              )}
              <span className="sr-only">{copied ? 'Đã sao chép' : 'Sao chép ID'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-emerald-400 ring-1 ring-emerald-500/35">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          XÁC THỰC KYC CẤP 2 (CCCD / VNeID)
        </span>
      </div>
    </section>
  )
}
