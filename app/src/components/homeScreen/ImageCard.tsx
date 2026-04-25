import { Pressable, StyleSheet, Text } from 'react-native'
import { Image } from 'expo-image'
import { colors, fontSize } from '@/constants/tokens'
import { useRouter } from 'expo-router'
import { useLanguage } from '@/context/LanguageContext'
import {
	albumImage1Uri,
	albumImage2Uri,
	albumImage3Uri,
	albumImage4Uri,
	albumImage5Uri,
	albumImage6Uri,
	albumImage7Uri,
	albumImage8Uri,
} from '@/constants/images'

export const albumMap: Record<number, any> = {
	1: albumImage1Uri,
	2: albumImage2Uri,
	3: albumImage3Uri,
	4: albumImage4Uri,
	5: albumImage5Uri,
	6: albumImage6Uri,
	7: albumImage7Uri,
	8: albumImage8Uri,
}

interface ImageDataProps {
	id: string
	en: string
	te: string
	itemWidth: number
}

const ImageCard = ({ id, en, te, itemWidth }: ImageDataProps) => {
	const router = useRouter()
	const { isTelugu } = useLanguage()

	return (
		<Pressable
			onPress={() => {
				router.push({
					pathname: '/individualScreens/AlbumsFolder',
					params: { albumId: id },
				})
			}}
			style={[st.container, { width: itemWidth - 10 }]}
		>
			<Image source={albumMap[Number(id)]} style={[st.albumImage, { width: itemWidth - 10 }]} />
			<Text style={st.titleText}>{isTelugu ? te : en}</Text>
		</Pressable>
	)
}

const st = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	albumImage: {
		height: 180,
		borderRadius: 12,
		resizeMode: 'cover',
		borderWidth: 0.5,
		borderColor: colors.textMuted,
	},
	titleText: {
		fontSize: fontSize.sm,
		marginTop: 5,
		color: colors.text,
		textAlign: 'center',
	},
})

export default ImageCard
