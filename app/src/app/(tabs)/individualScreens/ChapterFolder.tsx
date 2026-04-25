import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from '@/styles'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import FolderGeneration from '@/components/libraryScreen/FolderGeneration'
import { languageSpecificTitle } from '@/misc/util'
import { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useLanguage } from '@/context/LanguageContext'
import { LinearGradient } from 'expo-linear-gradient'

const ChapterFolder = () => {
	const { top } = useSafeAreaInsets()
	const router = useRouter()
	const { mainFolder, chapterFolder = '' } = useLocalSearchParams() as {
		mainFolder: string
		chapterFolder: string
	}
	const { isTelugu } = useLanguage()

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				router.replace({ pathname: '/individualScreens/MainFolder', params: { mainFolder } })
				return true
			}
			const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
			return () => subscription.remove()
		}, [router, mainFolder]),
	)

	return (
		<View style={defaultStyles.container}>
			<View style={[styles.header, { paddingTop: top + 10 }]}>
				<Pressable
					onPress={() =>
						router.replace({ pathname: '/individualScreens/MainFolder', params: { mainFolder } })
					}
				>
					<Ionicons name="chevron-back-sharp" size={24} color={colors.text} />
				</Pressable>
				<Text style={styles.headerText}>{languageSpecificTitle(isTelugu, chapterFolder)}</Text>
			</View>

			<View style={styles.borderContainer}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.0)']}
					style={styles.gradientBorder}
				/>
			</View>
			<ScrollView style={{ flex: 1 }}>
				<FolderGeneration mainFolder={mainFolder} chapterFolder={chapterFolder} />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingVertical: 15,
		paddingHorizontal: screenPadding.horizontal,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		backgroundColor: colors.background,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.4,
		shadowRadius: 10,
		elevation: 10,
	},
	headerText: {
		fontSize: fontSize.lg,
		color: colors.text,
		fontWeight: 'bold',
	},
	borderContainer: {
		height: 7,
		backgroundColor: colors.background,
		width: '100%',
		overflow: 'hidden',
	},
	gradientBorder: {
		height: '100%',
		width: '100%',
	},
})

export default ChapterFolder
