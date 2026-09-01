// короче тут нужно будет обработать volume сделать как типо ссылку на саму страницу

import {
	Heart,
	Home,
	UserCircle,
	Folder,
	List,
	Star,
	Gift,
	Users,
	Trophy,
	Settings
} from 'lucide-react'

export const animeList = [
	'Атака Титанов',
	'О моем перерождении в слизь',
	'Реинкарнация безработного',
	'Клинок Рассекающий Демонов',
	'Магическая Битва',
	'Токийский Гуль',
	'Стальной Алхимик',
	'Ангел по соседству',
	'Доктор стоун',
	'Нет игры - нет жизни'
] as const

export const navLinks = [
	{ href: '/collections', label: 'Коллекции' },
	{ href: '/recent', label: 'Недавние' },
	{ href: '/watch-together', label: 'Смотреть вместе' }
] as const

export const bottomNav = [
	{ href: '/', label: 'Главная', icon: Home },
	{ href: '/collections', label: 'Коллекции', icon: Folder },
	{ href: '/profile', label: 'Профиль', icon: UserCircle },
	{ href: '/settings', label: 'Настройки', icon: Settings }
] as const

export const mobileMenuLinks = [
	{ href: '/profile', label: 'Профиль', icon: UserCircle },
	{ href: '/collections', label: 'Коллекции', icon: Folder },
	{ href: '/favorites', label: 'Избранные', icon: Heart },
	{ href: '/profile/my-list', label: 'Мой список', icon: List },
	{ href: '/premium', label: 'Премиум', icon: Star },
	{ href: '/premium-gift', label: 'Подарить премиум', icon: Gift },
	{ href: '/watch-together', label: 'Смотреть вместе', icon: Users },
	{ href: '/leaderboard', label: 'Таблица лидеров', icon: Trophy },
	{ href: '/settings', label: 'Настройки', icon: Settings }
] as const

export const PcMenuLinks = [
	{ href: '/profile', label: 'Профиль', icon: UserCircle },
	{ href: '/collections', label: 'Коллекции', icon: Folder },
	{ href: '/favorites', label: 'Избранные', icon: Heart },
	{ href: '/profile/my-list', label: 'Мой список', icon: List },
	{ href: '/premium', label: 'Премиум', icon: Star },
	{ href: '/premium-gift', label: 'Подарить премиум', icon: Gift },
	{ href: '/watch-together', label: 'Смотреть вместе', icon: Users },
	{ href: '/leaderboard', label: 'Таблица лидеров', icon: Trophy },
	{ href: '/settings', label: 'Настройки', icon: Settings }
] as const

export const DEFAULT_COLLECTIONS = [
	{
		slug: 'watching',
		name: 'Смотрю',
		color: '#3b82f6',
		order: 0
	},
	{
		slug: 'planned',
		name: 'Буду смотреть',
		color: '#8b5cf6',
		order: 1
	},
	{
		slug: 'watched',
		name: 'Просмотрено',
		color: '#22c55e',
		order: 2
	},
	{
		slug: 'on-hold',
		name: 'Отложено',
		color: '#f59e0b',
		order: 3
	},
	{ slug: 'dropped', name: 'Брошено', color: '#ef4444', order: 4 }
] as const
