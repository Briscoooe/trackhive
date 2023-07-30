import {SpotifyPlaylistSearchResponse, SpotifyTrackObject} from "@/app/types/spotify";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

export async function searchPlaylistsQuery(searchText: string): Promise<SpotifyPlaylistSearchResponse> {
  const response = await fetch(`/api/spotify/search?q=${searchText}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getPlaylistTracksQuery(playlistId: string): Promise<SpotifyTrackObject[]> {
  const response = await fetch(`/api/spotify/playlists/${playlistId}/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function archivePlaylistMutation(playlistId: string): Promise<void> {
  const data = await fetch(`/api/spotify/playlists/${playlistId}/archive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
}