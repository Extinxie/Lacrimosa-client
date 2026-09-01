// components/shared/search-modal/SearchAnimeModal.tsx
'use client'

import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogHeader,
	DialogTrigger
} from '../../ui/modal/dialog'
import { Input } from '@base-ui/react'
import { Button } from '../../ui'
import { useSearchAnimes } from '@/src/hooks/use-get-animes'
import { Loader2, Search } from 'lucide-react'

interface SearchAnimeModalProps {
	trigger?: React.ReactNode
	onSelect?: (animeId: string) => void
	title?: string
	placeholder?: string
	emptyMessage?: string
}

export function SearchAnimeModal({
	trigger,
	onSelect,
	title = 'Поиск аниме',
	placeholder = 'Поиск аниме...',
	emptyMessage = 'Ничего не найдено'
}: SearchAnimeModalProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const { data: searchResults, isLoading: isSearching } =
		useSearchAnimes(searchQuery)

	useEffect(() => {
		if (!isOpen) {
			setSearchQuery('')
		}
	}, [isOpen])

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				{trigger || <Button>Поиск аниме</Button>}
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg bg-neutral-950 border border-white/10 text-white max-h-[80vh] flex flex-col">
				<DialogHeader>
					<DialogTitle className="text-white text-xl font-bold">
						{title}
					</DialogTitle>
				</DialogHeader>

				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={placeholder}
						className="w-full pl-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-pink-500 rounded-lg py-2.5"
						autoFocus
					/>
				</div>

				<div className="flex-1 overflow-y-auto mt-4 space-y-2 min-h-[200px] max-h-[400px]">
					{isSearching && searchQuery.length > 2 ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="w-6 h-6 animate-spin text-white/40" />
						</div>
					) : searchResults && searchResults.length > 0 ? (
						searchResults.map((anime) => (
							<div
								key={anime.id}
								onClick={() => {
									onSelect?.(anime.id)
									setIsOpen(false)
								}}
								className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/5"
							>
								<div className="relative w-12 h-16 rounded overflow-hidden shrink-0 bg-neutral-800">
									{anime.poster ? (
										<img
											src={anime.poster}
											alt={
												anime.russianTitle ||
												anime.nativeTitle
											}
											className="w-full h-full object-cover"
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
											<span className="text-yellow-400">
												★{' '}
												{anime.shikimoriRating.toFixed(
													1
												)}
											</span>
										)}
									</div>
								</div>
							</div>
						))
					) : searchQuery.length > 2 ? (
						<div className="flex items-center justify-center py-8 text-white/40 text-sm">
							{emptyMessage}
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
