'use client';
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { SpotifyPlaylistSearchResponse } from "@/app/types/spotify";
import PlaylistRow from "@/components/PlaylistRow";

export default function PlaylistSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResponse, setSearchResponse] =
    useState<SpotifyPlaylistSearchResponse | null>();
  useEffect(() => {
    async function search() {
      const response = await fetch(`/api/spotify/search?q=${searchText}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSearchResponse(data);
    }
    if (searchText.length > 3) {
      search();
    }
  }, [searchText]);
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Input
        className={"text-md"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={"Search for a playlist"}
      />
      {searchResponse &&
        searchResponse.items.map((playlist, index) => (
          <PlaylistRow playlist={playlist} key={index} />
        ))}
    </div>
  );
}
