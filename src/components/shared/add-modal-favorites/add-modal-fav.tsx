'use client'

import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTrigger
} from '../../ui/modal/dialog'
import { Input } from '@base-ui/react'
import { Button } from '../../ui'
import {
	usePostFavoritesUserAnimesTop,
	useSearchAnimes
} from '@/src/hooks/use-get-animes'
import { Loader2, Search } from 'lucide-react'

interface AddAnimeModalProps {
	trigger?: React.ReactNode
}

export function AddAnimeModal({ trigger }: AddAnimeModalProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const { data: searchResults, isLoading: isSearching } =
		useSearchAnimes(searchQuery)
	const { mutate: addToFavorites, isPending: isAdding } =
		usePostFavoritesUserAnimesTop()

	const handleSubmit = async (id: string) => {
		addToFavorites(id)
		setIsOpen(false)
	}
	useEffect(() => {
		if (!isOpen) {
			setIsOpen(false)
			setSearchQuery('')
		}
	}, [isOpen])
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				{trigger || <Button>Добавить аниме</Button>}
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg bg-neutral-950 border border-white/10 text-white max-h-[80vh] flex flex-col shadow-lg shadow-purple-400/5">
				<DialogHeader>
					<DialogTitle className="text-white text-xl font-bold">
						Добавить в избранное
					</DialogTitle>
				</DialogHeader>

				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Поиск аниме..."
						className="w-full pl-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-pink-500 rounded-lg py-2.5"
						autoFocus
					/>
				</div>

				<div className="flex-1 overflow-y-auto mt-4 space-y-2 min-h-50 max-h-100">
					{isSearching && searchQuery.length > 2 ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="w-6 h-6 animate-spin text-white/40" />
						</div>
					) : searchResults && searchResults.length > 0 ? (
						searchResults.map((anime) => (
							<div
								key={anime.id}
								onClick={() => handleSubmit(anime.id)}
								className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/5`}
							>
								<div className="relative w-12 h-16 rounded overflow-hidden shrink-0 bg-neutral-800">
									{anime.poster ? (
										<img
											src={anime.poster}
											alt={
												anime.russianTitle ||
												anime.nativeTitle
											}
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
											нет
										</div>
									)}
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-white text-sm font-medium truncate">
										{anime.russianTitle ||
											anime.nativeTitle}
									</p>
									<div className="flex items-center gap-2 text-xs text-white/40">
										<span>{anime.year}</span>
										<span>•</span>
										{anime.shikimoriRating > 0 && (
											<>
												<span className="text-yellow-400">
													★{' '}
													{anime.shikimoriRating.toFixed(
														1
													)}
												</span>
											</>
										)}
									</div>
								</div>
							</div>
						))
					) : searchQuery.length > 2 ? (
						<div className="flex items-center justify-center py-8 text-white/40 text-sm">
							Ничего не найдено
						</div>
					) : (
						<div className="flex items-center justify-center py-8 text-white/30 text-sm">
							Начните вводить название аниме
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
