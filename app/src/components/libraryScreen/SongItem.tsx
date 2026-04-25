import { Pressable, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from '@/styles'
import { colors, screenPadding } from '@/constants/tokens'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { calculateBytesToDuration, songSpecificTitle } from '@/misc/util'
import LoaderKit from 'react-native-loader-kit'
import { useLanguage } from '@/context/LanguageContext'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { unknownTrackImageUri } from '@/constants/images'

interface SongItemProps {
	songName: string
	songData: any
	folderName: string
	chapterName: string
	onPlay: (track: Track) => void
}

const SongItem = ({ songName, songData, folderName, chapterName, onPlay }: SongItemProps) => {
	const activeTrack = useActiveTrack()
	const isActiveTrack = activeTrack?.id === songData?.id
	const { isTelugu } = useLanguage()
	const { playing } = useIsPlaying()

	const loadSongData = async () => {
		if (!songData) {
			console.error('Track data not found!')
			return
		}
		if (isActiveTrack) {
			return
		}
		const track: Track = {
			id: songData.id,
			url: songData.url,
			title: songName,
			artist: chapterName,
			album: folderName,
			artwork: unknownTrackImageUri,
		}
		onPlay(track)
	}

	return (
		<Pressable style={styles.container} onPress={loadSongData}>
			<View style={styles.songInfo}>
				<MaterialCommunityIcons name="file-music" size={42} color={colors.primary} />
				<Text style={[defaultStyles.text, { color: isActiveTrack ? colors.primary : colors.text }]}>
					{songSpecificTitle(isTelugu, songName)}
				</Text>
			</View>
			<TrackRightDetails
				songSize={songData?.size}
				isPlaying={playing}
				isActiveTrack={isActiveTrack}
			/>
		</Pressable>
	)
}

const TrackRightDetails = ({
	songSize,
	isPlaying,
	isActiveTrack,
}: {
	songSize?: number
	isPlaying: boolean | undefined
	isActiveTrack: boolean
}) => (
	<View style={styles.trackDetails}>
		{isActiveTrack ? (
			isPlaying ? (
				<LoaderKit name="LineScaleParty" color={colors.primary} style={styles.loader} />
			) : (
				<Ionicons name="play" size={30} color={colors.primary} />
			)
		) : (
			<Text style={defaultStyles.text}>
				{songSize ? `${calculateBytesToDuration(songSize, 64)}` : '...'}
			</Text>
		)}
	</View>
)

const styles = StyleSheet.create({
	container: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 15,
	},
	songInfo: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	trackDetails: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	loader: {
		width: 30,
		height: 30,
	},
})

export default SongItem
