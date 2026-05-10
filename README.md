# Melo 🎵

A Spotify-inspired music player built with Next.js and Supabase. Upload your own songs and stream them from anywhere with a clean, minimal UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Storage-3ECF8E?style=flat-square&logo=supabase)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## Features

- 🎧 Stream audio files stored in Supabase Storage
- 🔍 Live search to filter songs by name
- ⏯ Play, pause, skip next/prev
- ⏩ Seekable progress bar with live timestamps
- 🔊 Volume control with mute toggle
- 📱 Responsive layout — works on mobile and desktop
- 🎨 Spotify-style dark UI with active song highlighting

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Storage    | Supabase Storage        |
| State      | Zustand                 |
| Styling    | Tailwind CSS            |
| Deployment | Vercel                  |

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout — MusicPlayer lives here
│   └── page.tsx            # Home page — fetches and lists songs
├── components/
│   ├── SongList.tsx        # Song list with search filter and active state
│   ├── MusicPlayer.tsx     # Floating bottom player
│   └── SearchBar.tsx       # Search input with keyboard shortcut
├── lib/
│   └── supabase/
│       └── storage.ts      # getSongs(), getSongUrl()
└── store/
    └── use-player-store.ts # Zustand store — queue, playback, search
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/KrishT0/musixan.git
cd musixan
npm install
```

### 2. Set up Supabase

- Create a new project at [supabase.com](https://supabase.com)
- Go to **Storage** and create a bucket named `songs`
- Set the bucket to **private** (signed URLs are used for playback)

### 3. Environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Uploading Songs

Go to **Supabase Dashboard → Storage → songs bucket** and upload your audio files directly. Supported formats:

- `.mp3`
- `.opus` / `.ogg` — Chrome and Firefox only
- `.m4a` / `.wav` / `.flac`

> For best cross-browser compatibility, use `.mp3` or `.m4a`.

---

## How It Works

**Playback flow:**

```
User clicks song
  → getSongUrl() generates a signed Supabase URL (1hr expiry)
  → playSong() updates Zustand store
    → MusicPlayer useEffect fires
      → audio.src = signedUrl
      → audio.load() → audio.play()
```

**Search flow:**

```
User types in SearchBar
  → setSearchQuery() updates Zustand store
    → SongList reads searchQuery
      → useMemo filters songs array
        → filtered list re-renders
```

---

## Deployment

The app is deployed on Vercel. Push to `main` and Vercel picks it up automatically.

Make sure to add your environment variables in the Vercel dashboard under **Project Settings → Environment Variables**.

---

## License

MIT
