import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../lib/api/secure-client'
import { clearSession } from '../lib/auth/simple-auth'

// type Session = {
// 	id: string
// 	token: string
// 	expiresAt: string
// 	ipAddress: string
// 	userAgent: string
// 	createdAt: string
// 	isCurrent: boolean
// }

export const useSessions = () => {
	return useQuery({
		queryKey: ['sessions'],
		queryFn: async () => {
			const response = await apiClient.get('/auth/list-sessions')
			return response.data
		},
		staleTime: 5 * 60 * 1000, // 5 минут
		refetchOnMount: false, // ← не перезапрашивать при монтировании
		refetchOnWindowFocus: false, // ← не перезапрашивать при фокусе
		gcTime: 10 * 60 * 1000
	})
}

export const useRevokeSession = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (token: string) => {
			await apiClient.post('/auth/revoke-session', { token })
		},
		onSuccess: (data, token) => {
			const currentToken = localStorage.getItem('access_token')

			if (token === currentToken) {
				clearSession()
				queryClient.clear()
				window.location.href = '/sign-in'
			} else {
				queryClient.setQueryData(['sessions'], (old: any) => {
					if (!old) return old
					return old.filter((session: any) => session.token !== token)
				})
			}
		}
	})
}

export const useRevokeOtherSessions = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			await apiClient.post('/auth/revoke-other-sessions')
		},
		onSuccess: () => {
			queryClient.setQueryData(['sessions'], (old: any) => {
				if (!old) return old
				return old.filter((session: any) => session.isCurrent)
			})
		}
	})
}

export const useRevokeAllSessions = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			await apiClient.post('/auth/revoke-sessions')
		},
		onSuccess: () => {
			clearSession()
			queryClient.clear()
			window.location.href = '/sign-in'
		}
	})
}
