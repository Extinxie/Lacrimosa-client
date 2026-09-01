'use client'

import { Header } from '@/src/components/ui/header/header-main/header'
import { useGetCollectionAnimesUser } from '@/src/hooks/use-get-animes'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function MyListPageClient() {
	const searchParams = useSearchParams()
	const selectedSlug = searchParams.get('collection')
	const { data: collections, isLoading } = useGetCollectionAnimesUser()

	const selectedCollection =
		collections?.find((c) => c.slug === selectedSlug) || collections?.[0]

	if (isLoading) {
		return (
			<>
				<Header />
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse space-y-4">
						<div className="h-8 w-48 bg-neutral-800 rounded" />
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="h-24 bg-neutral-800/50 rounded-xl"
								/>
							))}
						</div>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<Header />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-3xl font-bold text-white mb-6">
					Мои списки
				</h1>

				<div className="flex flex-wrap gap-2 mb-6">
					{collections?.map((collection) => (
						<Link
							key={collection.id}
							href={`/profile/my-list?collection=${collection.slug}`}
							className={`px-4 py-2 rounded-full text-sm font-medium transition ${
								selectedCollection?.slug === collection.slug
									? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
									: 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
							}`}
						>
							{collection.icon} {collection.name}
							<span className="ml-1 text-xs opacity-60">
								({collection.items.length})
							</span>
						</Link>
					))}
				</div>

				{selectedCollection && (
					<div>
						<h2 className="text-xl font-semibold text-white mb-4">
							{selectedCollection.icon} {selectedCollection.name}
						</h2>

						{selectedCollection.items.length === 0 ? (
							<div className="text-white/40 text-center py-12">
								В этой коллекции пока нет аниме
							</div>
						) : (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{selectedCollection.items.map((item) => (
									<Link
										key={item.id}
										href={`/anime/${item.anime.slug}`}
										className="group"
									>
										<div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-neutral-800">
											{item.anime.poster && (
												<Image
													src={item.anime.poster}
													alt={
														item.anime
															.russianTitle ||
														item.anime.nativeTitle
													}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-300"
												/>
											)}
											{item.rating && (
												<div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
													★ {item.rating}
												</div>
											)}
										</div>
										<p className="text-white text-sm mt-1 truncate group-hover:text-pink-400 transition">
											{item.anime.russianTitle ||
												item.anime.nativeTitle}
										</p>
									</Link>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	)
}
