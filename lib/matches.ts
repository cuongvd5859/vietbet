export type Team = {
  name: string
  short: string
  primary: string
  secondary: string
}

export type OddsTrend = 'up' | 'down' | 'hot'

export type OddsOption = {
  id: string
  label: string
  value: number
  trend?: OddsTrend
}

export type Market = {
  key: 'ah' | 'ou' | '1x2' | 'card' | 'corner'
  title: string
  options: OddsOption[]
}

export type Match = {
  id: string
  home: Team
  away: Team
  kickoff: string
  day: string
  status: 'upcoming' | 'live'
  marketsCount: number
  markets: Market[]
}

export type League = {
  id: string
  name: string
  country: string
  kind: 'ucl' | 'epl'
  matches: Match[]
}

export type BetSelection = {
  id: string
  matchLabel: string
  marketTitle: string
  label: string
  value: number
}

const teams = {
  rma: { name: 'Real Madrid', short: 'RMA', primary: '#f8fafc', secondary: '#c9a227' },
  bar: { name: 'Barcelona', short: 'BAR', primary: '#a50044', secondary: '#004d98' },
  mci: { name: 'Man City', short: 'MCI', primary: '#6cabdd', secondary: '#1c2c5b' },
  ars: { name: 'Arsenal', short: 'ARS', primary: '#ef0107', secondary: '#f8fafc' },
  liv: { name: 'Liverpool', short: 'LIV', primary: '#c8102e', secondary: '#00b2a9' },
  che: { name: 'Chelsea', short: 'CHE', primary: '#034694', secondary: '#dba111' },
} satisfies Record<string, Team>

