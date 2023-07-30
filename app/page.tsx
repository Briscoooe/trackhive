import { cookies } from "next/headers";
import {
  createClientComponentClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs";
import { SpotifySimplifiedPlaylistObject } from "@/app/types/spotify";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";
import { NextResponse } from "next/server";
import PlaylistRow from "@/components/PlaylistRow";
import useGetUserArchivesQuery from "@/hooks/useGetUerArchivesQuery";
import {useState} from "react";
import {getPlaylist} from "@/app/lib/spotify-client";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const userArchives = await supabase
    .from("user_archives")
    .select()
    .eq("user_id", user.data.user?.id);

  const playlists = []
  const authCookie = cookies().get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!authCookie) {
    return NextResponse.redirect("/login");
  }
  for (const userArchive of userArchives.data) {
    const playlistData = await getPlaylist(authCookie, userArchive.playlist_id)
    playlists.push(playlistData)
  }
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {playlists.map((playlist, index) => (
        <PlaylistRow
          playlist={playlist}
          key={index}
          isArchived={true}
        />
      ))}
    </div>
  );
}
