import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/get-users'

export const useGetAwardsUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: () => userService.topUsersAwards(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false
	})
}
