import { createClient } from "./client";

export async function getSongs() {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("songs").list();
  if (error) throw error;

  return data
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((song) => ({
      name: song.name,
      size: song.metadata?.size as number,
    }));
}

export async function getSongUrl(name: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("songs")
    .createSignedUrl(name, 3600); // 3600 = 1 hour expiry

  if (error) throw error;
  return data.signedUrl;
}
