'use client'

import AnimeCard from '@/src/components/ui/card'
import AnimeSkeleton from '@/src/components/ui/skeleton/skeleton'
import { useInfiniteAnime } from '@/src/hooks/use-get-animes'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function CollectionPageClient() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		error,
		isError
	} = useInfiniteAnime(12)

	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '200px'
	})

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

	const allAnime = data?.pages.flatMap((page) => page?.data || []) || []

	if (status === 'pending') {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-white mb-8">
					Все аниме
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{Array.from({ length: 12 }).map((_, i) => (
						<AnimeSkeleton key={i} />
					))}
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="text-center py-20">
				<p>{error?.message || 'не удалось загрузить аниме'}</p>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-white mb-8">Все аниме</h1>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{allAnime.map((anime) => (
					<AnimeCard key={anime.id} {...anime} />
				))}
			</div>

			{isFetchingNextPage && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
					{Array.from({ length: 6 }).map((_, i) => (
						<AnimeSkeleton key={`loading-${i}`} />
					))}
				</div>
			)}

			{hasNextPage && !isFetchingNextPage && (
				<div ref={ref} className="h-10" />
			)}
		</div>
	)
}
