export type AnimeStatus = 'АНОНСИРОВАННО' | 'ОНГОИНГ' | 'ВЫПУЩЕННО'
export type AnimeType =
	| 'TV'
	| 'MOVIE'
	| 'OVA'
	| 'ONA'
	| 'SPECIAL'
	| 'MUSIC'
	| 'PV'
	| 'CM'
export type AnimeCountry = 'OTHER' | 'ЯПОНИЯ' | 'КИТАЙ' | 'КОРЕЯ'
// export type AnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "AUTUMN";

export type IUser = {
	id: string
	name: string
	email?: string
	image?: string | null
	avatar?: string | null
	aboutUser?: string | null
	premium: boolean
}

export type IAnimeLatest = {
	id: string
	shikimoriId: number
	slug: string
	nativeTitle: string
	russianTitle: string
	englishTitle: null
	poster: string
	type: string
	status: string
	year: number
	shikimoriRating: any
	episodesCount: string
}

export interface IStudio {
	id: string
	title: string
	createdAt: string
	updatedAt: string
}

export interface ILicensor {
	id: string
	countries: string[]
	title: string
	createdAt: string
	updatedAt: string
}

export type IAnimeDetailsMainpage = {}

export type IAnimeDetailsId = {
	shikimoriRating: number
	poster: string | null
	englishTitle: string | null
	nativeTitle: string
	russianTitle: string | null
	episodesCount: number | null
	episodesAired: number | null
	description: string | null
	banner: string | null
	tags: ITag[]
	studios: IStudio[]
	licensors: ILicensor[]
	year: number
	episodes: IEpisode[]
	releasedOn: string | null
	airedOn: string | null
	status: AnimeStatus
	type: AnimeType
	country: AnimeCountry
	season: string | null
	seasons: Season[]
	synonyms: string[]
}

export type ITag = {
	id: string
	shikimoriId: number
	russianTitle: string
	englishTitle: string
	type: 'GENRE' | 'DEMOGRAPHIC'
	createdAt: string
	updatedAt: string
}

export type IEpisode = {
	id: string
	number: number
	duration: number | null
	createdAt: string
	updatedAt: string
	screenshots: unknown[]
	translations: unknown[]
}

export type IAnimeFull = {
	id: string
	slug: string
	shikimoriId: number
	myanimelistId: number | null
	anilistId: number | null
	anilibriaId: number | null
	kinopoiskId: number | null
	imdbId: string | null
	kodikId: number | null
	description: string | null
	aksorId: number | null
	nativeTitle: string
	romajiTitle: string
	russianTitle: string
	englishTitle: string | null
	poster: string
	banner: string
	synonyms: string[]
	tags: ITag[]
	note: string | null
	hashtag: string | null
	country: string
	status: string
	type: string
	rating: string
	season: string | null
	year: number
	airedOn: string
	releasedOn: string
	nextEpisodeAt: string | null
	episodesCount: number
	episodesAired: number
	duration: number | null
	shikimoriRating: number
	myanimelistRating: number
	anilistRating: number
	kinopoiskRating: number
	imdbRating: number
	averageRating: number
	bayesianRating: number
	hasLgbt: boolean
	isCensored: boolean
	isDeleted: boolean
	createdAt: string
	updatedAt: string
	deletedAt: string | null
	studios: unknown[]
	licensors: unknown[]
	episodes: IEpisode[]
	screenshots: unknown[]
	videos: unknown[]
}

export type Season = {
	id: string
	slug: string
	title: string
	year: number | null
	poster: string | null
	seasonNumber: number
	isCurrent: boolean
}
