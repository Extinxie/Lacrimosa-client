'use client'

import { animeList } from '@/src/components/shared/constants/sub-titles'

export default function SubHeader() {
	const duplicatedList = [...animeList, ...animeList]

	return (
		<div className="w-full overflow-hidden bg-black/30 backdrop-blur-sm border-b border-white/5 py-2">
			<div className="flex whitespace-nowrap gap-8 md:gap-12 lg:gap-16 animate-marquee">
				{duplicatedList.map((title, index) => (
					<span
						key={index}
						className="text-sm md:text-base lg:text-lg text-white/70 hover:text-white transition-colors cursor-pointer px-2"
					>
						{title}
					</span>
				))}
			</div>

			<style jsx>{`
				@keyframes marquee {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.animate-marquee {
					animation: marquee 25s linear infinite;
					width: max-content;
				}
			`}</style>
		</div>
	)
}
