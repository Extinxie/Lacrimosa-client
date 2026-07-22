import apiClient from '../lib/api/secure-client'

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
	}
}
