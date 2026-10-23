import { ArrowDown, ArrowUp, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OddsOption } from '@/lib/matches'

type Props = {
  option: OddsOption
  selected: boolean
  onSelect: () => void
  ariaLabel: string
}

export function OddsButton({ option, selected, onSelect, ariaLabel }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={cn(
        'relative flex min-h-9 flex-1 items-center justify-between gap-1 rounded-md border px-2 py-1.5 text-left transition-all active:scale-[0.97]',
        selected
          ? 'border-brand-orange bg-brand-orange/15 shadow-[0_0_12px_-2px_rgb(249_115_22/0.7)]'
          : 'border-white/8 bg-surface-2 hover:border-brand-orange/70',
      )}
    >
      <span className="truncate text-[10.5px] font-semibold text-white/90">{option.label}</span>
      <span className="flex items-center gap-0.5">
        {option.trend === 'up' && <ArrowUp className="size-2.5 text-emerald-400" aria-hidden="true" />}
        {option.trend === 'down' && <ArrowDown className="size-2.5 text-brand-red" aria-hidden="true" />}
        <span
          className={cn(
            'text-[12.5px] font-extrabold tabular-nums',
            option.trend === 'down' ? 'text-brand-red' : 'text-brand-orange',
          )}
        >
          {option.value.toFixed(2)}
        </span>
      </span>
      {option.trend === 'hot' && (
        <span className="absolute -right-1 -top-1.5 flex items-center gap-px rounded-sm bg-brand-red px-1 text-[7.5px] font-extrabold uppercase leading-[11px] text-white shadow">
          <Flame className="size-2 fill-brand-gold text-brand-gold" aria-hidden="true" />
          Hot
        </span>
      )}
    </button>
  )
}
