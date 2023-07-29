import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  getDiscoverWeeklyPlaylist,
  getReleaseRadarPlaylist,
  getPlaylistTracks,
} from "@/app/lib/spotify";
import {
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject,
} from "@/app/types/spotify";
import PlaylistRow from "@/components/PlaylistRow";
import PlaylistSearch from "@/components/PlaylistSearch";

export const dynamic = "force-dynamic";

const token =
  "BQAt_8ahSNncLZnfZWT8shQvdaF3VnrkZsJAS_1szbcZ570pY8Rineh7-sLTkp_kKU51dp8btaJzHAhTcs5H3-BNfJ4b_1dJ34x4ks97k-y3kJMbOVnY9TJCCwMId7SGXnfOCBZTds70IEUaI7Z9PxNUjn6uPtRC4gPiNWWuGN6n-43cGkUkm3qCZdrh1MoFu11PkYkXhihmyiDtOhMlU7erYCXk6Q5Bw2Ke8OtsPUZI8j963uEO3_nG3VouJZpc";

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
