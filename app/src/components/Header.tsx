import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

import { logoTransparentUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'

const Header = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View>
			<View style={[st.container, { paddingTop: top + 10 }]}>
				<Image source={logoTransparentUri} style={st.image} />
				<Text style={st.text}>Elbethel Revival Centre</Text>
			</View>

			<View style={st.borderContainer}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.0)']}
					style={st.gradientBorder}
				/>
			</View>
		</View>
	)
}

export default memo(Header)

const st = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.background,
		paddingBottom: 10,
		gap: 20,
		display: 'flex',
		paddingHorizontal: screenPadding.horizontal,
		flexDirection: 'row',
		borderBottomWidth: 0,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.4,
		shadowRadius: 10,
		elevation: 10,
	},
	text: {
		fontSize: fontSize.lg,
		fontWeight: 'bold',
		color: colors.text,
		letterSpacing: 1,
	},
	image: {
		width: 40,
		height: 40,
	},
	borderContainer: {
		height: 6,
		backgroundColor: colors.background,
		width: '100%',
		overflow: 'hidden',
	},
	gradientBorder: {
		height: '100%',
		width: '100%',
	},
})
