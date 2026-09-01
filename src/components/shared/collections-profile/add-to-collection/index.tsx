'use client'

import { useState } from 'react'
import {
	useGetCollectionAnimesUser,
	usePostCollectionUserAnimes
} from '@/src/hooks/use-get-animes'
import { Check, Plus, ChevronDown } from 'lucide-react'

interface AddToCollectionButtonProps {
	animeId: string
}

export function AddToCollectionButton({ animeId }: AddToCollectionButtonProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { data: collections, isLoading } = useGetCollectionAnimesUser()
	const { mutate: addToCollection, isPending } = usePostCollectionUserAnimes()

	if (isLoading) {
		return (
			<button
				className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-medium transition"
				style={{
					// border: `1px solid ${BORDER}`,
					// color: DIM_2,
					opacity: 0.5
				}}
				disabled
			>
				<Plus className="w-4 h-4" />
				Загрузка...
			</button>
		)
	}

	if (!collections || collections.length === 0) {
		return (
			<button
				className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-medium transition hover:bg-white/5"
				style={
					{
						// border: `1px solid ${BORDER}`,
						// color: DIM_2
					}
				}
				disabled
			>
				<Plus className="w-4 h-4" />
				Нет коллекций
			</button>
		)
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-medium transition hover:bg-white/5"
				style={
					{
						// border: `1px solid ${BORDER}`,
						// color: DIM_2
					}
				}
			>
				<Plus className="w-4 h-4" />
				В коллекцию
				<ChevronDown
					className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-2 w-56 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
					{collections.map((collection) => {
						const isInCollection = collection.items.some(
							(item) => item.animeId === animeId
						)

						return (
							<button
								key={collection.id}
								onClick={() => {
									if (!isInCollection) {
										addToCollection({
											slug: collection.slug,
											animeId
										})
									}
									setIsOpen(false)
								}}
								disabled={isInCollection || isPending}
								className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<span className="text-xl">
									{collection.icon || '📋'}
								</span>
								<span>{collection.name}</span>
								{isInCollection && (
									<Check className="w-4 h-4 text-green-400 ml-auto" />
								)}
								{isPending && (
									<span className="ml-auto text-xs text-white/30">
										...
									</span>
								)}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}
