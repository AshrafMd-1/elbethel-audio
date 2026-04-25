# Audio Streaming Backend

A lightweight Node.js/Express proxy server that streams audio files from Google Drive for the [Audio Player App](../app/README.md). It authenticates via a Google service account and supports HTTP range requests for seamless audio seeking and playback.

---

## Features

- **Google Drive audio streaming** - proxies audio files directly from Drive using a service account
- **HTTP Range request support** - returns `206 Partial Content` so clients can seek/scrub audio without re-downloading
- **Health & status endpoint** - exposes server uptime, memory usage, disk space, CPU load, and admin time
- **Environment-based config** - all secrets and ports loaded via `.env`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Framework | Express 4 |
| Google API | googleapis (Drive v3, service account auth) |
| HTTP streaming | axios, range-parser |
| System metrics | diskusage, os (built-in) |
| Dev tooling | nodemon, dotenv |

---

## Project Structure

```
backend/
├── app.js                        # Entry point - Express server setup
├── routes/
│   ├── fetchRoutes.js            # GET /fetch/:fileId
│   └── statusRoutes.js           # GET / and GET /status
├── controllers/
│   ├── fetchController.js        # Streams audio from Google Drive
│   └── statusController.js       # Returns server health metrics
├── services/
│   └── googleApiAuthService.js   # Google Auth via service account
├── store/
│   └── tokenStore.js             # Tracks server start time
└── config/
    └── service-account.json      # (gitignored) Google service account key
```

---

## API Endpoints

### `GET /`
Returns a plain `Hello World!` response. Used as a liveness check.

### `GET /status`
Returns a JSON object with server health information.

**Response example:**
```json
{
  "serverTime": { "date": "4/14/2026", "time": "10:00:00 AM", "timezone": "Asia/Kolkata" },
  "adminTime":  { "date": "14/4/2026", "time": "10:00:00 AM", "timezone": "Asia/Kolkata" },
  "status": "Server is running",
  "systemInfo": {
    "platform": "linux",
    "architecture": "x64",
    "freeMemory": "512 MB",
    "totalMemory": "1024 MB",
    "cpuCount": 2,
    "serverUptime": "120 minutes",
    "applicationUptime": "45 minutes",
    "processMemoryUsage": { "usedMemory": "60 MB", "heapTotal": "40 MB", "heapUsed": "30 MB" },
    "disk": { "totalSpace": "50 GB" },
    "loadAverages": { "1min": 0.1, "5min": 0.05, "15min": 0.02 }
  }
}
```

### `GET /fetch/:fileId`
Streams an audio file from Google Drive by its file ID.

Supports the `Range` header — the server responds with `206 Partial Content` and the appropriate `Content-Range`, enabling audio seeking from clients.

**Example:**
```
GET /fetch/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs
Range: bytes=0-1048575
```

---

## Setup

### Prerequisites
- Node.js 18+
- A Google Cloud project with the Drive API enabled
- A service account with read access to the target Drive files/folder

### 1. Clone and install

```bash
git clone https://github.com/your-username/audio-book.git
cd audio-book/backend
npm install
```

### 2. Add the service account key

Place your Google service account JSON key at:

```
config/service-account.json
```

This path is gitignored. Never commit it.

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
```

### 4. Run the server

```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

The server starts at `http://localhost:3000` by default.

---

## Related

- [Audio Player App](../app/README.md) — the frontend mobile app that consumes this backend
