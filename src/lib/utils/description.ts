export const cleanDescription = (text: string | null): string => {
	if (!text) return ''

	return text
		.replace(/\[character=\d+\s*[^\]]*\]/g, '')
		.replace(/\[\/character\]/g, '')
		.replace(/\[anime=\d+\]/g, '')
		.replace(/\[\/anime\]/g, '')
		.replace(/\[i\]/g, '')
		.replace(/\[\/i\]/g, '')
		.replace(/\[b\]/g, '')
		.replace(/\[\/b\]/g, '')
		.replace(/\[u\]/g, '')
		.replace(/\[\/u\]/g, '')
		.replace(/\[s\]/g, '')
		.replace(/\[\/s\]/g, '')
		.replace(/\[url=[^\]]+\]/g, '')
		.replace(/\[\/url\]/g, '')
		.replace(/\[spoiler\]/g, '')
		.replace(/\[\/spoiler\]/g, '')
		.replace(/\[[a-zA-Z0-9_=\-\s]+\]/g, '')
		.replace(/\[\/[a-zA-Z0-9_]+\]/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}

export const truncateText = (text: string, limit: number): string => {
	if (text.length <= limit) return text
	return text.slice(0, limit) + '...'
}
