import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";
import {getPlaylist, getPlaylistTracks} from "@/app/lib/spotify-client";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  const authCookie = cookies().get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!authCookie) {
    return NextResponse.redirect("/auth/signin");
  }

  const playlists = await getPlaylist(authCookie, params.playlistId);
  return NextResponse.json(playlists);
}
