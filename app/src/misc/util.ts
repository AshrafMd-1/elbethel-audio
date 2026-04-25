const formatSecondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}`
}

const languageSpecificTitle = (isTelugu: boolean, text: string) => {
	const firstThree = text.slice(0, 3)
	let editedText: string

	if (/^_\d{2}$/.test(firstThree)) {
		editedText = text.slice(4).split('-')[isTelugu ? 1 : 0]
	} else {
		editedText = text.split('-')[isTelugu ? 1 : 0]
	}

	return isTelugu ? editedText : titleCase(editedText)
}

const songSpecificTitle = (isTelugu: boolean, text: string, folderName?: string) => {
	const editedText = text.replace(/_+/g, ' ').split(' ')
	const index = editedText[1]
	if (!folderName) return isTelugu ? `అధ్యాయం ${index}` : `Chapter ${index}`
	const editedFolderName = languageSpecificTitle(isTelugu, folderName)
	return isTelugu ? `${editedFolderName} అధ్యాయం ${index}` : `${editedFolderName} Chapter ${index}`
}

const titleCase = (text: string) => {
	return text
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

const calculateBytesToDuration = (bytes: number, bitRate: number) => {
	const duration = (bytes * 8) / (bitRate * 1000) - 2
	return formatSecondsToMinutes(duration)
}

export {
	formatSecondsToMinutes,
	languageSpecificTitle,
	titleCase,
	songSpecificTitle,
	calculateBytesToDuration,
}
