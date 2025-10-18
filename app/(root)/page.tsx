"use client"

import { CountdownCard } from '@/components/CountDownCard'

const TARGET_DATES = [
  { date: "2025-10-20", label: "Birthday Date" },
  { date: "2026-01-01", label: "New Year 2026" },
  { date: "2028-04-20", label: "Project Launch" },
]

function RootPage() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TARGET_DATES.map((target) => (
            <CountdownCard key={target.date} targetDate={target.date} label={target.label} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RootPage
