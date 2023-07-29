"use client";
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { SpotifyPlaylistSearchResponse } from "@/app/types/spotify";
import { searchPlaylists } from "@/app/lib/spotify";
import PlaylistRow from "@/components/PlaylistRow";
import {getTokenType} from "@typescript-eslint/typescript-estree/dist/node-utils";
import {getCookie} from "@/app/lib/utils";
import {SPOTIFY_ACCESS_TOKEN_COOKIE_NAME} from "@/app/constants";

export default function PlaylistSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResponse, setSearchResponse] =
    useState<SpotifyPlaylistSearchResponse | null>();
  useEffect(() => {
    async function search() {
      const response = await searchPlaylists(getCookie(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME), searchText);
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
