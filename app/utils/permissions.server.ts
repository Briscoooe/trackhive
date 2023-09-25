import { createCookie, redirect } from "@remix-run/node";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export const requireSupabaseSession = async (
  supabase: SupabaseClient,
): Promise<Session> => {
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    await supabase.auth.signOut();
    const cookie = createCookie(`sb-${process.env.SUPABASE_APP_ID}-auth-token`);
    throw redirect("/", {
      headers: {
        "Set-Cookie": await cookie.serialize(null),
      },
    });
  }
  return session.data.session;
};
