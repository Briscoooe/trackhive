import {useParams} from "react-router";
import {
  Dialog,
  DialogContent, DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog";
import {LoaderArgs} from "@remix-run/node";
import {getSpotifyUserAchivesQuery} from "~/store/queries";
import {
  createSupabaseServerClient,
  getCurrentUserAccessToken
} from "~/utils/supabase.server";
import {getPlaylist, getPlaylistTracks} from "~/lib/spotify-client";
import {useLoaderData} from "@remix-run/react";
import TrackRow from "~/components/TrackRow";

export const loader = async ({ params, request }: LoaderArgs) => {
  const playlistId = params.playlistId;
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const accessToken = await getCurrentUserAccessToken({ supabase });
  const tracks = await getPlaylistTracks(accessToken, playlistId);
  const playlist = await getPlaylist(accessToken, playlistId)
  return {
    playlistId,
    playlist,
    tracks,
  }
}
export default function PlaylistId() {
  const { playlistId, tracks, playlist } = useLoaderData<typeof loader>();
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'text-left'}>{playlist.name}</DialogTitle>
          <DialogDescription>
            {tracks.map((track, index) => (
              <TrackRow key={track.id} index={index} track={track} />
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}