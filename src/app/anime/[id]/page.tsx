'use client'

import { Header } from '@/src/components/ui/header/header-main/header'
import {
	useAnimeById,
	usePostFavoritesUserAnimesTop
} from '@/src/hooks/use-get-animes'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Play, Users } from 'lucide-react'
import { ITag } from '@/src/types/for-api.types'
import { useState } from 'react'
import { cleanDescription, truncateText } from '@/src/lib/utils/description'
import { AddToCollectionButton } from '@/src/components/shared/collections-profile/add-to-collection'

const INK = '#000000'
const CARD = '#16181f'
const BORDER = '#e5533d'
// const BORDER = '#25272f'
const VERMILLION = '#e5533d'
const GOLD = '#d9a441'
const DIM = 'rgba(242,240,232,0.4)'
const DIM_2 = 'rgba(242,240,232,0.6)'

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
	const { mutate: addToFavorites, isPending: isAdding } =
		usePostFavoritesUserAnimesTop()

	if (isLoading) {
		return (
			<>
				<Header />
				<div
					className="min-h-screen flex items-center justify-center"
					style={{ background: INK }}
				>
					<div className="flex flex-col items-center gap-4">
						<div
							className="w-40 h-56 rounded-xl animate-pulse"
							style={{
								background: CARD,
								border: `1px solid ${BORDER}`
							}}
						/>
						<div
							className="w-48 h-6 rounded animate-pulse"
							style={{ background: CARD }}
						/>
					</div>
				</div>
			</>
		)
	}

	if (isError || !data) {
		return (
			<>
				<Header />
				<div
					className="min-h-screen flex items-center justify-center"
					style={{ background: INK }}
				>
					<div className="text-center">
						<p
							className="text-2xl font-bold mb-2"
							style={{ color: '#f2f0e8' }}
						>
							Аниме не найдено
						</p>
						<p
							className="text-sm font-mono uppercase tracking-widest"
							style={{ color: DIM }}
						>
							сигнал потерян
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
	const title = data.russianTitle || data.nativeTitle
	const heroImage = data.banner || data.poster
	const ratingPct =
		data.shikimoriRating > 0
			? Math.min(100, (data.shikimoriRating / 10) * 100)
			: 0

	const metaItems = [
		data.status && {
			label: 'Статус',
			value:
				data.status === 'ВЫПУЩЕННО'
					? 'Вышло'
					: data.status === 'ОНГОИНГ'
						? 'Выходит'
						: 'Анонс'
		},
		data.year && { label: 'Год', value: data.year },
		data.episodesCount && { label: 'Эпизодов', value: data.episodesCount },
		data.country && { label: 'Страна', value: data.country },
		data.type && { label: 'Тип', value: data.type },
		data.season && { label: 'Сезон', value: data.season }
	].filter(Boolean) as { label: string; value: string | number }[]

	return (
		<>
			<Header />

			<main className="min-h-screen" style={{ background: INK }}>
				<div className="relative w-full h-[38vh] md:h-[42vh] lg:h-[48vh] overflow-hidden">
					{heroImage && (
						<Image
							src={heroImage}
							alt={title}
							fill
							className="object-cover opacity-60"
							priority
						/>
					)}
					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(to top, ${INK} 0%, rgba(11,12,16,0.75) 45%, transparent 100%)`
						}}
					/>
					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(to right, ${INK}, transparent 60%)`
						}}
					/>
				</div>

				<div className="mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 relative z-10 pb-16">
					<div
						className="text-sm mb-6 font-mono"
						style={{ color: DIM }}
					>
						<Link
							href="/"
							className="transition-colors hover:text-white"
						>
							Lacrimosa
						</Link>
						<span className="mx-2" style={{ color: BORDER }}>
							/
						</span>
						<span style={{ color: DIM_2 }}>{title}</span>
					</div>

					<div className="flex flex-col lg:flex-row gap-8">
						<div className="lg:w-60 shrink-0">
							<div
								className="relative aspect-2/3 rounded-xl overflow-hidden"
								style={{ border: `1px solid ${BORDER}` }}
							>
								{data.poster ? (
									<Image
										src={data.poster}
										alt={title}
										fill
										className="object-cover"
										priority
									/>
								) : (
									<div
										className="w-full h-full flex items-center justify-center text-sm"
										style={{ background: CARD, color: DIM }}
									>
										Нет постера
									</div>
								)}
							</div>
							<span
								className="inline-block mt-3 text-[11px] font-mono tracking-widest px-3 py-1 rounded"
								style={{
									color: DIM_2,
									border: `1px solid ${BORDER}`
								}}
							>
								18+
							</span>
						</div>

						<div className="flex-1 text-white min-w-0">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
								{title}
							</h1>

							<div className="flex flex-wrap items-center gap-3 mt-2">
								{data.englishTitle && (
									<span
										className="text-lg"
										style={{ color: DIM_2 }}
									>
										{data.englishTitle}
									</span>
								)}
								{data.nativeTitle &&
									data.russianTitle !== data.nativeTitle && (
										<span
											className="text-sm"
											style={{ color: DIM }}
										>
											({data.nativeTitle})
										</span>
									)}
							</div>

							<div className="flex flex-wrap items-center gap-4 mt-5">
								{data.shikimoriRating > 0 && (
									<div className="flex items-center gap-3">
										<div
											className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
											style={{
												background: `conic-gradient(${VERMILLION} ${ratingPct}%, ${BORDER} ${ratingPct}%)`
											}}
										>
											<div
												className="absolute inset-0.75 rounded-full flex items-center justify-center"
												style={{ background: INK }}
											>
												<span className="text-base font-mono font-semibold">
													{data.shikimoriRating.toFixed(
														1
													)}
												</span>
											</div>
										</div>
										<div
											className="text-xs font-mono uppercase tracking-widest leading-tight"
											style={{ color: DIM }}
										>
											рейтинг
											<br />
											shikimori
										</div>
									</div>
								)}
							</div>

							<div className="flex flex-wrap gap-3 mt-6">
								<Link
									href={`/watch/${id}`}
									className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-[1.03] duration-200"
									style={{ background: VERMILLION }}
								>
									<Play className="w-5 h-5" />
									Смотреть сериал
								</Link>
								<button
									className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-medium transition"
									style={{
										border: `1px solid ${BORDER}`,
										color: DIM_2
									}}
								>
									<Users className="w-4 h-4" />
									Смотреть вместе
								</button>

								<AddToCollectionButton animeId={data.id} />

								<button
									onClick={() => addToFavorites(data.id)}
									disabled={isAdding}
									className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-medium transition"
									style={{
										border: `1px solid ${BORDER}`,
										color: DIM_2,
										opacity: isAdding ? 0.5 : 1
									}}
								>
									<Heart className="w-4 h-4" />
									{isAdding
										? 'Добавление...'
										: 'Добавить в избранное'}
								</button>
							</div>

							{metaItems.length > 0 && (
								<div
									className="flex flex-wrap gap-x-6 gap-y-3 mt-8 pt-5"
									style={{ borderTop: `1px solid ${BORDER}` }}
								>
									{metaItems.map((item) => (
										<div key={item.label}>
											<div
												className="text-[10px] font-mono uppercase tracking-widest mb-1"
												style={{ color: DIM }}
											>
												{item.label}
											</div>
											<div className="font-medium">
												{item.value}
											</div>
										</div>
									))}
								</div>
							)}

							{genres.length > 0 && (
								<div className="mt-5">
									<div
										className="text-[10px] font-mono uppercase tracking-widest mb-2"
										style={{ color: DIM }}
									>
										Жанры
									</div>
									<div className="flex flex-wrap gap-2">
										{genres.map((genre) => (
											<Link
												key={genre.id}
												href={`/genre/${genre.englishTitle?.toLowerCase() || genre.shikimoriId}`}
												className="px-3 py-1 text-sm rounded-full transition"
												style={{
													background: CARD,
													color: DIM_2,
													border: `1px solid ${BORDER}`
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.borderColor =
														VERMILLION
													e.currentTarget.style.color =
														'#f2f0e8'
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.borderColor =
														BORDER
													e.currentTarget.style.color =
														DIM_2
												}}
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
						<div className="mt-10">
							<div
								className="text-[10px] font-mono uppercase tracking-widest mb-2"
								style={{ color: DIM }}
							>
								Описание
							</div>

							<p
								className="leading-relaxed hidden md:block"
								style={{ color: DIM_2 }}
							>
								{cleanedDescription}
							</p>

							<div className="md:hidden">
								<p
									className="leading-relaxed"
									style={{ color: DIM_2 }}
								>
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
										className="text-sm font-medium mt-2 transition-colors"
										style={{ color: VERMILLION }}
									>
										{isExpanded
											? 'скрыть'
											: 'читать далее →'}
									</button>
								)}
							</div>
						</div>
					)}

					<div
						className="mt-10"
						style={{ borderBottom: `1px solid ${BORDER}` }}
					>
						<div className="flex flex-wrap gap-6">
							{[
								{ key: 'seasons', label: 'Сезоны и серии' },
								{ key: 'similar', label: 'Похожее' },
								{ key: 'screenshots', label: 'Скриншоты' }
							].map((tab) => (
								<button
									key={tab.key}
									onClick={() => setActiveTab(tab.key)}
									className="relative pb-3 text-sm font-mono uppercase tracking-widest transition-colors"
									style={{
										color:
											activeTab === tab.key
												? '#f2f0e8'
												: DIM
									}}
								>
									{tab.label}
									{activeTab === tab.key && (
										<span
											className="absolute left-0 right-0 -bottom-px h-0.5"
											style={{ background: VERMILLION }}
										/>
									)}
								</button>
							))}
						</div>
					</div>

					<div className="mt-6">
						{activeTab === 'seasons' && (
							<>
								{data.seasons && data.seasons.length > 0 && (
									<div className="flex flex-wrap gap-3 mb-6">
										{data.seasons.map(
											(season: {
												id: string | number
												slug: string
												title: string
												isCurrent?: boolean
											}) => (
												<Link
													key={season.id}
													href={`/anime/${season.slug}`}
													className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
													style={
														season.isCurrent
															? {
																	background:
																		'rgba(229,83,61,0.12)',
																	color: VERMILLION,
																	border: `1px solid ${VERMILLION}`
																}
															: {
																	background:
																		'transparent',
																	color: DIM,
																	border: `1px solid ${BORDER}`
																}
													}
												>
													{season.isCurrent && (
														<span className="relative flex h-2 w-2">
															<span
																className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
																style={{
																	background:
																		VERMILLION
																}}
															/>
															<span
																className="relative inline-flex rounded-full h-2 w-2"
																style={{
																	background:
																		VERMILLION
																}}
															/>
														</span>
													)}
													{season.title}
												</Link>
											)
										)}
									</div>
								)}

								{data.episodes && data.episodes.length > 0 && (
									<div>
										<div className="flex items-baseline justify-between mb-4">
											<h3 className="text-white font-semibold tracking-tight">
												Список серий
											</h3>
											<span
												className="text-xs font-mono"
												style={{ color: DIM }}
											>
												{String(
													data.episodes.length
												).padStart(2, '0')}{' '}
												всего
											</span>
										</div>
										<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
											{data.episodes.map(
												(
													ep: {
														id: string | number
														number: number
														isNew?: boolean
													},
													i: number
												) => (
													<div
														key={ep.id}
														className="relative rounded-lg p-3 text-center cursor-pointer transition-transform hover:-translate-y-0.5"
														style={{
															background: CARD,
															border: `1px solid ${BORDER}`,
															borderLeft: `2px dashed ${ep.isNew || i === data.episodes.length - 1 ? GOLD : BORDER}`
														}}
													>
														{(ep.isNew ||
															i ===
																data.episodes
																	.length -
																	1) && (
															<span
																className="absolute -top-1.5 -right-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded"
																style={{
																	background:
																		GOLD,
																	color: '#2c2107'
																}}
															>
																new
															</span>
														)}
														<div
															className="text-[10px] font-mono uppercase tracking-wider mb-1"
															style={{
																color: DIM
															}}
														>
															ep
														</div>
														<div className="text-white text-lg font-mono font-semibold">
															{String(
																ep.number
															).padStart(2, '0')}
														</div>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</>
						)}

						{activeTab === 'similar' && (
							<div className="text-center py-12">
								<p
									className="text-sm max-w-xs mx-auto"
									style={{ color: DIM }}
								>
									Похожие тайтлы появятся здесь после выхода
									первых оценок.
								</p>
							</div>
						)}

						{activeTab === 'screenshots' && (
							<div className="text-center py-12">
								<p
									className="text-sm max-w-xs mx-auto"
									style={{ color: DIM }}
								>
									Скриншоты появятся после публикации первой
									серии.
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	)
}
