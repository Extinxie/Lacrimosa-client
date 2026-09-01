import Link from 'next/link'
import { Mail, Send, Shield, FileText, Lock, MessageCircle } from 'lucide-react'

export default function FooterComponent() {
	return (
		<footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-sm mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className="text-xl font-bold bg-linear-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent hover:opacity-80 transition"
						>
							Lacrimosa
						</Link>
						<span className="text-white/20 hidden sm:inline">
							|
						</span>
						<div className="flex items-center gap-2">
							<a
								href="https://telegram.me/lacrimosatv"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/40 hover:text-white transition-colors duration-300"
								aria-label="Telegram"
							>
								<Send className="w-4 h-4" />
							</a>
							<a
								href="https://discord.gg/AG8f5mtfMm"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/40 hover:text-white transition-colors duration-300"
								aria-label="Discord"
							>
								<MessageCircle className="w-4 h-4" />
							</a>
							<a
								href="mailto:lacrimosa@example.com"
								className="text-white/40 hover:text-white transition-colors duration-300"
								aria-label="Email"
							>
								<Mail className="w-4 h-4" />
							</a>
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
						<Link
							href="/terms"
							className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
						>
							Пользовательское соглашение
						</Link>
						<span className="text-white/10 hidden sm:inline">
							•
						</span>
						<Link
							href="/for-copyright-holders"
							className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
						>
							Для правообладателей
						</Link>
						<span className="text-white/10 hidden sm:inline">
							•
						</span>
						<Link
							href="/privacy"
							className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
						>
							Конфиденциальность
						</Link>
					</div>

					<a
						href="https://telegram.me/lacrimosatv"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-white/10 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 hover:border-purple-500/40"
					>
						<span>Связаться с нами</span>
						<Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						<span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-pink-500 opacity-10 group-hover:opacity-100 transition-opacity" />
					</a>
				</div>

				<div className="mt-6 pt-6 border-t border-white/5 text-center">
					<p className="text-white/20 text-xs">
						© {new Date().getFullYear()} Lacrimosa. Все права
						защищены.
					</p>
				</div>
			</div>
		</footer>
	)
}
