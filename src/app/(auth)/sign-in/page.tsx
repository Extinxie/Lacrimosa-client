'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import loginimage from '../../../assets/background/anime.jpg'
import { useAuth } from '@/src/context/auth-provider'

export default function SignIn() {
	const router = useRouter()
	const { signIn, isLoading } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await signIn(email, password)
			router.push('/')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
			<div className="absolute inset-0 z-0">
				<Image
					src={loginimage}
					alt="Background"
					fill
					className="object-cover object-center"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-r from-purple-800/40 via-pink-800/20 to-transparent backdrop-blur-[1px]" />
				<div className="absolute inset-0 bg-black/20" />
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
					<div className="w-full max-w-md mx-auto lg:mx-0">
						<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-white/20">
							<div className="text-center mb-6 md:mb-8">
								<Link
									href="/"
									className="text-white/80 hover:text-white text-sm md:text-base transition-all duration-300 inline-block hover:scale-105"
								>
									/Главная
								</Link>
								<h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 transition-all hover:text-pink-100 duration-300">
									Вход
								</h2>
							</div>

							<form
								onSubmit={handleSubmit}
								className="space-y-4 md:space-y-5"
							>
								<div>
									<input
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder="Логин"
										disabled={isLoading}
										className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-200 focus:outline-none focus:border-pink-500 transition text-sm md:text-base disabled:opacity-50"
										required
									/>
								</div>
								<div>
									<input
										type="password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										placeholder="Пароль"
										disabled={isLoading}
										className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-200 focus:outline-none focus:border-pink-500 transition text-sm md:text-base disabled:opacity-50"
										required
									/>
								</div>

								<button
									type="submit"
									disabled={isLoading}
									className="w-full cursor-pointer bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading ? 'Загрузка...' : 'Войти'}
								</button>
							</form>

							<div className="w-full flex justify-center mt-4">
								<p className="text-white/60 text-sm">
									Нет аккаунта?
									<Link
										href="/sign-up"
										className="text-pink-400 hover:text-pink-300 font-semibold duration-150 ml-1 hover:underline"
									>
										Зарегистрироваться
									</Link>
								</p>
							</div>
						</div>
					</div>

					<div className="w-full mx-auto lg:mx-0 lg:mt-44">
						<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20">
							<h3 className="text-white text-lg md:text-xl font-bold mb-4 text-center lg:text-left">
								Войти с помощью
							</h3>
							<div className="flex flex-col sm:flex-row gap-3 md:gap-4">
								<button
									type="button"
									className="w-full sm:flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
								>
									VK
								</button>
								<button
									type="button"
									className="w-full sm:flex-1 bg-linear-to-r from-neutral-600 to-neutral-700 hover:from-neutral-700 hover:to-neutral-800 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
								>
									Google
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="relative z-10 mt-8 md:mt-12 text-center text-white/60 text-xs md:text-sm">
					<span className="block sm:inline">
						Политика конфиденциальности и условия
					</span>
					<span className="hidden sm:inline mx-2">•</span>
					<span className="block sm:inline">
						<span className="text-pink-400 hover:text-pink-300 font-semibold transition duration-150">
							LACRIMOSA openAPI
						</span>
					</span>
				</div>
			</div>
		</div>
	)
}
