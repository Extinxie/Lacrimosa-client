'use client'

import AnimesRender from '../components/animes/anime-render'
import AwardsUser from '../components/shared/awards-user/awards-user'
import OpeningMainPage from '../components/shared/video/opening-settings'
import { Header } from '../components/ui/header/header-main/header'
import SubHeader from '../components/ui/header/header-sub-titles/header-sub'

export default function Home() {
	return (
		<main className="">
			<Header />
			<SubHeader />
			<OpeningMainPage />
			<AwardsUser />
			<AnimesRender />
		</main>
	)
}
