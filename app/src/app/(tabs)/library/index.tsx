import { BackHandler, Text, View } from 'react-native'
import { defaultStyles } from '@/styles'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import FolderGeneration from '@/components/libraryScreen/FolderGeneration'
import { useFloatingBar } from '@/context/FloatingBarContext'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Header from '@/components/Header'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

const LibraryScreen = () => {
	const { isFloatingBarPresent } = useFloatingBar()
	const bottom = useBottomTabBarHeight()
	const router = useRouter()

	useEffect(() => {
		const handleBackPress = () => {
			router.push('/(tabs)/(home)')
			return true
		}

		BackHandler.addEventListener('hardwareBackPress', handleBackPress)

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
		}
	}, [router])

	return (
		<>
			<Header />
			<View
				style={{
					...defaultStyles.container,
					paddingHorizontal: screenPadding.horizontal,
					paddingBottom: isFloatingBarPresent ? bottom + 40 : bottom,
				}}
			>
				<Text
					style={{
						color: colors.text,
						fontSize: fontSize.lg,
						fontWeight: 'bold',
					}}
				>
					Library
				</Text>
				<FolderGeneration />
			</View>
		</>
	)
}

export default LibraryScreen
