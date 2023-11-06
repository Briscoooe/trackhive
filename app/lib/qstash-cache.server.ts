import type {
  SpotifyPlaylistTrackObject,
  SpotifySimplifiedPlaylistObject,
} from "~/types/spotify";
import { Redis } from "~/lib/redis.server";

const PLAYLIST_TRACKS_CACHE_KEY = "playlist_tracks";
const PLAYLIST_CACHE_KEY = "playlist";

const redis = new Redis(
  process.env.QSTASH_REDIS_URL,
  process.env.QSTASH_REDIS_REST_TOKEN,
);

export const getCachedPlaylistTracks = async (
  playlistId: string,
): Promise<SpotifyPlaylistTrackObject[] | undefined> => {
  // try {
  //   const cached = await redis.get(
  //     `${PLAYLIST_TRACKS_CACHE_KEY}:${playlistId}`,
  //   );
  //   if (cached) {
  //     console.log("qstash-cache.server.ts: getCachedPlaylistTracks: cache hit");
  //     return cached as SpotifyPlaylistTrackObject[];
  //   }
  //   console.log("qstash-cache.server.ts: getCachedPlaylistTracks: cache miss");
  // } catch (e) {
  //   console.log("qstash-cache.server.ts: getCachedPlaylistTracks: error", e);
  // }
  return undefined;
};

export const setCachedPlaylistTracks = async (
  playlistId: string,
  tracks: SpotifyPlaylistTrackObject[],
): Promise<void> => {
  try {
    await redis.set(`${PLAYLIST_TRACKS_CACHE_KEY}:${playlistId}`, tracks);
  } catch (e) {
    console.log("qstash-cache.server.ts: setCachedPlaylistTracks: error", e);
  }
};

export const getCachedPlaylist = async (
  playlistId: string,
): Promise<SpotifySimplifiedPlaylistObject | undefined> => {
  // try {
  //   const cached = await redis.get(`${PLAYLIST_CACHE_KEY}:${playlistId}`);
  //   if (cached) {
  //     console.log("qstash-cache.server.ts: getCachedPlaylist: cache hit");
  //     return cached as SpotifySimplifiedPlaylistObject;
  //   }
  //   console.log("qstash-cache.server.ts: getCachedPlaylist: cache miss");
  // } catch (e) {
  //   console.log("qstash-cache.server.ts: getCachedPlaylist: error", e);
  // }
  return undefined;
};

export const setCachedPlaylist = async (
  playlistId: string,
  playlist: SpotifySimplifiedPlaylistObject,
): Promise<void> => {
  try {
    await redis.set(`${PLAYLIST_CACHE_KEY}:${playlistId}`, playlist);
  } catch (e) {
    console.log("qstash-cache.server.ts: setCachedPlaylist: error", e);
  }
};
