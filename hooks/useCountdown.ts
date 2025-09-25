'use client'

import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

interface VerbosePart {
	value: number
	unit: string
}

interface CountdownResult {
	isPast: boolean
	verbose: {
		parts: VerbosePart[]
		text: string
	}
	compact: string
}

export function useCountdown(targetDate: string): CountdownResult {
	const [result, setResult] = useState<CountdownResult>({
		isPast: false,
		verbose: { parts: [], text: '' },
		compact: '0 min 0 sec',
	})

	useEffect(() => {
		const calculateCountdown = () => {
			const now = DateTime.now()
			const target = DateTime.fromISO(targetDate).startOf('day')

			const isPast = now > target
			const diff = isPast ? now.diff(target) : target.diff(now)

			const duration = diff.shiftTo(
				'years',
				'months',
				'days',
				'hours',
				'minutes',
				'seconds'
			)

			const years = Math.floor(duration.years)
			const months = Math.floor(duration.months)
			const totalDays = Math.floor(duration.days)
			const weeks = Math.floor(totalDays / 7)
			const days = totalDays % 7
			const hours = Math.floor(duration.hours)
			const minutes = Math.floor(duration.minutes)
			const seconds = Math.floor(duration.seconds)

			const parts: VerbosePart[] = [
				{
					value: years,
					unit: years === 1 ? 'year' : 'years',
				},
				{
					value: months,
					unit: months === 1 ? 'month' : 'months',
				},
				{
					value: weeks,
					unit: weeks === 1 ? 'week' : 'weeks',
				},
				{
					value: days,
					unit: days === 1 ? 'day' : 'days',
				},
				{
					value: hours,
					unit: hours === 1 ? 'hour' : 'hours',
				},
				{
					value: minutes,
					unit: minutes === 1 ? 'minute' : 'minutes',
				},
				{
					value: seconds,
					unit: seconds === 1 ? 'second' : 'seconds',
				},
			]

			const verboseText = parts
				.map(part => `${part.value} ${part.unit}`)
				.join(' ')

			const totalSeconds = Math.floor(diff.as('seconds'))
			const totalMinutes = Math.floor(totalSeconds / 60)
			const remainingSeconds = totalSeconds % 60

			const compact = `${totalMinutes} min ${remainingSeconds} sec`

			setResult({
				isPast,
				verbose: { parts, text: verboseText },
				compact,
			})
		}

		calculateCountdown()
		const interval = setInterval(calculateCountdown, 1000)

		return () => clearInterval(interval)
	}, [targetDate])

	return result
}
