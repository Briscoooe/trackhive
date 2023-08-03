import {
  SpotifyPlaylistItemsResponse,
  SpotifyPlaylistSearchResponse,
  SpotifyPlaylistTrackObject,
  SpotifySimplifiedPlaylistObject,
  SpotifyUserObject,
} from "app/types/spotify";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/api";
export const SPOTIFY_OWNER_URI = "spotify:user:spotify";

const _serializePlaylist = (
  json: SpotifySimplifiedPlaylistObject
): SpotifySimplifiedPlaylistObject => {
  const { owner, ...rest } = json;
  const newOwner = {
    ...owner,
    is_spotify: owner.uri === SPOTIFY_OWNER_URI,
  };
  return {
    ...rest,
    owner: newOwner,
  };
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
  const result = items.find(
    (playlist) => playlist.owner.uri === SPOTIFY_OWNER_URI
  );
  if (!result) {
    return;
  }
  return _serializePlaylist(result);
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
        fields:
          "items(added_at,track(name,uri,artists(name),album(name,images))),next",
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
};

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
};

export const refreshAuthToken = async (
  refreshToken: string
): Promise<string | undefined> => {
  const res = await fetch(`${SPOTIFY_AUTH_BASE_URL}/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await res.json();
  return data.access_token;
};

export const getPlaylist = async (
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
  return _serializePlaylist(await response.json());
};

export const _getCurrentUser = async (
  accessToken: string
): Promise<SpotifyUserObject> => {
  const response = await fetch(`${SPOTIFY_API_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};
export const getPlaylistTracks = async (
  accessToken: string,
  playlistId: string
): Promise<SpotifyPlaylistTrackObject[]> => {
  const { items } = await _recursivelyGetPlaylistTracks(
    accessToken,
    playlistId
  );
  return items;
};

export const archivePlaylist = async (
  accessToken: string,
  playlistId: string
): Promise<SpotifySimplifiedPlaylistObject> => {
  const currentPlaylist = await getPlaylist(accessToken, playlistId);
  const me = await _getCurrentUser(accessToken);
  const currentPlaylistTracks = await getPlaylistTracks(
    accessToken,
    playlistId
  );
  const dateFormatYYYYMMDD = new Date().toISOString().split("T")[0];
  const newPlaylist = await _createPlaylist(
    accessToken,
    me.id,
    `[Trackhive] ${currentPlaylist.name} - ${dateFormatYYYYMMDD}`
  );
  await _addItemsToPlaylist(
    accessToken,
    newPlaylist.id,
    currentPlaylistTracks.map((track) => track.track.uri)
  );
  return newPlaylist;
};

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
  const res = await response.json();
  const { playlists } = res;
  playlists.items = playlists.items.map(_serializePlaylist);
  return playlists;
};