'use client'

import { useGetAllAnimes, useLatestAnimes } from '@/src/hooks/use-get-animes'
import AnimeCard from '../ui/card'
import AnimeSkeleton from '../ui/skeleton/skeleton'

export default function AnimesRender() {
	const { data: latestAnimes, isLoading: latestLoading } = useLatestAnimes()
	const { data: allAnimes, isLoading: allLoading } = useGetAllAnimes()

	const latestSlice = latestAnimes?.slice(0, 6)
	const allSlice = allAnimes?.slice(0, 6)

	return (
		<div className="space-y-8 px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
			<div>
				<h1 className="text-white text-3xl font-bold mb-4">
					Сейчас выходят
				</h1>

				<div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible px-5 pb-4 scrollbar-hide snap-x snap-mandatory">
					{latestLoading
						? [...Array(6)].map((_, i) => (
								<div
									key={i}
									className="min-w-35 md:min-w-0 snap-start"
								>
									<AnimeSkeleton />
								</div>
							))
						: latestSlice?.map((anime) => (
								<div
									key={anime.id}
									className="min-w-35 md:min-w-0 snap-start"
								>
									<AnimeCard {...anime} />
								</div>
							))}
				</div>
			</div>

			<div>
				<h2 className="text-white text-xl font-bold mb-4">Все аниме</h2>

				<div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible px-5 pb-4 scrollbar-hide snap-x snap-mandatory">
					{allLoading
						? [...Array(6)].map((_, i) => (
								<div
									key={i}
									className="min-w-35 md:min-w-0 snap-start"
								>
									<AnimeSkeleton />
								</div>
							))
						: allSlice?.map((anime) => (
								<div
									key={anime.id}
									className="min-w-35 md:min-w-0 snap-start"
								>
									<AnimeCard {...anime} />
								</div>
							))}
				</div>
			</div>
		</div>
	)
}
