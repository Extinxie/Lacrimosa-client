'use client'

import { useAuth } from '@/src/context/auth-provider'
import { useEffect, useRef, useState, memo, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/src/components/ui/header/header-main/header'
import {
	Pencil,
	Camera,
	Bookmark,
	Crown,
	Users,
	BarChart,
	ListMusic,
	Heart,
	MessageCircle,
	ChevronRight,
	Share2
} from 'lucide-react'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/src/components/ui/avatar/avatar'
import { useUserStore } from '@/src/stores/user-settings/user-settings'
import { useGetAwardsUser } from '@/src/hooks/use-get-users'
import SettingsUser from '@/src/components/shared/awards-user/profile-settings/info-settings/settings-user-component'
import { FavoriteAnimes } from '@/src/components/shared/favorites-profile/favorites-profile'
import Link from 'next/link'
import { Button } from '@/src/components/ui'
import { toast } from 'react-toastify'
import FooterComponent from '@/src/components/ui/footer/footer'
import CollectionComponents from '@/src/components/shared/collections-profile/collections-profile'

// export const metadata: Metadata = {
// 	title: 'Мой профиль | Lacrimosa',
// 	description: 'Управляйте своим профилем на Lacrimosa — аниме-портале',
// 	openGraph: {
// 		title: 'Мой профиль | Lacrimosa',
// 		description: 'Управляйте своим профилем на Lacrimosa',
// 		images: ['/og-image.png']
// 	}
// }

const ProfileHeader = memo(function ProfileHeader() {
	const me = useUserStore((state) => state.me)
	const isUploadingAvatar = useUserStore((state) => state.isUploadingAvatar)
	const isUploadingBanner = useUserStore((state) => state.isUploadingBanner)
	const uploadAvatar = useUserStore((state) => state.uploadAvatar)
	const uploadBanner = useUserStore((state) => state.uploadBanner)

	const avatarInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
	const [bannerPreview, setBannerPreview] = useState<string | null>(null)

	if (!me) return null

	const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith('image/')) {
			e.target.value = ''
			return
		}

		const previewUrl = URL.createObjectURL(file)
		setAvatarPreview(previewUrl)

		await uploadAvatar(file)

		setAvatarPreview(null)
		URL.revokeObjectURL(previewUrl)
		e.target.value = ''
	}

	const handleBannerChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith('image/')) {
			e.target.value = ''
			return
		}

		const previewUrl = URL.createObjectURL(file)
		setBannerPreview(previewUrl)

		await uploadBanner(file)

		setBannerPreview(null)
		URL.revokeObjectURL(previewUrl)
		e.target.value = ''
	}

	const displayedAvatar = avatarPreview || me.image || null
	const displayedBanner =
		bannerPreview ||
		me.bannerProfile ||
		'https://i.pinimg.com/736x/71/38/64/71386419a1c61b0b83ad59f1dc6bfbbe.jpg'

	return (
		<>
			<div className="relative w-full rounded-2xl overflow-hidden mt-4 shadow-lg group shadow-purple-400/5">
				<img
					key={displayedBanner}
					src={displayedBanner}
					alt="Баннер профиля"
					className="w-full h-52 sm:h-64 md:h-80 lg:h-80 xl:h-80 object-cover"
				/>
				<div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

				<button
					type="button"
					onClick={() => bannerInputRef.current?.click()}
					disabled={isUploadingBanner}
					className="absolute top-2 left-2 cursor-pointer rounded-full bg-black/50 p-3 hover:bg-black/70 transition-colors disabled:opacity-50"
				>
					<Pencil className="w-4 h-4 text-white" />
				</button>
				<input
					ref={bannerInputRef}
					type="file"
					accept="image/*"
					onChange={handleBannerChange}
					className="hidden"
				/>
			</div>

			<div className="relative px-4 sm:px-12 -mt-16 sm:-mt-20 md:-mt-24 z-10">
				<div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
					<div className="relative group">
						<Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-4 border-neutral-950 shadow-xl">
							<AvatarImage
								key={displayedAvatar || 'fallback'}
								src={displayedAvatar || ''}
								alt={me.name || 'User'}
								className="object-cover"
							/>
							<AvatarFallback className="bg-linear-to-br from-purple-500 to-pink-500 text-white text-3xl sm:text-4xl font-bold">
								{me.name?.[0]?.toUpperCase() || 'U'}
							</AvatarFallback>
						</Avatar>

						<button
							type="button"
							onClick={() => avatarInputRef.current?.click()}
							disabled={isUploadingAvatar}
							className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium disabled:cursor-not-allowed"
						>
							<Camera className="w-6 h-6" />
						</button>

						<input
							ref={avatarInputRef}
							type="file"
							accept="image/*"
							onChange={handleAvatarChange}
							className="hidden"
						/>
					</div>

					<div className="flex-1 text-center sm:text-left pb-3">
						<div className="flex items-center gap-3 flex-wrap">
							<h1 className="text-3xl sm:text-5xl font-extrabold text-white">
								{me?.name || 'Пользователь'}
							</h1>
							{me?.premium && (
								<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-linear-to-r from-pink-400 to-red-500 shadow-lg shadow-pink-500/50 hover:scale-105 transition-transform duration-200 cursor-default">
									<Heart
										size={18}
										className="text-white fill-white"
									/>
									{/* <span className="text-white text-xs font-bold uppercase tracking-wider">
										Premium
									</span> */}
								</div>
							)}
						</div>

						<div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-1 text-sm text-gray-400">
							<span>{me?.bio || 'No bio yet'}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
})

