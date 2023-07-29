"use client";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { SpotifyPlaylistSearchResponse } from "@/app/types";
import { searchPlaylists } from "@/app/lib/spotify";
import PlaylistRow from "@/components/PlaylistRow";
const token =
  "BQDLIvhPS6nBD-JkGp7R3kI8Qrdaodf8ojIhyyFDRe9Hs-bN2aD42v7QXFzyzFK7sZyuiHHHy6eW21Pi-fnHivZ6fGIXYDko1cguSCm0aOHc42Vosh7co1G70v8xhwEZOQHISr9z0cXKXyzmCsG6RmaR4GdUn9ndRSei-EE1HcapEtA1Nube7LFwst0vWGsxrFjN6T868hyJ-esabRgmzKmGSX9GzouxQ3Hf3HDmLEh7vYCQZDEnSiGWcvraue0R";

export default function PlaylistSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResponse, setSearchResponse] =
    useState<SpotifyPlaylistSearchResponse | null>();
  useEffect(() => {
    async function search() {
      const response = await searchPlaylists(token, searchText);
      setSearchResponse(response);
    }
    if (searchText.length > 3) {
      search();
    }
  }, [searchText]);
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Input
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
