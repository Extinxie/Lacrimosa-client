'use client'

import { Pencil } from 'lucide-react'
import SessionsList from '../sessions-user/session-list'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/src/stores/user-settings/user-settings'

export default function SettingsUser() {
	const me = useUserStore((state) => state.me)
	const isSaving = useUserStore((state) => state.isSaving)
	const updateProfile = useUserStore((state) => state.updateProfile)
	const updateBio = useUserStore((state) => state.updateBio)
	const [name, setName] = useState(me?.name ?? '')
	const [bio, setBio] = useState(me?.bio || '')

	useEffect(() => {
		if (me) {
			setName(me.name ?? '')
			setBio(me.bio || '')
		}
	}, [me?.id])

	const handleAllUpdate = async (e: React.FormEvent) => {
		e.preventDefault()
		await updateProfile({ name })
		await updateBio({ bio })
	} 

	return (
		<>
			<form onSubmit={handleAllUpdate}>
				<h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
					<Pencil className="w-5 h-5" />
					Редактировать профиль
				</h2>

				<div className="space-y-4">
					<div>
						<label className="text-gray-400 text-sm block mb-1">
							Имя
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Введите имя"
							className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition"
						/>
					</div>

					<div>
						<label className="text-gray-400 text-sm block mb-1">
							Описание
						</label>
						<input
							type="textarea"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition"
						/>
					</div>

					<SessionsList />

					<button
						type="submit"
						disabled={isSaving}
						className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-xl hover:opacity-80 transition disabled:opacity-50"
					>
						{isSaving ? 'Сохранение' : 'Обновить профиль'}
					</button>
				</div>
			</form>
		</>
	)
}
