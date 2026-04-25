# Elbethel Audio

A full-stack audio streaming platform — a React Native mobile app paired with a Node.js proxy backend for streaming audio from Google Drive.

---

## Repository Structure

```
elbethel-audio/
├── app/        # React Native / Expo mobile app (TypeScript)
└── backend/    # Node.js / Express audio streaming proxy
```

- **[app/](app/README.md)** — Mobile app with audio library browser, music-style player, curated albums, daily quotes, background playback, and a floating mini player.
- **[backend/](backend/README.md)** — Lightweight proxy that authenticates with Google Drive via a service account and streams audio files with HTTP Range support for seamless seeking.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native + Expo ~52 |
| Language (app) | TypeScript 5.7 |
| Navigation | Expo Router v4 |
| Audio Engine | react-native-track-player v4 |
| State Management | Zustand v5 |
| Backend Runtime | Node.js (CommonJS) |
| Backend Framework | Express 4 |
| Audio Storage | Google Drive (via service account) |

---

## Quick Start

### Backend

```bash
cd backend
npm install
# Add config/service-account.json (see backend/README.md)
echo "PORT=3000" > .env
npm run dev
```

### App

```bash
cd app
yarn install
yarn start      # Expo dev server
yarn android    # Run on Android
```

---

## License

MIT License — see [LICENSE](LICENSE).
