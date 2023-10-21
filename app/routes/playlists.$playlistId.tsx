import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import { getPlaylist, getPlaylistTracks } from "~/lib/spotify.server";
import { useLoaderData } from "@remix-run/react";
import PlaylistDetailDialog from "~/components/PlaylistDetailDialog";
import { requireSupabaseSession } from "~/utils/permissions.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const playlistId = params.playlistId;
  if (!playlistId) {
    return redirect("/playlists");
  }
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const { user, provider_token } = await requireSupabaseSession(supabase);
  const playlistTrackObjects = await getPlaylistTracks(
    provider_token,
    playlistId,
  );
  const playlist = await getPlaylist(provider_token, playlistId);
  return {
    playlistId,
    playlist,
    playlistTrackObjects,
  };
};

export default function SearchPlaylistId() {
  const { playlistTrackObjects, playlist } = useLoaderData<typeof loader>();
  return (
    <PlaylistDetailDialog playlist={playlist} tracks={playlistTrackObjects} />
  );
}
