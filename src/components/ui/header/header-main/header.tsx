'use client'

import Link from 'next/link'
import { Search, Bell, User, Heart, SearchIcon } from 'lucide-react'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/src/components/ui/avatar/avatar'
import { useState } from 'react'
import { useAuth } from '@/src/context/auth-provider'

export const Header = () => {
	const { user, isAuth, signOut } = useAuth()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className="w-full flex items-center justify-between gap-2 md:gap-4 px-4 md:px-8 py-4 z-10 relative bg-black/50 backdrop-blur-md border-b border-white/10">
			<div className="flex items-center gap-6 md:gap-8 ml-8 md:ml-12 lg:ml-16">
				<Link
					href="/"
					className="text-xl md:text-xl lg:text-2xl font-bold bg-linear-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity shrink-0"
				>
					Lacrimosa
				</Link>

				<nav className="flex items-center gap-4 md:gap-6 mt-1.5">
					<Link
						href="/collections"
						className="text-sm md:text-base text-white/70 hover:text-white transition-colors"
					>
						Коллекции
					</Link>
					<Link
						href="/recent"
						className="text-sm md:text-base text-white/70 hover:text-white transition-colors"
					>
						Недавние
					</Link>
				</nav>
			</div>

			<div className="flex items-center gap-2 md:gap-3 shrink-0">
				<div className="hidden md:flex mx-4">
					<div className="flex items-center gap-1 md:gap-3 lg:gap-4 shrink-0">
						<div className="hidden md:block">
							<button className="bg-neutral-900 opacity-90 rounded-2xl text-white font-bold px-2 pl-6 p-2 focus:outline-none flex gap-3 items-center w-auto md:w-12 lg:w-36 cursor-pointer justify-center md:justify-start">
								<SearchIcon size={20} />
								<p className="font-bold hidden md:block">
									Поиск
								</p>
							</button>
						</div>
					</div>
				</div>

				<button
					className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800/50 text-white hover:bg-neutral-700 transition-colors"
					aria-label="Поиск"
				>
					<Search className="w-4 h-4" />
				</button>

				<button className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800/50 text-white hover:bg-neutral-700 transition-colors">
					<Heart className="w-4 h-4" />
				</button>

				<button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-neutral-800/50 text-white hover:bg-neutral-700 transition-colors">
					<Bell className="w-4 h-4" />
				</button>

				{isAuth && user ? (
					<div className="relative">
						<div
							className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-purple-400 overflow-hidden hover:border-purple-300 transition-colors cursor-pointer"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<Avatar className="w-full h-full">
								<AvatarImage
									src={user.image || ''}
									alt={user.name || 'User'}
								/>
								<AvatarFallback className="bg-linear-to-br from-purple-500 to-pink-500 text-white">
									{user.name?.[0]?.toUpperCase() || 'U'}
								</AvatarFallback>
							</Avatar>
						</div>

						{isMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 opacity-95">
								<div className="px-4 py-3 border-b border-white/10">
									<p className="text-white font-medium text-sm">
										{user.name}
									</p>
									<p className="text-white/40 text-xs truncate">
										{user.email}
									</p>
								</div>
								<div className="py-1">
									<Link
										href="/profile"
										className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
										onClick={() => setIsMenuOpen(false)}
									>
										Профиль
									</Link>
									<Link
										href="/settings"
										className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
										onClick={() => setIsMenuOpen(false)}
									>
										Премиум
									</Link>
									<Link
										href="/settings"
										className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
										onClick={() => setIsMenuOpen(false)}
									>
										Настройки
									</Link>
									<button
										onClick={() => {
											signOut()
											setIsMenuOpen(false)
										}}
										className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition"
									>
										Выйти
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<Link
						href="/sign-up"
						className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-80 transition-opacity"
					>
						<User className="w-4 h-4" />
						<span className="hidden sm:inline">Войти</span>
					</Link>
				)}
			</div>
		</header>
	)
}
