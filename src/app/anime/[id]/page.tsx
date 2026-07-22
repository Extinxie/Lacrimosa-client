'use client'

import { Header } from '@/src/components/ui/header/header-main/header'
import { useAnimeById } from '@/src/hooks/get-animes'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { ITag } from '@/src/types/for-api.types'
import { useState } from 'react'
import { cleanDescription, truncateText } from '@/src/lib/utils/description'

export default function AnimeDetailPage() {
	const params = useParams()
	const id = params.id as string
	const [isExpanded, setIsExpanded] = useState(false)
	const [activeTab, setActiveTab] = useState('seasons')

	const { data, isLoading, isError } = useAnimeById(id)

	const groupTagsByType = (tags: ITag[] = []) => {
		const genres = tags?.filter((tag) => tag.type === 'GENRE') || []
		const demographics =
			tags?.filter((tag) => tag.type === 'DEMOGRAPHIC') || []
		return { genres, demographics }
	}

	if (isLoading) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-neutral-950 flex items-center justify-center">
					<div className="animate-pulse flex flex-col items-center gap-4">
						<div className="w-40 h-56 bg-neutral-800 rounded-xl" />
						<div className="w-48 h-6 bg-neutral-800 rounded" />
					</div>
				</div>
			</>
		)
	}

	if (isError || !data) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-neutral-950 flex items-center justify-center">
					<div className="text-white/50 text-center">
						<p className="text-2xl font-bold mb-2">
							aниме не найдено
						</p>
					</div>
				</div>
			</>
		)
	}

	const { genres } = groupTagsByType(data.tags)
	const cleanedDescription = cleanDescription(data.description)
	const descriptionLimit = 90
	const isLongDescription = cleanedDescription.length > descriptionLimit
	return (
		<>
			<Header />

			<main className="min-h-screen bg-neutral-950">
				<div className="relative w-full h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden rounded-xl">
					{data.banner ? (
						<>
							<div className="hidden md:block relative w-full h-full">
								<Image
									src={data.banner}
									alt={data.russianTitle || data.nativeTitle}
									fill
									className="object-cover opacity-70"
									priority
								/>
							</div>

							<div className="hidden md:block relative w-full h-full">
								{data.poster && (
									<Image
										src={data.poster}
										alt={
											data.russianTitle ||
											data.nativeTitle
										}
										fill
										className="object-cover"
										priority
									/>
								)}
							</div>
							<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
							<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
						</>
					) : (
						<div className="relative w-full h-full">
							{data.poster && (
								<>
									<Image
										src={data.poster}
										alt={
											data.russianTitle ||
											data.nativeTitle
										}
										fill
										className="object-cover object-right"
										priority
									/>
									<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
									<div className="absolute inset-0 bg-linear-to-l to-neutral-950/70 from-neutral-950/10" />
								</>
							)}
						</div>
					)}
				</div>

				<div className="mx-auto px-4 sm:px-6 lg:px-8 -mt-60 md:-mt-96 relative z-10">
					<div className="text-sm text-white/40 mb-6">
						<Link
							href="/"
							className="hover:text-white/70 transition"
						>
							Lacrimosa
						</Link>
						<span className="mx-2">•</span>
						<span className="text-white/70">
							{data.russianTitle || data.nativeTitle}
						</span>
					</div>

					<div className="flex flex-col lg:flex-row gap-8">
						<div className="lg:w-60 shrink-0">
							<div className="relative aspect-2/3 rounded-xl overflow-hidden">
								{data.poster ? (
									<Image
										src={data.poster}
										alt={
											data.russianTitle ||
											data.nativeTitle
										}
										fill
										className="object-cover"
										priority
									/>
								) : (
									<div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500">
										Нет постера
									</div>
								)}
							</div>
							<span className="inline-block mt-3 text-xs text-white/40 bg-neutral-800 px-3 py-1 rounded">
								18+
							</span>
						</div>

						<div className="flex-1 text-white">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
								{data.russianTitle || data.nativeTitle}
							</h1>

							<div className="flex flex-wrap items-center gap-3 mt-2">
								{data.englishTitle && (
									<span className="text-white/50 text-lg">
										{data.englishTitle}
									</span>
								)}
								{data.nativeTitle &&
									data.russianTitle !== data.nativeTitle && (
										<span className="text-white/30 text-sm">
											({data.nativeTitle})
										</span>
									)}
							</div>

							<div className="flex flex-wrap items-center gap-4 mt-4">
								{data.shikimoriRating > 0 && (
									<div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 rounded-full">
										<span className="text-2xl font-bold text-white ">
											{data.shikimoriRating.toFixed(1)}
										</span>
										<span className="text-sm font-bold text-white/40">
											/ 10
										</span>
									</div>
								)}
							</div>

							<div className="flex flex-wrap gap-3 mt-6">
								<Link
									href={`/watch/${id}`}
									className="inline-flex items-center gap-2 bg-linear-to-r from-neutral-800 to-neutral-900 hover:from-purple-800 hover:to-pink-800 text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105 duration-200"
								>
									<Play className="w-5 h-5" />
									Смотреть сериал
								</Link>
								<button className="border cursor-pointer border-white/20 hover:border-white/40 px-6 py-3 rounded-full font-medium text-white/70 hover:text-white transition">
									Смотреть вместе
								</button>
							</div>

							<div className="flex gap-12 p-5 mt-6">
								{data.status && (
									<div>
										<div className="text-xs text-white/40 mb-1">
											Статус
										</div>
										<div className="font-medium text-white">
											{data.status === 'ВЫПУЩЕННО'
												? 'Вышло'
												: data.status === 'ОНГОИНГ'
													? 'Выходит'
													: 'Анонс'}
										</div>
									</div>
								)}
								{data.year && (
									<div>
										<div className="text-xs text-white/40 mb-1">
											Год
										</div>
										<div className="font-medium text-white">
											{data.year}
										</div>
									</div>
								)}
								{data.episodesCount && (
									<div>
										<div className="text-xs text-white/40 mb-1">
											Эпизодов
										</div>
										<div className="font-medium text-white">
											{data.episodesCount}
										</div>
									</div>
								)}
								{data.country && (
									<div>
										<div className="text-xs text-white/40 mb-1">
											Страна
										</div>
										<div className="font-medium text-white">
											{data.country}
										</div>
									</div>
								)}
								{data.type && (
									<div>
										<div className="text-xs text-white/40 mb-1">
											Тип
										</div>
										<div className="font-medium text-white">
											{data.type}
										</div>
									</div>
								)}
								{data.season && (
									<div>
										<div className="text-xs text-white/40 mb-1">
											Сезон
										</div>
										<div className="font-medium text-white">
											{data.season}
										</div>
									</div>
								)}
							</div>

							{genres.length > 0 && (
								<div className="mt-4">
									<div className="text-xs text-white/40 mb-2">
										Жанры
									</div>
									<div className="flex flex-wrap gap-2">
										{genres.map((genre) => (
											<Link
												key={genre.id}
												href={`/genre/${genre.englishTitle?.toLowerCase() || genre.shikimoriId}`}
												className="px-3 py-1 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-full text-white/60 hover:text-white transition"
											>
												{genre.russianTitle ||
													genre.englishTitle}
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{data.description && (
						<div className="mt-8 md:mt-10">
							<div className="text-xs text-white/40 mb-2 uppercase tracking-wide">
								Описание
							</div>

							<p className="text-white/70 leading-relaxed hidden md:block">
								{cleanedDescription}
							</p>

							<div className="md:hidden">
								<p className="text-white/70 leading-relaxed">
									{isExpanded
										? cleanedDescription
										: truncateText(
												cleanedDescription,
												descriptionLimit
											)}
								</p>
								{isLongDescription && (
									<button
										onClick={() =>
											setIsExpanded(!isExpanded)
										}
										className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-2 transition-colors"
									>
										{isExpanded
											? 'скрыть'
											: 'читать далее →'}
									</button>
								)}
							</div>
						</div>
					)}

					<div className="mt-8 border-b border-white/10">
						<div className="flex flex-wrap gap-6">
							<button
								onClick={() => setActiveTab('seasons')}
								className={`pb-3 font-medium transition ${
									activeTab === 'seasons'
										? 'text-white border-b-2 border-purple-500'
										: 'text-white/40 hover:text-white/70'
								}`}
							>
								Сезоны и серии
							</button>
							<button
								onClick={() => setActiveTab('similar')}
								className={`pb-3 font-medium transition ${
									activeTab === 'similar'
										? 'text-white border-b-2 border-purple-500'
										: 'text-white/40 hover:text-white/70'
								}`}
							>
								Похожее
							</button>
							<button
								onClick={() => setActiveTab('screenshots')}
								className={`pb-3 font-medium transition ${
									activeTab === 'screenshots'
										? 'text-white border-b-2 border-purple-500'
										: 'text-white/40 hover:text-white/70'
								}`}
							>
								Скриншоты
							</button>
						</div>
					</div>

					<div className="mt-6">
						{activeTab === 'seasons' && (
							<>
								{data.seasons && data.seasons.length > 0 && (
									<div className="flex flex-wrap gap-3 mb-6">
										{data.seasons.map((season) => (
											<Link
												key={season.id}
												href={`/anime/${season.slug}`}
												className={`px-4 py-2 rounded-full text-sm font-medium transition ${
													season.isCurrent
														? 'bg-purple-600 text-white'
														: 'bg-neutral-800/50 text-white/60 hover:bg-neutral-700/50 hover:text-white'
												}`}
											>
												{season.title}
											</Link>
										))}
									</div>
								)}

								{data.episodes && data.episodes.length > 0 && (
									<div>
										<h3 className="text-white font-semibold mb-3">
											Список серий
										</h3>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
											{data.episodes.map((ep) => (
												<div
													key={ep.id}
													className="bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg p-3 text-center cursor-pointer transition"
												>
													<span className="text-white text-sm font-medium">
														Серия {ep.number}
													</span>
												</div>
											))}
										</div>
									</div>
								)}
							</>
						)}

						{activeTab === 'similar' && (
							<div className="text-white/40 text-center py-8">
								Скоро здесь появятся похожие аниме
							</div>
						)}

						{activeTab === 'screenshots' && (
							<div className="text-white/40 text-center py-8">
								Скоро здесь появятся скриншоты
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	)
}
