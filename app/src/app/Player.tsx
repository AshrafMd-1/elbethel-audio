import { MovingText } from '@/components/MovingText'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { PlayerControls } from '@/components/playerScreen/PlayerControls'
import { defaultStyles, utilsStyles } from '@/styles'
import { Feather } from '@expo/vector-icons'
import { PlayerProgressBar } from '@/components/playerScreen/PlayerProgressBar'
import { PlayerRepeatToggle } from '@/components/playerScreen/PlayerRepeatToggle'
import { PlayerVolumeBar } from '@/components/playerScreen/PlayerVolumeBar'
import { LinearGradient } from 'expo-linear-gradient'
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { languageSpecificTitle, songSpecificTitle } from '@/misc/util'
import { useLanguage } from '@/context/LanguageContext'
import React, { memo, useEffect } from 'react'

const Player = () => {
	const activeTrack = useActiveTrack()
	const { isTelugu } = useLanguage()
	const router = useRouter()
	const { top, bottom } = useSafeAreaInsets()

	useEffect(() => {
		const handleBackPress = () => {
			router.back()
			return true
		}

		BackHandler.addEventListener('hardwareBackPress', handleBackPress)

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
		}
	}, [router])

	if (!activeTrack)
		return (
			<LinearGradient
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: colors.background,
				}}
				colors={['#343434', '#4d4d4d']}
			/>
		)

	return (
		<LinearGradient style={styles.gradient} colors={['#343434', '#4d4d4d']}>
			<View style={styles.overlayContainer}>
				<DismissPlayerSymbol router={router} />

				<View style={[styles.contentContainer, { marginTop: top + 70, marginBottom: bottom }]}>
					<View style={styles.artworkImageContainer}>
						<Image
							source={{ uri: activeTrack.artwork ?? unknownTrackImageUri }}
							contentFit={'cover'}
							placeholder={unknownTrackImageUri}
							style={styles.artworkImage}
						/>
					</View>

					<View style={styles.trackInfoContainer}>
						<View>
							<View style={styles.trackTitleContainer}>
								<MovingText
									text={songSpecificTitle(isTelugu, activeTrack.title ?? '')}
									animationThreshold={30}
									style={styles.trackTitleText}
								/>
							</View>
							{activeTrack.artist && (
								<Text numberOfLines={1} style={styles.trackArtistText}>
									{languageSpecificTitle(isTelugu, activeTrack.artist)}
								</Text>
							)}
						</View>

						<PlayerProgressBar style={styles.progressBar} />
						<PlayerControls style={styles.playerControls} />
						<PlayerVolumeBar style={styles.volumeBar} />
						<View style={utilsStyles.centeredRow}>
							<PlayerRepeatToggle size={30} style={styles.repeatToggle} />
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const DismissPlayerSymbol = memo(({ router }: { router: ReturnType<typeof useRouter> }) => {
	const { top } = useSafeAreaInsets()
	return (
		<Pressable onPress={() => router.back()} style={[styles.dismissButton, { top }]}>
			<Feather name="chevron-down" size={40} color={colors.text} />
		</Pressable>
	)
})

const styles = StyleSheet.create({
	gradient: {
		flex: 1,
	},
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0)',
	},
	centerContainer: {
		justifyContent: 'center',
	},
	contentContainer: {
		flex: 1,
	},
	artworkImageContainer: {
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.44,
		shadowRadius: 11,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		borderRadius: 12,
	},
	trackInfoContainer: {
		flex: 1,
	},
	trackTitleContainer: {
		marginTop: 20,
	},

	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
		marginTop: 6,
	},
	progressBar: {
		marginTop: 32,
	},
	playerControls: {
		marginTop: 40,
	},
	volumeBar: {
		marginTop: 'auto',
		marginBottom: 30,
	},
	repeatToggle: {
		marginBottom: 6,
	},
	dismissButton: {
		position: 'absolute',
		padding: 20,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
})

export default Player
