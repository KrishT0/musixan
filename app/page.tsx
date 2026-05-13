import SongList from "@/components/songlist";
import { getSongs } from "@/lib/supabase/storage";

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="px-6">
      <SongList songs={songs} />
    </div>
  );
}