export const leagues: League[] = [
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    country: 'Châu Âu',
    kind: 'ucl',
    matches: [
      {
        id: 'rma-bar',
        home: teams.rma,
        away: teams.bar,
        kickoff: '22:00',
        day: 'Hôm nay',
        status: 'upcoming',
        marketsCount: 186,
        markets: [
          {
            key: 'ah',
            title: 'Kèo Chấp',
            options: [
              { id: 'rma-bar-ah-h', label: '-0.5', value: 0.95, trend: 'hot' },
              { id: 'rma-bar-ah-a', label: '+0.5', value: 0.91 },
            ],
          },
          {
            key: 'ou',
            title: 'Tài Xỉu',
            options: [
              { id: 'rma-bar-ou-o', label: 'T 2.5/3', value: 0.88, trend: 'up' },
              { id: 'rma-bar-ou-u', label: 'X 2.5/3', value: 0.98 },
            ],
          },
          {
            key: '1x2',
            title: '1X2',
            options: [
              { id: 'rma-bar-1', label: '1', value: 1.85 },
              { id: 'rma-bar-x', label: 'X', value: 3.4 },
              { id: 'rma-bar-2', label: '2', value: 4.2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'epl',
    name: 'Premier League',
    country: 'Anh',
    kind: 'epl',
    matches: [
      {
        id: 'mci-ars',
        home: teams.mci,
        away: teams.ars,
        kickoff: '02:00',
        day: 'Ngày mai',
        status: 'upcoming',
        marketsCount: 164,
        markets: [
          {
            key: 'ah',
            title: 'Kèo Chấp',
            options: [
              { id: 'mci-ars-ah-h', label: '-0.25', value: 0.92, trend: 'down' },
              { id: 'mci-ars-ah-a', label: '+0.25', value: 0.96, trend: 'hot' },
            ],
          },
          {
            key: 'ou',
            title: 'Tài Xỉu',
            options: [
              { id: 'mci-ars-ou-o', label: 'T 2.5', value: 0.9, trend: 'hot' },
              { id: 'mci-ars-ou-u', label: 'X 2.5', value: 0.96 },
            ],
          },
          {
            key: '1x2',
            title: '1X2',
            options: [
              { id: 'mci-ars-1', label: '1', value: 2.1, trend: 'up' },
              { id: 'mci-ars-x', label: 'X', value: 3.5 },
              { id: 'mci-ars-2', label: '2', value: 3.3 },
            ],
          },
        ],
      },
      {
        id: 'liv-che',
        home: teams.liv,
        away: teams.che,
        kickoff: '02:00',
        day: 'Ngày mai',
        status: 'upcoming',
        marketsCount: 152,
        markets: [
          {
            key: 'ah',
            title: 'Kèo Chấp',
            options: [
              { id: 'liv-che-ah-h', label: '-0.75', value: 0.97 },
              { id: 'liv-che-ah-a', label: '+0.75', value: 0.89 },
            ],
          },
          {
            key: 'ou',
            title: 'Tài Xỉu',
            options: [
              { id: 'liv-che-ou-o', label: 'T 3', value: 0.93 },
              { id: 'liv-che-ou-u', label: 'X 3', value: 0.93 },
            ],
          },
          {
            key: '1x2',
            title: '1X2',
            options: [
              { id: 'liv-che-1', label: '1', value: 1.72 },
              { id: 'liv-che-x', label: 'X', value: 3.9 },
              { id: 'liv-che-2', label: '2', value: 4.6 },
            ],
          },
        ],
      },
    ],
  },
]

export type LiveMatch = Match & {
  score: [number, number]
  minute: number
  period: string
  attacking: 'home' | 'away'
  possession: [number, number]
  stats: { label: string; values: [number, number] }[]
  extraMarkets: Market[]
}

export const liveLeague: Omit<League, 'matches'> = {
  id: 'ucl-live',
  name: 'UEFA Champions League',
  country: 'Châu Âu',
  kind: 'ucl',
}

export const liveMatch: LiveMatch = {
  id: 'live-rma-bar',
  home: teams.rma,
  away: teams.bar,
  kickoff: '22:00',
  day: 'Hôm nay',
  status: 'live',
  marketsCount: 212,
  score: [2, 1],
  minute: 68,
  period: 'Hiệp 2',
  attacking: 'home',
  possession: [58, 42],
  stats: [
    { label: 'Phạt góc', values: [6, 3] },
    { label: 'Thẻ vàng', values: [1, 2] },
    { label: 'Sút trúng', values: [7, 4] },
  ],
  markets: [
    {
      key: 'ah',
      title: 'Kèo Chấp',
      options: [
        { id: 'live-rma-bar-ah-h', label: '-0.5', value: 0.85, trend: 'down' },
        { id: 'live-rma-bar-ah-a', label: '+0.5', value: 0.97, trend: 'up' },
      ],
    },
    {
      key: 'ou',
      title: 'Tài Xỉu',
      options: [
        { id: 'live-rma-bar-ou-o', label: 'T 3.5', value: 0.92, trend: 'hot' },
        { id: 'live-rma-bar-ou-u', label: 'X 3.5', value: 0.9 },
      ],
    },
    {
      key: '1x2',
      title: '1X2',
      options: [
        { id: 'live-rma-bar-1', label: '1', value: 1.65 },
        { id: 'live-rma-bar-x', label: 'X', value: 3.8 },
        { id: 'live-rma-bar-2', label: '2', value: 4.5 },
      ],
    },
  ],
  extraMarkets: [
    {
      key: 'card',
      title: 'Thẻ Phạt Tiếp Theo',
      options: [
        { id: 'live-rma-bar-card-h', label: 'Real Madrid', value: 1.8 },
        { id: 'live-rma-bar-card-a', label: 'Barcelona', value: 1.95, trend: 'hot' },
      ],
    },
    {
      key: 'corner',
      title: 'Phạt Góc',
      options: [
        { id: 'live-rma-bar-corner-o', label: 'T 10.5', value: 0.88, trend: 'up' },
        { id: 'live-rma-bar-corner-u', label: 'X 10.5', value: 0.94 },
      ],
    },
  ],
}

export const upcomingLeague: League = {
  id: 'epl-upcoming',
  name: 'Premier League - Anh',
  country: 'Anh',
  kind: 'epl',
  matches: [
    {
      id: 'up-mci-ars',
      home: teams.mci,
      away: teams.ars,
      kickoff: '22:00',
      day: 'Hôm nay',
      status: 'upcoming',
      marketsCount: 164,
      markets: [
        {
          key: 'ah',
          title: 'Kèo Chấp',
          options: [
            { id: 'up-mci-ars-ah-h', label: '-0.25', value: 0.92 },
            { id: 'up-mci-ars-ah-a', label: '+0.25', value: 0.96, trend: 'hot' },
          ],
        },
        {
          key: 'ou',
          title: 'Tài Xỉu',
          options: [
            { id: 'up-mci-ars-ou-o', label: 'T 2.5', value: 0.9, trend: 'hot' },
            { id: 'up-mci-ars-ou-u', label: 'X 2.5', value: 0.96 },
          ],
        },
        {
          key: '1x2',
          title: '1X2',
          options: [
            { id: 'up-mci-ars-1', label: '1', value: 2.1, trend: 'up' },
            { id: 'up-mci-ars-x', label: 'X', value: 3.5 },
            { id: 'up-mci-ars-2', label: '2', value: 3.3 },
          ],
        },
      ],
    },
  ],
}

export const formatVnd = (n: number) => new Intl.NumberFormat('vi-VN').format(n)
