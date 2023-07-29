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
} from "@/app/types";
import PlaylistRow from "@/components/PlaylistRow";
import PlaylistSearch from "@/components/PlaylistSearch";

export const dynamic = "force-dynamic";

const token =
  "BQDLIvhPS6nBD-JkGp7R3kI8Qrdaodf8ojIhyyFDRe9Hs-bN2aD42v7QXFzyzFK7sZyuiHHHy6eW21Pi-fnHivZ6fGIXYDko1cguSCm0aOHc42Vosh7co1G70v8xhwEZOQHISr9z0cXKXyzmCsG6RmaR4GdUn9ndRSei-EE1HcapEtA1Nube7LFwst0vWGsxrFjN6T868hyJ-esabRgmzKmGSX9GzouxQ3Hf3HDmLEh7vYCQZDEnSiGWcvraue0R";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const discoverWeekly: SpotifySimplifiedPlaylistObject | null =
    await getDiscoverWeeklyPlaylist(token);
  const releaseRadar: SpotifySimplifiedPlaylistObject | null =
    await getReleaseRadarPlaylist(token);

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <PlaylistSearch />
      {/*<PlaylistRow playlist={discoverWeekly} />*/}
      {/*<PlaylistRow playlist={releaseRadar} />*/}
    </div>
  );
}
