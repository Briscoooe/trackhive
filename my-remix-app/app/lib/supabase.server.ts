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

export const getCurrentUserAccessToken = async ({
  supabase,
}: {
  supabase: ReturnType<typeof createSupabaseServerClient>;
}): Promise<string | undefined | null> => {
  const session = await supabase.auth.getSession();
  if (!session) {
    return;
  }
  return session.data.session?.provider_token;

  // const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", user?.id).single();
  // console.log('user auth key', userAuthKey)
  // const { decrypted_refresh_token } = userAuthKey.data;

  // console.log('token', userAuthKey)
  // console.log('QUERy, ', query)
  // console.log('token access', userAuthKey)
};

export const getUserArchives = async (
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
  await supabase.from("user_tracked_playlist").insert({
    playlist_id: playlistId,
    user_id: playlistId,
  });
};
