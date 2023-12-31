import { createServerClient } from "@supabase/auth-helpers-remix";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { DecryptedAuthToken } from "~/types/supabase";

export const createSupabaseServerClient = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) =>
  createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLIC_KEY!,
    { request, response },
  );

export const createSupabaseAdminServerClient = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) =>
  createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { request, response },
  );

export const adminUpsertAuthToken = async (
  supabase: SupabaseClient,
  userId: string,
  providerToken: string,
  providerRefreshToken: string,
) => {
  console.log(
    "supabase.server.ts: adminUpsertAuthToken: upserting userId",
    userId,
  );
  const { error: deleteError } = await supabase
    .from("auth_token")
    .delete()
    .eq("user_id", userId);
  if (deleteError) {
    throw deleteError;
  }
  const { data: insertData, error: insertError } = await supabase
    .from("auth_token")
    .insert({
      user_id: userId,
      provider_token: providerToken,
      provider_refresh_token: providerRefreshToken,
    });
  if (insertError) {
    throw insertError;
  }
  console.log(
    "supabase.server.ts: adminUpsertAuthToken: upserted done userId",
    userId,
  );
  return insertData;
};

export const adminGetDecryptedAuthTokenByUserId = async (
  supabase: SupabaseClient,
  userId: string,
): Promise<DecryptedAuthToken> => {
  console.log(
    "supabase.server.ts: adminGetDecryptedAuthTokenByUserId: getting userId",
    userId,
  );
  const { data, error } = await supabase
    .from("decrypted_auth_token")
    .select()
    .eq("user_id", userId)
    .single();
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("No auth token found for user");
  }
  console.log(
    "supabase.server.ts: adminGetDecryptedAuthTokenByUserId: got userId",
    userId,
  );
  return data;
};

export const adminGetAllTrackedPlaylistsForToday = async (
  supabase: SupabaseClient,
) => {
  console.log(
    "supabase.server.ts: adminGetAllTrackedPlaylistsForToday getting",
  );
  const date = new Date();
  const dayOfWeek = ((date.getDay() + 6) % 7) + 1;
  const { data, error } = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("day_of_week", dayOfWeek);
  if (error) {
    throw error;
  }
  console.log(
    `supabase.server.ts: adminGetAllTrackedPlaylistsForToday got ${data?.length} playlists`,
  );
  return data;
};

export const getAllUserTrackedPlaylistsByUserId = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  console.log(
    "supabase.server.ts: getAllUserTrackedPlaylistsByUserId getting for userId",
    userId,
  );
  const userTrackedPlaylists = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("user_id", userId);
  console.log(
    `supabase.server.ts: getAllUserTrackedPlaylistsByUserId got ${userTrackedPlaylists.data?.length}`,
  );
  return userTrackedPlaylists.data;
};

export const createUserTrackedPlaylist = async (
  supabase: SupabaseClient,
  userId: string,
  playlistId: string,
  archiveMode: string,
  dayOfWeek: string,
) => {
  console.log(
    `supabase.server.ts: createUserTrackedPlaylist for userId`,
    userId,
    "playlistId",
    playlistId,
    "archiveMode",
    archiveMode,
    "dayOfWeek",
    dayOfWeek,
  );
  const { data, error } = await supabase.from("user_tracked_playlist").insert({
    playlist_id: playlistId,
    user_id: userId,
    archive_mode: archiveMode,
    day_of_week: dayOfWeek,
  });
  if (error) {
    throw error;
  }
  console.log(`supabase.server.ts: createUserTrackedPlaylist done`);
  return data;
};

export const deleteUserTrackedPlaylist = async (
  supabase: SupabaseClient,
  userId: string,
  playlistId: string,
) => {
  console.log(
    `supabase.server.ts: deleteUserTrackedPlaylist for userId`,
    userId,
    "playlistId",
    playlistId,
  );
  const { data, error } = await supabase
    .from("user_tracked_playlist")
    .delete()
    .eq("playlist_id", playlistId)
    .eq("user_id", userId);
  if (error) {
    throw error;
  }
  console.log(`supabase.server.ts: deleteUserTrackedPlaylist done`);
  return data;
};

export const deleteAllUserData = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  console.log(`supabase.server.ts: deleteAllUserData for userId`, userId);
  console.log(`supabase.server.ts: deleteAllUserData deleting auth_token`);
  let { data, error } = await supabase
    .from("auth_token")
    .delete()
    .eq("user_id", userId);
  if (error) {
    throw error;
  }
  console.log(
    `supabase.server.ts: deleteAllUserData deleting decrypted_auth_token`,
  );
  ({ data, error } = await supabase
    .from("user_tracked_playlist")
    .delete()
    .eq("user_id", userId));
  if (error) {
    throw error;
  }

  console.log(
    `supabase.server.ts: deleteAllUserData deleting user_tracked_playlist_snapshot`,
  );

  ({ data, error } = await supabase
    .from("user_tracked_playlist_snapshot")
    .delete()
    .eq("user_id", userId));
  if (error) {
    throw error;
  }
};
