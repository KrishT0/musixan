"use client";

import { getSongUrl, getSongs } from "@/lib/supabase/storage";
import usePlayerStore from "@/store/use-player-store";
import { useEffect, useMemo, useRef, useState } from "react";

const LIMIT = 30;

type Song = {
  name: string;
  size: number;
};

function formatBytes(bytes?: number) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(1) + " MB";
}

function PlayingBars() {
  return (
    <>
      <style>{`
        .playing-bars { display: inline-flex; align-items: flex-end; gap: 2px; height: 14px; }
        .playing-bars span { display: block; width: 3px; background: #1db954; border-radius: 1px; animation: bar-bounce 1s ease-in-out infinite; }
        .playing-bars span:nth-child(1) { height: 6px; animation-delay: 0s; }
        .playing-bars span:nth-child(2) { height: 12px; animation-delay: 0.2s; }
        .playing-bars span:nth-child(3) { height: 8px; animation-delay: 0.4s; }
        @keyframes bar-bounce { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
      `}</style>
      <span className="playing-bars">
        <span />
        <span />
        <span />
      </span>
    </>
  );
}

export default function SongList({ songs: initialSongs }: { songs: Song[] }) {
  const { setQueue, playSong, currentSong, isPlaying, searchQuery } =
    usePlayerStore();

  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [offset, setOffset] = useState(LIMIT);
  const [hasMore, setHasMore] = useState(initialSongs.length === LIMIT);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQueue(songs);
  }, [songs, setQueue]);

  const isFetchingRef = useRef(false);

  const fetchMore = async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;
    setLoading(true);
    try {
      const next = await getSongs(offset, LIMIT);
      setSongs((prev) => {
        const existingNames = new Set(prev.map((s) => s.name));
        const unique = next.filter((s) => !existingNames.has(s.name));
        return [...prev, ...unique];
      });
      setOffset((prev) => prev + LIMIT);
      if (next.length < LIMIT) setHasMore(false);
    } catch (err) {
      console.error("Failed to fetch more songs:", err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Intersection observer triggered");
          fetchMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [offset, hasMore, loading]);

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    return songs.filter((song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [songs, searchQuery]);

  const handleClick = async (song: Song) => {
    const url = await getSongUrl(song.name);
    playSong(song, url);
  };

  return (
    <div className="w-full pb-28 md:pb-20">
      <div className="grid grid-cols-[2rem_1fr_auto] gap-4 pb-2 border-b border-zinc-800 text-xs font-medium tracking-widest text-neutral-400">
        <span className="pl-1">#</span>
        <span>TITLE</span>
        <span>SIZE</span>
      </div>

      <ul>
        {filteredSongs.map((song, i) => {
          const isActive = currentSong?.name === song.name;
          const cleanName = song.name
            .replace(/\.(mp3|opus|wav|flac|ogg|m4a)$/i, "")
            .replace(/_/g, " ");

          return (
            <li
              key={song.name}
              className="border-b border-zinc-800"
              onClick={() => handleClick(song)}
            >
              <div className="grid grid-cols-[2rem_1fr_auto] gap-4 py-3 items-center group hover:bg-neutral-900 cursor-pointer transition-colors duration-300">
                <span
                  className={`text-sm pl-1 ${isActive ? "text-[#1db954]" : "text-neutral-500"}`}
                >
                  {isActive && isPlaying ? <PlayingBars /> : i + 1}
                </span>
                <span
                  className={`truncate text-xs sm:text-sm font-semibold ${isActive ? "text-[#1db954]" : "text-white"}`}
                >
                  {cleanName}
                </span>
                <span className="text-sm text-neutral-500">
                  {formatBytes(song.size)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div ref={sentinelRef} className="py-2 text-center">
        {loading && <p className="text-xs text-neutral-500">Loading...</p>}
        {!hasMore && songs.length > 0 && (
          <p className="text-xs text-neutral-600">All songs loaded</p>
        )}
      </div>
    </div>
  );
}
