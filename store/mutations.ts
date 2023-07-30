export async function archiveSpotifyPlaylistMutation(
  playlistId: string
): Promise<void> {
  const data = await fetch(`/api/spotify/playlists/${playlistId}/archive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
}

export async function unarchiveSpotifyPlaylistMutation(
  playlistId: string
): Promise<void> {
  const data = await fetch(`/api/spotify/playlists/${playlistId}/unarchive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
}
