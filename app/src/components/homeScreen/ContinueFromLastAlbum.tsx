import { memo, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSize } from '@/constants/tokens'
import GradientCard from '@/components/homeScreen/GradientCard'
import { useLastPlayedStore } from '@/store/useLastPlayedStore'

const ContinueFromLastAlbum = () => {
	const lastPlayed = useLastPlayedStore((state) => state.lastPlayed)
	const loadLastPlayed = useLastPlayedStore((state) => state.loadLastPlayed)

	useEffect(() => {
		loadLastPlayed().then((r) => r)
	}, [loadLastPlayed])

	if (!lastPlayed) return null

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Continue Album</Text>
			<GradientCard lastPlayedSong={lastPlayed} />
		</View>
	)
}

export default memo(ContinueFromLastAlbum)

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		marginTop: 20,
	},
	title: {
		fontSize: fontSize.lg,
		color: colors.text,
		fontWeight: 'bold',
	},
})
