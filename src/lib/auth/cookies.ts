const isProduction = process.env.NODE_ENV === 'production'
const COOKIE_PREFIX = '__Secure-'

export const getCookieOptions = () => ({
	secure: isProduction,
	sameSite: 'strict' as const,
	path: '/'
})

export const setAccessToken = (token: string, expiresIn?: number): void => {
	if (typeof window !== 'undefined') {
		sessionStorage.setItem('access_token', token)
	}
}

export const getAccessToken = (): string | null => {
	if (typeof window !== 'undefined') {
		const token = sessionStorage.getItem('access_token')
		if (token) return token
	}

	if (typeof document !== 'undefined') {
		const cookies = document.cookie.split('; ')
		const sessionCookie = cookies.find((row) =>
			row.startsWith('better-auth.session_token=')
		)
		if (sessionCookie) {
			const token = sessionCookie.split('=')[1]
			return token
		}
	}

	return null
}

export const removeAccessToken = (): void => {
	if (typeof window !== 'undefined') {
		sessionStorage.removeItem('access_token')
	}
}

export const REFRESH_TOKEN_COOKIE_NAME = `${COOKIE_PREFIX}refresh_token`

let csrfToken: string | null = null

export const setCsrfToken = (token: string): void => {
	csrfToken = token
}

export const getCsrfToken = (): string | null => {
	return csrfToken
}

export const clearCsrfToken = (): void => {
	csrfToken = null
}

export const setUserData = (user: unknown): void => {
	if (typeof window !== 'undefined') {
		try {
			sessionStorage.setItem('user_data', JSON.stringify(user))
		} catch (error) {
			console.error('Failed to store user data:', error)
		}
	}
}

export const getUserData = (): unknown | null => {
	if (typeof window !== 'undefined') {
		try {
			const data = sessionStorage.getItem('user_data')
			return data ? JSON.parse(data) : null
		} catch {
			return null
		}
	}
	return null
}

export const clearUserData = (): void => {
	if (typeof window !== 'undefined') {
		sessionStorage.removeItem('user_data')
	}
}

export const clearAllAuth = (): void => {
	removeAccessToken()
	clearCsrfToken()
	clearUserData()
}
