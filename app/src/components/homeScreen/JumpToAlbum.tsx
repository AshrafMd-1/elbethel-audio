import { Text, View } from 'react-native'
import { colors, fontSize } from '@/constants/tokens'
import HorizontalGroupOfAlbums from '@/components/homeScreen/HorizontalGroupOfAlbums'
import { useFloatingBar } from '@/context/FloatingBarContext'

const JumpToAlbum = () => {
	const { isFloatingBarPresent } = useFloatingBar()
	return (
		<View style={{ marginBottom: isFloatingBarPresent ? 40 : 20 }}>
			<Text
				style={{
					fontSize: fontSize.lg,
					color: colors.text,
					fontWeight: 'bold',
				}}
			>
				Jump to Album
			</Text>
			<HorizontalGroupOfAlbums />
		</View>
	)
}

export default JumpToAlbum
