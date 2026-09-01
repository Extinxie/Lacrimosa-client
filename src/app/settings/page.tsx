'use client'

import { useState } from 'react'
import { Header } from '@/src/components/ui/header/header-main/header'
import { useAuth } from '@/src/context/auth-provider'
import { useUserStore } from '@/src/stores/user-settings/user-settings'
import {
	User,
	Shield,
	Palette,
	Bell,
	Globe,
	LogOut,
	ChevronRight,
	Moon,
	Sun,
	Monitor
} from 'lucide-react'
import FooterComponent from '@/src/components/ui/footer/footer'
import PfpComponentSettings from '@/src/components/shared/settings-components/profile-settings/pfp/pfp-components-settings'
import BannerComponentSettings from '@/src/components/shared/settings-components/profile-settings/banner/banner-components-settings'
import TagsComponentsSettings from '@/src/components/shared/settings-components/profile-settings/tags/tags-components-settings'
import AccountSettings from '@/src/components/shared/settings-components/account-settings/account-settings'

const tabs = [
	{ id: 'profile', label: 'Профиль', icon: User },
	{ id: 'account', label: 'Аккаунт', icon: Shield },
	{ id: 'privacy', label: 'Конфиденциальность', icon: Globe },
	{ id: 'appearance', label: 'Внешний вид', icon: Palette },
	{ id: 'notifications', label: 'Уведомления', icon: Bell }
]

