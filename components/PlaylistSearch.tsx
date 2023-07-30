"use client";
import { useEffect, useState } from "react";
import {
  SpotifyPlaylistSearchResponse,
  SpotifySimplifiedPlaylistObject,
} from "@/app/types/spotify";
import PlaylistRow from "@/components/PlaylistRow";
import { useQuery } from "@tanstack/react-query";
import {
  getDatabaseUserArchivesQuery,
  searchSpotifyPlaylistsQuery,
} from "@/store/queries";
import {
  PLAYLIST_SEARCH_RESULTS_KEY,
  USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY,
} from "@/store/keys";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
  SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
  SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
  SPOTIFY_PLAYLIST_TODAYS_TOP_HITS_NAME,
} from "@/lib/constants";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

function PlaylistSearchSuggestions({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) {
  if (searchText) {
    return null;
  }
  return (
    <div className={"flex flex-col items-center space-y-2"}>
      {[
        SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
        SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
        SPOTIFY_PLAYLIST_TODAYS_TOP_HITS_NAME,
        SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
      ].map((playlistName: string) => (
        <Badge
          key={playlistName}
          className={
            "cursor-pointer w-full text-sm whitespace-nowrap flex justify-between"
          }
          onClick={() => setSearchText(playlistName)}
        >
          <span>{playlistName}</span>
          <CheckBadgeIcon className={"h-4 w-4 ml-1 text-green-500"} />
        </Badge>
      ))}
    </div>
  );
}

export default function PlaylistSearch() {
  const { data: userArchives } = useQuery({
    queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
    queryFn: getDatabaseUserArchivesQuery,
  });
  const [searchText, setSearchText] = useState<string>("");
  const { data: searchResults } = useQuery({
    queryKey: [PLAYLIST_SEARCH_RESULTS_KEY, searchText],
    queryFn: () => {
      if (!searchText || searchText.length < 2) {
        const items: SpotifySimplifiedPlaylistObject[] = [];
        return Promise.resolve({ items });
      }
      return searchSpotifyPlaylistsQuery(searchText);
    },
  });

  const userHasArchivedPlaylist = (playlistId: string) => {
    return userArchives?.some((archive) => archive.playlist_id === playlistId);
  };

  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Input
        className={"text-md"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={"Search for a playlist"}
      />
      <PlaylistSearchSuggestions
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {searchResults &&
        searchResults.items.map((playlist, index) => (
          <PlaylistRow
            playlist={playlist}
            key={index}
            isArchived={userHasArchivedPlaylist(playlist.id)}
          />
        ))}
    </div>
  );
}
