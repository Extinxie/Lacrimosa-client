'use client'
import { useState } from 'react'
// @ts-ignore
import op from '../../../assets/background/tensei_trimmed_compressed.mp4'
import poster from '../../../assets/background/rim.jpg'
import { Button } from '../../ui'
import { Volume1 } from 'lucide-react'

export default function OpeningMainPage() {
	const [muted, setMuted] = useState(true)

	const toggleMuted = () => {
		setMuted(!muted)
	}

	return (
		<section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
			<div className="absolute inset-0 opacity-90 hidden md:block">
				<video
					src={op}
					autoPlay
					muted={muted}
					loop
					playsInline
					preload="metadata"
					className="block size-full object-cover"
				/>
			</div>

			<div className="absolute inset-0 block md:hidden">
				<div className="relative size-full">
					<img
						src={poster.src}
						alt="bg"
						className="block size-full object-cover rounded-3xl"
					/>
					<div className="absolute inset-0 backdrop-blur-[2px]" />
					<div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70" />
				</div>
			</div>

			<div className="relative container mx-auto w-full px-6 h-full flex items-center">
				<div className="text-white max-w-2xl ">
					<h1 className="text-4xl md:text-6xl font-bold font-zen text-white drop-shadow-lg">
						О моем перерождении в слизь 4
					</h1>
					<p className="text-lg md:text-xl text-white/80 mt-4 drop-shadow-md">
						Мечта повелителя демонов Римуру Темпест о создании союза
						между людьми и монстрами становится на шаг ближе к
						осуществлению.
					</p>
					<div className="flex flex-wrap gap-4 mt-6">
						<Button variant="default">Смотреть</Button>
						<Button variant="default">Подробнее</Button>
						<Button
							variant="ghost"
							className="p-3 rounded-full"
							onClick={toggleMuted}
						>
							<Volume1 className="w-5 h-5" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
