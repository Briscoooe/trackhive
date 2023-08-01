import { createServerClient } from "@supabase/auth-helpers-remix";
import {refreshAuthToken} from "~/lib/spotify-client";

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
}): Promise<string | undefined> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", user?.id).single();
  // console.log('user auth key', userAuthKey)
  // const { decrypted_refresh_token } = userAuthKey.data;

  // console.log('token', userAuthKey)
  // console.log('QUERy, ', query)
  // console.log('token access', userAuthKey)
  return refreshAuthToken("AQCx63LCyp0FrXULF7nLioxUnhWPPIVdHPw4Veptl4CcM15EWgNGwRVlOVAQRQ2jFy30Mc3l4JeDZ8iHStbJMrXDhTtJQ3AkDHvxFqel85kqCJkFSQmbbOBqaH0BLrbe2wU")
}