'use client'

import { useState } from 'react'
import type { BetSelection } from '@/lib/matches'
import { AppHeader } from './app-header'
import { ComplianceCarousel } from './compliance-carousel'
import { DailyLimitCard } from './daily-limit-card'
import { HotMatches } from './hot-matches'
import { BetSlipDrawer } from './bet-slip-drawer'
import { BottomNav, type TabKey } from './bottom-nav'
import { LiveScreen } from './live-screen'
import { AccountScreen } from './account-screen'
import { NotificationsScreen } from './notifications-screen'

const DAILY_USED = 350_000
const DAILY_LIMIT = 1_000_000

export function HomeScreen() {
  const [tab, setTab] = useState<TabKey>('home')
  const [selection, setSelection] = useState<BetSelection | null>(null)

  const handleSelect = (next: BetSelection) =>
    setSelection((current) => (current?.id === next.id ? null : next))

  const changeTab = (next: TabKey) => {
    setTab(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="relative mx-auto min-h-dvh max-w-[430px] bg-background">
      {tab === 'home' && (
        <>
          <AppHeader />
          <main className="flex flex-col gap-3 pt-3 pb-[calc(76px+env(safe-area-inset-bottom))]">
            <ComplianceCarousel />
            <DailyLimitCard used={DAILY_USED} limit={DAILY_LIMIT} />
            <HotMatches selectedId={selection?.id ?? null} onSelect={handleSelect} />
            <p className="px-4 text-center text-[9.5px] leading-relaxed text-muted-foreground">
              Hoạt động theo Nghị định 06/2017/NĐ-CP. Chỉ dành cho người từ 21 tuổi trở lên. Hãy chơi có trách nhiệm.
            </p>
          </main>
        </>
      )}
      {tab === 'live' && <LiveScreen selectedId={selection?.id ?? null} onSelect={handleSelect} />}
      {tab === 'notifications' && <NotificationsScreen />}
      {tab === 'account' && <AccountScreen used={DAILY_USED} limit={DAILY_LIMIT} />}

      <BetSlipDrawer
        selection={tab === 'home' || tab === 'live' ? selection : null}
        remainingLimit={DAILY_LIMIT - DAILY_USED}
        onClose={() => setSelection(null)}
      />
      <BottomNav active={tab} onChange={changeTab} />
    </div>
  )
}
