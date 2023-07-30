import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {createClient} from "@supabase/supabase-js";
import {refreshAuthToken} from "@/app/lib/spotify-client";
// https://vercel.com/docs/cron-jobs
export async function GET(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const userTrackedPlaylist = await supabase.from('user_tracked_playlist').select()
  const authKeys = await supabase.from('decrypted_auth_token').select();
  const firstUser = authKeys.data?.[0];
  if (!firstUser) {
    return NextResponse.json({message: 'ok'});
  }
  const { user_id, decrypted_refresh_token } = firstUser;
  console.log('de', decrypted_refresh_token)
  const accessToken = await refreshAuthToken(decrypted_refresh_token)
  await supabase.from('auth_token').update({ access_token: accessToken}).eq('user_id', user_id)
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
      rows: userTrackedPlaylist,
      // authKeys,
      str: accessToken,
    },
    {
      status: 200,
    },
  );
}
