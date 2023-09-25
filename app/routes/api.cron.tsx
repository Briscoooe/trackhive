import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  adminGetAllTrackedPlaylistsForToday,
  createSupabaseAdminServerClient,
} from "~/lib/supabase.server";
import { verifySignature } from "~/lib/qstash-queue.server";
import { Client } from "@upstash/qstash";

export const action = async ({ request }: LoaderArgs) => {
  const response = new Response();
  await verifySignature(request);
  const c = new Client({
    token: process.env.QSTASH_TOKEN!,
  });
  const supabaseAdminClient = createSupabaseAdminServerClient({
    request,
    response,
  });
  const todaysPlaylists = await adminGetAllTrackedPlaylistsForToday(
    supabaseAdminClient,
  );
  for (const playlist of todaysPlaylists) {
    await c.publishJSON({
      url: process.env.QUEUE_ENDPOINT_URL!,
      body: {
        userId: playlist.user_id,
        playlistId: playlist.playlist_id,
        archiveMode: playlist.archive_mode,
      },
    });
  }
  return json({ success: true });
};
