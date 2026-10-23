import { Headphones, LogOut } from 'lucide-react'
import { ProfileCard } from './account/profile-card'
import { WalletCard } from './account/wallet-card'
import { LimitControlCard } from './account/limit-control-card'
import { AccountMenu } from './account/account-menu'

type Props = {
  used: number
  limit: number
}

export function AccountScreen({ used, limit }: Props) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-b from-[#3a0707] to-background/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-3 pt-[max(env(safe-area-inset-top),0.625rem)] pb-2">
          <h1 className="text-[17px] font-extrabold text-white">Tài khoản</h1>
          <a
            href="https://cskh.vietbet.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15"
          >
            <Headphones className="size-4 text-white" aria-hidden="true" />
            <span className="sr-only">Chăm sóc khách hàng (mở tab mới)</span>
          </a>
        </div>
      </header>

      <main className="flex flex-col gap-3 px-3 pt-1 pb-[calc(76px+env(safe-area-inset-bottom))]">
        <ProfileCard />
        <WalletCard balance={5_250_000} />
        <LimitControlCard used={used} limit={limit} />
        <AccountMenu />

        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-brand-red/40 py-2.5 text-[12.5px] font-bold text-brand-red transition-colors hover:bg-brand-red/10"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Đăng xuất
        </button>

        <p className="text-center text-[9.5px] leading-relaxed text-muted-foreground">
          Hoạt động theo Nghị định 06/2017/NĐ-CP. Chỉ dành cho người từ 21 tuổi trở lên. Hãy chơi có trách nhiệm.
        </p>
      </main>
    </>
  )
}
