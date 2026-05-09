"use client";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;

      const isValidChar =
        e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;

      if (!isTyping && isValidChar) {
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-black py-7 rounded-sm">
      <p className="text-xs font-medium tracking-wider font-dm-mono text-white uppercase mb-5">
        Search songs
      </p>
      <div
        className={`flex items-center border-b gap-3 pb-2.5 transition-colors duration-200 ${
          focused ? "border-white" : "border-zinc-800"
        }`}
      >
        <svg
          className="w-4 h-4 text-zinc-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search songs..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none text-zinc-200 placeholder:text-zinc-500 text-sm caret-white"
        />
        <kbd className="border border-zinc-800 rounded px-1.5 py-0.5 text-xs text-zinc-400 shrink-0">
          /
        </kbd>
      </div>
    </div>
  );
}
