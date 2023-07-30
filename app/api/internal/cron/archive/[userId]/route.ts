import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { archivePlaylist, refreshAuthToken } from "@/app/lib/spotify-client";
// https://vercel.com/docs/cron-jobs
export async function GET(request: NextRequest, { params:{ userId } }: { params: { userId: string } }) {
  if (
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL
  ) {
    return NextResponse.json({ message: "ok" });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", userId).single();
  const userTrackedPlaylist = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("user_id", userId)
  if (!userTrackedPlaylist.data?.length) {
    return NextResponse.json({ message: userId });
  }
  const { user_id, decrypted_refresh_token } = userAuthKey.data;
  if (!decrypted_refresh_token) {
    return NextResponse.json({ message: "no refresh token" });
  }
  const accessToken = await refreshAuthToken(decrypted_refresh_token);
  if (!accessToken) {
    return NextResponse.json({ message: "no access token" });
  }
  await supabase
    .from("auth_token")
    .update({ access_token: accessToken })
    .eq("user_id", user_id);
  console.log('access token', accessToken)
  for (const playlist of userTrackedPlaylist.data) {
    const newPlaylist = await archivePlaylist(
      accessToken,
      playlist.playlist_id
    );
    await supabase.from("user_tracked_playlist_snapshot").insert({
      user_id,
      original_playlist_id: playlist.playlist_id,
      user_playlist_id: newPlaylist.id,
    });
  }
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
    }
  );
}
