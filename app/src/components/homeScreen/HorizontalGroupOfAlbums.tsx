import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'
import albums from '@/assets/data/album.json'
import ImageCard from './ImageCard'
import { useMemo } from 'react'
import { screenPadding } from '@/constants/tokens'

const HorizontalGroupOfAlbums = () => {
	const { width } = useWindowDimensions()
	const allAlbumsArray = useMemo(
		() =>
			Object.entries(albums.albums).map(([id, album]) => ({
				id,
				...album,
			})),
		[],
	)

	const itemWidth = width / 2 - screenPadding.horizontal

	return (
		<View style={st.container}>
			<FlatList
				data={allAlbumsArray}
				renderItem={({ item }) => <ImageCard {...item} itemWidth={itemWidth} />}
				keyExtractor={(item) => item.id}
				numColumns={2}
				initialNumToRender={4}
				columnWrapperStyle={st.row}
				contentContainerStyle={st.flatListContainer}
				scrollEnabled={false}
			/>
		</View>
	)
}

const st = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	flatListContainer: {
		gap: 15,
	},
	row: {
		justifyContent: 'space-between',
	},
})

export default HorizontalGroupOfAlbums
