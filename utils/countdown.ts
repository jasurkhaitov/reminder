import { DateTime } from 'luxon'

export interface CountdownUnits {
	years: number
	months: number
	weeks: number
	days: number
	hours: number
	minutes: number
	seconds: number
}

export function calculateCountdown(targetDate: string): {
	isPast: boolean
	units: CountdownUnits
	totalSeconds: number
} {
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

	const totalSeconds = Math.floor(diff.as('seconds'))

	return {
		isPast,
		units: { years, months, weeks, days, hours, minutes, seconds },
		totalSeconds,
	}
}
