import { create } from "zustand";

export type Song = {
  name: string;
  size: number;
};

type PlayerState = {
  queue: Song[];
  currentSong: Song | null;
  currentUrl: string | null;
  isPlaying: boolean;
  searchQuery: string;
};

type PlayerActions = {
  setSearchQuery: (query: string) => void;
  setQueue: (songs: Song[]) => void;
  playSong: (song: Song, url: string) => void;
  togglePlay: () => void;
  playNext: (getUrl: (name: string) => Promise<string>) => Promise<void>;
  playPrev: (getUrl: (name: string) => Promise<string>) => Promise<void>;
};

type PlayerStore = PlayerState & PlayerActions;

const usePlayerStore = create<PlayerStore>((set, get) => ({
  queue: [],
  currentSong: null,
  currentUrl: null,
  isPlaying: false,
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),

  // Call this once after fetching songs from Supabase
  setQueue: (songs) => set({ queue: songs }),

  // Call this when user clicks a song row
  playSong: (song, url) =>
    set({ currentSong: song, currentUrl: url, isPlaying: true }),

  // Call this on play/pause button click
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  // Call this on next button — also updates currentUrl (bug fix from v1)
  playNext: async (getUrl) => {
    const { queue, currentSong } = get();
    if (!currentSong || queue.length === 0) return;
    const index = queue.findIndex((s) => s.name === currentSong.name);
    if (index === -1 || index === queue.length - 1) return;
    const next = queue[index + 1];
    const url = await getUrl(next.name);
    set({ currentSong: next, currentUrl: url, isPlaying: true });
  },

  playPrev: async (getUrl) => {
    const { queue, currentSong } = get();
    if (!currentSong || queue.length === 0) return;
    const index = queue.findIndex((s) => s.name === currentSong.name);
    if (index <= 0) return;
    const prev = queue[index - 1];
    const url = await getUrl(prev.name);
    set({ currentSong: prev, currentUrl: url, isPlaying: true });
  },
}));

export default usePlayerStore;
