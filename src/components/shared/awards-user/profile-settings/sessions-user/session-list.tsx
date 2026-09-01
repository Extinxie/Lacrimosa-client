'use client'

import {
	useRevokeOtherSessions,
	useRevokeSession,
	useSessions
} from '@/src/hooks/use-sessions'

export default function SessionsList() {
	const { data: sessions } = useSessions()
	const revokeSession = useRevokeSession()
	const revokeOthers = useRevokeOtherSessions()

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-white font-medium">Активные сессии</h3>
				<button
					onClick={() => revokeOthers.mutate()}
					className="text-sm text-red-500 hover:text-red-400 transition"
				>
					Завершить все, кроме этой
				</button>
			</div>

			{sessions?.map((session: any) => (
				<div
					key={session.id}
					className="bg-white/1 rounded-xl p-4 flex items-center justify-between"
				>
					<div>
						<p className="text-white text-sm">
							{session.userAgent?.slice(0, 50) ||
								'Неизвестное устройство'}
						</p>
						<p className="text-white/40 text-xs mt-1">
							{session.ipAddress}
						</p>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={() => revokeSession.mutate(session.token)}
							disabled={
								session.isCurrent || revokeSession.isPending
							}
							className="text-sm text-red-500 hover:text-red-300 transition disabled:opacity-50"
						>
							Завершить
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
