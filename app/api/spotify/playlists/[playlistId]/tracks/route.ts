import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";
import { getPlaylistTracks } from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  const requestUrl = new URL(request.url);
  console.log(request);
  const authCookie = cookies().get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!authCookie) {
    return NextResponse.redirect("/auth/signin");
  }

  const playlists = await getPlaylistTracks(authCookie, params.playlistId);
  return NextResponse.json(playlists);
}
