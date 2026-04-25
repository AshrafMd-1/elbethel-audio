import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { useLanguage } from '@/context/LanguageContext'
import { languageSpecificTitle } from '@/misc/util'
import { ntUri, otUri } from '@/constants/images'
import { Image } from 'expo-image'
import { useMemo } from 'react'

interface FolderItemProps {
	item: string
	index: number
	count: number
	params: {
		mainFolder?: string
		chapterFolder?: string
	}
}

const imageMap: Record<number, any> = {
	0: otUri,
	1: ntUri,
}

const FolderItem = ({ item, index, count, params }: FolderItemProps) => {
	const router = useRouter()
	const { isTelugu } = useLanguage()

	const imageSource = useMemo(() => imageMap[index], [index])
	const isMainFolder = !params.mainFolder

	const handlePress = () => {
		router.push({
			pathname: isMainFolder ? '/individualScreens/MainFolder' : '/individualScreens/ChapterFolder',
			params: {
				mainFolder: params.mainFolder || item,
				chapterFolder: params.mainFolder ? item : undefined,
			},
		})
	}

	return (
		<Pressable style={isMainFolder ? styles.mainContainer : styles.container} onPress={handlePress}>
			{isMainFolder ? (
				<>
					<Image source={{ uri: imageSource }} style={styles.image} />
					<View style={{ flex: 1 }}>
						<Text style={defaultStyles.text}>{languageSpecificTitle(isTelugu, item)}</Text>
						<Text style={styles.mutedText}>Books: {count}</Text>
					</View>
				</>
			) : (
				<>
					<MaterialIcons name="folder" size={70} color={colors.primary} />
					<View>
						<Text style={defaultStyles.text}>{languageSpecificTitle(isTelugu, item)}</Text>
						<Text style={styles.mutedText}>Chapters: {count}</Text>
					</View>
				</>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: screenPadding.horizontal,
	},
	mainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
		gap: 10,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 10,
	},
	mutedText: {
		color: colors.textMuted,
		fontSize: fontSize.sm,
	},
})

export default FolderItem
