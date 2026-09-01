import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { animeService } from '../services/get-animes'
import { IAnimeDetailsId, PaginatedResponse } from '../types/for-api.types'

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

export const useInfiniteAnime = (limit: number = 12) => {
	return useInfiniteQuery({
		queryKey: ['anime', 'infinite', limit],
		queryFn: async ({ pageParam = 1 }) => {
			const result = await animeService.getAllAnimesLibriary(
				pageParam as number,
				limit
			)
			return result
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage?.pagination?.hasMore) {
				return undefined
			}
			const nextPage = lastPage.pagination.page + 1
			return nextPage
		},
		initialPageParam: 1,
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

export const useGetFavoritesUserAnimesTop = () => {
	return useQuery({
		queryKey: ['favorite'],
		queryFn: () => animeService.getFavoritesUserAnimesTop(),
		staleTime: 5 * 60 * 1000
	})
}

export const usePostFavoritesUserAnimesTop = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (animeId: string) =>
			animeService.postFavoritesUserAnimesTop(animeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['favorite'] })
		}
	})
}

export const useDeleteFavoritesUserAnimesTop = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (animeId: string) =>
			animeService.deleteFavoritesUserAnimesTop(animeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['favorite'] })
		}
	})
}

export const useGetCollectionAnimesUser = () => {
	return useQuery({
		queryKey: ['collection'],
		queryFn: () => animeService.getCollectionAnimesUser(),
		// staleTime: 0
		refetchOnWindowFocus: true
	})
}

export const useGetCollectionSlugAnimesUser = (slug: string) => {
	return useQuery({
		queryKey: ['collections', slug],
		queryFn: () => animeService.getCollectionSlugAnimeUser(slug),
		enabled: !!slug,
		refetchOnWindowFocus: true
	})
}

export const usePostCollectionUserAnimes = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ slug, animeId }: { slug: string; animeId: string }) =>
			animeService.postCollectionAnimeUser(slug, animeId),
		onSuccess: (_, { slug }) => {
			queryClient.invalidateQueries({ queryKey: ['collections'] })
			queryClient.invalidateQueries({ queryKey: ['collections', slug] })
		}
	})
}

export const useDeleteCollectionUserAnimes = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ slug, animeId }: { slug: string; animeId: string }) =>
			animeService.deleteCollectionAnimeUser(slug, animeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['collections'] })
		}
	})
}
