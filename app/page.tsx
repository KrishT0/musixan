import SongList from "@/components/songlist";
import { getSongs } from "@/lib/supabase/storage";

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="px-6">
      <p className="font-dm-mono border-b w-fit mt-1 font-medium text-xs mb-10">
        Total Songs ({songs.length})
      </p>
      <SongList songs={songs} />
    </div>
  );
}
