
import { getAccessToken, setAccessToken, removeAccessToken } from './cookies'

interface TokenPayload {
	exp?: number // Expiration timestamp
	iat?: number // Issued at timestamp
	[key: string]: unknown
}


const decodeToken = (token: string): TokenPayload | null => {
	try {
		const parts = token.split('.')
		if (parts.length !== 3) {
			return null
		}

		const payload = parts[1]
		const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
		return JSON.parse(decoded) as TokenPayload
	} catch {
		return null
	}
}


export const isTokenExpired = (token: string | null): boolean => {
	if (!token) {
		return true
	}

	const payload = decodeToken(token)
	if (!payload || !payload.exp) {
		return false
	}

	const expirationTime = payload.exp * 1000
	const buffer = 60 * 1000
	return Date.now() >= expirationTime - buffer
}

export const isTokenExpiringSoon = (token: string | null): boolean => {
	if (!token) {
		return true
	}

	const payload = decodeToken(token)
	if (!payload || !payload.exp) {
		return false
	}

	const expirationTime = payload.exp * 1000
	const fiveMinutes = 5 * 60 * 1000
	return Date.now() >= expirationTime - fiveMinutes
}

export const getTokenExpiration = (token: string | null): number | null => {
	if (!token) {
		return null
	}

	const payload = decodeToken(token)
	if (!payload || !payload.exp) {
		return null
	}

	return payload.exp * 1000
}

export const getTimeUntilExpiration = (token: string | null): number | null => {
	const expiration = getTokenExpiration(token)
	if (!expiration) {
		return null
	}

	return Math.max(0, expiration - Date.now())
}

export const clearTokens = (): void => {
	removeAccessToken()
}
