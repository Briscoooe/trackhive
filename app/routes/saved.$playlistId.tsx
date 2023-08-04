import { LoaderArgs, redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
} from "~/lib/supabase.server";
import {
  getPlaylist,
  getPlaylistTracks,
} from "~/lib/spotify.server";
import { useLoaderData } from "@remix-run/react";
import PlaylistDetailDialog from "~/components/PlaylistDetailDialog";

export const loader = async ({ params, request }: LoaderArgs) => {
  const playlistId = params.playlistId;
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!playlistId || !session || !session.data.session?.provider_token) {
    return redirect("/");
  }

  const playlistTrackObjects = await getPlaylistTracks(
    session.data.session.provider_token,
    playlistId
  );
  const playlist = await getPlaylist(
    session.data.session.provider_token,
    playlistId
  );
  return {
    playlistId,
    playlist,
    playlistTrackObjects,
  };
};

export default function SavedPlaylistId() {
  const { playlistTrackObjects, playlist } = useLoaderData<typeof loader>();
  return <PlaylistDetailDialog playlist={playlist} tracks={playlistTrackObjects} />;
}
