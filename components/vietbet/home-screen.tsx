'use client'

import { useState } from 'react'
import type { BetSelection } from '@/lib/matches'
import { AppHeader } from './app-header'
import { ComplianceCarousel } from './compliance-carousel'
import { DailyLimitCard } from './daily-limit-card'
import { HotMatches } from './hot-matches'
import { BetSlipDrawer } from './bet-slip-drawer'
import { BottomNav } from './bottom-nav'

const DAILY_USED = 350_000
const DAILY_LIMIT = 1_000_000

export function HomeScreen() {
  const [selection, setSelection] = useState<BetSelection | null>(null)

  const handleSelect = (next: BetSelection) =>
    setSelection((current) => (current?.id === next.id ? null : next))

  return (
    <div className="relative mx-auto min-h-dvh max-w-[430px] bg-background">
      <AppHeader />
      <main className="flex flex-col gap-3 pt-3 pb-[calc(76px+env(safe-area-inset-bottom))]">
        <ComplianceCarousel />
        <DailyLimitCard used={DAILY_USED} limit={DAILY_LIMIT} />
        <HotMatches selectedId={selection?.id ?? null} onSelect={handleSelect} />
        <p className="px-4 text-center text-[9.5px] leading-relaxed text-muted-foreground">
          Hoạt động theo Nghị định 06/2017/NĐ-CP. Chỉ dành cho người từ 21 tuổi trở lên. Hãy chơi có trách nhiệm.
        </p>
      </main>
      <BetSlipDrawer
        selection={selection}
        remainingLimit={DAILY_LIMIT - DAILY_USED}
        onClose={() => setSelection(null)}
      />
      <BottomNav />
    </div>
  )
}
