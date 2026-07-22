import {
	getAccessToken,
	removeAccessToken,
	setAccessToken
} from '../auth/cookies'
import { isTokenExpiringSoon } from '../auth/token-manager'

const REFRESH_API_ROUTE = '/api/auth/token/refresh'

interface RefreshResponse {
	accessToken: string
	expiresIn: number
}

let isRefreshing = false
let refreshPromise: Promise<string> | null = null
const requestQueue: Array<{
	resolve: (token: string) => void
	reject: (error: Error) => void
}> = []

const refreshToken = async (): Promise<string> => {
	if (refreshPromise) {
		return refreshPromise
	}

	refreshPromise = (async () => {
		try {
			const response = await fetch(REFRESH_API_ROUTE, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				if (response.status === 401) {
					removeAccessToken()
					throw new Error('Refresh token expired')
				}
				throw new Error('Failed to refresh token')
			}

			const data: RefreshResponse = await response.json()

			if (!data.accessToken) {
				throw new Error('Invalid refresh response')
			}

			setAccessToken(data.accessToken, data.expiresIn)
			return data.accessToken
		} catch (error) {
			removeAccessToken()
			throw error
		} finally {
			isRefreshing = false
			refreshPromise = null
		}
	})()

	return refreshPromise
}

export const getValidToken = async (): Promise<string | null> => {
	const token = getAccessToken()

	if (token) {
		if (isTokenExpiringSoon(token)) {
			if (!isRefreshing) {
				isRefreshing = true
				try {
					const newToken = await refreshToken()

					requestQueue.forEach(({ resolve }) => resolve(newToken))
					requestQueue.length = 0

					return newToken
				} catch (error) {
					requestQueue.forEach(({ reject }) => reject(error as Error))
					requestQueue.length = 0
					return token
				}
			} else {
				return new Promise((resolve, reject) => {
					requestQueue.push({ resolve, reject })
				})
			}
		}

		return token
	}

	if (!isRefreshing) {
		isRefreshing = true
		try {
			const newToken = await refreshToken()

			requestQueue.forEach(({ resolve }) => resolve(newToken))
			requestQueue.length = 0

			return newToken
		} catch (error) {
			requestQueue.forEach(({ reject }) => reject(error as Error))
			requestQueue.length = 0
			throw error
		}
	} else {
		return new Promise((resolve, reject) => {
			requestQueue.push({ resolve, reject })
		})
	}
}

export const handleUnauthorized = async (): Promise<string | null> => {
	removeAccessToken()

	try {
		return await refreshToken()
	} catch (error) {
		if (typeof window !== 'undefined') {
			window.location.href = '/auth/sign-in/email'
		}
		return null
	}
}
