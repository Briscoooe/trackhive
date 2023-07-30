"use client";
import { Input } from "@/components/primitives/Input";
import { useEffect, useState } from "react";
import { SpotifyPlaylistSearchResponse } from "@/app/types/spotify";
import PlaylistRow from "@/components/PlaylistRow";
import {useQuery} from "@tanstack/react-query";
import {searchPlaylistsQuery} from "@/app/lib/api-client";

export default function PlaylistSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["searchPlaylists", searchText],
    queryFn: () => {
      if (!searchText ||  searchText.length < 2) {
        return Promise.resolve({ items: [] } as SpotifyPlaylistSearchResponse);
      }
      return searchPlaylistsQuery(searchText);
    },
  });

  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Input
        className={"text-md"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={"Search for a playlist"}
      />
      {data &&
        data.items.map((playlist, index) => (
          <PlaylistRow playlist={playlist} key={index} />
        ))}
    </div>
  );
}
