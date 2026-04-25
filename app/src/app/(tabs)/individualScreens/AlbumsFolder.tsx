import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { defaultStyles } from '@/styles'
import albums from '@/assets/data/album.json'
import { useMemo } from 'react'
import { Image } from 'expo-image'
import { albumMap } from '@/components/homeScreen/ImageCard'
import { useLanguage } from '@/context/LanguageContext'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFloatingBar } from '@/context/FloatingBarContext'
import { Ionicons } from '@expo/vector-icons'

const AlbumsFolder = () => {
	const { albumId } = useLocalSearchParams()
	const router = useRouter()
	const { isTelugu } = useLanguage()
	const bottom = useBottomTabBarHeight()
	const { isFloatingBarPresent } = useFloatingBar()

	const albumData = useMemo(() => {
		if (!albums.albums) return null
		return albums.albums[albumId as keyof typeof albums.albums] || null
	}, [albumId])

	return (
		<FlatList
			data={albumData?.verses}
			style={[defaultStyles.container]}
			keyExtractor={(item, index) => index.toString()}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: isFloatingBarPresent ? bottom + 70 : bottom + 20 }}
			ListHeaderComponent={
				<>
					<View style={styles.headerWrapper}>
						<Pressable
							onPress={() => {
								router.replace({ pathname: '/' })
							}}
							style={styles.backButton}
						>
							<Ionicons name="arrow-back" size={24} color={colors.text} />
						</Pressable>
						<Image source={albumMap[Number(albumId)]} style={styles.image} />
					</View>
					<View style={styles.headerContainer}>
						<Text style={styles.albumTitle}>{isTelugu ? albumData?.te : albumData?.en}</Text>
					</View>
				</>
			}
			renderItem={({ item }) => (
				<View style={styles.container}>
					<Text style={styles.authorText}>{isTelugu ? item.te.ref : item.en.ref}</Text>
					<Text style={styles.quoteText}>{isTelugu ? item.te.text : item.en.text}</Text>
				</View>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	headerWrapper: {
		position: 'relative',
	},
	backButton: {
		position: 'absolute',
		top: 40,
		left: 20,
		zIndex: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 20,
		padding: 8,
	},
	image: {
		width: '100%',
		height: 300,
	},
	headerContainer: {
		padding: screenPadding.horizontal,
	},
	albumTitle: {
		fontSize: fontSize.xlg,
		color: colors.text,
		marginTop: 10,
	},
	container: {
		backgroundColor: colors.backgroundMuted,
		padding: 16,
		marginTop: 20,
		borderRadius: 10,
		marginHorizontal: screenPadding.horizontal,
	},
	quoteText: {
		color: colors.primary,
		fontSize: fontSize.base,
		marginTop: 10,
		letterSpacing: 0.5,
		lineHeight: 24,
	},
	authorText: {
		color: colors.text,
		fontSize: fontSize.lg,
		marginTop: 4,
	},
})

export default AlbumsFolder
