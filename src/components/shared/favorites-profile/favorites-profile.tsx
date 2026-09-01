'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
	useDeleteFavoritesUserAnimesTop,
	useGetFavoritesUserAnimesTop,
	usePostFavoritesUserAnimesTop
} from '@/src/hooks/use-get-animes'
import { AddAnimeModal } from '../add-modal-favorites/add-modal-fav'
import { Plus, X } from 'lucide-react'
import { SearchAnimeModal } from '../modal/modal'

export function FavoriteAnimes() {
	const { data: favorites, isLoading } = useGetFavoritesUserAnimesTop()
	const { mutate: deleteFavorite } = useDeleteFavoritesUserAnimesTop()
	const { mutate: addToFavorites } = usePostFavoritesUserAnimesTop()

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="aspect-2/3 bg-neutral-800/50 rounded-xl animate-pulse"
					/>
				))}
			</div>
		)
	}
	const favoritesCount = favorites?.length ?? 0
	const hasMaxFavorites = favoritesCount >= 5
	const handleAddAnime = (animeId: string) => {
		addToFavorites(animeId)
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
			{favorites?.map((item) => (
				<div key={item.id} className="group relative">
					<Link href={`/anime/${item.anime.slug}`} className="block">
						<div className="relative aspect-2/3 rounded-xl overflow-hidden bg-neutral-800">
							{item.anime.poster && (
								<Image
									src={item.anime.poster}
									alt={
										item.anime.russianTitle ||
										item.anime.nativeTitle
									}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							)}
							{/* {item.order > 0 && (
								<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
									#{item.order}
								</div>
							)} */}
						</div>
						<p className="text-white text-xs mt-1 truncate">
							{item.anime.russianTitle || item.anime.nativeTitle}
						</p>
					</Link>

					<button
						onClick={() => deleteFavorite(item.animeId)}
						className="absolute top-2 right-2 bg-neutral-500/80 hover:bg-neutral-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
					>
						<X className="w-4 h-4 text-white" />
					</button>
				</div>
			))}

			{!hasMaxFavorites && (
				<SearchAnimeModal
					title="Добавить в избранное"
					placeholder="Поиск аниме..."
					onSelect={handleAddAnime}
					trigger={
						<div className="aspect-2/3 rounded-xl overflow-hidden bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors cursor-pointer flex items-center justify-center border-2 border-dashed border-white/10 hover:border-white/20">
							<Plus className="w-12 h-12 text-neutral-500" />
						</div>
					}
				/>
			)}
		</div>
	)
}
