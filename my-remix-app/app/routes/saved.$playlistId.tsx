import { useNavigate, useNavigation } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
  createUserTrackedPlaylist,
  getCurrentUserAccessToken,
} from "~/lib/supabase.server";
import {
  archivePlaylist,
  getPlaylist,
  getPlaylistTracks,
} from "~/lib/spotify.server";
import { useLoaderData } from "@remix-run/react";
import TrackRow from "~/components/TrackRow";
import { formatDistanceToNow } from "date-fns";
import { ClockIcon } from "@heroicons/react/24/outline";
import { ArchivePlaylistForm } from "~/components/ArchivePlaylistForm";

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
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const playlistId = formData.get("playlistId") as string;
  await createUserTrackedPlaylist(
    supabase,
    session.data.session.user.id,
    playlistId
  );
  await archivePlaylist(
    session.data.session.provider_token,
    formData.get("playlistId") as string
  );
  return redirect(`/`);
};

export default function SavedPlaylistId() {
  const { playlistTrackObjects, playlist } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const lastUpdated = Math.max(
    ...playlistTrackObjects.map(
      (track) => new Date(track.added_at).getTime() / 1000
    )
  );
  let lastUpdateEnglishString = formatDistanceToNow(
    new Date(lastUpdated * 1000),
    { addSuffix: true }
  );
  lastUpdateEnglishString =
    lastUpdateEnglishString.charAt(0).toUpperCase() +
    lastUpdateEnglishString.slice(1);
  return (
    <>
      <Dialog
        open
        onOpenChange={() => {
          navigate(-1);
        }}
      >
        <DialogContent className={"max-h-screen overflow-y-scroll"}>
          <DialogHeader>
            <DialogTitle className={"flex flex-col space-y-1"}>
              <span>{playlist.name}</span>
              <div className={"flex flex-row items-center space-x-1"}>
                <ClockIcon className={"w-3 h-3 mt-0.5 text-gray-500"} />
                <span className={"text-sm text-gray-500"}>
                  {lastUpdateEnglishString}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className={"space-y-2 mt-2 overflow-y-auto"}>
            {playlistTrackObjects &&
              playlistTrackObjects?.length > 0 &&
              playlistTrackObjects?.map((playlistTrackObject, index) => (
                <TrackRow
                  key={playlistTrackObject.track.id}
                  index={index}
                  track={playlistTrackObject.track}
                />
              ))}
            {/*{isLoading &&*/}
            {/*  [...Array(playlist.tracks.total)].map((_, index) => (*/}
            {/*    <TrackRowSkeleton key={index} />*/}
            {/*  ))}*/}
          </DialogDescription>
          <DialogFooter>
            <ArchivePlaylistForm playlist={playlist} buttonDisabled={false} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
