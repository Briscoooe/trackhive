import type {
  SpotifyPlaylistItemsResponse,
  SpotifyPlaylistSearchResponse,
  SpotifyPlaylistTrackObject,
  SpotifySimplifiedPlaylistObject,
  SpotifyUserObject,
} from "app/types/spotify";
import {
  SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
  SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
  SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
} from "~/lib/constants";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/api";
export const SPOTIFY_OWNER_URI = "spotify:user:spotify";

const _serializePlaylist = (
  json: SpotifySimplifiedPlaylistObject,
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

const _recursivelyGetPlaylistTracks = async (
  accessToken: string,
  playlistId: string,
  url: string = "",
): Promise<SpotifyPlaylistItemsResponse> => {
  const endpoint =
    url ||
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?${new URLSearchParams(
      {
        fields:
          "items(added_at,track(id,name,uri,artists(name),album(name,images))),next",
        limit: "50",
      },
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
      data.next,
    );
    data.items = [...data.items, ...nextData.items];
  }
  return data;
};

const _createPlaylist = async (
  accessToken: string,
  userId: string,
  name: string,
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
    },
  );
  return response.json();
};

const _addItemsToPlaylist = async (
  accessToken: string,
  playlistId: string,
  uris: string[],
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
  refreshToken: string,
): Promise<string> => {
  const res = await fetch(`${SPOTIFY_AUTH_BASE_URL}/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
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
  playlistId: string,
): Promise<SpotifySimplifiedPlaylistObject> => {
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return _serializePlaylist(await response.json());
};

export const _getCurrentUser = async (
  accessToken: string,
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
  playlistId: string,
): Promise<SpotifyPlaylistTrackObject[]> => {
  const { items } = await _recursivelyGetPlaylistTracks(
    accessToken,
    playlistId,
  );
  // Filter out podcasts
  // @ts-ignore
  return items.filter(
    (item: SpotifyPlaylistTrackObject) => item.track && item.track.album,
  );
};

export const archivePlaylist = async (
  accessToken: string,
  playlistId: string,
): Promise<SpotifySimplifiedPlaylistObject> => {
  const currentPlaylist = await getPlaylist(accessToken, playlistId);
  const me = await _getCurrentUser(accessToken);
  const currentPlaylistTracks = await getPlaylistTracks(
    accessToken,
    playlistId,
  );
  const dateFormatYYYYMMDD = new Date().toISOString().split("T")[0];
  const newPlaylist = await _createPlaylist(
    accessToken,
    me.id,
    `[Trackhive] ${currentPlaylist.name} - ${dateFormatYYYYMMDD}`,
  );
  await _addItemsToPlaylist(
    accessToken,
    newPlaylist.id,
    currentPlaylistTracks.map((track) => track.track.uri),
  );
  return newPlaylist;
};

export const searchPlaylists = async (
  accessToken: string,
  query: string,
  limit: number = 10,
): Promise<SpotifyPlaylistSearchResponse | null> => {
  if (!query) {
    return null;
  }
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/search?${new URLSearchParams({
      q: query,
      type: "playlist",
      limit: limit.toString(),
    })}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const res = await response.json();
  const { playlists } = res;
  playlists.items = playlists.items.map(_serializePlaylist);
  return playlists;
};

export const getSuggestedPlaylists = async (
  accessToken: string,
): Promise<SpotifySimplifiedPlaylistObject[] | null> => {
  const responses = await Promise.all([
    searchPlaylists(accessToken, SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME, 1),
    searchPlaylists(accessToken, SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME, 1),
    searchPlaylists(accessToken, SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME, 1),
  ]);

  const playlists = [];
  for (const response of responses) {
    if (response) {
      playlists.push(response.items[0]);
    }
  }
  return playlists;
};
