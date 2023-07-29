import {
  SpotifyEpisodeObject,
  SpotifyPlaylistItemsResponse,
  SpotifyPlaylistSearchResponse,
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types";

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
): Promise<SpotifySimplifiedPlaylistObject | null> => {
  const playlists = await searchPlaylists(accessToken, query);
  if (!playlists) {
    return null;
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
        fields: "items(track(name,artists(name),album(name,images))),next",
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
): Promise<SpotifySimplifiedPlaylistObject | null> => {
  return await _searchSpotifyOwnedPlaylist(accessToken, DISCOVER_WEEKLY_NAME);
};

export const getReleaseRadarPlaylist = async (
  accessToken: string
): Promise<SpotifySimplifiedPlaylistObject | null> => {
  return await _searchSpotifyOwnedPlaylist(accessToken, RELEASE_RADAR_NAME);
};
