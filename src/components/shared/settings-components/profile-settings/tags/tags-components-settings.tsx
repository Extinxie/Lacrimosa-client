import { BadgeQuestionMark } from 'lucide-react'

export default function TagsComponentsSettings() {
	return (
		<div className="bg-white/1 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
			<div className="flex gap-2">
				<BadgeQuestionMark
					color="turquoise"
					size={18}
					className="mt-1.5"
				/>
				<h3 className="text-white font-semibold text-lg mb-4">Теги</h3>
			</div>
		</div>
	)
}
