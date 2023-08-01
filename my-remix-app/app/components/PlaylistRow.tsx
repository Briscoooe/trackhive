import { SpotifySimplifiedPlaylistObject } from "app/types/spotify";
import {
  ArchiveBoxIcon,
  ChevronDownIcon,
  MusicalNoteIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import {
  archiveSpotifyPlaylistMutation,
  unarchiveSpotifyPlaylistMutation
} from "~/store/mutations";
import {
  USER_ARCHIVED_DATABASE_ROWS_KEY,
  USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY
} from "~/store/keys";
import {ActionArgs, redirect} from "@remix-run/node";
import {archivePlaylist, refreshAuthToken} from "~/lib/spotify-client";
import {createSupabaseServerClient} from "~/utils/supabase.server";
import {Form, Link, useSearchParams} from "@remix-run/react";
import {useParams} from "react-router";

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

function PlaylistRowActions({
  playlist,
  isArchived,
}: {
  playlist: SpotifySimplifiedPlaylistObject;
  isArchived: boolean;
}) {
  // const queryClient = useQueryClient();
  // const handleArchiveMutation = useMutation({
  //   mutationFn: () => archiveSpotifyPlaylistMutation(playlist.id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
  //       exact: true,
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_DATABASE_ROWS_KEY],
  //       exact: true,
  //     });
  //   },
  // });

  // const handleUnarchiveMutation = useMutation({
  //   mutationFn: () => unarchiveSpotifyPlaylistMutation(playlist.id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
  //       exact: true,
  //       refetchType: "active",
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_DATABASE_ROWS_KEY],
  //       exact: true,
  //     });
  //   },
  // });
  return (
    <div
      className={
        "flex flex-row sm:flex-col items-end justify-between w-full sm:w-auto sm:justify-end"
      }
    >
      <div>
        {/*<button onClick={() => setIsOpen(!isOpen)}>*/}
        {/*  <ChevronDownIcon*/}
        {/*    className={`text-gray-500 transition h-5 w-5 ${*/}
        {/*      isOpen ? "rotate-180" : ""*/}
        {/*    }`}*/}
        {/*  />*/}
        {/*</button>*/}
      </div>
      <Form className={"mt-0 sm:mt-6"} method={'post'}>
        <input type="hidden" name="playlistId" value={playlist.id} />
        <Button
          variant={"default"}
          className={"mt-auto flex-1"}
          type={'submit'}
        >
          <>
            <ArchiveBoxIcon className={"w-4 h-4 mr-1"} />
            <span className={"text-md "}>Archive</span>
          </>
        </Button>
      </Form>
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
        search: `?query=${searchParams.get('query')}&playlistId=${playlist.id}`
      }}
      className={
        "w-full border-1 animate-in border-gray-300 bg-white flex flex-col rounded-lg px-4 py-2 hover:bg-gray-50 transition hover:cursor-pointer overflow-x-hidden shadow-sm"
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
      {isOpen && (
        <div className={"space-y-2 border-t-1 mt-3 sm:mt-4 pt-3 sm:pt-4"}>
          I am open
        </div>
      )}
    </Link>
  );
}
