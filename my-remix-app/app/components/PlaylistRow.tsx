import {SpotifySimplifiedPlaylistObject} from "app/types/spotify";
import {MusicalNoteIcon, UserIcon,} from "@heroicons/react/24/outline";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";
import {Link, useSearchParams} from "@remix-run/react";
import {PlaylistRowActions} from "~/components/PlaylistRowActions";

function PlaylistRowInformation({
  playlist,
}: {
  playlist: SpotifySimplifiedPlaylistObject;
}) {
  const playlistImage =
    playlist.images?.length > 0 ? playlist.images[0].url : "";
  return (
    <div
      className={
        "flex flex-row items-start justify-start space-x-2 overflow-x-hidden"
      }
    >
      <img src={playlistImage} alt={playlist.name} width={80} height={80} />
      <div className={"flex flex-col space-y-1"}>
        <span className={"text-xl text-gray-700 leading-6 truncate"}>
          {playlist.name}
        </span>
        <div className={"flex flex-row items-center space-x-1"}>
          <UserIcon className={"text-gray-500 w-4 h-4"} />
          <span className={"text-md text-gray-500"}>
            {playlist.owner.display_name}
          </span>
          {playlist.owner.is_spotify && (
            <CheckBadgeIcon className={"text-green-500 w-4 h-4"} />
          )}
        </div>
        <div className={"flex flex-row items-center space-x-1"}>
          <MusicalNoteIcon className={"text-gray-500 h-4 w-4"} />
          <span className={"text-md text-gray-500"}>
            {playlist.tracks?.total}
          </span>
        </div>
      </div>
    </div>
  );
}

// export const loadear = async ()
export default function PlaylistRow({
  playlist,
  isArchived = false,
}: {
  playlist: SpotifySimplifiedPlaylistObject | null;
  isArchived?: boolean;
}) {

  let [searchParams, setSearchParams] = useSearchParams();
  // const queryClient = useQueryClient();
  // const [isOpen, setIsOpen] = useState(false);
  if (!playlist) {
    return null;
  }
  // const { data: tracks, isLoading } = useQuery({
  //   queryKey: [PLAYLIST_TRACKS_KEY, playlist.id, isOpen],
  //   queryFn: () => {
  //     if (!isOpen) {
  //       return Promise.resolve([]);
  //     }
  //     return getSpotifyPlaylistTracksQuery(playlist.id);
  //   },
  // });
  const searchParamsPlaylistId = searchParams.get("playlistId");
  const isOpen = searchParamsPlaylistId === playlist.id;
  return (
    <Link
      to={{
        pathname: playlist.id,
        search: `query=${searchParams.get('query')}`
      }}
      className={
        `w-full border-1 animate-in border-gray-300 bg-white flex flex-col rounded-lg px-4 py-2 hover:bg-gray-50 transition hover:cursor-pointer overflow-x-hidden shadow-sm ${isArchived ? "bg-black" : ""}`
      }
    >
      <div
        className={
          "flex flex-col sm:flex-row items-start justify-between space-y-2 space-x-0 sm:space-x-4 sm:space-y-0"
        }
      >
        <PlaylistRowInformation playlist={playlist} />
        <PlaylistRowActions
          playlist={playlist}
          isArchived={isArchived}
        />
      </div>
    </Link>
  );
}