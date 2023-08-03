import {
  SpotifyPlaylistSearchResponse,
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "~/types/spotify";

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

// export async function getDatabaseUserArchivesQuery(supabase: SupabaseClient): Promise<
//   Database["public"]["Tables"]["user_tracked_playlist"]["Row"][]
// > {
//   const user = await supabase.auth.getUser();
//   const response = await supabase
//     .from("user_tracked_playlist")
//     .select()
//     .eq("user_id", user.data.user?.id);
//   return response.data as Database["public"]["Tables"]["user_tracked_playlist"]["Row"][];
// }

// export async function getSpotifyUserAchivesQuery(supabase: SupabaseClient): Promise<
//   SpotifySimplifiedPlaylistObject[]
// > {
//   const archives = await getDatabaseUserArchivesQuery(supabase);
//   const playlistIds = archives.map((archive) => archive.playlist_id);
//   const playlists = await Promise.all(
//     playlistIds.map((playlistId) => getSpotifyPlaylistQuery(playlistId))
//   );
//   return playlists;
// }
