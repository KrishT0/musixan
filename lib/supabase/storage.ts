import { createClient } from "./client";

export async function getSongs() {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("songs").list();
  if (error) throw error;

  return data.map((song) => ({
    name: song.name,
    size: song.metadata?.size as number,
  }));
}

export function getSongUrl(path: string) {
  const supabase = createClient();
  return supabase.storage.from("songs").getPublicUrl(path).data.publicUrl;
}
