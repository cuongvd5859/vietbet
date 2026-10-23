import Image from 'next/image'
import type { League } from '@/lib/matches'

type Props = {
  league: Pick<League, 'name' | 'kind' | 'country'>
  meta: string
}

export function LeagueHeader({ league, meta }: Props) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#5a0b0b] to-[#2a0606] px-2.5 py-1.5">
      <div className="flex items-center gap-2">
        <Image
          src={`/leagues/${league.kind}.png`}
          alt=""
          width={22}
          height={22}
          className="size-[22px] rounded-full ring-1 ring-white/20"
        />
        <h3 className="text-[11.5px] font-extrabold uppercase tracking-wide text-white">{league.name}</h3>
      </div>
      <span className="text-[10px] font-medium text-white/55">{meta}</span>
    </div>
  )
}
