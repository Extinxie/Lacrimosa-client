'use client'

import { useState } from 'react'
import { Monitor, QrCode, Tv, Trash2 } from 'lucide-react'

export default function TvPendingsSett() {
	const [devices] = useState<
		{ id: string; name: string; lastActive: string }[]
	>([])
	const [showQR, setShowQR] = useState(false)

	return (
		<div className="bg-white/1 backdrop-blur-sm rounded-2xl p-6 border border-white/5 space-y-6">
			<div className="flex items-center gap-2">
				{/* <Tv className="w-5 h-5 text-purple-400" /> */}
				<h3 className="text-white font-semibold text-lg">Телевизоры</h3>
				<span className="text-white/20 text-sm ml-auto">
					{devices.length} устройств
				</span>
			</div>

			{devices.length > 0 ? (
				<div className="space-y-3">
					{devices.map((device) => (
						<div
							key={device.id}
							className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
									<Monitor className="w-5 h-5 text-purple-400" />
								</div>
								<div>
									<p className="text-white text-sm font-medium">
										{device.name}
									</p>
									<p className="text-white/30 text-xs">
										Последняя активность:{' '}
										{device.lastActive}
									</p>
								</div>
							</div>
							<button
								onClick={() => {}}
								className="opacity-0 group-hover:opacity-100 transition text-white/30 hover:text-red-400"
							>
								<Trash2 className="w-4 h-4" />
							</button>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-12 px-6 text-center">
					<div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
						<Tv className="w-10 h-10 text-white/20" />
					</div>
					<h4 className="text-white font-medium text-lg">
						Нет привязанных телевизоров
					</h4>
					<p className="text-white/30 text-sm max-w-sm mt-1">
						Откройте Lacrimosa на телевизоре и отсканируйте QR-код,
						чтобы управлять просмотром с телефона
					</p>
					<button
						onClick={() => setShowQR(!showQR)}
						className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-900 text-white text-sm font-medium hover:opacity-80 transition"
					>
						<QrCode className="w-4 h-4" />
						{showQR ? 'Скрыть QR-код' : 'Показать QR-код'}
					</button>
				</div>
			)}

			{showQR && (
				<div className="flex flex-col items-center justify-center p-6 border border-white/10 rounded-xl bg-white/5">
					<div className="w-48 h-48 bg-neutral-800 rounded-xl flex items-center justify-center">
						<div className="w-40 h-40 bg-neutral-700 rounded-lg flex items-center justify-center">
							<QrCode className="w-24 h-24 text-white/40" />
						</div>
					</div>
					<p className="text-white/40 text-sm mt-3 text-center">
						Отсканируйте QR-код на телевизоре
					</p>
					<p className="text-white/20 text-xs">Lacrimosa TV v1.0.0</p>
				</div>
			)}
		</div>
	)
}
