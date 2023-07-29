import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/app/types/supabase";
import {SPOTIFY_ACCESS_TOKEN_COOKIE_NAME} from "@/app/constants";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const response = NextResponse.redirect(requestUrl.origin);

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const authToken = await supabase.auth.exchangeCodeForSession(code);
    const { session } = authToken.data;
    if (
      !session ||
      !session.provider_token ||
      !session.provider_refresh_token
    ) {
      return NextResponse.redirect("/auth/signin");
    }
    const { provider_token, provider_refresh_token } = session;

    await supabase
      .from("spotify_auth_tokens")
      .upsert(
        {
          refresh_token: provider_refresh_token,
          access_token: provider_token,
          user_id: session.user.id,
        },
        { onConflict: "user_id" }
      );
    response.cookies.set({
      name:SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
      value: provider_token,
    });
  }

  return response;
}
