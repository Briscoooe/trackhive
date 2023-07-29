import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {Database} from "@/app/types/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const authToken = await supabase.auth.exchangeCodeForSession(code);
    const { session } = authToken.data;
    if (!session || !session.provider_token || !session.provider_refresh_token) {
      return NextResponse.redirect("/auth/signin");
    }

    console.log('session', session);
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('spotify_auth_tokens')
      .upsert({ refresh_token: session.provider_refresh_token,
        access_token: session.provider_token,
        updated_at: now,
        user_id: session.user.id }, { onConflict: 'user_id' })
    console.log('data', data);
    console.log('error', error);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
