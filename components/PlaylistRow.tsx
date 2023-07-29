"use client";
import {
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types";
import Image from "next/image";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  MusicalNoteIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { getPlaylistTracks } from "@/app/lib/spotify";
import { useEffect, useState } from "react";
import TrackRow from "@/components/TrackRow";
import TrackRowSkeleton from "@/components/TrackRowSkeleton";
const token =
  "BQDLIvhPS6nBD-JkGp7R3kI8Qrdaodf8ojIhyyFDRe9Hs-bN2aD42v7QXFzyzFK7sZyuiHHHy6eW21Pi-fnHivZ6fGIXYDko1cguSCm0aOHc42Vosh7co1G70v8xhwEZOQHISr9z0cXKXyzmCsG6RmaR4GdUn9ndRSei-EE1HcapEtA1Nube7LFwst0vWGsxrFjN6T868hyJ-esabRgmzKmGSX9GzouxQ3Hf3HDmLEh7vYCQZDEnSiGWcvraue0R";

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
      const tracks = await getPlaylistTracks(token, playlist.id);
      setTracks(tracks);
    };
    if (isOpen && !tracks.length) {
      getTracks();
    }
  }, [isOpen]);
  return (
    <div
      className={
        "w-full border-1 border-gray-200 flex flex-col rounded-lg px-4 py-2 lg:px-8 lg:py-4  hover:bg-gray-100 transition hover:cursor-pointer overflow-x-hidden shadow-sm"
      }
    >
      <div className={"flex flex-row items-start justify-between space-x-4"}>
        <div
          className={
            "flex flex-row items-start justify-start space-x-2 overflow-y-hidden"
          }
        >
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            width={80}
            height={80}
          />
          <div className={"flex flex-col space-y-1"}>
            <span className={"text-xl text-gray-800 leading-6 truncate"}>
              {playlist.name}
            </span>
            <div className={"flex flex-row items-center space-x-1"}>
              <UserIcon className={"text-gray-500 w-4 h-4"} />
              <span className={"text-md text-gray-500"}>
                {playlist.owner.display_name}
              </span>
            </div>
            <div className={"flex flex-row items-center space-x-1"}>
              <MusicalNoteIcon className={"text-gray-500 h-4 w-4"} />
              <span className={"text-md text-gray-500"}>
                {playlist.tracks.total}
              </span>
            </div>
          </div>
        </div>
        <div className={"flex flex-row items-center"}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronDownIcon
              className={`text-gray-500 transition h-5 w-5 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
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
