import { createClient } from "@/lib/supabase/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return new Response("Missing name", { status: 400 });

  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("songs")
    .createSignedUrl(name, 3600);

  if (error || !data) return new Response("Not found", { status: 404 });

  const audioRes = await fetch(data.signedUrl);
  if (!audioRes.ok)
    return new Response("Failed to fetch audio", { status: 502 });

  // Stream it back to the browser through your domain
  return new Response(audioRes.body, {
    headers: {
      "Content-Type": audioRes.headers.get("Content-Type") ?? "audio/ogg",
      "Content-Length": audioRes.headers.get("Content-Length") ?? "",
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
    },
  });
}
