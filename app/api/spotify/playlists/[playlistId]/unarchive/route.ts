import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { archivePlaylist } from "@/app/lib/spotify-client";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.user.id) {
    return NextResponse.redirect("/auth/signin");
  }
  const authCookie = cookies().get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!authCookie) {
    return NextResponse.redirect("/auth/signin");
  }

  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_tracked_playlist")
    .delete()
    .eq("playlist_id", params.playlistId)
    .eq("user_id", user.data.user?.id)
    .throwOnError();
  return NextResponse.json({ data, error });
}
