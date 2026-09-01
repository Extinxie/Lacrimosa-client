export const metadata: Metadata = {
	title: 'Мой профиль',
	description: 'Управляйте своим профилем на Lacrimosa - аниме-сайте',
	openGraph: {
		title: 'Мой профиль',
		description: 'Управляйте своим профилем на Lacrimosa',
		images: ['/og-image.png']
	}
}

import { Metadata } from 'next'
import ProfilePageClient from './ProfileClient'

export default function ProfilePage() {
	return (
		<>
			<ProfilePageClient />
		</>
	)
}
