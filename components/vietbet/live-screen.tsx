'use client'

import { useState } from 'react'
import { AlarmClock, Search, SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { liveLeague, liveMatch, upcomingLeague, type BetSelection, type Match } from '@/lib/matches'
import { LeagueHeader } from './league-header'
import { LiveMatchCard } from './live-match-card'
import { MatchCard } from './match-card'

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'live', label: 'Trực Tiếp (LIVE)' },
  { id: 'epl', label: 'Ngoại Hạng Anh' },
  { id: 'ucl', label: 'Champions League' },
  { id: 'laliga', label: 'La Liga' },
  { id: 'seriea', label: 'Serie A' },
] as const

type FilterId = (typeof FILTERS)[number]['id']

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .trim()

const matchesQuery = (match: Match, leagueName: string, query: string) => {
  if (!query) return true
  const haystack = normalize(`${match.home.name} ${match.away.name} ${leagueName}`)
  return haystack.includes(normalize(query))
}

type Props = {
  selectedId: string | null
  onSelect: (selection: BetSelection) => void
}

export function LiveScreen({ selectedId, onSelect }: Props) {
  const [filter, setFilter] = useState<FilterId>('all')
  const [query, setQuery] = useState('')

  const showLive = ['all', 'live', 'ucl'].includes(filter) && matchesQuery(liveMatch, liveLeague.name, query)
  const upcoming = ['all', 'epl'].includes(filter)
    ? upcomingLeague.matches.filter((m) => matchesQuery(m, upcomingLeague.name, query))
    : []

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-white/6 bg-background/95 px-3 pt-[max(env(safe-area-inset-top),0.625rem)] pb-2 backdrop-blur-md">
        <h1 className="sr-only">Trực tiếp</h1>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-white/40"
            aria-hidden="true"
          />
          <label htmlFor="match-search" className="sr-only">
            Tìm kiếm trận đấu
          </label>
          <input
            id="match-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm trận đấu, giải đấu..."
            className="h-9 w-full rounded-lg bg-surface-2 pr-8 pl-8 text-[12.5px] text-white ring-1 ring-white/10 placeholder:text-white/40 focus:outline-none focus:ring-brand-orange [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/10"
            >
              <X className="size-3 text-white" aria-hidden="true" />
              <span className="sr-only">Xóa tìm kiếm</span>
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Lọc giải đấu"
          className="no-scrollbar -mx-3 mt-2 flex gap-1.5 overflow-x-auto px-3"
        >
          {FILTERS.map((item) => {
            const active = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={cn(
                  'flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] transition-colors',
                  active
                    ? 'bg-brand-orange font-extrabold text-white shadow-[0_0_12px_-2px_rgb(249_115_22/0.8)]'
                    : 'bg-surface-2 font-semibold text-white/70 ring-1 ring-white/10',
                )}
              >
                {item.id === 'live' && (
                  <span className="relative flex size-1.5" aria-hidden="true">
                    <span
                      className={cn(
                        'absolute inline-flex size-full animate-ping rounded-full',
                        active ? 'bg-white' : 'bg-brand-red',
                      )}
                    />
                    <span className={cn('relative size-1.5 rounded-full', active ? 'bg-white' : 'bg-brand-red')} />
                  </span>
                )}
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <main className="flex flex-col gap-4 px-3 pt-3 pb-[calc(76px+env(safe-area-inset-bottom))]">
        {showLive && (
          <section aria-labelledby="live-now-title">
            <h2
              id="live-now-title"
              className="mb-2 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wide text-white"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red" />
                <span className="relative size-2 rounded-full bg-brand-red" />
              </span>
              Đang diễn ra
              <span className="rounded bg-brand-red/15 px-1.5 text-[10px] text-brand-red">1</span>
            </h2>
            <div className="overflow-hidden rounded-xl ring-1 ring-brand-red/30">
              <LeagueHeader league={liveLeague} meta={liveLeague.country} />
              <LiveMatchCard match={liveMatch} selectedId={selectedId} onSelect={onSelect} />
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section aria-labelledby="upcoming-title">
            <h2
              id="upcoming-title"
              className="mb-2 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wide text-white"
            >
              <AlarmClock className="size-4 text-brand-orange" aria-hidden="true" />
              Sắp diễn ra
            </h2>
            <div className="overflow-hidden rounded-xl ring-1 ring-white/8">
              <LeagueHeader league={upcomingLeague} meta={`${upcoming.length} trận`} />
              {upcoming.map((match) => (
                <MatchCard key={match.id} match={match} selectedId={selectedId} onSelect={onSelect} />
              ))}
            </div>
          </section>
        )}

        {!showLive && upcoming.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl bg-card px-4 py-10 text-center ring-1 ring-white/8">
            <SearchX className="size-8 text-white/30" aria-hidden="true" />
            <p className="text-[13px] font-bold text-white">Không có trận đấu phù hợp</p>
            <p className="text-[11px] text-muted-foreground">Thử bộ lọc khác hoặc từ khóa tìm kiếm khác.</p>
          </div>
        )}
      </main>
    </>
  )
}
