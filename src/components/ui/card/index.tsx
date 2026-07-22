import Image from 'next/image'
import Link from 'next/link'

type IAnimeCard = {
	id: string
	shikimoriId: number
	nativeTitle: string
	russianTitle: string
	englishTitle: null
	poster: string
	type: string
	status: string
	year: number
	shikimoriRating: any
	episodesCount: number | string
	slug: string
}

export default function AnimeCard(item: IAnimeCard) {
	return (
		<Link href={`/anime/${item.slug}`} className="group block">
			<div className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
				<div className="relative aspect-2/3 overflow-hidden">
					{item.poster ? (
						<Image
							src={item.poster}
							alt={item.russianTitle}
							fill
							sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
							loading="lazy"
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-neutral-600">
							<span className="text-sm">нет постера</span>
						</div>
					)}

					{item.shikimoriRating > 0 && (
						<span className="absolute top-3 right-0 bg-black/70 backdrop-blur-sm text-gray-200 font-bold text-sm px-4 py-2 rounded-l-xl flex items-center gap-1 font-zen">
							<span>★</span> {item.shikimoriRating.toFixed(1)}
						</span>
					)}
				</div>

				<div className="p-3 space-y-1">
					<h3 className="text-white font-medium text-base line-clamp-1 transition-all">
						{item.russianTitle}
					</h3>

					<div className="flex items-center justify-between text-sm text-neutral-300">
						<span className="font-bold text-sm">{item.year}</span>
						<span className="bg-black/15 rounded-xl p-2 font-bold">
							{item.episodesCount || 0} эп.
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
