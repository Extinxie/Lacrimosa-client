import apiClient from '../lib/api/secure-client'
import { IAnimeDetailsId, IAnimeLatest } from '../types/for-api.types'

export const animeService = {
	getLatests: async (): Promise<IAnimeLatest[]> => {
		const responce = await apiClient.get<IAnimeLatest[]>(
			'/post-animes/latests'
		)
		return responce.data
	},
	getAllAnimes: async (): Promise<IAnimeLatest[]> => {
		const responce = await apiClient.get<IAnimeLatest[]>(
			'/post-animes/animes'
		)
		return responce.data
	},
	searchAnimes: async (query: string): Promise<IAnimeLatest[]> => {
		const response = await apiClient.post<IAnimeLatest[]>('/post-animes', {
			query,
			limit: 20
		})
		return response.data
	},
	getAnimeById: async (id: string): Promise<IAnimeDetailsId> => {
		const response = await apiClient.get<IAnimeDetailsId>(
			`/post-animes/${id}`
		)
		return response.data
	},
	getAnimesDetails: async (id: string): Promise<IAnimeDetailsId> => {
		const responce = await apiClient.get<IAnimeDetailsId>(
			`/details-about/${id}`
		)
		return responce.data
	}
}
