import apiClient from '../lib/api/secure-client'
import { IUserAnother } from '../types/for-api.types'

type IUserAwards = {
	id: string
	name: string
	image?: string
	premium?: boolean
}

export const userService = {
	topUsersAwards: async () => {
		const responce = await apiClient.get<IUserAwards[]>('/users/users-top')
		return responce.data
	},
	getAnotherUser: async (name: string) => {
		const responce = await apiClient.get(`/user/name/${name}`)
		return responce.data
	},
	postChangeEmail: async (email: string) => {
		const responce = await apiClient.post('/auth/change-email​', {
			newEmail: email
		})
		return responce.data
	}
}
