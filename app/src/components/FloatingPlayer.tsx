import { PlayPauseButton, SkipToNextButton } from '@/components/playerScreen/PlayerControls'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, View, ViewProps } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import { useLastActiveTrack } from '@/hook/useLastActiveTrack'
import { Image } from 'expo-image'
import { MovingText } from '@/components/MovingText'
import { songSpecificTitle } from '@/misc/util'
import { useLanguage } from '@/context/LanguageContext'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()

	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const { isTelugu } = useLanguage()

	const displayedTrack = activeTrack ?? lastActiveTrack

	const handlePress = () => {
		router.push('/Player')
	}

	if (!displayedTrack) return null

	return (
		<Pressable onPress={handlePress} style={[styles.container, style]}>
			<>
				<Image
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
				/>

				<View style={styles.trackTitleContainer}>
					<View style={{ flexDirection: 'row' }}>
						<MovingText
							style={styles.trackTitle}
							text={songSpecificTitle(
								isTelugu,
								displayedTrack.title ?? '',
								displayedTrack.artist ?? '',
							)}
							animationThreshold={25}
						/>
					</View>
				</View>

				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
