import Image from 'next/image'
import { ChevronRight, Flame } from 'lucide-react'
import { leagues, type BetSelection } from '@/lib/matches'
import { MatchCard } from './match-card'

type Props = {
  selectedId: string | null
  onSelect: (selection: BetSelection) => void
}

export function HotMatches({ selectedId, onSelect }: Props) {
  return (
    <section aria-labelledby="hot-matches-title" className="px-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 id="hot-matches-title" className="flex items-center gap-1.5 text-[15px] font-extrabold text-white">
          <Flame className="size-4 fill-brand-orange text-brand-red" aria-hidden="true" />
          Trận Đấu Hot
        </h2>
        <a href="#" className="flex items-center text-[11px] font-semibold text-brand-orange">
          Xem tất cả
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="flex flex-col gap-2.5">
        {leagues.map((league) => (
          <div key={league.id} className="overflow-hidden rounded-xl ring-1 ring-white/8">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#5a0b0b] to-[#2a0606] px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                <Image
                  src={`/leagues/${league.kind}.png`}
                  alt=""
                  width={22}
                  height={22}
                  className="size-[22px] rounded-full ring-1 ring-white/20"
                />
                <h3 className="text-[11.5px] font-extrabold uppercase tracking-wide text-white">
                  {league.name}
                </h3>
              </div>
              <span className="text-[10px] font-medium text-white/55">
                {league.country} · {league.matches.length} trận
              </span>
            </div>
            {league.matches.map((match) => (
              <MatchCard key={match.id} match={match} selectedId={selectedId} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
