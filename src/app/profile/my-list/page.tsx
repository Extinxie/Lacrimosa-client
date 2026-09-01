import { Metadata } from 'next'
import MyListPageClient from './MylistClient'

export const metadata: Metadata = {
	title: 'Мои списки аниме',
	description: 'Управляйте своими списками аниме на Lacrimosa'
}

export default function MyListPage() {
	return (
		<>
			<MyListPageClient />
		</>
	)
}
