import apiClient from '../lib/api/secure-client'
import {
	Collection,
	CollectionItem,
	FavoriteAnime,
	IAnime,
	IAnimeDetailsId,
	IAnimeLatest,
	PaginatedResponse
} from '../types/for-api.types'

const API_URL =
	process.env.NODE_ENV === 'production'
		? 'https://lacrimosa.fun'
		: 'http://localhost:3001'

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
	getAllAnimesLibriary: async (
		page: number = 1,
		limit: number = 12
	): Promise<PaginatedResponse> => {
		try {
			const url = `${API_URL}/post-animes/all-animes?page=${page}&limit=${limit}`

			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})

			return response.json()
		} catch (error) {
			throw error
		}
	},
	getNewAnimesLibriary: async (): Promise<IAnime[]> => {
		const responce = await apiClient.get<IAnime[]>('/post-animes/new')
		return responce.data
	},
	getPopularAnimesLibriary: async (): Promise<IAnime[]> => {
		const responce = await apiClient.get<IAnime[]>('/post-animes/popular')
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
	},
	getFavoritesUserAnimesTop: async (): Promise<FavoriteAnime[]> => {
		const responce =
			await apiClient.get<FavoriteAnime[]>('/users/likes-anime')
		return responce.data
	},
	postFavoritesUserAnimesTop: async (
		animeId: string
	): Promise<FavoriteAnime> => {
		const response = await apiClient.post<FavoriteAnime>(
			'/users/likes-anime',
			{ animeId }
		)
		return response.data
	},
	deleteFavoritesUserAnimesTop: async (
		id: string
	): Promise<FavoriteAnime> => {
		const responce = await apiClient.delete<FavoriteAnime>(
			`/users/likes-anime/${id}`
		)
		return responce.data
	},

	getCollectionAnimesUser: async (): Promise<Collection[]> => {
		const response = await apiClient.get('/users/collections')
		return response.data
	},
	getCollectionSlugAnimeUser: async (slug: string): Promise<Collection> => {
		const response = await apiClient.get(`/users/collection/${slug}`)
		return response.data
	},
	postCollectionAnimeUser: async (
		slug: string,
		animeId: string
	): Promise<CollectionItem> => {
		const response = await apiClient.post(
			`/users/collections/${slug}/add`,
			{
				animeId
			}
		)
		return response.data
	},
	deleteCollectionAnimeUser: async (
		slug: string,
		animeId: string
	): Promise<void> => {
		const response = await apiClient.delete(
			`/users/collections/${slug}/remove/${animeId}`
		)
		return response.data
	}
}
