import { createClient } from "./client";

export async function getSongs(offset: number = 0, limit: number = 30) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("songs")
    .list("", { limit: limit + 1, offset });

  if (error) throw error;

  return data
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((song) => ({
      name: song.name,
      size: song.metadata?.size as number,
    }));
}

export function getSongUrl(name: string): Promise<string> {
  return Promise.resolve(`/api/stream?name=${encodeURIComponent(name)}`);
}
