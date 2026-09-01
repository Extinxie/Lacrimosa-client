import { Header } from '@/src/components/ui/header/header-main/header'
import CollectionPageClient from './Collectionpage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Библиотека',
	description: 'Библиотека Lacrimosa всех аниме на любой вкус',
	openGraph: {
		title: 'Библиотека',
		description: 'Выбирайте аниме на свой вкус в библиотеке Lacrimosa',
		// images: ['/og-image.png']
	}
}

export default function CollectionPage() {
	return (
		<div className="">
			<Header />
			<CollectionPageClient />
		</div>
	)
}
