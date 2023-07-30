import {
  SpotifyPlaylistSearchResponse, SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types/spotify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { Database } from "@/app/types/supabase";

export async function searchSpotifyPlaylistsQuery(
  searchText: string
): Promise<SpotifyPlaylistSearchResponse> {
  const response = await fetch(`/api/spotify/search?q=${searchText}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getSpotifyPlaylistTracksQuery(
  playlistId: string
): Promise<SpotifyTrackObject[]> {
  const response = await fetch(`/api/spotify/playlists/${playlistId}/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getSpotifyPlaylistQuery(
  playlistId: string
): Promise<SpotifySimplifiedPlaylistObject> {
  const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getUserArchivesQuery(): Promise<
  Database["public"]["Tables"]["user_archives"]["Row"][]
> {
  const supabase = createClientComponentClient();
  const user = await supabase.auth.getUser();
  const response = await supabase
    .from("user_archives")
    .select()
    .eq("user_id", user.data.user?.id);
  return response.data as Database["public"]["Tables"]["user_archives"]["Row"][];
}

export async function getUserArchivePlaylistsQuery(): Promise<SpotifySimplifiedPlaylistObject[]>
{
  const archives = await getUserArchivesQuery();
  const playlistIds = archives.map((archive) => archive.playlist_id);
  const playlists = await Promise.all(
    playlistIds.map((playlistId) => getSpotifyPlaylistQuery(playlistId))
  );
  return playlists;
}