import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import LoaderKit from 'react-native-loader-kit'

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<SkipToPreviousButton />

				<PlayPauseButton />

				<SkipToNextButton />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonProps) => {
	const { playing, bufferingDuringPlay } = useIsPlaying()

	return (
		<Pressable
			style={[
				{ height: iconSize },
				style,
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					paddingHorizontal: iconSize / 2,
				},
			]}
			onPress={async () => {
				if (bufferingDuringPlay === undefined || bufferingDuringPlay) {
					return
				}
				if (playing) {
					await TrackPlayer.pause()
				} else {
					await TrackPlayer.play()
				}
			}}
		>
			{bufferingDuringPlay === undefined || bufferingDuringPlay ? (
				<LoaderKit
					name="BallBeat"
					color={colors.text}
					style={{
						width: iconSize,
						height: iconSize,
					}}
				/>
			) : (
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			)}
		</Pressable>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<Pressable onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</Pressable>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<Pressable onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name={'backward'} size={iconSize} color={colors.text} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
