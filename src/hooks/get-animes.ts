import { useQuery } from '@tanstack/react-query'
import { animeService } from '../services/get-animes'
import { IAnimeDetailsId } from '../types/for-api.types'

export const useLatestAnimes = () => {
	return useQuery({
		queryKey: ['anime', 'latest'],
		queryFn: () => animeService.getLatests(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false
	})
}

export const useGetAllAnimes = () => {
	return useQuery({
		queryKey: ['anime', 'all'],
		queryFn: () => animeService.getAllAnimes(),
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000
	})
}

export const useSearchAnimes = (query: string) => {
	return useQuery({
		queryKey: ['anime', query],
		queryFn: () => animeService.searchAnimes(query),
		enabled: query.length > 2,
		staleTime: 60 * 1000
	})
}

export const useAnimeById = (id: string) => {
	return useQuery<IAnimeDetailsId>({
		queryKey: ['anime', id],
		queryFn: () => animeService.getAnimeById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000
	})
}
