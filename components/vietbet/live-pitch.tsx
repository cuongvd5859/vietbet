import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  attackingTeam: string
  direction: 'home' | 'away'
  possession: [number, number]
  homeShort: string
  awayShort: string
}

export function LivePitch({ attackingTeam, direction, possession, homeShort, awayShort }: Props) {
  const attacksRight = direction === 'home'
  const Arrow = attacksRight ? ChevronsRight : ChevronsLeft

  return (
    <div className="mt-2.5">
      <div
        role="img"
        aria-label={`Diễn biến trực tiếp: ${attackingTeam} đang tấn công`}
        className="relative h-[96px] overflow-hidden rounded-lg bg-[repeating-linear-gradient(90deg,#0d3a22_0_26px,#10452a_26px_52px)] ring-1 ring-emerald-400/20"
      >
        <div className="absolute inset-1.5 rounded-sm border border-white/25" />
        <div className="absolute inset-y-1.5 left-1/2 w-px bg-white/25" />
        <div className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
        <div className="absolute left-1.5 top-1/2 h-12 w-6 -translate-y-1/2 border border-l-0 border-white/25" />
        <div className="absolute right-1.5 top-1/2 h-12 w-6 -translate-y-1/2 border border-r-0 border-white/25" />

        <div
          className={cn(
            'absolute inset-y-0 w-1/2 from-transparent to-brand-orange/40',
            attacksRight ? 'right-0 bg-gradient-to-r' : 'left-0 bg-gradient-to-l',
          )}
        />

        <span
          className={cn('absolute top-[38%] flex size-2.5', attacksRight ? 'left-[76%]' : 'left-[22%]')}
          aria-hidden="true"
        >
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
          <span className="relative size-2.5 rounded-full bg-white shadow-[0_0_8px_2px_rgb(255_255_255/0.7)]" />
        </span>

        <span className="absolute left-2.5 top-2 text-[9px] font-extrabold text-white/60">{homeShort}</span>
        <span className="absolute right-2.5 top-2 text-[9px] font-extrabold text-white/60">{awayShort}</span>

        <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-black/65 px-2.5 py-0.5 text-[10px] font-bold text-white ring-1 ring-brand-orange/50">
          <Arrow className="size-3 text-brand-orange" aria-hidden="true" />
          {attackingTeam} đang tấn công
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-2 text-[10px] font-bold tabular-nums">
        <span className="text-white">{possession[0]}%</span>
        <div className="flex h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <span className="bg-brand-orange" style={{ width: `${possession[0]}%` }} />
          <span className="bg-white/35" style={{ width: `${possession[1]}%` }} />
        </div>
        <span className="text-white/60">{possession[1]}%</span>
      </div>
      <p className="mt-0.5 text-center text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Kiểm soát bóng
      </p>
    </div>
  )
}
