import type { Metadata } from 'next'
import '../assets/styles/globals.css'
import { Geist } from 'next/font/google'
import { cn } from '@/src/lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Provider from './providers'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
	title: 'Lacrimosa',
	description: 'Lacrimosa'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="ru"
			className={cn('h-full antialiased', 'font-sans', geist.variable)}
		>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="min-h-full flex flex-col font-zen">
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
