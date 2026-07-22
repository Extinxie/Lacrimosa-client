interface RateLimitEntry {
	count: number
	resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

const DEFAULT_LIMITS: Record<string, { max: number; windowMs: number }> = {
	'/auth/sign-in/email': { max: 5, windowMs: 15 * 60 * 1000 },
	'/auth/sign-up/email': { max: 3, windowMs: 60 * 60 * 1000 },
	default: { max: 100, windowMs: 60 * 1000 }
}

const getRateLimitConfig = (endpoint: string) => {
	const config = Object.entries(DEFAULT_LIMITS).find(([key]) =>
		endpoint.includes(key)
	)

	return config ? DEFAULT_LIMITS[config[0]] : DEFAULT_LIMITS.default
}

export const checkRateLimit = (
	endpoint: string
): { allowed: boolean; retryAfter?: number } => {
	const config = getRateLimitConfig(endpoint)
	const now = Date.now()
	const key = endpoint

	let entry = rateLimitStore.get(key)

	if (Math.random() < 0.01) {
		const entries = Array.from(rateLimitStore.entries())
		for (const [k, v] of entries) {
			if (v.resetAt < now) {
				rateLimitStore.delete(k)
			}
		}
	}

	if (!entry || entry.resetAt < now) {
		entry = {
			count: 0,
			resetAt: now + config.windowMs
		}
		rateLimitStore.set(key, entry)
	}

	entry.count++

	if (entry.count > config.max) {
		const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
		return {
			allowed: false,
			retryAfter
		}
	}

	return { allowed: true }
}

export const resetRateLimit = (endpoint: string): void => {
	rateLimitStore.delete(endpoint)
}
