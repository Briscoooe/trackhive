import type { SpotifySimplifiedPlaylistObject } from "~/types/spotify";
import {
  LinkIcon,
  MusicalNoteIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { NativeLinkTag } from "~/components/NativeLinkTag";

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
        "flex h-full flex-row items-start justify-start space-x-2 overflow-x-hidden"
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
        <div className={"flex flex-row items-center"}>
          <span
            className={"truncate text-xl font-medium leading-6 text-slate-700"}
          >
            {playlist.name}
          </span>
          <NativeLinkTag
            href={`https://open.spotify.com/playlist/${playlist.id}`}
          >
            <LinkIcon
              className={
                "ml-1 h-4 w-4 text-slate-400 transition hover:text-slate-500"
              }
            />
          </NativeLinkTag>
        </div>
        <div className={"flex flex-row items-center space-x-1"}>
          <UserCircleIcon className={"h-4 w-4 text-slate-500"} />
          <span className={"text-md text-slate-500"}>
            {playlist.owner.display_name}
          </span>
          {playlist.owner.is_spotify && (
            <CheckBadgeIcon className={"h-4 w-4 text-green-500"} />
          )}
        </div>
        <div className={"flex flex-row items-center space-x-1"}>
          <MusicalNoteIcon className={"h-4 w-4 text-slate-500"} />
          <span className={"text-md text-slate-500"}>
            {playlist.tracks?.total} tracks
          </span>
        </div>
      </div>
    </div>
  );
}
