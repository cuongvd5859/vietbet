import { Gauge, Radio, Trophy } from 'lucide-react'

const notifications = [
  {
    icon: Trophy,
    title: 'Vé cược #VB22107 đã thắng',
    body: 'Liverpool vs Chelsea · Tài 3 @0.93 · +193.000 VNĐ',
    time: '5 phút trước',
  },
  {
    icon: Radio,
    title: 'Real Madrid vs Barcelona đang diễn ra',
    body: 'Tỷ số 2 - 1 phút 68. Kèo trực tiếp đã mở.',
    time: '12 phút trước',
  },
  {
    icon: Gauge,
    title: 'Nhắc nhở hạn mức Nghị định 06',
    body: 'Bạn đã dùng 35% hạn mức cược hôm nay.',
    time: '1 giờ trước',
  },
]

export function NotificationsScreen() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-b from-[#3a0707] to-background/95 px-3 pt-[max(env(safe-area-inset-top),0.625rem)] pb-2 backdrop-blur-md">
        <h1 className="text-[17px] font-extrabold text-white">Thông báo</h1>
      </header>
      <main className="px-3 pt-1 pb-[calc(76px+env(safe-area-inset-bottom))]">
        <ul className="overflow-hidden rounded-xl bg-card ring-1 ring-white/8">
          {notifications.map((n) => {
            const Icon = n.icon
            return (
              <li key={n.title} className="flex gap-2.5 border-b border-white/6 px-3 py-3 last:border-b-0">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange/12">
                  <Icon className="size-4 text-brand-orange" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-bold text-white">{n.title}</p>
                  <p className="text-[11px] text-muted-foreground">{n.body}</p>
                  <p className="mt-0.5 text-[10px] text-white/40">{n.time}</p>
                </div>
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-red" aria-label="Chưa đọc" />
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
