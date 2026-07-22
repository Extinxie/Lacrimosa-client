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
		}
		setIsLoading(false)
	}, [])

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

			setSession(user, token)
			setUser(user)
			setIsAuth(true)
		} catch (error: any) {
			setError(error?.response?.data?.message || error?.message)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const signOut = () => {
		clearSession()
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
