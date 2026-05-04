# Elbethel Audio — Project Context

## What This Is

A Bible audio streaming app for Elbethel Revival Centre. Users browse a hierarchical audio library (Category → Album → Track), tap a track, and stream it. Bilingual (English + Telugu). Built for a friend.

Two parts: a React Native mobile app and a Node.js backend proxy that streams audio from Google Drive.

## Why a Proxy?

Google Drive files require authentication to download. The app users aren't logged into Google. A service account (robot Google account) has read access to the Drive folder, but the service account key can't be put in the app (it would be exposed). So the backend authenticates server-side and pipes the audio bytes to the app. Users never touch Google credentials.

## Tech Stack

### Backend
- **Runtime**: Node.js, CommonJS
- **Framework**: Express 4
- **Google API**: `googleapis` v144 with service account auth
- **Streaming**: `range-parser` for HTTP 206 partial content
- **Monitoring**: `diskusage` + `os` for health endpoint
- **Hosting**: serv00 at `https://arorium.serv00.net`

### Mobile App
- **Framework**: React Native 0.76 + Expo 52
- **Language**: TypeScript 5.7
- **Routing**: Expo Router v4 (file-based)
- **Audio**: react-native-track-player v4 (native playback, background audio, lock screen controls)
- **State**: Zustand v5 (last played track only)
- **Persistence**: AsyncStorage (resume playback)
- **UI**: expo-linear-gradient, react-native-reanimated v3, expo-image

## Commands

### Backend
```bash
cd backend
npm start        # node app.js
npm run dev      # nodemon app.js
```

### App
```bash
cd app
npm start        # expo start
npm run android  # expo run:android
```

## Backend Architecture

### Entry Point: `backend/app.js`
Express server on configurable PORT. Two route groups, no middleware complexity.

### Routes
- `GET /` — "Hello World" (basic health)
- `GET /status` — System metrics (memory, disk, CPU, uptime, Asia/Kolkata time)
- `GET /fetch/:fileId` — Audio streaming endpoint

### Audio Streaming Flow (`backend/controllers/fetchController.js`)
1. Receive Google Drive file ID from app
2. Query Drive API for file metadata (size, MIME type)
3. Parse `Range` header if present (for seeking)
4. Fetch file from Drive as stream with range headers passed through
5. Pipe response directly to client — never touches disk or memory buffer
6. Returns 206 Partial Content for range requests, 200 for full file

### Google Auth (`backend/services/googleApiAuthService.js`)
- Service account with `drive.readonly` scope
- Key file at `config/service-account.json` (gitignored, never committed)
- `googleapis` library handles token generation and refresh automatically — no manual auth code

### Config
- `config/service-account.json` — Google service account key (gitignored)
- `.env` — PORT only
- `.gitignore` covers: node_modules, .idea, config/, .env

## App Architecture

### Data — All Bundled Locally
- `app/assets/data/library.json` — Full track index as nested tree (Category → Chapter → Track). Each track has a Google Drive file ID, MIME type, size. Browsing works offline.
- `app/assets/data/album.json` — Album metadata with bilingual titles (en/te) and Bible verses
- `app/assets/data/quote.json` — Daily inspirational quotes (bilingual)

### Navigation (Expo Router file-based)
```
Stack
├── (tabs)
│   ├── (home)/index.tsx         — Home (quotes, resume, album shortcuts)
│   ├── library/index.tsx        — Library browser
│   ├── setting/index.tsx        — Settings (language toggle, about)
│   └── individualScreens/
│       ├── MainFolder.tsx       — Category drill-down
│       ├── ChapterFolder.tsx    — Chapter track list
│       └── AlbumsFolder.tsx     — Album view
└── Player.tsx                   — Full-screen player (modal, slides up)
```

### Key Components
- `FloatingPlayer.tsx` — Mini player bar above tabs, shows during playback
- `FloatingBarContext.tsx` — Controls floating player visibility
- `LanguageContext.tsx` — Global English/Telugu toggle
- `useLastPlayedStore.ts` — Zustand store, saves to AsyncStorage for resume
- `useSetupTrackPlayer.tsx` — Initializes track player (10MB cache, 0.3 volume)
- `playbackService.ts` — Background playback events (play, pause, skip, seek)

### Audio URL Pattern
App constructs stream URLs as: `https://arorium.serv00.net/fetch/{fileId}`
File IDs come from `library.json` bundled in the app.

### Adding New Content
Upload audio to Google Drive → get file ID → add to `library.json` → ship app update. No backend changes needed.

## Key Design Decisions

- **Bundled JSON over API**: Library data changes rarely, so bundling it means instant offline browsing with zero API calls. Tradeoff: new content requires an app update.
- **Stateless backend**: No database, no sessions, no state. Every request is independent. Simple to deploy and scale.
- **Service account over user OAuth**: Users don't need Google accounts. The app is fully anonymous, no login required.
- **Proxy over direct links**: Drive URLs require auth and expire. The proxy provides stable, auth-free URLs for the app.
- **No caching**: Audio streams through the backend without disk/memory caching. Keeps the server lightweight on serv00's free tier.

## No Authentication

There is no user auth anywhere in this app. The app is public, the backend is stateless, and the service account handles all Google communication server-side.
