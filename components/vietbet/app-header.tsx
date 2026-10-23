import { BadgeCheck, Flame, Headphones, Plus } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-br from-[#5a0b0b] via-[#3a0707] to-[#1a0505] shadow-[0_6px_24px_-8px_rgb(220_38_38/0.45)]">
      <div className="flex items-center justify-between gap-2 px-3 pt-[max(env(safe-area-inset-top),0.5rem)] pb-2">
        <a href="/" className="flex items-center gap-1.5" aria-label="VietBet trang chủ">
          <span className="relative flex size-8 items-center justify-center rounded-lg bg-gradient-to-b from-brand-red to-[#7f1d1d] ring-1 ring-brand-gold/60 shadow-[0_0_14px_rgb(220_38_38/0.6)]">
            <Flame className="size-5 fill-brand-gold text-brand-gold" aria-hidden="true" />
          </span>
          <span className="text-[19px] font-extrabold italic leading-none tracking-tight">
            <span className="text-white">Viet</span>
            <span className="bg-gradient-to-r from-brand-gold to-brand-orange bg-clip-text text-transparent">
              Bet
            </span>
          </span>
        </a>

        <a
          href="https://cskh.vietbet.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors hover:bg-white/20"
        >
          <Headphones className="size-[18px] text-white" aria-hidden="true" />
          <span className="sr-only">Chăm sóc khách hàng (mở tab mới)</span>
        </a>
      </div>

      <div className="mx-3 mb-2.5 flex items-center justify-between gap-2 rounded-xl bg-black/35 px-3 py-2 ring-1 ring-white/10">
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="truncate text-[12px] font-bold tracking-wide text-white">
              VŨ ĐÌNH CƯỜNG
            </span>
            <BadgeCheck
              className="size-4 shrink-0 fill-emerald-500 text-[#090d16]"
              aria-label="Đã xác minh KYC"
            />
          </div>
          <p className="text-[10px] text-white/55">ID: VB-0968214 · KYC cấp 2</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-white/50">Số dư</p>
            <p className="text-[15px] font-extrabold leading-tight tabular-nums text-brand-orange text-glow-orange">
              5.250.000 <span className="text-[10px] font-bold">VNĐ</span>
            </p>
          </div>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg bg-brand-red text-white shadow-[0_0_12px_rgb(220_38_38/0.7)] transition-transform active:scale-95"
          >
            <Plus className="size-5" strokeWidth={3} aria-hidden="true" />
            <span className="sr-only">Nạp tiền</span>
          </button>
        </div>
      </div>
    </header>
  )
}
