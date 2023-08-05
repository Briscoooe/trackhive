import { SpotifySimplifiedPlaylistObject } from "~/types/spotify";
import { MusicalNoteIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export function PlaylistRowInformation({
  playlist,
}: {
  playlist: SpotifySimplifiedPlaylistObject;
}) {
  const playlistImage =
    playlist.images?.length > 0 ? playlist.images[0].url : "";
  return (
    <div
      className={
        "flex flex-row items-start justify-start space-x-2 overflow-x-hidden h-full"
      }
    >
      <img
        className={"rounded-md"}
        src={playlistImage}
        alt={playlist.name}
        width={90}
        height={90}
      />
      <div className={"flex flex-col justify-between space-y-1"}>
        <span className={"text-xl text-slate-700 leading-6 truncate"}>
          {playlist.name}
        </span>
        <div className={"flex flex-row items-center space-x-1"}>
          <UserCircleIcon className={"text-slate-500 w-4 h-4"} />
          <span className={"text-md text-slate-500"}>
            {playlist.owner.display_name}
          </span>
          {playlist.owner.is_spotify && (
            <CheckBadgeIcon className={"text-green-500 w-4 h-4"} />
          )}
        </div>
        <div className={"flex flex-row items-center space-x-1"}>
          <MusicalNoteIcon className={"text-slate-500 h-4 w-4"} />
          <span className={"text-md text-slate-500"}>
            {playlist.tracks?.total} tracks
          </span>
        </div>
      </div>
    </div>
  );
}