export default function SettingsPage() {
	const { user, signOut } = useAuth()
	const me = useUserStore((state) => state.me)
	const [activeTab, setActiveTab] = useState('profile')
	const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')
	const [name, setName] = useState(me?.name || '')
	const [bio, setBio] = useState(me?.bio || '')

	return (
		<>
			<Header />
			<div className="min-h-screen bg-neutral-950 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
					<div className="absolute top-1/2 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[180px]" />
					<div className="absolute bottom-0 right-1/2 w-80 h-80 bg-pink-400/5 rounded-full blur-[170px]" />
					<div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-400/5 rounded-full blur-[80px]" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-2xl font-bold text-white mb-6">
						Настройки
					</h1>

					<div className="flex flex-col lg:flex-row gap-8">
						<div className="lg:w-64 shrink-0">
							<div className="bg-white/2 backdrop-blur-sm rounded-2xl p-2 space-y-1 border border-white/5">
								{tabs.map((tab) => {
									const Icon = tab.icon
									const isActive = activeTab === tab.id
									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
												isActive
													? 'bg-linear-to-r from-white/3 to-white/1 text-white border border-white/1'
													: 'text-white/60 hover:text-white hover:bg-white/5'
											}`}
										>
											<Icon className="w-4 h-4" />
											{tab.label}
											{!isActive && (
												<ChevronRight className="w-4 h-4 ml-auto opacity-30" />
											)}
										</button>
									)
								})}

								<div className="border-t border-white/5 my-2" />

								<button
									onClick={signOut}
									className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10"
								>
									<LogOut className="w-4 h-4" />
									Выйти из аккаунта
								</button>
							</div>
						</div>

						<div className="flex-1">
							{/* <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5"></div> */}
							{activeTab === 'profile' && (
								<div className="space-y-6">
									<div className="bg-white/1 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
										<h2 className="text-xl font-semibold text-white mb-4">
											Профиль
										</h2>
										<div className="relative pb-6 border-b border-white/5 my-3">
											<div className="relative w-full h-34 rounded-xl overflow-hidden mb-4">
												{me?.bannerProfile ? (
													<img
														src={me.bannerProfile}
														alt="Баннер профиля"
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-purple-600/30" />
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
											</div>

											<div className="flex items-end gap-4 -mt-10 ml-4">
												<div className="relative">
													<div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-neutral-950 overflow-hidden">
														{me?.image ? (
															<img
																src={me.image}
																alt={
																	me.name ||
																	'User'
																}
																className="w-full h-full object-cover"
															/>
														) : (
															<span>
																{me?.name?.[0]?.toUpperCase() ||
																	user?.name?.[0]?.toUpperCase() ||
																	'U'}
															</span>
														)}
													</div>
													<button className="absolute bottom-0 right-0 bg-neutral-800 rounded-full p-1.5 border border-white/10 hover:bg-neutral-700 transition">
														<User className="w-3.5 h-3.5 text-white" />
													</button>
												</div>

												<div className="">
													<h3 className="text-white font-medium text-lg">
														{me?.name || ''}
													</h3>
													<p className="text-white/40 text-sm">
														{me?.email ||
															user?.email}
													</p>
												</div>
											</div>
										</div>
										<div className="space-y-4">
											<div>
												<label className="text-white/60 text-sm block mb-1.5">
													Имя
												</label>
												<input
													type="text"
													// onSubmit={handleUpdateName}
													value={name}
													onChange={(e) =>
														setName(e.target.value)
													}
													className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition"
													placeholder="Ваше имя"
												/>
												<p className="text-sm text-zinc-600 mt-2">
													3–32 символа. Буквы одного
													алфавита (латиница,
													кириллица, японский,
													китайский или корейский),
													цифры, _ и -. Смешивать
													алфавиты нельзя.
												</p>
											</div>
											<div>
												<label className="text-white/60 text-sm block mb-1.5">
													О себе
												</label>
												<textarea
													value={me?.bio || bio}
													onChange={(e) =>
														setBio(e.target.value)
													}
													rows={3}
													className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition resize-none"
													placeholder="Расскажите о себе"
												/>
											</div>
										</div>
									</div>
									<PfpComponentSettings />
									<BannerComponentSettings />
									<TagsComponentsSettings />
								</div>
							)}

							{activeTab === 'account' && <AccountSettings />}

							{activeTab === 'privacy' && (
								<div className="space-y-6">
									<h2 className="text-xl font-semibold text-white">
										Конфиденциальность
									</h2>

									<div className="space-y-4">
										{[
											{
												title: 'Показывать активность',
												desc: 'Другие пользователи видят ваш онлайн-статус',
												enabled: true
											},
											{
												title: 'Показывать список друзей',
												desc: 'Ваши друзья видят, кто у вас в друзьях',
												enabled: false
											},
											{
												title: 'Показывать коллекции',
												desc: 'Публичный доступ к вашим спискам',
												enabled: true
											}
										].map((item, index) => (
											<div
												key={index}
												className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
											>
												<div>
													<h4 className="text-white font-medium text-sm">
														{item.title}
													</h4>
													<p className="text-white/40 text-xs">
														{item.desc}
													</p>
												</div>
												<button
													className={`w-12 h-6 rounded-full transition-colors ${
														item.enabled
															? 'bg-purple-500'
															: 'bg-white/20'
													}`}
												>
													<div
														className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
															item.enabled
																? 'translate-x-6'
																: 'translate-x-0.5'
														}`}
													/>
												</button>
											</div>
										))}
									</div>
								</div>
							)}

							{activeTab === 'appearance' && (
								<div className="space-y-6">
									<h2 className="text-xl font-semibold text-white">
										Внешний вид
									</h2>

									<div>
										<label className="text-white/60 text-sm block mb-3">
											Тема
										</label>
										<div className="grid grid-cols-3 gap-3">
											{[
												{
													id: 'dark',
													label: 'Тёмная',
													icon: Moon
												},
												{
													id: 'light',
													label: 'Светлая',
													icon: Sun
												},
												{
													id: 'system',
													label: 'Системная',
													icon: Monitor
												}
											].map((option) => {
												const Icon = option.icon
												const isActive =
													theme === option.id
												return (
													<button
														key={option.id}
														onClick={() =>
															setTheme(
																option.id as any
															)
														}
														className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
															isActive
																? 'border-purple-500 bg-purple-500/10 text-white'
																: 'border-white/10 text-white/60 hover:border-white/20'
														}`}
													>
														<Icon className="w-4 h-4" />
														{option.label}
													</button>
												)
											})}
										</div>
									</div>

									<div>
										<label className="text-white/60 text-sm block mb-3">
											Акцентный цвет
										</label>
										<div className="flex gap-3">
											{[
												'#8b5cf6',
												'#ec4899',
												'#3b82f6',
												'#22c55e',
												'#f59e0b',
												'#ef4444'
											].map((color) => (
												<button
													key={color}
													className="w-10 h-10 rounded-full border-2 border-white/10 hover:border-white/30 transition"
													style={{
														background: color
													}}
												/>
											))}
										</div>
									</div>
								</div>
							)}

							{activeTab === 'notifications' && (
								<div className="space-y-6">
									<h2 className="text-xl font-semibold text-white">
										Уведомления
									</h2>

									<div className="space-y-4">
										{[
											{
												title: 'Новые серии',
												desc: 'Уведомления о выходе новых серий',
												enabled: true
											},
											{
												title: 'Комментарии',
												desc: 'Уведомления о новых комментариях',
												enabled: true
											},
											{
												title: 'Активность друзей',
												desc: 'Что смотрят и добавляют ваши друзья',
												enabled: false
											},
											{
												title: 'Специальные предложения',
												desc: 'Акции и новости платформы',
												enabled: false
											}
										].map((item, index) => (
											<div
												key={index}
												className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
											>
												<div>
													<h4 className="text-white font-medium text-sm">
														{item.title}
													</h4>
													<p className="text-white/40 text-xs">
														{item.desc}
													</p>
												</div>
												<button
													className={`w-12 h-6 rounded-full transition-colors ${
														item.enabled
															? 'bg-purple-500'
															: 'bg-white/20'
													}`}
												>
													<div
														className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
															item.enabled
																? 'translate-x-6'
																: 'translate-x-0.5'
														}`}
													/>
												</button>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<FooterComponent />
		</>
	)
}
