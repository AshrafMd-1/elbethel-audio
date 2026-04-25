import { FlatList, StyleSheet, View } from 'react-native'
import library from '@/assets/data/library.json'
import { useEffect, useRef, useState } from 'react'
import FolderItem from '@/components/libraryScreen/FolderItem'
import SongItem from '@/components/libraryScreen/SongItem'
import { useFloatingBar } from '@/context/FloatingBarContext'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import TrackPlayer, { AddTrack, Track } from 'react-native-track-player'
import { useLastPlayedStore } from '@/store/useLastPlayedStore'
import { unknownTrackImageUri } from '@/constants/images'

type FolderGenerationProps = {
	mainFolder?: string
	chapterFolder?: string
}

const FolderGeneration = ({ mainFolder, chapterFolder }: FolderGenerationProps) => {
	const { isFloatingBarPresent, setIsFloatingBarPresent } = useFloatingBar()
	const [listOfFolders, setListOfFolders] = useState<string[]>([])
	const bottom = useBottomTabBarHeight()
	const [songChapter, setSongChapter] = useState<string>('')
	const queueOffset = useRef(0)
	const { updateLastPlayed } = useLastPlayedStore()

	const handleNewSong = async (currentSong: Track, beforeKeys: string[], afterKeys: string[]) => {
		updateLastPlayed({
			currentSong,
			beforeTrackKeys: beforeKeys,
			afterTrackKeys: afterKeys,
			folderName: mainFolder || 'Some Folder',
			chapterName: chapterFolder || 'Some Chapter',
		})
	}

	const playSong = async (selectedTrack: Track) => {
		const trackIndex = listOfFolders.findIndex((item) => item === selectedTrack.title)
		if (trackIndex === -1) {
			console.warn(`Track ${selectedTrack.title} not found in listOfFolders`)
			return
		}
		let isChangingQueue = false
		if (chapterFolder === '') {
			setSongChapter(chapterFolder)
			isChangingQueue = true
		} else if (chapterFolder && songChapter !== chapterFolder) {
			setSongChapter(chapterFolder)
			isChangingQueue = true
		}

		const convertToTrack = (songId: string): AddTrack | null => {
			if (!mainFolder || !chapterFolder) return null

			const songData = (library as Record<string, any>)[mainFolder]?.children?.[chapterFolder]
				?.children?.[songId]

			if (!songData || !songData.id) {
				console.warn(`Track with ID ${songId} is missing or invalid.`)
				return null
			}
			return {
				id: songData.id,
				url: `https://arorium.serv00.net/fetch/${songData.id}`,
				title: songId,
				artist: chapterFolder,
				album: mainFolder,
				artwork: unknownTrackImageUri,
			} as AddTrack
		}

		if (isChangingQueue) {
			const beforeTrackKeys = listOfFolders.slice(0, trackIndex)
			const afterTrackKeys = listOfFolders.slice(trackIndex + 1)

			await handleNewSong(selectedTrack, beforeTrackKeys, afterTrackKeys)
			const beforeTracks = beforeTrackKeys
				.map(convertToTrack)
				.filter((track): track is AddTrack => track !== null)

			const afterTracks = afterTrackKeys
				.map(convertToTrack)
				.filter((track): track is AddTrack => track !== null)

			if (!selectedTrack) {
				console.warn('Selected track is null or undefined.')
				return
			}

			try {
				await TrackPlayer.reset()
				await TrackPlayer.add(selectedTrack)
				await TrackPlayer.add(afterTracks)
				await TrackPlayer.add(beforeTracks)
				await TrackPlayer.play()
			} catch (error) {
				console.error('Error playing track:', error)
				return
			}

			queueOffset.current = trackIndex
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? listOfFolders.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			const queueLength = (await TrackPlayer.getQueue()).length

			if (nextTrackIndex >= 0 && nextTrackIndex < queueLength) {
				try {
					await TrackPlayer.skip(nextTrackIndex)
					await TrackPlayer.play()
				} catch (error) {
					console.error('Error skipping track:', error)
					return
				}
			} else {
				console.warn(`Invalid track index: ${nextTrackIndex}, queue length: ${queueLength}`)
			}
		}

		if (!isFloatingBarPresent) {
			setIsFloatingBarPresent(true)
		}
	}

	useEffect(() => {
		if (!library) {
			setListOfFolders([])
			return
		}

		if (mainFolder) {
			const mainFolderData = (library as Record<string, any>)[mainFolder]?.children
			if (chapterFolder) {
				const chapterFolderData = mainFolderData?.[chapterFolder]?.children
				setListOfFolders(chapterFolderData ? Object.keys(chapterFolderData) : [])
			} else {
				setListOfFolders(mainFolderData ? Object.keys(mainFolderData) : [])
			}
		} else {
			setListOfFolders(Object.keys(library))
		}
	}, [mainFolder, chapterFolder])

	return (
		<FlatList
			data={listOfFolders}
			ItemSeparatorComponent={mainFolder && chapterFolder ? () => <View /> : undefined}
			style={mainFolder && chapterFolder ? styles.listWithMargin : undefined}
			keyExtractor={(item) => item}
			initialNumToRender={12}
			ListFooterComponent={
				<View style={{ paddingBottom: isFloatingBarPresent ? bottom + 60 : bottom }} />
			}
			scrollEnabled={!(mainFolder && chapterFolder)}
			renderItem={({ item, index }) =>
				chapterFolder && mainFolder ? (
					<SongItem
						songName={item}
						songData={
							(library as Record<string, any>)[mainFolder]?.children?.[chapterFolder]?.children?.[
								item
							]
						}
						onPlay={playSong}
						folderName={mainFolder}
						chapterName={chapterFolder}
					/>
				) : (
					<FolderItem
						item={item}
						index={index}
						count={
							mainFolder
								? Object.keys(
										(library as Record<string, any>)[mainFolder]?.children?.[item]?.children ?? {},
									).length
								: Object.keys((library as Record<string, any>)[item]?.children ?? {}).length
						}
						params={{ mainFolder, chapterFolder }}
					/>
				)
			}
		/>
	)
}
const styles = StyleSheet.create({
	listWithMargin: {
		marginTop: 10,
	},
})

export default FolderGeneration
