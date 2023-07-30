import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  getDiscoverWeeklyPlaylist,
  getReleaseRadarPlaylist,
  getPlaylistTracks,
} from "@/app/lib/spotify-client";
import {
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types/spotify";
import PlaylistRow from "@/components/PlaylistRow";
import PlaylistSearch from "@/components/PlaylistSearch";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // const discoverWeekly: SpotifySimplifiedPlaylistObject | null =
  //   await getDiscoverWeeklyPlaylist(token);
  // const releaseRadar: SpotifySimplifiedPlaylistObject | null =
  //   await getReleaseRadarPlaylist(token);

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <PlaylistSearch />
      {/*<PlaylistRow playlist={discoverWeekly} />*/}
      {/*<PlaylistRow playlist={releaseRadar} />*/}
    </div>
  );
}
