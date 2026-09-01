'use client'

import { useGetCollectionAnimesUser } from '@/src/hooks/use-get-animes'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function CollectionComponents() {
	const { data: collections, isLoading } = useGetCollectionAnimesUser()

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="bg-neutral-800/50 rounded-xl p-4 h-24 animate-pulse"
					/>
				))}
			</div>
		)
	}

	if (!collections || collections.length === 0) {
		return (
			<div className="text-white/40 text-sm text-center py-8">
				У вас пока нет коллекций
			</div>
		)
	}

	const recentCollections = collections.slice(0, 3)

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-white text-lg font-semibold">Коллекции</h3>
				<Link
					href="/profile/my-list"
					className="text-sm text-white/40 hover:text-white/70 transition flex items-center gap-1"
				>
					Все коллекции <ChevronRight className="w-4 h-4" />
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{recentCollections.map((collection) => (
					<Link
						key={collection.id}
						href={`/profile/my-list?collection=${collection.slug}`}
						className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] group"
					>
						<div className="flex items-center gap-3">
							<span className="text-2xl">
								{collection.icon || '📋'}
							</span>
							<div>
								<h4 className="text-white font-medium">
									{collection.name}
								</h4>
								<p className="text-white/30 text-xs">
									{collection.items.length} аниме
								</p>
							</div>
							<ChevronRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-white/50 transition" />
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
