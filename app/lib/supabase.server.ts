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
  const { data, error } = await supabase
    .from("auth_token")
    .upsert(
      {
        user_id: userId,
        provider_token: providerToken,
        provider_refresh_token: providerRefreshToken,
      },
      { onConflict: "user_id" },
    )
    .select();
  if (error) {
    throw error;
  }
  return data;
};
export const adminGetDecryptedAuthTokenByUserId = async (
  supabase: SupabaseClient,
  userId: string,
): Promise<DecryptedAuthToken> => {
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
  return data;
};
export const adminGetAllTrackedPlaylistsForToday = async (
  supabase: SupabaseClient,
) => {
  const date = new Date();
  const dayOfWeek = ((date.getDay() + 6) % 7) + 1;
  const { data, error } = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("day_of_week", dayOfWeek);
  if (error) {
    throw error;
  }
  return data;
};
export const getAllUserTrackedPlaylistsByUserId = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const userTrackedPlaylists = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("user_id", userId);
  return userTrackedPlaylists.data;
};

export const createUserTrackedPlaylist = async (
  supabase: SupabaseClient,
  userId: string,
  playlistId: string,
  archiveMode: string,
  dayOfWeek: string,
) => {
  const { data, error } = await supabase.from("user_tracked_playlist").insert({
    playlist_id: playlistId,
    user_id: userId,
    archive_mode: archiveMode,
    day_of_week: dayOfWeek,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const deleteUserTrackedPlaylist = async (
  supabase: SupabaseClient,
  userId: string,
  playlistId: string,
) => {
  const { data, error } = await supabase
    .from("user_tracked_playlist")
    .delete()
    .eq("playlist_id", playlistId)
    .eq("user_id", userId);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteAllUserData = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  let { data, error } = await supabase
    .from("auth_token")
    .delete()
    .eq("user_id", userId);
  if (error) {
    throw error;
  }
  ({ data, error } = await supabase
    .from("user_tracked_playlist")
    .delete()
    .eq("user_id", userId));
  if (error) {
    throw error;
  }
  ({ data, error } = await supabase
    .from("user_tracked_playlist_snapshot")
    .delete()
    .eq("user_id", userId));
  if (error) {
    throw error;
  }
};
