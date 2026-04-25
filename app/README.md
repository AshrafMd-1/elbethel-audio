# Elbethel Audio - Mobile App

A React Native mobile app for streaming and browsing audio content, organized by category and album.

---

## Features

- **Full Audio Library** - Stream the complete audio collection, organized by Category → Album → Track
- **Music-style Player** - Play/Pause, Skip, progress scrubbing, volume control, and repeat toggle
- **Curated Albums** - Thematic albums with quotes covering topics like focus, motivation, and more
- **Daily Quote** - An inspirational quote displayed on the Home screen
- **Resume Playback** - Automatically picks up where you left off
- **Floating Mini Player** - Persistent playback bar across all screens
- **Background Audio** - Continues playing with the screen off or the app minimized
- **Dark Theme** - Clean dark UI designed for comfortable reading and listening

---

## Screens

| Screen | Description |
|---|---|
| **Home** | Daily quote, resume last session, quick-jump to albums |
| **Library** | Browse audio content by Category → Album → Track |
| **Player** | Full-screen player with artwork, track info, and controls |
| **Settings** | App preferences and version info |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) ~52 |
| Language | TypeScript 5.7 |
| Navigation | [Expo Router](https://expo.github.io/router/) v4 (file-based) |
| Audio Engine | [react-native-track-player](https://rntp.dev/) v4 |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) v5 |
| Animations | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) v3 |
| Persistence | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |
| Images | [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) |
| UI | expo-linear-gradient, react-native-gesture-handler, react-native-awesome-slider |

---

## Project Structure

```
src/
├── app/
│   ├── (tabs)/
│   │   ├── (home)/              # Home screen
│   │   ├── library/             # Audio library browser
│   │   ├── individualScreens/   # Category, Album, Track drill-down
│   │   └── setting/             # Settings & About
│   └── Player.tsx               # Full-screen player
├── components/
│   ├── homeScreen/              # Quote, resume, album shortcuts
│   ├── libraryScreen/           # Folder & track list
│   └── playerScreen/            # Controls, progress bar, volume, repeat
├── context/                     # App-wide state (language, floating bar)
├── constants/                   # Colors, tokens, playback service
├── styles/                      # Shared styles
└── types/                       # TypeScript types
assets/
├── data/
│   ├── library.json             # Full audio track index
│   ├── album.json               # Album metadata
│   └── quote.json               # Daily quotes
└── images/
    ├── logo/
    └── albums/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- Android Studio or a physical Android device

### Install

```bash
git clone https://github.com/AshrafMd-1/elbethel-audio.git
cd elbethel-audio/app
yarn install
```

### Run

```bash
# Start Expo dev server
yarn start

# Run on Android
yarn android
```

### Build (EAS)

```bash
npm install -g eas-cli
eas build --platform android
```

---

## Android Permissions

| Permission | Purpose |
|---|---|
| `INTERNET` | Stream audio from remote server |
| `FOREGROUND_SERVICE` | Background audio playback |
| `WAKE_LOCK` | Keep audio playing with screen off |
| `READ/WRITE_EXTERNAL_STORAGE` | Local media access |

---

## Audio Source

The full track index is bundled locally in [`assets/data/library.json`](assets/data/library.json) — no network call is needed to browse the library. Audio tracks are streamed on demand from cloud storage via the backend proxy.
