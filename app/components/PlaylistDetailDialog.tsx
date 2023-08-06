import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import TrackRow from "~/components/TrackRow";
import type {
  SpotifyPlaylistTrackObject,
  SpotifySimplifiedPlaylistObject,
} from "~/types/spotify";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function PlaylistDetailDialog({
  playlist,
  tracks,
}: {
  playlist: SpotifySimplifiedPlaylistObject;
  tracks: SpotifyPlaylistTrackObject[];
}) {
  const navigate = useNavigate();
  const lastUpdated = Math.max(
    ...tracks.map((track) => new Date(track.added_at).getTime() / 1000),
  );
  let lastUpdateEnglishString = formatDistanceToNow(
    new Date(lastUpdated * 1000),
    { addSuffix: true },
  );
  lastUpdateEnglishString =
    lastUpdateEnglishString.charAt(0).toUpperCase() +
    lastUpdateEnglishString.slice(1);
  return (
    <Dialog
      open
      onOpenChange={() => {
        navigate(-1);
      }}
    >
      <DialogContent className={"max-h-screen overflow-y-scroll"}>
        <DialogHeader className={"border-b-1 border-slate-100 pb-2"}>
          <DialogTitle className={"-mt-2 flex flex-col space-y-1 text-left"}>
            <span>{playlist.name}</span>
            <div className={"flex flex-row items-center space-x-1"}>
              <ClockIcon className={"mt-0.5 h-3 w-3 text-slate-500"} />
              <span className={"text-sm font-normal text-slate-500"}>
                Last updated{" "}
                <span className={"font-semibold"}>
                  {lastUpdateEnglishString}
                </span>
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className={"space-y-2 overflow-y-auto"}>
          {tracks &&
            tracks?.length > 0 &&
            tracks?.map((playlistTrackObject, index) => (
              <TrackRow
                key={playlistTrackObject.track.id}
                index={index}
                track={playlistTrackObject.track}
              />
            ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
