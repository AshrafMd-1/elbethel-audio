import { BackHandler, ScrollView, View } from 'react-native'
import { defaultStyles } from '@/styles'
import ContinueFromLastAlbum from '@/components/homeScreen/ContinueFromLastAlbum'
import { screenPadding } from '@/constants/tokens'
import JumpToAlbum from '@/components/homeScreen/JumpToAlbum'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFloatingBar } from '@/context/FloatingBarContext'
import Quote from '@/components/homeScreen/Quote'
import Header from '@/components/Header'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

const HomeScreen = () => {
	const bottom = useBottomTabBarHeight()
	const { isFloatingBarPresent } = useFloatingBar()
	const router = useRouter()

	useEffect(() => {
		const handleBackPress = () => {
			if (router.canGoBack()) {
				router.back()
			} else {
				BackHandler.exitApp()
			}
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
			<ScrollView
				style={[
					defaultStyles.container,
					{
						paddingHorizontal: screenPadding.horizontal,
					},
				]}
			>
				<View style={{ paddingBottom: isFloatingBarPresent ? bottom + 40 : bottom }}>
					<Quote />
					<ContinueFromLastAlbum />
					<JumpToAlbum />
				</View>
			</ScrollView>
		</>
	)
}

export default HomeScreen