export default function ProfilePageClient() {
	const router = useRouter()
	const { isAuth, isLoading: authLoading } = useAuth()
	const me = useUserStore((state) => state.me)
	const isLoading = useUserStore((state) => state.isLoading)
	const fetchMe = useUserStore((state) => state.fetchMe)
	const { data: friends } = useGetAwardsUser()


	useEffect(() => {
		if (!authLoading && !isAuth) {
			router.push('/sign-in')
			return
		}
		if (isAuth) {
			fetchMe()
		}
	}, [isAuth, authLoading, fetchMe, router])

	if (authLoading || (isLoading && !me)) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-neutral-950 flex items-center justify-center">
					<div className="animate-pulse text-white/40">
						Загрузка профиля...
					</div>
				</div>
			</>
		)
	}

	if (!isAuth) {
		return null
	}

	if (!me) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-neutral-950 flex items-center justify-center">
					<div className="text-white/40">Нет данных профиля</div>
				</div>
			</>
		)
	}

	// const tabs = [
	// 	{ id: 'Статистика', icon: Bookmark },
	// 	{ id: 'История', icon: User },
	// 	{ id: 'Настройки', icon: Settings }
	// ]

	return (
		<div className="bg-neutral-950 min-h-screen">
			<Header />

			<div className=" mx-auto px-4 sm:px-6 lg:px-8 -mt-1 mb-4">
				<ProfileHeader />

				<div className="flex gap-6 text-xl font-bold border-b border-white/5 pb-3 mt-6 mb-6 overflow-x-auto"></div>

				<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
						<div className="lg:col-span-2 space-y-8">
							<div>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-white text-lg font-semibold flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
											<Heart className="w-4 h-4 text-pink-500" />
										</div>
										Любимые
									</h3>
									<span className="text-white/20 text-xs font-mono tracking-wider">
										ТОП 5
									</span>
								</div>
								<FavoriteAnimes />
							</div>

							<div>
								<div className="flex items-center gap-2.5 mb-4">
									<div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
										<Bookmark className="w-4 h-4 text-purple-500" />
									</div>
									<h3 className="text-white text-lg font-semibold">
										Коллекции
									</h3>
								</div>
								<div className="bg-white/5 rounded-xl p-8 text-center text-white/30 text-sm border border-dashed border-white/10 hover:border-white/20 transition-colors">
									<div>
										<CollectionComponents />
									</div>
								</div>
							</div>

							<div>
								<div className="flex items-center gap-2.5 mb-4">
									<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
										<ListMusic className="w-4 h-4 text-emerald-500" />
									</div>
									<h3 className="text-white text-lg font-semibold">
										Подборки
									</h3>
								</div>
								<div className="bg-white/5 rounded-xl p-8 text-center text-white/30 text-sm border border-dashed border-white/10 hover:border-white/20 transition-colors">
									<p>Здесь будут ваши плейлисты</p>
									<p className="text-xs text-white/20 mt-1">
										Скоро
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<div className="grid grid-cols-1">
								<Link href={'/settings'}>
									<Button className="w-full text-white font-medium py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg ">
										Редактировать профиль
									</Button>
								</Link>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<Button
									onClick={() => {
										const url = `http://localhost:3000/user/${me?.name || ''}`
										navigator.clipboard
											.writeText(url)
											.then(() => {
												toast.success(
													'Ссылка скопирована'
												)
											})
											.catch(() => {
												toast.error(
													'Не удалось скопировать ссылку'
												)
											})
									}}
									className="py-4 bg-neutral-950"
								>
									<Share2 className="w-4 h-4 mr-2" />
									Поделиться профилем
								</Button>

								<Button className="bg-linear-to-r from-amber-500 to-yellow-500 hover:opacity-80 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
									<Crown className="w-4 h-4" />
									Премиум
								</Button>
							</div>

							<div>
								<div className="flex items-center gap-2.5 mb-4">
									<div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
										<BarChart className="w-4 h-4 text-blue-500" />
									</div>
									<h3 className="text-white text-lg font-semibold">
										Статистика
									</h3>
								</div>
								<div className="grid grid-cols-3 gap-2">
									<div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
										<div className="text-2xl font-bold text-white">
											0
										</div>
										<div className="text-white/40 text-xs mt-0.5">
											Просмотрено
										</div>
									</div>
									<div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
										<div className="text-2xl font-bold text-white">
											0
										</div>
										<div className="text-white/40 text-xs mt-0.5">
											В планах
										</div>
									</div>
									<div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
										<div className="text-2xl font-bold text-white">
											0
										</div>
										<div className="text-white/40 text-xs mt-0.5">
											Коллекций
										</div>
									</div>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
											<Users className="w-4 h-4 text-cyan-500" />
										</div>
										<h3 className="text-white text-lg font-semibold">
											Друзья
										</h3>
									</div>
									<Link
										href="/friends"
										className="text-xs text-white/30 hover:text-white/70 transition font-medium flex items-center gap-1"
									>
										Все <ChevronRight className="w-3 h-3" />
									</Link>
								</div>

								<div className="bg-white/3 rounded-2xl p-4 border border-white/5">
									{/* <div className="flex items-center justify-between mb-3">
											<div className="flex items-center gap-2.5">
												<div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
													<Users className="w-4 h-4 text-cyan-500" />
												</div>
												<h3 className="text-white text-lg font-semibold">
													Друзья
												</h3>
											</div>
											<Link
												href="/friends"
												className="text-xs text-white/30 hover:text-white/70 transition font-medium flex items-center gap-1"
											>
												Все{' '}
												<ChevronRight className="w-3 h-3" />
											</Link>
										</div> */}

									<div className="space-y-2 max-h-70 overflow-y-auto pr-1 custom-scrollbar">
										{friends?.slice(0, 4).map((item) => (
											<Link
												href={`/user/${item.name}`}
												key={item.id}
												className="group cursor-pointer relative bg-white/5 hover:bg-white/10 rounded-xl p-3 flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
											>
												<div className="relative shrink-0">
													{item.image ? (
														<img
															src={item.image}
															alt={item.name}
															className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors"
														/>
													) : (
														<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors">
															{item.name?.[0]?.toUpperCase() ||
																'?'}
														</div>
													)}
													{item.premium && (
														<div className="absolute -top-1 -right-1">
															<Crown
																size={14}
																className="text-yellow-400 drop-shadow-lg"
															/>
														</div>
													)}
													<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-neutral-950" />
												</div>

												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2">
														<p className="text-white text-sm font-medium truncate">
															{item.name ||
																'Пользователь'}
														</p>
													</div>
													<div className="flex items-center gap-2 mt-0.5">
														<span className="text-xs text-emerald-400/70 flex items-center gap-1">
															<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
															в сети
														</span>
														<span className="text-xs text-white/20">
															•
														</span>
														<span className="text-xs text-white/30">
															В друзьях
														</span>
													</div>
												</div>

												<button className="shrink-0 cursor-pointer text-xs px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors font-medium opacity-0 group-hover:opacity-100">
													Написать
												</button>
											</Link>
										))}
										{(!friends || friends.length === 0) && (
											<div className="text-white/30 text-sm text-center py-8">
												<Users className="w-8 h-8 mx-auto mb-2 text-white/10" />
												У вас пока нет друзей
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-4 border-t border-white/5">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2.5">
								<div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
									<MessageCircle className="w-4 h-4 text-indigo-400" />
								</div>
								<h3 className="text-white text-lg font-semibold">
									Стена
								</h3>
							</div>
							<button className="text-sm px-4 py-1.5 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition font-medium">
								+ Написать пост
							</button>
						</div>

						<div className="space-y-4">1234</div>
					</div>
				</div>

				{/* {activeTab === 'Друзья' && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
						{friends?.map((item) => (
							<div
								key={item.id}
								className="bg-white/5 hover:bg-white/10 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
							>
								<div className="relative shrink-0">
									{item.image ? (
										<img
											src={item.image}
											alt={item.name}
											className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/30"
										/>
									) : (
										<div className="w-14 h-14 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold border-2 border-purple-500/30">
											{item.name?.[0]?.toUpperCase() ||
												'?'}
										</div>
									)}
									{item.premium && (
										<div className="absolute -top-1 -right-1 bg-linear-to-r from-yellow-400 to-yellow-600 text-[10px] font-bold text-white px-0.5 py-0 rounded-full">
											<Crown size={20} />
										</div>
									)}
								</div>

								<div className="flex-1 min-w-0">
									<p className="text-white font-medium truncate">
										{item.name || 'Пользователь'}
									</p>
									<div className="flex items-center gap-2 mt-0.5">
										{item.premium && (
											<span className="text-[10px] font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
												PREMIUM
											</span>
										)}
										<span className="text-xs text-gray-500">
											•
										</span>
										<span className="text-xs text-gray-500">
											Друг
										</span>
									</div>
								</div>

								<button className="shrink-0 text-sm text-pink-400 hover:text-pink-300 transition-colors font-medium">
									Написать
								</button>
							</div>
						))}
					</div>
				)} */}

				{/* {activeTab === 'Настройки' && (
					<SettingsUser /> */}
				{/* // <form>
					// 	<h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
					// 		<Pencil className="w-5 h-5" />
					// 		Редактировать профиль
					// 	</h2>

					// 	<div className="space-y-4">
					// 		<div>
					// 			<label className="text-gray-400 text-sm block mb-1">
					// 				Имя
					// 			</label>
					// 			<input */}
				{/* // 				type="text"
									onSubmit={handleUpdateName}
					// 				value={name}
					// 				onChange={(e) => setName(e.target.value)}
					// 				placeholder="Введите имя"
					// 				className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition"
					// 			/>
					// 		</div>

					// 		<div>
					// 			<label className="text-gray-400 text-sm block mb-1">
					// 				Описание
					// 			</label>
					// 			<input */}
				{/* // 				type="textarea"
					// 				onSubmit={handleUpdateBio}
					// 				value={bio}
					// 				onChange={(e) => setBio(e.target.value)}
					// 				className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition"
					// 			/>
					// 		</div>

					// 		<SessionsList />

					// 		<button */}
				{/* // 			type="submit"
					// 			disabled={isLoading}
					// 			className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-xl hover:opacity-80 transition disabled:opacity-50"
					// 		>
					// 			{isLoading ? 'Сохранение' : 'Обновить профиль'}
					// 		</button>
					// 	</div> */}
				{/* // </form> */}
				{/* )} */}
			</div>
			<FooterComponent />
		</div>
	)
}
