import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { languageSpecificTitle } from '@/misc/util'
import { useLanguage } from '@/context/LanguageContext'
import { LinearGradient } from 'expo-linear-gradient'

interface FolderHeaderProps {
	folderName: string
}

const FolderHeader = (props: FolderHeaderProps) => {
	const { top } = useSafeAreaInsets()
	const router = useRouter()
	const { isTelugu } = useLanguage()

	return (
		<View>
			<View style={{ ...st.folderContainer, paddingTop: top + 10 }}>
				<Pressable onPress={() => router.push('/')}>
					<AntDesign name="arrowleft" size={30} color="white" />
				</Pressable>
				<Text style={st.folderText}>{languageSpecificTitle(isTelugu, props.folderName)}</Text>
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

const st = StyleSheet.create({
	folderContainer: {
		backgroundColor: colors.background,
		flexDirection: 'row',
		paddingHorizontal: screenPadding.horizontal,
		gap: 20,
		paddingVertical: 10,
		borderBottomWidth: 0.5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.4,
		shadowRadius: 10,
		elevation: 10,
	},
	borderContainer: {
		height: 3,
		backgroundColor: colors.background,
		width: '100%',
		overflow: 'hidden',
	},
	gradientBorder: {
		height: '100%',
		width: '100%',
	},
	folderText: {
		color: colors.text,
		fontSize: fontSize.lg,
		fontWeight: 'bold',
	},
})

export default FolderHeader
