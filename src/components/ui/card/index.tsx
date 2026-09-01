// components/ui/card/index.tsx
import Image from 'next/image'
import Link from 'next/link'

type IAnimeCard = {
	id: string
	slug: string
	russianTitle: string
	nativeTitle?: string
	poster: string
	type: string
	status: string
	year: number
	shikimoriRating: number
	episodesCount: number | string
}

export default function AnimeCard({
	id,
	slug,
	russianTitle,
	poster,
	year,
	shikimoriRating,
	episodesCount
}: IAnimeCard) {
	return (
		<Link href={`/anime/${slug}`} className="group block">
			<div className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
				<div className="relative aspect-2/3 overflow-hidden bg-gray-800">
					{poster ? (
						<Image
							src={poster}
							alt={russianTitle || '1'}
							fill
							sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
							loading="lazy"
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-neutral-500">
							<span className="text-sm">нет постера</span>
						</div>
					)}

					{shikimoriRating > 0 && (
						<span className="absolute top-3 right-0 bg-black/70 backdrop-blur-sm text-gray-200 font-bold text-sm px-4 py-2 rounded-l-xl flex items-center gap-1">
							<span>★</span> {shikimoriRating.toFixed(1)}
						</span>
					)}
				</div>

				<div className="p-3 space-y-1">
					<h3 className="text-white font-medium text-base line-clamp-1 transition-all">
						{russianTitle}
					</h3>

					<div className="flex items-center justify-between text-sm text-neutral-300">
						<span className="font-bold text-sm">{year}</span>
						<span className="bg-black/30 rounded-xl px-2 py-1 font-bold text-xs">
							{episodesCount || 0} эп.
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
