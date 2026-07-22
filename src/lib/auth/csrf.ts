import { getCsrfToken, setCsrfToken, clearCsrfToken } from './cookies'

const CSRF_TOKEN_KEY = 'X-CSRF-Token'
const CSRF_API_ROUTE = '/api/auth/csrf'

let csrfTokenPromise: Promise<string> | null = null

export const fetchCsrfToken = async (): Promise<string> => {
	const existingToken = getCsrfToken()
	if (existingToken) {
		return existingToken
	}

	if (csrfTokenPromise) {
		return csrfTokenPromise
	}

	csrfTokenPromise = (async () => {
		try {
			const response = await fetch(CSRF_API_ROUTE, {
				method: 'GET',
				credentials: 'include'
			})

			if (!response.ok) {
				throw new Error('Failed to fetch CSRF token')
			}

			const data = await response.json()
			const token = data.token

			if (!token) {
				throw new Error('Invalid CSRF token response')
			}

			setCsrfToken(token)
			return token
		} catch (error) {
			console.error(error)
			throw error
		} finally {
			csrfTokenPromise = null
		}
	})()

	return csrfTokenPromise
}

export const getCsrfTokenHeader = async (): Promise<string> => {
	const token = getCsrfToken()
	if (token) {
		return token
	}

	return await fetchCsrfToken()
}

export const getCsrfHeaders = async (): Promise<Record<string, string>> => {
	const token = await getCsrfTokenHeader()
	return {
		[CSRF_TOKEN_KEY]: token
	}
}

export const clearCsrf = (): void => {
	clearCsrfToken()
}
