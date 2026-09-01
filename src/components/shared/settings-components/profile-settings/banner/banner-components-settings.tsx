'use client'

import { useUserStore } from '@/src/stores/user-settings/user-settings'
import { Camera, Image, MaximizeIcon, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

export default function BannerComponentSettings() {
	const { me, uploadBanner } = useUserStore()
	const [previewBanner, setPreviewBanner] = useState<string | null>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)

	const handleBannerChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith('image/')) {
			e.target.value = ''
			return
		}

		const preview = URL.createObjectURL(file)
		setPreviewBanner(preview)

		try {
			await uploadBanner(file)
		} catch (error) {
			console.error(error)
		} finally {
			setPreviewBanner(null)
			URL.revokeObjectURL(preview)
			e.target.value = ''
		}
	}
	const displayedBanner = previewBanner || me?.bannerProfile || null
	return (
		<div className="bg-white/1 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
			<div className="flex gap-2">
				<Image color="grey" size={18} className="mt-1.5" />
				<h3 className="text-white font-semibold text-lg mb-4">
					Баннер
				</h3>
			</div>
			<div className="mb-4">
				<h2 className="font-bold mb-1">Фоновое изображение</h2>
				<p className="text-white/40 text-xs">
					Рекомендуется 1200x400 px
				</p>
			</div>
			<div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 group">
				{displayedBanner ? (
					<img
						src={displayedBanner}
						alt="Баннер профиля"
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full bg-linear-to-r from-purple-600/30 via-pink-600/20 to-purple-600/30 flex items-center justify-center">
						<span className="text-white/20 text-sm">
							Нет баннера
						</span>
					</div>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-neutral-950/60 via-transparent to-transparent" />
				<input
					ref={bannerInputRef}
					type="file"
					accept="image/*"
					onChange={handleBannerChange}
					className="hidden"
				/>
				<button
					type="button"
					onClick={() => bannerInputRef.current?.click()}
					className="absolute inset-0 cursor-pointer bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium"
				>
					<MaximizeIcon className="w-6 h-6" />
				</button>
			</div>
			<div className="flex justify-between items-center gap-2 my-4">
				<button
					onClick={() => bannerInputRef.current?.click()}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium hover:opacity-80 transition"
				>
					<Upload className="w-3.5 h-3.5" />
					Выбрать файл
				</button>
				{displayedBanner && (
					<button
						onClick={() => {
							console.log('Удалить баннер')
						}}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition"
					>
						<Trash2 className="w-3.5 h-3.5" />
						Удалить
					</button>
				)}
			</div>
			<p className="text-white/40 text-xs">
				Макс. 64МБ · JPEG, PNG, WebP, GIF · MP4/WebM до 15с
			</p>
		</div>
	)
}
