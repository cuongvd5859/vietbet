import { Bell, Radio, ShieldCheck, Volleyball } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabKey = 'home' | 'live' | 'notifications' | 'account'

const items: { key: TabKey; label: string; icon: typeof Bell; badge?: number; kyc?: boolean }[] = [
  { key: 'home', label: 'Trang chủ', icon: Volleyball },
  { key: 'live', label: 'Trực tiếp', icon: Radio },
  { key: 'notifications', label: 'Thông báo', icon: Bell, badge: 3 },
  { key: 'account', label: 'Tài khoản', icon: ShieldCheck, kyc: true },
]

type Props = {
  active: TabKey
  onChange: (tab: TabKey) => void
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] border-t border-white/8 bg-[#0a0f1a]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="grid h-[60px] grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.key === active
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onChange(item.key)}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex size-full flex-col items-center justify-center gap-0.5"
              >
                <span className="relative">
                  {item.key === 'live' && (
                    <span
                      className="absolute inset-0 -m-1 animate-ping rounded-full bg-brand-red/40"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    className={cn(
                      'relative size-[22px]',
                      isActive
                        ? 'text-brand-orange drop-shadow-[0_0_8px_rgb(249_115_22/0.9)]'
                        : item.key === 'live'
                          ? 'text-brand-red'
                          : 'text-white/55',
                    )}
                    aria-hidden="true"
                  />
                  {item.badge && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[9px] font-extrabold leading-4 text-white ring-2 ring-[#0a0f1a]">
                      {item.badge}
                      <span className="sr-only"> thông báo mới</span>
                    </span>
                  )}
                  {item.kyc && (
                    <span
                      className="absolute -bottom-0.5 -right-1 size-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0a0f1a]"
                      aria-hidden="true"
                    />
                  )}
                </span>
                {item.key === 'live' && (
                  <span
                    className="absolute top-1.5 right-[calc(50%-22px)] rounded-sm bg-brand-red px-0.5 text-[6.5px] font-black leading-[9px] text-white"
                    aria-hidden="true"
                  >
                    LIVE
                  </span>
                )}
                <span
                  className={cn('text-[10px] font-semibold', isActive ? 'text-brand-orange' : 'text-white/55')}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute bottom-1 h-1 w-5 rounded-full bg-brand-red shadow-[0_0_10px_2px_rgb(220_38_38/0.85)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
