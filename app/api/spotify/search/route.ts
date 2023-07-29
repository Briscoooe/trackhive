import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {SPOTIFY_ACCESS_TOKEN_COOKIE_NAME} from "@/app/constants";
import {searchPlaylists} from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const query = requestUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.next();
  }
  const authCookie = cookies().get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!authCookie) {
    return NextResponse.redirect("/auth/signin");
  }

  const playlists = await searchPlaylists(authCookie, query);
  return NextResponse.json(playlists);
}
