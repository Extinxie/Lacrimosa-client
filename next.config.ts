import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		prefetchInlining: false
	},
	turbopack: {
		rules: {
			'*.mp4': {
				type: 'asset'
			}
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	}
}

export default nextConfig
