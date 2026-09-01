'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/src/components/ui/avatar/avatar'
import { useParams } from 'next/navigation'
import { Header } from '@/src/components/ui/header/header-main/header'
import { Bookmark, Clock, Crown, User } from 'lucide-react'
import { useState } from 'react'
import {
	useGetAnotherUserByName,
	useGetAwardsUser
} from '@/src/hooks/use-get-users'

export default function AnotherUserPage() {
	const params = useParams()
	const userName = params.name as string
	const { data: anotherUser, isLoading } = useGetAnotherUserByName(userName)
	const [activeTab, setActiveTab] = useState('Статистика')
	const { data: friends } = useGetAwardsUser()

	if (isLoading) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-neutral-950 flex items-center justify-center">
					<div className="animate-pulse text-white/40">
						Загрузка...
					</div>
				</div>
			</>
		)
	}

	if (!anotherUser) {
		return (
			<>
				<Header />
				<div className="min-h-screen bg-neutral-950 flex items-center justify-center">
					<div className="text-white/40">Пользователь не найден</div>
				</div>
			</>
		)
	}

	const tabs = [
		{ id: 'Статистика', icon: Bookmark },
		{ id: 'История', icon: Clock },
		{ id: 'Друзья', icon: User }
	]

	return (
		<div className="bg-neutral-950 min-h-screen">
			<Header />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1">
				<div className="relative w-full rounded-2xl overflow-hidden mt-4 shadow-2xl">
					<img
						src={
							anotherUser.bannerProfile ||
							'https://i.pinimg.com/736x/ef/e4/00/efe400c04632a0d6ae90745df6a908cc.jpg'
						}
						alt="Баннер профиля"
						className="w-full h-48 sm:h-64 md:h-60 lg:h-80 xl:h-60 object-cover"
					/>
					<div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
				</div>

				<div className="relative px-4 sm:px-6 -mt-16 sm:-mt-20 md:-mt-24 z-10">
					<div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
						<div className="relative group">
							<Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-4 border-neutral-950 shadow-xl">
								<AvatarImage
									src={anotherUser.image || ''}
									alt={anotherUser.name || 'User'}
									className="object-cover"
								/>
								<AvatarFallback className="bg-linear-to-br from-purple-500 to-pink-500 text-white text-3xl sm:text-4xl font-bold">
									{anotherUser.name?.[0]?.toUpperCase() ||
										'U'}
								</AvatarFallback>
							</Avatar>
						</div>

						<div className="flex-1 text-center sm:text-left pb-2">
							<h1 className="text-2xl sm:text-3xl font-bold text-white">
								{anotherUser.name || 'Пользователь'}
							</h1>
							<div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-1 text-sm text-gray-400">
								<span className="hidden sm:inline">•</span>
								<span>{anotherUser.bio}</span>
								{anotherUser.premium && (
									<span className="text-xs font-bold bg-linear-to-r from-pink-600 via-purple-300 to-purple-100 bg-clip-text text-transparent bg-size-[300%_100%] animate-gradient">
										PREMIUM USER
									</span>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="flex gap-6 text-xl font-bold border-b border-white/5 pb-3 mt-6 mb-6 overflow-x-auto">
					{tabs.map((tab) => {
						const Icon = tab.icon
						const isActive = activeTab === tab.id
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 text-xl font-bold transition whitespace-nowrap ${
									isActive
										? 'text-pink-400 border-b-2 border-pink-400 pb-3 -mb-3'
										: 'text-gray-400 hover:text-gray-300'
								}`}
							>
								<Icon className="w-5 h-5" />
								{tab.id}
							</button>
						)
					})}
				</div>

				{activeTab === 'Друзья' && (
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
				)}

				{activeTab === 'Статистика' && (
					<div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
						<div className="bg-white/5 rounded-xl p-4 text-center">
							<div className="text-2xl font-bold text-white">
								0
							</div>
							<div className="text-gray-400 text-sm">
								Просмотрено
							</div>
						</div>
						<div className="bg-white/5 rounded-xl p-4 text-center">
							<div className="text-2xl font-bold text-white">
								0
							</div>
							<div className="text-gray-400 text-sm">
								В планах
							</div>
						</div>
						<div className="bg-white/5 rounded-xl p-4 text-center">
							<div className="text-2xl font-bold text-white">
								0
							</div>
							<div className="text-gray-400 text-sm">
								Коллекций
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
