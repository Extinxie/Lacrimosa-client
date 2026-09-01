'use client'

import { useState, useRef } from 'react'
import { useUserStore } from '@/src/stores/user-settings/user-settings'
import { useAuth } from '@/src/context/auth-provider'
import { Camera, User, Upload, Trash2 } from 'lucide-react'

export default function PfpComponentSettings() {
	const { me, uploadAvatar } = useUserStore()
	const { user } = useAuth()
	const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
	const avatarInputRef = useRef<HTMLInputElement>(null)

	const handleAvatarChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith('image/')) {
			e.target.value = ''
			return
		}

		const preview = URL.createObjectURL(file)
		setPreviewAvatar(preview)

		try {
			await uploadAvatar(file)
		} catch (error) {
			console.error(error)
		} finally {
			setPreviewAvatar(null)
			URL.revokeObjectURL(preview)
			e.target.value = ''
		}
	}

	const displayedAvatar = previewAvatar || me?.image || user?.image || null

	return (
		<div className="bg-white/1 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
			<div className="flex items-center gap-2">
				<User className="w-5 h-5 text-pink-400" />
				<h3 className="text-white font-semibold text-lg">Аватар</h3>
			</div>
			<p className="text-white/60 text-sm mb-4 mt-2">
				Загрузите своё фото или выберите аватар из каталога
			</p>

			<div className="flex flex-col sm:flex-row items-center gap-6">
				<div className="relative group">
					<div className="w-26 h-26 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-neutral-950 overflow-hidden shadow-xl">
						{displayedAvatar ? (
							<img
								src={displayedAvatar}
								alt={me?.name || 'User'}
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
					<button
						type="button"
						onClick={() => avatarInputRef.current?.click()}
						className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium"
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
			</div>
			<div className="flex justify-between items-center gap-2 my-4">
				<button
					onClick={() => avatarInputRef.current?.click()}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium hover:opacity-80 transition"
				>
					<Upload className="w-3.5 h-3.5" />
					Выбрать файл
				</button>
				{displayedAvatar && (
					<button
						onClick={() => {
							console.log('Удалить аватар')
						}}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition"
					>
						<Trash2 className="w-3.5 h-3.5" />
						Удалить
					</button>
				)}
			</div>
			<p className="text-white/30 text-xs mt-2">
				Рекомендуется 400×400 px • Макс. 15МБ • JPEG, PNG, WebP, GIF
			</p>
		</div>
	)
}
