import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SpotifySimplifiedPlaylistObject } from "@/app/types/spotify";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";
import { NextResponse } from "next/server";
import PlaylistRow from "@/components/PlaylistRow";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const archives = await supabase
    .from("user_archives")
    .select("*")
    .eq("user_id", user.data.user?.id);
  // const playlists: SpotifySimplifiedPlaylistObject[] = [];
  const authCookie = cookies().get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!authCookie) {
    return null;
  }

  // for (const archive of archives.data) {
  //   const playlistData = await getPlaylist(authCookie, archive.playlist_id)
  //   playlists.push(playlistData);
  // }
  return (
    <div className="w-full flex flex-col items-center">
      {
        // playlists?.map((archive: SpotifySimplifiedPlaylistObject) => <PlaylistRow playlist={archive} />)
      }
    </div>
  );
}
