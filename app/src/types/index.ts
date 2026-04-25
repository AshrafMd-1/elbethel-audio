import { Track } from 'react-native-track-player'

type LastPlayedSongPayload = {
	currentSong: Track | null
	beforeTrackKeys: string[]
	afterTrackKeys: string[]
	folderName: string | null
	chapterName: string | null
}

export interface Verse {
	en: { ref: string; text: string }
	te: { ref: string; text: string }
}

export interface Album {
	en: string
	te: string
	verses: Verse[]
}

export interface AlbumsData {
	[key: string]: Album
}

export type { LastPlayedSongPayload }
