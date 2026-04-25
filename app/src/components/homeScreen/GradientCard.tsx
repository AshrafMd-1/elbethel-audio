import React, { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { LastPlayedSongPayload } from '@/types'
import { languageSpecificTitle } from '@/misc/util'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'expo-router'

type Props = {
	lastPlayedSong: LastPlayedSongPayload
}

const GradientCard = ({ lastPlayedSong }: Props) => {
	const { isTelugu } = useLanguage()
	const router = useRouter()

	const handlePress = () => {
		router.push({
			pathname: '/individualScreens/ChapterFolder',
			params: {
				mainFolder: lastPlayedSong.folderName,
				chapterFolder: lastPlayedSong.chapterName,
			},
		})
	}

	return (
		<LinearGradient
			colors={['#86efac', '#3b82f6', '#9333ea']}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
			style={styles.gradientContainer}
		>
			<Pressable onPress={handlePress} style={styles.cardContent}>
				<Image source={{ uri: unknownTrackImageUri }} style={styles.image} />
				<View style={styles.textContainer}>
					<Text style={styles.titleText}>
						{languageSpecificTitle(isTelugu, lastPlayedSong.chapterName ?? '')}
					</Text>
					<View style={styles.tagsContainer}>
						<Text style={styles.tag}>
							{languageSpecificTitle(isTelugu, lastPlayedSong.folderName ?? '')}
						</Text>
					</View>
				</View>
			</Pressable>
		</LinearGradient>
	)
}

export default memo(GradientCard)

const styles = StyleSheet.create({
	gradientContainer: {
		borderRadius: 12,
		padding: 2,
		marginTop: 10,
	},

	cardContent: {
		backgroundColor: '#fff',
		borderRadius: 10,
		overflow: 'hidden',
		flexDirection: 'row',
	},

	image: {
		width: '30%',
		height: '100%',
	},

	textContainer: {
		backgroundColor: colors.backgroundMuted,
		width: '100%',
		padding: 10,
	},

	titleText: {
		fontSize: fontSize.sm,
		fontWeight: 'bold',
		color: colors.text,
		letterSpacing: 1,
	},

	tagsContainer: {
		flexDirection: 'row',
		marginTop: 5,
	},

	tag: {
		color: colors.textMuted,
		fontWeight: 'bold',
		fontSize: fontSize.xs,
	},
})
