import {useNavigate, useParams} from "react-router";
import {
  Dialog,
  DialogContent, DialogDescription, DialogFooter,
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
import {formatDistanceToNow} from "date-fns";
import {ClockIcon} from "@heroicons/react/24/outline";

export const loader = async ({ params, request }: LoaderArgs) => {
  const playlistId = params.playlistId;
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const accessToken = await getCurrentUserAccessToken({ supabase });
  const playlistTrackObjects = await getPlaylistTracks(accessToken, playlistId);
  const playlist = await getPlaylist(accessToken, playlistId)
  console.log('TRACKsz', playlistTrackObjects)
  return {
    playlistId,
    playlist,
    playlistTrackObjects,
  }
}
export default function PlaylistId() {
  const { playlistId, playlistTrackObjects, playlist } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const lastUpdated = Math.max(...playlistTrackObjects.map((track) => new Date(track.added_at).getTime() / 1000));
  let lastUpdateEnglishString = formatDistanceToNow(new Date(lastUpdated * 1000), { addSuffix: true })
  lastUpdateEnglishString = lastUpdateEnglishString.charAt(0).toUpperCase() + lastUpdateEnglishString.slice(1)
  return (
    <Dialog open onOpenChange={() => {
      // navigate("/search")}
      console.log('close')
    }}>
      <DialogContent className={'max-h-screen my-10 -mb-20'}>
        <DialogHeader>
          <DialogTitle className={'flex flex-col space-y-1'}>
            <span>{playlist.name}</span>
            <div className={'flex flex-row items-center space-x-1'}>
              <ClockIcon className={'w-3 h-3 mt-0.5 text-gray-500'} />
              <span className={'text-sm text-gray-500'}>{lastUpdateEnglishString}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className={"space-y-2 mt-2 overflow-y-scroll"}>
          {playlistTrackObjects &&
            playlistTrackObjects?.length > 0 &&
            playlistTrackObjects?.map((playlistTrackObject, index) => (
              <TrackRow key={playlistTrackObject.track.id} index={index} track={playlistTrackObject.track} />
            ))}
          {/*{isLoading &&*/}
          {/*  [...Array(playlist.tracks.total)].map((_, index) => (*/}
          {/*    <TrackRowSkeleton key={index} />*/}
          {/*  ))}*/}
        </DialogDescription>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}