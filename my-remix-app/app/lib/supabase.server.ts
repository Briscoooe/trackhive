import { createServerClient } from "@supabase/auth-helpers-remix";
import { SupabaseClient } from "@supabase/supabase-js";

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
    { request, response }
  );

export const getAllUserTrackedPlaylists = async (
  supabase: SupabaseClient,
  userId: string
) => {
  const userArchives = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("user_id", userId);
  return userArchives.data;
};

export const createUserTrackedPlaylist = async (
  supabase: SupabaseClient,
  userId: string,
  playlistId: string
) => {
  const { data, error } = await supabase.from("user_tracked_playlist").insert({
    playlist_id: playlistId,
    user_id: userId,
  });
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const deleteUserTrackedPlaylist = async (
  supabase: SupabaseClient,
  userId: string,
  playlistId: string
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
