import {SpotifySimplifiedPlaylistObject} from "app/types/spotify";
import {Link, useSearchParams} from "@remix-run/react";
import {ArchivePlaylistForm} from "~/components/ArchivePlaylistForm";
import {Button} from "~/components/ui/button";
import {PlaylistRowInformation} from "~/components/PlaylistRowInformation";

export default function PlaylistRow({
  playlist,
  isCurrentlyLoading = false,
  isArchived = false,
}: {
  playlist: SpotifySimplifiedPlaylistObject | null;
  isCurrentlyLoading?: boolean;
  isArchived?: boolean;
}) {
  let [searchParams, setSearchParams] = useSearchParams();
  if (!playlist) {
    return null;
  }
  return (
    <div
      className={`w-full border-1 animate-in border-slate-200 bg-white flex flex-col rounded-xl p-4 hover:bg-slate-50 transition hover:cursor-pointer overflow-x-hidden shadow-sm ${
        isCurrentlyLoading ? "bg-black" : ""
      }`}
    >
      <div
        className={
          "flex flex-col sm:flex-row items-start justify-between space-y-2 space-x-0 sm:space-x-4 sm:space-y-0 h-full"
        }
      >
        <PlaylistRowInformation playlist={playlist} />
        <div
          className={
            "flex flex-row sm:flex-col space-x-1 w-full sm:w-auto space-y-0 sm:space-x-0 sm:space-y-1"
          }
        >
          <Button
            variant={"secondary"}
            className={"w-1/2 sm:w-auto"}
            disabled={isCurrentlyLoading}
          >
            <Link
              to={{
                pathname: playlist.id,
                search: `query=${searchParams.get("query")}`,
              }}
            >
              {isCurrentlyLoading ? "Loading..." : "View"}
            </Link>
          </Button>
          <div className={"w-1/2 sm:w-auto"}>
            <ArchivePlaylistForm
              playlist={playlist}
              buttonDisabled={isCurrentlyLoading}
              isArchived={isArchived}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
