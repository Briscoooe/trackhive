"use client";
import {
  SpotifyPlaylistSearchResponse,
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types/spotify";
import Image from "next/image";
import {
  ArchiveBoxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  MusicalNoteIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import TrackRow from "@/components/TrackRow";
import TrackRowSkeleton from "@/components/TrackRowSkeleton";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { getSpotifyPlaylistTracksQuery } from "@/store/queries";
import {
  archiveSpotifyPlaylistMutation,
  unarchiveSpotifyPlaylistMutation,
} from "@/store/mutations";
import {PLAYLIST_TRACKS_KEY, USER_ARCHIVED_PLAYLISTS_KEY} from "@/store/keys";
import {Button} from "@/components/ui/button";

export default function PlaylistRow({
  playlist,
  isArchived = false,
}: {
  playlist: SpotifySimplifiedPlaylistObject | null;
  isArchived?: boolean;
}) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false);
  if (!playlist) {
    return null;
  }
  const {
    data: tracks,
    isLoading,
  } = useQuery({
    queryKey: [PLAYLIST_TRACKS_KEY, playlist.id, isOpen],
    queryFn: () => {
      if (!isOpen) {
        return Promise.resolve([]);
      }
      return getSpotifyPlaylistTracksQuery(playlist.id);
    },
  });

  const handleArchiveMutation = useMutation({
    mutationFn: () => archiveSpotifyPlaylistMutation(playlist.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_ARCHIVED_PLAYLISTS_KEY],
        exact: true,
      });
    }
  });

  const handleUnarchiveMutation = useMutation({
    mutationFn: () => unarchiveSpotifyPlaylistMutation(playlist.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_ARCHIVED_PLAYLISTS_KEY],
        exact: true,
        refetchType: 'active',
      });
    }
  });

  const playlistImage = playlist.images?.length > 0 ? playlist.images[0].url : "";

  return (
    <div
      className={
        "w-full border-1 animate-in border-gray-300 bg-white flex flex-col rounded-lg px-4 py-2 hover:bg-gray-50 transition hover:cursor-pointer overflow-x-hidden shadow-sm"
      }
    >
      <div className={"flex flex-row items-start justify-between space-x-4"}>
        <div
          className={
            "flex flex-row items-start justify-start space-x-2 overflow-x-hidden"
          }
        >
          <img
            src={playlistImage}
            alt={playlist.name}
            width={80}
            height={80}
          />
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
        <div className={"flex flex-col items-end justify-end"}>
          <div>
            <button onClick={() => setIsOpen(!isOpen)}>
              <ChevronDownIcon
                className={`text-gray-500 transition h-5 w-5 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div className={"mt-6"}>
            {!isArchived ? (
              <Button
                onClick={() => handleArchiveMutation.mutate()}
                variant={"outline"}
                className={"mt-auto flex-1"}
                disabled={handleArchiveMutation.isLoading}
              >
                {handleArchiveMutation.isLoading ? (
                  "Archiving..."
                ) : (
                  <>
                    <ArchiveBoxIcon className={"text-gray-500 w-4 h-4 mr-1"} />
                    <span className={"text-md text-gray-500"}>Archive</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => handleUnarchiveMutation.mutate()}
                variant={"destructive"}
                className={"mt-auto flex-1"}
                disabled={handleUnarchiveMutation.isLoading}
              >
                {handleUnarchiveMutation.isLoading ? (
                  "Unarchiving..."
                ) : (
                  <>
                    <TrashIcon className={"text-white w-4 h-4 mr-1"} />
                    Unarchive
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={"space-y-2 border-t-1 mt-3 lg:mt-4 pt-3 lg:pt-4"}>
          {tracks && tracks?.length > 0 &&
            tracks?.map((track, index) => (
              <TrackRow key={track.id} index={index} track={track} />
            ))}
          {isLoading &&
            [...Array(playlist.tracks.total)].map((_, index) => (
              <TrackRowSkeleton key={index} />
            ))}
        </div>
      )}
    </div>
  );
}
