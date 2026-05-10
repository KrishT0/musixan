"use client";

import { getSongUrl } from "@/lib/supabase/storage";
import usePlayerStore from "@/store/use-player-store";
import { useEffect, useMemo } from "react";

type Song = {
  name: string;
  size: number;
};

function formatBytes(bytes?: number) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(1) + " MB";
}

export default function SongList({ songs }: { songs: Song[] }) {
  const { setQueue, playSong, currentSong, isPlaying, searchQuery } =
    usePlayerStore();

  useEffect(() => {
    setQueue(songs);
  }, [songs, setQueue]);

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
          const cleanName = song.name.replace(/\.mp3$/i, "").replace(/_/g, " ");

          return (
            <li
              key={song.name}
              className="border-b border-zinc-800"
              onClick={async () => await handleClick(song)}
            >
              <div className="grid grid-cols-[2rem_1fr_auto] gap-4 py-3 items-center group hover:bg-neutral-900 cursor-pointer transition-colors duration-300">
                <span
                  className={`text-sm pl-1 group-hover:hidden ${isActive ? "text-[#1db954]" : "text-neutral-500"}`}
                >
                  {isActive && isPlaying ? "▶" : i + 1}
                </span>
                <span className="hidden group-hover:block text-sm text-white pl-1">
                  ▶
                </span>

                <span
                  className={`truncate text-xs sm:text-sm font-semibold ${isActive ? "text-[#1db954]" : "text-white"}`}
                >
                  {cleanName
                    .replace(/\.(mp3|opus|wav|flac|ogg|m4a)$/i, "")
                    .replace(/_/g, " ")}
                </span>

                <span className="text-sm text-neutral-500">
                  {formatBytes(song.size)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
