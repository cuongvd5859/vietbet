import { ChevronRight, Zap } from 'lucide-react'
import type { BetSelection, LiveMatch } from '@/lib/matches'
import { MarketGrid, TeamCrest } from './match-card'
import { LivePitch } from './live-pitch'

type Props = {
  match: LiveMatch
  selectedId: string | null
  onSelect: (selection: BetSelection) => void
}

export function LiveMatchCard({ match, selectedId, onSelect }: Props) {
  const matchLabel = `${match.home.name} vs ${match.away.name}`
  const attackingTeam = match.attacking === 'home' ? match.home.name : match.away.name

  return (
    <article className="bg-card px-2.5 py-2.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 rounded bg-brand-red px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow-[0_0_10px_rgb(220_38_38/0.7)]">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white" />
            <span className="relative size-1.5 rounded-full bg-white" />
          </span>
          LIVE {match.minute}&apos;
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground">{match.period}</span>
        <a href="#" className="flex items-center text-[10px] font-semibold text-white/55 hover:text-brand-orange">
          +{match.marketsCount}
          <ChevronRight className="size-3" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex min-w-0 flex-col items-center gap-1">
          <TeamCrest team={match.home} className="size-9 text-[9px]" />
          <span className="truncate text-[12.5px] font-bold text-white">{match.home.name}</span>
        </div>
        <p
          className="text-[30px] font-black leading-none tabular-nums text-white"
          aria-label={`Tỷ số ${match.score[0]} - ${match.score[1]}`}
        >
          {match.score[0]}
          <span className="mx-1.5 text-white/30">-</span>
          {match.score[1]}
        </p>
        <div className="flex min-w-0 flex-col items-center gap-1">
          <TeamCrest team={match.away} className="size-9 text-[9px]" />
          <span className="truncate text-[12.5px] font-bold text-white">{match.away.name}</span>
        </div>
      </div>

      <dl className="mt-2 grid grid-cols-3 gap-1.5">
        {match.stats.map((stat) => (
          <div key={stat.label} className="rounded-md bg-surface-2 px-1.5 py-1 text-center">
            <dt className="text-[8.5px] font-semibold uppercase tracking-wide text-muted-foreground">{stat.label}</dt>
            <dd className="text-[11px] font-extrabold tabular-nums text-white">
              {stat.values[0]} <span className="text-white/30">:</span> {stat.values[1]}
            </dd>
          </div>
        ))}
      </dl>

      <LivePitch
        attackingTeam={attackingTeam}
        direction={match.attacking}
        possession={match.possession}
        homeShort={match.home.short}
        awayShort={match.away.short}
      />

      <div className="mt-3">
        <MarketGrid markets={match.markets} matchLabel={matchLabel} selectedId={selectedId} onSelect={onSelect} />
      </div>

      <div className="mt-2.5 border-t border-white/6 pt-2">
        <p className="mb-1.5 flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-brand-orange">
          <Zap className="size-3 fill-brand-orange" aria-hidden="true" />
          Kèo nhanh
        </p>
        <MarketGrid
          markets={match.extraMarkets}
          matchLabel={matchLabel}
          selectedId={selectedId}
          onSelect={onSelect}
          columns={2}
        />
      </div>
    </article>
  )
}
