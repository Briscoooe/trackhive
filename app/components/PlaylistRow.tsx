import type { SpotifySimplifiedPlaylistObject } from "app/types/spotify";
import { Link, useSearchParams } from "@remix-run/react";
import { ArchivePlaylistForm } from "~/components/ArchivePlaylistForm";
import { buttonVariants } from "~/components/ui/button";
import { PlaylistRowInformation } from "~/components/PlaylistRowInformation";
import type { UserTrackedPlaylist } from "~/types/supabase";
import { UserTrackedPlaylistInformation } from "~/components/UserTrackedPlaylistInformation";

export default function PlaylistRow({
  playlist,
  buttonDisabled = false,
  userTrackedPlaylist,
}: {
  playlist: SpotifySimplifiedPlaylistObject | null;
  buttonDisabled?: boolean;
  userTrackedPlaylist?: UserTrackedPlaylist | null;
}) {
  let [searchParams] = useSearchParams();
  if (!playlist) {
    return null;
  }
  return (
    <div
      className={`flex w-full flex-col space-y-2 overflow-x-hidden rounded-xl border-1 border-slate-200 bg-white p-4 shadow-sm transition animate-in hover:cursor-pointer hover:bg-slate-50 ${
        buttonDisabled ? "" : ""
      }`}
    >
      <div
        className={
          "flex h-full flex-col items-start justify-between space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        }
      >
        <PlaylistRowInformation playlist={playlist} />
        <div
          className={userTrackedPlaylist ? "flex w-full sm:hidden" : "hidden"}
        >
          <UserTrackedPlaylistInformation
            userTrackedPlaylist={userTrackedPlaylist}
          />
        </div>
        <div
          className={
            "flex w-full flex-row justify-start space-x-1 space-y-0 sm:w-auto sm:flex-col sm:space-x-0 sm:space-y-1"
          }
        >
          <Link
            disabled={buttonDisabled}
            className={`w-1/2 sm:w-auto ${buttonVariants({
              variant: "secondary",
              disabled: buttonDisabled,
            })}`}
            to={{
              pathname: playlist.id,
              search: `query=${searchParams.get("query")}`,
            }}
          >
            {buttonDisabled ? "Loading..." : "Detail"}
          </Link>
          <div className={"h-min w-1/2 sm:w-auto"}>
            <ArchivePlaylistForm
              playlist={playlist}
              buttonDisabled={buttonDisabled}
              userTrackedPlaylist={userTrackedPlaylist}
            />
          </div>
        </div>
      </div>
      <div className={"hidden sm:flex"}>
        <UserTrackedPlaylistInformation
          userTrackedPlaylist={userTrackedPlaylist}
        />
      </div>
    </div>
  );
}
