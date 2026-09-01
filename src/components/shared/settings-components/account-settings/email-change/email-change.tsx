'use client'

import { useAuth } from '@/src/context/auth-provider'
import { usePatchChangeEmail } from '@/src/hooks/use-get-users'
import { useState } from 'react'

export default function EmailChange() {
	const { user } = useAuth()
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const { mutate: changeEmail } = usePatchChangeEmail(email)

	const handleEmailChange = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email.trim()) return

		setIsLoading(true)
		setError(null)
		setSuccess(false)

		try {
			await changeEmail(email)
			setSuccess(true)
			setEmail('')
		} catch (err: any) {
			setError(err?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="bg-white/1 backdrop-blur-sm rounded-2xl p-6 border border-white/5 space-y-4">
			<h3 className="text-white font-semibold text-lg">Изменить логин</h3>

			<div>
				<p className="text-white/60 text-sm block mb-1.5">
					Текущий логин
				</p>
				<div className="w-full px-4 py-2.5 rounded-xl bg-white/0.1 border border-white/2 cursor-default">
					<p className="text-white">{user?.email}</p>
				</div>
			</div>

			<form onSubmit={handleEmailChange} className="space-y-4">
				<div>
					<label className="text-white/60 text-sm block mb-1.5">
						Новый логин
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Введите новый email"
						className="w-full px-4 py-2.5 rounded-xl bg-white/1 border border-white/2 text-white focus:outline-none focus:border-netral-500 transition disabled:opacity-50"
						disabled={isLoading}
						required
					/>
				</div>

				{success && (
					<div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
						На ваш новый email отправлено письмо для подтверждения
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading || !email.trim()}
					className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-80 transition"
				>
					{isLoading ? 'Отправка...' : 'Обновить email'}
				</button>
			</form>
		</div>
	)
}
