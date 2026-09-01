'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/auth-provider'
import { Slide, ToastContainer } from 'react-toastify'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			gcTime: 24 * 60 * 60 * 1000
		}
	}
})

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				{children}
				<ToastContainer
					position="bottom-right"
					autoClose={2000}
					hideProgressBar={true}
					newestOnTop
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover={false}
					transition={Slide}
					theme="dark"
					toastClassName="bg-black/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl"
					icon={false}
				/>
			</AuthProvider>
		</QueryClientProvider>
	)
}
