"use client";
import { Input } from "@/components/primitives/Input";
import { useEffect, useState } from "react";
import {
  SpotifyPlaylistSearchResponse,
  SpotifySimplifiedPlaylistObject
} from "@/app/types/spotify";
import PlaylistRow from "@/components/PlaylistRow";
import { useQuery } from "@tanstack/react-query";
import {
  getDatabaseUserArchivesQuery,
  searchSpotifyPlaylistsQuery,
} from "@/store/queries";
import {PLAYLIST_SEARCH_RESULTS_KEY, USER_ARCHIVED_PLAYLISTS_KEY} from "@/store/keys";

export default function PlaylistSearch() {
  const { data: userArchives } = useQuery({
    queryKey: [USER_ARCHIVED_PLAYLISTS_KEY],
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
