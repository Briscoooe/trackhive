"use client";
import {
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types/spotify";
import Image from "next/image";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  MusicalNoteIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {isPlaylistOwnedBySpotify} from "@/app/lib/spotify";
import { useEffect, useState } from "react";
import TrackRow from "@/components/TrackRow";
import TrackRowSkeleton from "@/components/TrackRowSkeleton";
import { Button } from "@/components/ui/Button";

export default function PlaylistRow({
  playlist,
}: {
  playlist: SpotifySimplifiedPlaylistObject | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tracks, setTracks] = useState<SpotifyTrackObject[]>([]);
  if (!playlist) {
    return null;
  }

  useEffect(() => {
    const getTracks = async () => {
      const response = await fetch(
        `/api/spotify/playlists/${playlist.id}/tracks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTracks(data);
    };
    if (isOpen && !tracks.length) {
      getTracks();
    }
  }, [isOpen]);

  const handleArchive = async () => {
    const response = await fetch(
      `/api/spotify/playlists/${playlist.id}/archive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

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
            src={playlist.images[0].url}
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
              {isPlaylistOwnedBySpotify(playlist) && (
                <CheckBadgeIcon className={"text-green-500 w-4 h-4"} />
              )}
            </div>
            <div className={"flex flex-row items-center space-x-1"}>
              <MusicalNoteIcon className={"text-gray-500 h-4 w-4"} />
              <span className={"text-md text-gray-500"}>
                {playlist.tracks.total}
              </span>
            </div>
          </div>
        </div>
        <div className={"flex flex-col items-end"}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronDownIcon
              className={`text-gray-500 transition h-5 w-5 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <Button onClick={handleArchive} variant={"outline"} className={"mt-auto"}>
            Archive
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className={"space-y-2 border-t-1 mt-3 lg:mt-4 pt-3 lg:pt-4"}>
          {tracks.length > 0 &&
            tracks.map((track, index) => (
              <TrackRow key={track.id} index={index} track={track} />
            ))}
          {!tracks.length &&
            [...Array(10)].map((_, index) => <TrackRowSkeleton key={index} />)}
        </div>
      )}
    </div>
  );
}
