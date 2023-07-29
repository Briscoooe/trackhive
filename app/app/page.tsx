import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {
  getDiscoverWeeklyPlaylist,
  getReleaseRadarPlaylist,
  getPlaylistTracks
} from "@/app/lib/spotify";
import {
  SpotifySimplifiedPlaylistObject,
  SpotifyTrackObject
} from "@/app/types";
import PlaylistRow from "@/components/PlaylistRow";

export const dynamic = 'force-dynamic'

const token =  "BQCKQPap8uERfJ95VRTDnKe1EzYstEqFxKlyjvbbGTa0o0KjLohIg7hAGjkNdpVr90kWpRMMn88xgXaaGJvwNbCUopDTdz13ZlMfN6TawuUtbb6cFE2S2RvWSpLXueoRHBJ2R__S8UqYmWDM3sT1LU8ZiErNshp4O10suD9UwwUgEfywNrqMrChkghPKxcsbVoZg5YxzpctKgFRsyWUfDR2yFG-4YXG95lZvjLqA_3xiblIimeGkW997Rnv1xQLo"

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()


  if (!user) {
    redirect('/login')
  }

  const discoverWeekly: SpotifySimplifiedPlaylistObject | null = await getDiscoverWeeklyPlaylist(token)
  const releaseRadar: SpotifySimplifiedPlaylistObject | null = await getReleaseRadarPlaylist(token)

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <PlaylistRow playlist={discoverWeekly} />
      <PlaylistRow playlist={releaseRadar} />
    </div>
  )
}
