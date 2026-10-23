import { ChevronRight, Clock, Star } from 'lucide-react'
import type { BetSelection, Match, Team } from '@/lib/matches'
import { OddsButton } from './odds-button'

function TeamCrest({ team }: { team: Team }) {
  return (
    <span
      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[8px] font-extrabold text-white ring-2 ring-white/10"
      style={{ background: `linear-gradient(135deg, ${team.primary} 0 50%, ${team.secondary} 50% 100%)` }}
      aria-hidden="true"
    >
      <span className="rounded-sm bg-black/55 px-0.5 leading-tight">{team.short}</span>
    </span>
  )
}

type Props = {
  match: Match
  selectedId: string | null
  onSelect: (selection: BetSelection) => void
}

export function MatchCard({ match, selectedId, onSelect }: Props) {
  const matchLabel = `${match.home.name} vs ${match.away.name}`

  return (
    <article className="border-b border-white/6 bg-card px-2.5 py-2.5 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded bg-brand-orange/15 px-1.5 py-0.5 text-[10px] font-bold text-brand-orange">
            <Clock className="size-2.5" aria-hidden="true" />
            {match.kickoff}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">{match.day}</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={`Theo dõi ${matchLabel}`}>
            <Star className="size-3.5 text-white/30 hover:text-brand-gold" aria-hidden="true" />
          </button>
          <a
            href="#"
            className="flex items-center text-[10px] font-semibold text-white/55 hover:text-brand-orange"
          >
            +{match.marketsCount}
            <ChevronRight className="size-3" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <TeamCrest team={match.home} />
          <span className="truncate text-[13px] font-bold text-white">{match.home.name}</span>
        </div>
        <span className="text-[10px] font-extrabold text-white/35">VS</span>
        <div className="flex min-w-0 items-center justify-end gap-1.5">
          <span className="truncate text-right text-[13px] font-bold text-white">{match.away.name}</span>
          <TeamCrest team={match.away} />
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {match.markets.map((market) => (
          <div key={market.key} className="flex flex-col gap-1">
            <p className="text-center text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              {market.title}
            </p>
            <div className="flex flex-1 flex-col gap-1">
              {market.options.map((option) => (
                <OddsButton
                  key={option.id}
                  option={option}
                  selected={selectedId === option.id}
                  ariaLabel={`${matchLabel}, ${market.title} ${option.label}, tỷ lệ ${option.value.toFixed(2)}`}
                  onSelect={() =>
                    onSelect({
                      id: option.id,
                      matchLabel,
                      marketTitle: market.title,
                      label: option.label,
                      value: option.value,
                    })
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
