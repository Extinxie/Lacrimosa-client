import { cn } from '@/src/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="skeleton"
			className={cn('animate-pulse rounded-md bg-muted', className)}
			{...props}
		/>
	)
}

export { Skeleton }

export default function AnimeSkeleton() {
	return (
		<div className="bg-neutral-950 rounded-xl overflow-hidden">
			<div className="relative aspect-2/3 overflow-hidden bg-neutral-950">
				<Skeleton className="w-full h-full bg-neutral-800/50" />
			</div>
			<div className="p-3 space-y-2">
				<Skeleton className="h-4 w-3/4 bg-neutral-800/50" />
				<Skeleton className="h-3 w-1/2 bg-neutral-800/50" />
			</div>
		</div>
	)
}
