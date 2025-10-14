"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { useCountdown } from "../hooks/useCountdown"

interface CountdownCardProps {
	targetDate: string
	label: string
}

export function CountdownCard({ targetDate, label }: CountdownCardProps) {
	const countdown = useCountdown(targetDate)

	const renderVerbose = () => {
		if (!countdown.verbose.parts.length) {
			return (
				<div className="rounded-md p-4 text-center border-1">
					<span className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-green-400 drop-shadow-lg tracking-wider">
						{countdown.isPast ? "Reached" : "00:00:00"}
					</span>
				</div>
			)
		}

		return (
			<div className="rounded-xl p-3 sm:p-4 border-1">
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
					{countdown.verbose.parts.map((part, index) => (
						<div key={index} className="text-center">
							<div className="bg-card rounded-sm p-2 border">
								<div className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-green-400 drop-shadow-lg tracking-wider">
									{String(part.value).padStart(2, "0")}
								</div>
							</div>
							<div className="text-xs text-green-300 mt-1 sm:mt-2 font-semibold uppercase tracking-wide">
								{part.unit}
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderCompact = () => (
		<div className="text-center py-3 sm:py-4 rounded-lg">
			<span className="text-lg sm:text-xl md:text-2xl font-bold break-all">
				{countdown.compact}
			</span>
		</div>
	)

	const renderBoth = () => (
		<div className="space-y-4">
			<div>
				{renderVerbose()}
			</div>
			<div>
				{renderCompact()}
			</div>
		</div>
	)

	return (
		<Card className="rounded-md bg-background shadow backdrop-blur-sm border w-full">
			<CardHeader className="text-center">
				<CardTitle className="text-sm sm:text-base md:text-lg font-semibold break-words">
					{targetDate} — {label}
				</CardTitle>
				<p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
					{new Date(targetDate).toLocaleDateString(undefined, {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</CardHeader>

			<CardContent className="px-4 sm:px-6">
				{countdown.isPast && (
					<div className="text-center mb-5">
						<Badge variant="destructive" className="text-xs sm:text-sm">
							Reached
						</Badge>
					</div>
				)}
				{renderBoth()}
			</CardContent>
		</Card>
	)
}
