import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/get-users'

export const useGetAwardsUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: () => userService.topUsersAwards(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false
	})
}

export const useGetAnotherUserByName = (name: string) => {
	return useQuery({
		queryKey: ['another-user', name],
		queryFn: () => userService.getAnotherUser(name),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: !!name
	})
}

export const usePatchChangeEmail = (email: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (email: string) => userService.postChangeEmail(email),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['email-change'] })
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

// export const usePostCollectionUserAnimes = () => {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationFn: ({ slug, animeId }: { slug: string; animeId: string }) =>
// 			animeService.postCollectionAnimeUser(slug, animeId),
// 		onSuccess: (_, { slug }) => {
// 			queryClient.invalidateQueries({ queryKey: ['collections'] })
// 			queryClient.invalidateQueries({ queryKey: ['collections', slug] })
// 		}
// 	})
// }
