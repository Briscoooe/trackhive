"use client";
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { SpotifyPlaylistSearchResponse } from "@/app/types/spotify";
import { searchPlaylists } from "@/app/lib/spotify";
import PlaylistRow from "@/components/PlaylistRow";
const token =
  "BQAt_8ahSNncLZnfZWT8shQvdaF3VnrkZsJAS_1szbcZ570pY8Rineh7-sLTkp_kKU51dp8btaJzHAhTcs5H3-BNfJ4b_1dJ34x4ks97k-y3kJMbOVnY9TJCCwMId7SGXnfOCBZTds70IEUaI7Z9PxNUjn6uPtRC4gPiNWWuGN6n-43cGkUkm3qCZdrh1MoFu11PkYkXhihmyiDtOhMlU7erYCXk6Q5Bw2Ke8OtsPUZI8j963uEO3_nG3VouJZpc";

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
