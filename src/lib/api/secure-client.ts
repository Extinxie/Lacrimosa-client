import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { checkRateLimit } from './rate-limit'
import { getValidToken } from './token-refresh'
import { getCsrfHeaders } from '../auth/csrf'
import { generateUUID } from '../utils/uuid'

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	metadata?: {
		startTime: number
	}
	_retry?: boolean
}

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const USE_API_PROXY = process.env.NEXT_PUBLIC_USE_API_PROXY === 'true'

const apiClient: AxiosInstance = axios.create({
	baseURL: USE_API_PROXY ? '' : BASE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

if (USE_API_PROXY) {
	apiClient.interceptors.request.use((config) => {
		if (config.url) {
			const endpoint = config.url.startsWith('/')
				? config.url.slice(1)
				: config.url
			config.url = `/api/proxy/${endpoint}`
		}
		return config
	})
}

const STATE_CHANGING_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH']

apiClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const endpoint = config.url || ''

		const rateLimitCheck = checkRateLimit(endpoint)
		if (!rateLimitCheck.allowed) {
			const error = new Error(
				`Rate limit exceeded. Retry after ${rateLimitCheck.retryAfter} seconds.`
			)
			;(error as any).status = 429
			;(error as any).retryAfter = rateLimitCheck.retryAfter
			return Promise.reject(error)
		}

		;(config as ExtendedAxiosRequestConfig).metadata = {
			startTime: Date.now()
		}

		// const token = await getValidToken();
		// if (token && config.headers) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }

		// if (
		//   config.method &&
		//   STATE_CHANGING_METHODS.includes(config.method.toUpperCase())
		// ) {
		//   try {
		//     const csrfHeaders = await getCsrfHeaders();
		//     if (config.headers) {
		//       Object.assign(config.headers, csrfHeaders);
		//     }
		//   } catch (error) {
		//     console.error("Failed to get CSRF token:", error);
		//   }
		// }

		if (config.headers) {
			config.headers['X-Request-ID'] = generateUUID()
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default apiClient
