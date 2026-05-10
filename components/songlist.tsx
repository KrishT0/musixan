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
  return (
    <div className="w-full">
      <div className="grid grid-cols-[2rem_1fr_auto] gap-4 pb-2 border-b border-zinc-800 text-xs font-medium tracking-widest text-neutral-400">
        <span className="pl-1">#</span>
        <span>TITLE</span>
        <span>SIZE</span>
      </div>

      <ul className="">
        {songs.map((song, i) => {
          const cleanName = song.name.replace(/\.mp3$/i, "").replace(/_/g, " ");

          return (
            <li key={song.name} className="border-b border-zinc-800">
              <div className="grid grid-cols-[2rem_1fr_auto] gap-4 py-3 items-center group hover:bg-neutral-900 cursor-pointer transition-colors duration-300">
                <span className="text-sm text-neutral-500 pl-1 group-hover:hidden">
                  {i + 1}
                </span>
                <span className="hidden group-hover:block text-sm text-white">
                  ▶
                </span>
                <span className="truncate text-xs sm:text-sm font-semibold text-white">
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
    </div>
  );
}
