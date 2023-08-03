import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PlaylistSearch from "~/components/PlaylistSearch";


export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  //
  // if (!user) {
  //   redirect("/login");
  // }

  // const discoverWeekly: SpotifySimplifiedPlaylistObject | null =
  //   await getDiscoverWeeklyPlaylist(token);
  // const releaseRadar: SpotifySimplifiedPlaylistObject | null =
  //   await getReleaseRadarPlaylist(token);

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {/*<PlaylistSearch />*/}
      {/*<PlaylistRow playlist={discoverWeekly} />*/}
      {/*<PlaylistRow playlist={releaseRadar} />*/}
    </div>
  );
}
