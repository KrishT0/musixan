"use client";

import { useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-213 mx-auto fixed bottom-0 left-0 right-0 z-50 bg-neutral-950 border-t border-white/10 px-6 py-3">
      <div className="mx-auto grid grid-cols-3 items-center gap-4">
        {/* Left: Song info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded bg-[#282828] flex items-center justify-center shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              mixkit-hip-hop-02
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">audio/mpeg</p>
          </div>
          <button className="text-neutral-500 hover:text-white transition-colors shrink-0 ml-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Center: Controls + Progress */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-5">
            {/* Shuffle */}
            <button className="text-[#1db954] hover:text-white transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
            </button>

            {/* Previous */}
            <button className="text-neutral-400 hover:text-white transition-colors">
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

            {/* Play / Pause */}
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shrink-0"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button className="text-neutral-400 hover:text-white transition-colors">
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

            {/* Repeat */}
            <button className="text-neutral-400 hover:text-white transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full max-w-sm">
            <span className="text-[11px] text-neutral-500 w-7 text-right">
              1:12
            </span>
            <div className="flex-1 h-1 bg-neutral-600 rounded-full group cursor-pointer">
              <div className="h-full w-[34%] bg-neutral-400 group-hover:bg-[#1db954] rounded-full relative transition-colors">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-[11px] text-neutral-500 w-7">3:33</span>
          </div>
        </div>

        {/* Right: Volume */}
        <div className="flex items-center gap-3 justify-end">
          <button className="text-neutral-400 hover:text-white transition-colors">
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
          </button>
          <div className="w-20 h-1 bg-neutral-600 rounded-full group cursor-pointer">
            <div className="h-full w-[70%] bg-neutral-400 group-hover:bg-[#1db954] rounded-full transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
