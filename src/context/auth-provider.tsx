'use client'

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from 'react'
import { IUser } from '../types/for-api.types'
import { publicClient } from '../lib/api/public-client'
import { clearSession, getSession, setSession } from '../lib/auth/simple-auth'
import { DEFAULT_COLLECTIONS } from '../components/shared/constants/sub-titles'
import apiClient from '../lib/api/secure-client'
import { useUserStore } from '../stores/user-settings/user-settings'

interface AuthContextType {
	user: IUser | null
	isAuth: boolean
	isLoading: boolean
	error: string | null
	signIn: (email: string, password: string) => Promise<void>
	signUp: (name: string, email: string, password: string) => Promise<void>
	signOut: () => void
	refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null)
	const [isAuth, setIsAuth] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const { user, token } = getSession()

		if (token && user) {
			setUser(user)
			setIsAuth(true)
			void useUserStore.getState().fetchMe()
		}
		setIsLoading(false)
	}, [])

	const createDefaultCollections = async (userId: string) => {
		try {
			await Promise.all(
				DEFAULT_COLLECTIONS.map((col) =>
					apiClient.post('/users/collections/create', {
						...col,
						userId,
						isDefault: true
					})
				)
			)
		} catch (error) {
			console.error('Failed to create default collections:', error)
		}
	}

	const signIn = async (email: string, password: string) => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await publicClient.post('/auth/sign-in/email', {
				email,
				password
			})
			const { user, token } = response.data

			setSession(user, token)
			setUser(user)
			setIsAuth(true)
			void useUserStore.getState().fetchMe()
		} catch (error: any) {
			setError(error?.response?.data?.message || error?.message)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const signUp = async (name: string, email: string, password: string) => {
		setIsLoading(true)
		setError(null)
		try {
			await publicClient.post('/auth/sign-up/email', {
				name,
				email,
				password
			})

			const response = await publicClient.post('/auth/sign-in/email', {
				email,
				password
			})
			const { user, token } = response.data
			if (user?.id) {
				await createDefaultCollections(user.id)
			}

			setSession(user, token)
			setUser(user)
			setIsAuth(true)
			void useUserStore.getState().fetchMe()
		} catch (error: any) {
			setError(error?.response?.data?.message || error?.message)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const signOut = () => {
		clearSession()
		useUserStore.getState().reset()
		setUser(null)
		setIsAuth(false)
		setError(null)
	}

	const refreshUser = async () => {
		try {
			const response = await publicClient.get<IUser>('/auth/profile')
			setUser(response.data)
			setIsAuth(true)
			const { token } = getSession()
			if (token) {
				setSession(response.data, token)
			}
		} catch (error) {
			signOut()
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuth,
				isLoading,
				error,
				signIn,
				signUp,
				signOut,
				refreshUser
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used AuthProvider')
	}
	return context
}
