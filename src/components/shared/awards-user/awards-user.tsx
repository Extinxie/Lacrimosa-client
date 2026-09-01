'use client'

import { useGetAwardsUser } from '@/src/hooks/use-get-users'
// import { useGetAwardsUser } from '@/src/hooks/get-users'
import { Crown } from 'lucide-react'
import Link from 'next/link'

export default function AwardsUser() {
	const { data, isLoading } = useGetAwardsUser()

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className="bg-neutral-800/50 p-4 rounded-lg animate-pulse"
					>
						<div className="w-16 h-16 rounded-full mx-auto bg-neutral-700/50" />
						<div className="h-4 w-3/4 mx-auto mt-2 rounded bg-neutral-700/50" />
						<div className="h-3 w-1/2 mx-auto mt-1 rounded bg-neutral-700/50" />
					</div>
				))}
			</div>
		)
	}

	return (
		<div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
			<h1 className="text-white text-3xl font-bold my-2">
				Топ пользователей
			</h1>

			<div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 scrollbar-hide snap-x snap-mandatory">
				{data?.slice(0, 4).map((user) => (
					<Link
						key={user.id}
						href={`/user/${user.name}`}
						className="min-w-50 md:min-w-0 snap-start bg-neutral-900/20 p-3 rounded-lg flex items-center gap-3 hover:bg-neutral-800/40 transition-colors"
					>
						<img
							src={user.image || ''}
							alt={user.name}
							className="w-12 h-12 rounded-full object-cover shrink-0"
						/>
						<div className="flex items-center gap-2">
							<p className="text-white text-sm font-bold truncate">
								{user.name}
							</p>
							{user.premium && (
								<Crown
									size={16}
									className="text-yellow-500 shrink-0"
								/>
							)}
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
