import {
  ChevronRight,
  HeartHandshake,
  History,
  KeyRound,
  Landmark,
  ScanFace,
  ScrollText,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type MenuItem = {
  label: string
  description: string
  icon: LucideIcon
  verified?: boolean
  badge?: string
}

const groups: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Tài chính & Định danh',
    items: [
      { label: 'Xác thực eKYC & CCCD', description: 'Đã liên kết (CCCD ****8899)', icon: ScanFace, verified: true },
      { label: 'Tài khoản Ngân hàng', description: 'Vietcombank (Trùng tên CCCD)', icon: Landmark, verified: true },
    ],
  },
  {
    title: 'Lịch sử & Báo cáo Tuân thủ',
    items: [
      {
        label: 'Lịch sử Đặt cược (Bet History)',
        description: 'Vé đang mở & vé đã quyết toán',
        icon: History,
        badge: '2 đang mở',
      },
      {
        label: 'Nhật ký Giao dịch (Ledger Log)',
        description: 'Lưu vết kiểm toán nạp, rút & cược',
        icon: ScrollText,
      },
    ],
  },
  {
    title: 'An toàn & Cài đặt',
    items: [
      {
        label: 'Hạn mức & Tự loại trừ',
        description: 'Responsible Gaming',
        icon: HeartHandshake,
      },
      { label: 'Bảo mật & Mã PIN Giao dịch', description: 'PIN đã bật · Sinh trắc học', icon: KeyRound },
    ],
  },
]

export function AccountMenu() {
  return (
    <nav aria-label="Quản lý tài khoản" className="flex flex-col gap-3">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="mb-1.5 px-1 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h2>
          <ul className="overflow-hidden rounded-xl bg-card ring-1 ring-white/8">
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label} className="border-b border-white/6 last:border-b-0">
                  <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-white/3">
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg',
                        item.verified ? 'bg-emerald-500/12' : 'bg-brand-orange/12',
                      )}
                    >
                      <Icon
                        className={cn('size-4', item.verified ? 'text-emerald-400' : 'text-brand-orange')}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-bold text-white">{item.label}</span>
                      <span
                        className={cn(
                          'block truncate text-[10.5px]',
                          item.verified ? 'font-semibold text-emerald-400' : 'text-muted-foreground',
                        )}
                      >
                        {item.description}
                      </span>
                    </span>
                    {item.badge && (
                      <span className="shrink-0 rounded bg-brand-red px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="size-4 shrink-0 text-white/35" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </nav>
  )
}
