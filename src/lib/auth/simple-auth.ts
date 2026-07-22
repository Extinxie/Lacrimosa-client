// ПОМЕНЯТЬ АРХИТЕКТУРУ ФУЛЛ, ФАЙЛ МЕГА ВАЖНЫЙ ПРИВЯЗАН К APICLIENT CRSF

import { IUser } from '@/src/types/for-api.types'

let sessionUser: IUser | null = null
let sessionToken: string | null = null

export const setSession = (user: IUser, token: string) => {
	sessionUser = user
	sessionToken = token
	if (typeof window !== 'undefined') {
		localStorage.setItem('user_data', JSON.stringify(user))
		localStorage.setItem('access_token', token)
	}
}

export const getSession = () => {
	if (sessionUser && sessionToken) {
		return { user: sessionUser, token: sessionToken }
	}

	if (typeof window !== 'undefined') {
		const user = localStorage.getItem('user_data')
		const token = localStorage.getItem('access_token')
		if (token && user) {
			try {
				const parsedUser = JSON.parse(user)
				sessionUser = parsedUser
				sessionToken = token
				return { user: parsedUser, token }
			} catch {
				return { user: null, token: null }
			}
		}
	}

	return { user: null, token: null }
}

export const clearSession = () => {
	sessionUser = null
	sessionToken = null
	if (typeof window !== 'undefined') {
		localStorage.removeItem('user_data')
		localStorage.removeItem('access_token')
	}
}
