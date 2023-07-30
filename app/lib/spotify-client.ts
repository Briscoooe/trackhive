import {
  SpotifyEpisodeObject,
  SpotifyPlaylistItemsResponse,
  SpotifyPlaylistSearchResponse,
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject, SpotifyUserObject,
} from "@/app/types/spotify";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
export const SPOTIFY_OWNER_URI = "spotify:user:spotify";
export const DISCOVER_WEEKLY_NAME = "Discover Weekly";
export const RELEASE_RADAR_NAME = "Release Radar";

export const searchPlaylists = async (
  accessToken: string,
  query: string
): Promise<SpotifyPlaylistSearchResponse | null> => {
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/search?${new URLSearchParams({
      q: query,
      type: "playlist",
      limit: "50",
    })}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const { playlists } = await response.json();
  return playlists;
};

const _searchSpotifyOwnedPlaylist = async (
  accessToken: string,
  query: string
): Promise<SpotifySimplifiedPlaylistObject | undefined> => {
  const playlists = await searchPlaylists(accessToken, query);
  if (!playlists) {
    return;
  }
  const { items } = playlists;
  return items.find((playlist) => playlist.owner.uri === SPOTIFY_OWNER_URI);
};

const _recursivelyGetPlaylistTracks = async (
  accessToken: string,
  playlistId: string,
  url: string = ""
): Promise<SpotifyPlaylistItemsResponse> => {
  const endpoint =
    url ||
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?${new URLSearchParams(
      {
        fields: "items(track(name,uri,artists(name),album(name,images))),next",
        limit: "50",
      }
    )}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: SpotifyPlaylistItemsResponse = await response.json();

  if (data.next) {
    const nextData = await _recursivelyGetPlaylistTracks(
      accessToken,
      playlistId,
      data.next
    );
    data.items = [...data.items, ...nextData.items];
  }
  return data;
};

const _createPlaylist = async (
  accessToken: string,
  userId: string,
  name: string
): Promise<SpotifySimplifiedPlaylistObject> => {
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
      }),
    }
  );
  return response.json();
}

const _addItemsToPlaylist = async (
  accessToken: string,
  playlistId: string,
  uris: string[]
): Promise<void> => {
  await fetch(`${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris,
    }),
  });
}

export const _getPlaylist = async (
  accessToken: string,
  playlistId: string
): Promise<SpotifySimplifiedPlaylistObject> => {
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
}

export const _getCurrentUser = async (
  accessToken: string
): Promise<SpotifyUserObject> => {
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
}
export const getPlaylistTracks = async (
  accessToken: string,
  playlistId: string
): Promise<SpotifyTrackObject[]> => {
  const { items } = await _recursivelyGetPlaylistTracks(
    accessToken,
    playlistId
  );
  return items.map(({ track }) => track as SpotifyTrackObject);
};

export const getDiscoverWeeklyPlaylist = async (
  accessToken: string
): Promise<SpotifySimplifiedPlaylistObject | undefined> => {
  return await _searchSpotifyOwnedPlaylist(accessToken, DISCOVER_WEEKLY_NAME);
};

export const getReleaseRadarPlaylist = async (
  accessToken: string
): Promise<SpotifySimplifiedPlaylistObject | undefined> => {
  return await _searchSpotifyOwnedPlaylist(accessToken, RELEASE_RADAR_NAME);
};

export const archivePlaylist = async (
  accessToken: string,
  playlistId: string
): Promise<void> => {
  const currentPlaylist = await _getPlaylist(accessToken, playlistId);
  const me = await _getCurrentUser(accessToken);
  const currentPlaylistTracks = await getPlaylistTracks(accessToken, playlistId);
  const newPlaylist = await _createPlaylist(
    accessToken,
    me.id,
    `${currentPlaylist.name} - ${new Date().toLocaleDateString()}`
  );
  await _addItemsToPlaylist(
    accessToken,
    newPlaylist.id,
    currentPlaylistTracks.map(track => track.uri)
  );
}

export const isPlaylistOwnedBySpotify = (
  playlist: SpotifySimplifiedPlaylistObject
): boolean => {
  return playlist.owner.uri === SPOTIFY_OWNER_URI;
}
