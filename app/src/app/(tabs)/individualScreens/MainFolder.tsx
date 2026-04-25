import { BackHandler, StyleSheet, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import FolderGeneration from '@/components/libraryScreen/FolderGeneration'
import FolderHeader from '@/components/individualScreens/FolderHeader'
import { defaultStyles } from '@/styles'

const MainFolder = () => {
	const { mainFolder } = useLocalSearchParams<{ mainFolder: string }>()
	const router = useRouter()

	useEffect(() => {
		const onBackPress = () => {
			router.back()
			return true
		}

		const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

		return () => subscription.remove()
	}, [router])

	return (
		<View style={styles.container}>
			<FolderHeader folderName={mainFolder} />
			<FolderGeneration mainFolder={mainFolder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...defaultStyles.container,
	},
})

export default MainFolder
