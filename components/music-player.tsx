"use client";

import { getSongUrl } from "@/lib/supabase/storage";
import usePlayerStore from "@/store/use-player-store";
import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const { currentSong, currentUrl, isPlaying, togglePlay, playNext, playPrev } =
    usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentUrl) return;

    const isSameSrc = audio.src.includes(
      encodeURIComponent(currentSong?.name ?? ""),
    );

    if (!isSameSrc) {
      audio.src = currentUrl;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [currentUrl, isPlaying, currentSong]);

  // Stable audio event listeners — works because <audio> is always mounted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => playNext(getSongUrl);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [playNext]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      1,
    );
    audio.currentTime = ratio * duration;
  };

  const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = volumeRef.current;
    const audio = audioRef.current;
    if (!bar || !audio) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      1,
    );
    audio.volume = ratio;
    setVolume(ratio);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVol = volume === 0 ? 1 : 0;
    audio.volume = newVol;
    setVolume(newVol);
  };

  const cleanName = currentSong?.name
    .replace(/\.(mp3|opus|wav|flac|ogg|m4a)$/i, "")
    .replace(/_/g, " ");

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Always mounted — ref and event listeners are stable */}
      <audio ref={audioRef} />

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950 border-t border-white/10 px-6 py-3">
          <div className="max-w-213 mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            {/* Left: song name + volume */}
            <div className="w-full md:w-4/12 flex flex-col gap-2 items-start">
              <p className="text-xs text-center md:text-left w-full font-medium text-white truncate">
                {cleanName}
              </p>
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="cursor-pointer text-neutral-400 hover:text-white transition-colors"
                >
                  {volume === 0 ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line
                        x1="23"
                        y1="9"
                        x2="17"
                        y2="15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="17"
                        y1="9"
                        x2="23"
                        y2="15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
                <div
                  ref={volumeRef}
                  onClick={handleVolume}
                  className="w-20 h-1 bg-neutral-600 rounded-full group cursor-pointer"
                >
                  <div
                    style={{ width: `${volume * 100}%` }}
                    className="h-full bg-neutral-400 group-hover:bg-[#1db954] rounded-full transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Center: controls + seek bar */}
            <div className="flex flex-col w-full md:w-8/12 items-center gap-2">
              <div className="flex items-center gap-5">
                <button
                  onClick={() => playPrev(getSongUrl)}
                  className="cursor-pointer text-neutral-400 hover:text-white transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="19 20 9 12 19 4 19 20" />
                    <line
                      x1="5"
                      y1="19"
                      x2="5"
                      y2="5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </button>

                <button
                  onClick={togglePlay}
                  className="cursor-pointer w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                >
                  {isPlaying ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => playNext(getSongUrl)}
                  className="cursor-pointer text-neutral-400 hover:text-white transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line
                      x1="19"
                      y1="5"
                      x2="19"
                      y2="19"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </button>
              </div>

              {/* Seek bar */}
              <div className="flex items-center gap-2 w-full">
                <span className="text-[11px] text-neutral-500 w-7 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  ref={progressRef}
                  onClick={handleSeek}
                  className="flex-1 h-1 bg-neutral-600 rounded-full group cursor-pointer"
                >
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-neutral-400 group-hover:bg-[#1db954] rounded-full relative transition-colors"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-[11px] text-neutral-500 w-7">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
