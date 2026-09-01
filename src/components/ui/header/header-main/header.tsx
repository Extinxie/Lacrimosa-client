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
import { useUserStore } from '@/src/stores/user-settings/user-settings'
import Image from 'next/image'
import {
	bottomNav,
	mobileMenuLinks,
	navLinks,
	PcMenuLinks
} from '@/src/components/shared/constants/sub-titles'

export const Header = () => {
	const { user, isAuth, signOut } = useAuth()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const me = useUserStore((state) => state.me)

	return (
		<>
			<header className="hidden md:block w-full sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 md:h-20">
						<div className="flex items-center gap-2 md:gap-6">
							<Image
								src="/backgrounds/lacri.png"
								alt="Lacrimosa"
								width={32}
								height={32}
								unoptimized
								className="rounded-full"
							/>
							<Link
								href="/"
								className="text-lg md:text-2xl font-bold "
							>
								Lacrimosa
							</Link>

							<nav className="hidden md:flex items-center gap-6">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="text-sm text-white/60 hover:text-white transition-colors duration-200"
									>
										{link.label}
									</Link>
								))}
							</nav>
						</div>

						<div className="flex items-center gap-2 md:gap-3">
							<div className="hidden md:block">
								<button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white transition-all duration-200">
									<SearchIcon size={18} />
									<span className="text-sm font-medium hidden lg:inline">
										Поиск
									</span>
								</button>
							</div>

							<button className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition">
								<Search className="w-4 h-4" />
							</button>

							<button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition">
								<Heart className="w-4 h-4" />
							</button>

							<button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition">
								<Bell className="w-4 h-4" />
							</button>

							{isAuth && user ? (
								<div className="relative">
									<button
										onClick={() =>
											setIsMenuOpen(!isMenuOpen)
										}
										className="w-9 h-9 md:w-10 md:h-10 rounded-full ring-2 ring-purple-500/20 hover:ring-purple-500/40 transition-all duration-200 overflow-hidden"
									>
										<Avatar className="w-full h-full">
											<AvatarImage
												src={
													me?.image ||
													user?.image ||
													''
												}
												alt={
													me?.name ||
													user?.name ||
													'User'
												}
											/>
											<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-medium">
												{me?.name?.[0]?.toUpperCase() ||
													user?.name?.[0]?.toUpperCase() ||
													'U'}
											</AvatarFallback>
										</Avatar>
									</button>

									{isMenuOpen && (
										<>
											<div
												className="fixed inset-0 z-40 bg-black/20 "
												onClick={() =>
													setIsMenuOpen(false)
												}
											/>

											<div className="absolute right-0 mt-2 w-72 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 z-50">
												<div className="relative bg-gradient-to-b from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
													<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

													<div className="px-4 py-4 border-b border-white/5">
														<div className="flex items-center gap-3">
															<div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
																<img
																	src={
																		me?.image ||
																		'u'
																	}
																	className="w-10 h-10 rounded-full"
																	alt=""
																/>
															</div>
															<div className="flex-1 min-w-0">
																<p className="text-white font-semibold text-sm truncate">
																	{me?.name ||
																		user?.name}
																</p>
																<p className="text-white/40 text-xs truncate">
																	{me?.email ||
																		user?.email}
																</p>
															</div>
														</div>
													</div>

													<div className="p-1.5">
														{PcMenuLinks.map(
															(item) => {
																const Icon =
																	item.icon
																return (
																	<Link
																		key={
																			item.href
																		}
																		href={
																			item.href
																		}
																		onClick={() =>
																			setIsMenuOpen(
																				false
																			)
																		}
																		className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
																	>
																		<Icon className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
																		<span className="flex-1">
																			{
																				item.label
																			}
																		</span>
																		<span className="opacity-0 group-hover:opacity-100 transition-opacity">
																			→
																		</span>
																	</Link>
																)
															}
														)}

														<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1.5" />

														<button
															onClick={() => {
																signOut()
																setIsMenuOpen(
																	false
																)
															}}
															className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
														>
															<svg
																className="w-4 h-4 group-hover:rotate-12 transition-transform"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={
																		2
																	}
																	d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
																/>
															</svg>
															<span>Выйти</span>
															<span className="flex-1 text-right text-xs text-red-400/30 group-hover:text-red-400/50 transition-colors">
																⌘Q
															</span>
														</button>
													</div>

													{/* Тень для глубины */}
													<div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/5" />
												</div>
											</div>
										</>
									)}
								</div>
							) : (
								<Link
									href="/sign-up"
									className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-80 transition"
								>
									<User className="w-4 h-4" />
									<span className="hidden sm:inline">
										Войти
									</span>
								</Link>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Мобильный хедер */}
			<header className="md:hidden w-full sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-4">
				<div className="flex items-center justify-between h-14">
					<Link href="/" className="text-lg font-bold">
						Lacrimosa
					</Link>

					{isAuth && user ? (
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="w-8 h-8 rounded-full ring-2 ring-purple-500/20 hover:ring-purple-500/40 transition-all duration-200 overflow-hidden"
						>
							<Avatar className="w-full h-full">
								<AvatarImage
									src={me?.image || user?.image || ''}
									alt={me?.name || user?.name || 'User'}
								/>
								<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-medium">
									{me?.name?.[0]?.toUpperCase() ||
										user?.name?.[0]?.toUpperCase() ||
										'U'}
								</AvatarFallback>
							</Avatar>
						</button>
					) : (
						<Link
							href="/sign-up"
							className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-medium"
						>
							<User className="w-3.5 h-3.5" />
							<span>Войти</span>
						</Link>
					)}
				</div>
			</header>

			{isMenuOpen && (
				<>
					<div
						className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
						onClick={() => setIsMenuOpen(false)}
					/>
					<div className="fixed left-0 top-0 z-50 w-72 h-full bg-neutral-950/80 backdrop-blur-xl border-l border-white/10 shadow-2xl md:hidden">
						<div className="flex flex-col h-full overflow-y-auto">
							<div className="p-4 flex items-center gap-2.5 border-b border-white/5">
								{/* <Image
									src="/backgrounds/gpt.png"
									alt="Lacrimosa"
									width={28}
									height={28}
									unoptimized
									className="rounded-full"
								/> */}
								<h1 className="text-xl font-bold">Lacrimosa</h1>
							</div>

							<div className="px-4 py-4 border-b border-white/5">
								<div className="flex items-center gap-3">
									<Avatar className="w-12 h-12">
										<AvatarImage
											src={me?.image || user?.image || ''}
											alt={
												me?.name || user?.name || 'User'
											}
										/>
										<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-medium">
											{me?.name?.[0]?.toUpperCase() ||
												user?.name?.[0]?.toUpperCase() ||
												'U'}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-white font-medium text-sm">
											{me?.name || user?.name || 'User'}
										</p>
										<p className="text-white/40 text-xs truncate">
											{me?.email || user?.email}
										</p>
									</div>
								</div>
							</div>

							<div className="flex-1 py-2">
								{mobileMenuLinks.map((item) => {
									const Icon = item.icon
									return (
										<Link
											key={item.href}
											href={item.href}
											onClick={() => setIsMenuOpen(false)}
											className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
										>
											<Icon className="w-4 h-4" />
											{item.label}
										</Link>
									)
								})}
							</div>

							{isAuth && user && (
								<div className="border-t border-white/5 p-4">
									<button
										onClick={() => {
											signOut()
											setIsMenuOpen(false)
										}}
										className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition w-full"
									>
										Выйти
									</button>
								</div>
							)}
						</div>
					</div>
				</>
			)}

			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/5 px-2 py-1">
				<div className="flex items-center justify-around">
					{bottomNav.map((item) => {
						const Icon = item.icon
						return (
							<Link
								key={item.href}
								href={item.href}
								className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-white/40 hover:text-white transition-colors duration-200"
							>
								<Icon className="w-5 h-5" />
								<span className="text-[10px] font-medium">
									{item.label}
								</span>
							</Link>
						)
					})}
				</div>
			</nav>
		</>
	)
}
