import { SpotifySimplifiedPlaylistObject } from "app/types/spotify";
import { Link, useSearchParams } from "@remix-run/react";
import { ArchivePlaylistForm } from "~/components/ArchivePlaylistForm";
import { buttonVariants } from "~/components/ui/button";
import { PlaylistRowInformation } from "~/components/PlaylistRowInformation";
import { UserTrackedPlaylist } from "~/types/supabase";
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
      className={`w-full border-1 animate-in border-slate-200 bg-white space-y-2 flex flex-col rounded-xl p-4 hover:bg-slate-50 transition hover:cursor-pointer overflow-x-hidden shadow-sm ${
        buttonDisabled ? "" : ""
      }`}
    >
      <div
        className={
          "flex flex-col sm:flex-row items-start justify-between space-y-4 space-x-0 sm:space-x-4 sm:space-y-0 h-full"
        }
      >
        <PlaylistRowInformation playlist={playlist} />
        <div
          className={userTrackedPlaylist ? "flex sm:hidden w-full" : "hidden"}
        >
          <UserTrackedPlaylistInformation
            userTrackedPlaylist={userTrackedPlaylist}
          />
        </div>
        <div
          className={
            "flex flex-row sm:flex-col space-x-1 w-full sm:w-auto space-y-0 sm:space-x-0 sm:space-y-1 justify-start"
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
          <div className={"w-1/2 sm:w-auto h-min"}>
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
