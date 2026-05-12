import SongList from "@/components/songlist";
import { getSongs, getSongsCount } from "@/lib/supabase/storage";

export default async function Home() {
  const [songs, count] = await Promise.all([getSongs(), getSongsCount()]);

  return (
    <div className="px-6">
      <p className="font-dm-mono border-b w-fit mt-1 font-medium text-xs mb-10">
        Total Songs ({count})
      </p>
      <SongList songs={songs} />
    </div>
  );
}
