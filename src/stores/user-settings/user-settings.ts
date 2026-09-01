import apiClient from '@/src/lib/api/secure-client'
import { IUser } from '@/src/types/for-api.types'
import { create } from 'zustand'

const withCacheBust = (url?: string | null) => {
	if (!url) return url ?? null
	const base = url.split('?')[0]
	return `${base}?v=${Date.now()}`
}

interface UserState {
	me: IUser | null
	isLoading: boolean
	isSaving: boolean
	isUploadingAvatar: boolean
	isUploadingBanner: boolean
	error: string | null
	fetchMe: () => Promise<void>
	updateProfile: (data: { name?: string }) => Promise<void>
	updateBio: (data: { bio?: string }) => Promise<void>
	uploadAvatar: (file: File) => Promise<void>
	uploadBanner: (file: File) => Promise<void>
	reset: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
	me: null,
	isLoading: false,
	isSaving: false,
	isUploadingAvatar: false,
	isUploadingBanner: false,
	error: null,

	fetchMe: async () => {
		if (get().isLoading) return
		set({ isLoading: true, error: null })
		try {
			const response = await apiClient.get<IUser>('/user/me')
			set({ me: response.data, isLoading: false })
		} catch (error: any) {
			set({
				isLoading: false,
				error: error?.message || 'Failed to fetch profile'
			})
		}
	},

	updateProfile: async (data: { name?: string }) => {
		set({ isSaving: true, error: null })
		try {
			const response = await apiClient.post<IUser>(
				'/auth/update-user',
				data
			)
			set((state) => ({
				me: state.me
					? { ...state.me, ...response.data }
					: response.data,
				isSaving: false
			}))
		} catch (error: any) {
			set({
				isSaving: false,
				error: error?.message
			})
		}
	},

	updateBio: async (data: { bio?: string }) => {
		set({ isSaving: true, error: null })
		try {
			const response = await apiClient.post<IUser>(
				'/user/update-bio',
				data
			)
			set((state) => ({
				me: state.me
					? { ...state.me, ...response.data }
					: response.data,
				isSaving: false
			}))
		} catch (error: any) {
			console.error(error)
			set({ isSaving: false, error: error?.message })
		}
	},

	uploadAvatar: async (file: File) => {
		set({ isUploadingAvatar: true, error: null })
		try {
			const formData = new FormData()
			formData.append('avatar', file)

			const uploadResponse = await apiClient.post<IUser>(
				'/user/upload-avatar',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)

			const updatedUser =
				uploadResponse.data ??
				(await apiClient.get<IUser>('/user/me')).data

			set((state) => ({
				me: state.me
					? {
							...state.me,
							...updatedUser,
							image: withCacheBust(
								updatedUser.image ?? state.me.image
							)
						}
					: {
							...updatedUser,
							image: withCacheBust(updatedUser.image)
						},
				isUploadingAvatar: false
			}))
		} catch (error: any) {
			set({
				isUploadingAvatar: false,
				error: error?.message || 'Failed to upload avatar'
			})
		}
	},

	uploadBanner: async (file: File) => {
		set({ isUploadingBanner: true, error: null })
		try {
			const formData = new FormData()
			formData.append('banner', file)

			const uploadResponse = await apiClient.post<IUser>(
				'/user/upload-banner',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)

			const updatedUser =
				uploadResponse.data ??
				(await apiClient.get<IUser>('/user/me')).data

			set((state) => ({
				me: state.me
					? {
							...state.me,
							...updatedUser,
							bannerProfile: withCacheBust(
								updatedUser.bannerProfile ??
									state.me.bannerProfile
							)
						}
					: {
							...updatedUser,
							bannerProfile: withCacheBust(
								updatedUser.bannerProfile
							)
						},
				isUploadingBanner: false
			}))
		} catch (error: any) {
			set({
				isUploadingBanner: false,
				error: error?.message || 'Failed to upload banner'
			})
		}
	},

	reset: () => {
		set({
			me: null,
			isLoading: false,
			isSaving: false,
			isUploadingAvatar: false,
			isUploadingBanner: false,
			error: null
		})
	}
}))

export const useUserName = () => useUserStore((state) => state.me?.name)
export const useUserBio = () => useUserStore((state) => state.me?.bio)
export const useUserActions = () =>
	useUserStore((state) => ({
		fetchMe: state.fetchMe,
		updateProfile: state.updateProfile,
		uploadAvatar: state.uploadAvatar,
		uploadBanner: state.uploadBanner,
		updateBio: state.updateBio,
		reset: state.reset
	}))
