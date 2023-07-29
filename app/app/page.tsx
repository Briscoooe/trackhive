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

const token =  "BQDOTIE_nhZYsQr2KkC2yNIC-qF7KY1X9l9bpv1gfUWtKHj3R844SWwomNp0qxm3rI2Ko97yKJAqAsUIpPkgX2fElfjh30Rqw1DHt5xJ_4YDisNG92MGLy6LjvYSZq5dStca8H571SVoeHPFsxTupSPSqgw3xhWSGSvYnjcORCoJDgdl3mPjI7L9x5p3siVmIhKA0_4oGO2MgNgbanZ1seHWaaMvQGSbQzv6DC623p3xNwl_99RhQmRJohvVwtX2"

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
  const releaseRadarTracks = await getPlaylistTracks(token, releaseRadar?.id as string)

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <PlaylistRow playlist={discoverWeekly} />
      <PlaylistRow playlist={releaseRadar} />
      {releaseRadarTracks && (
        <>
          <span>Release readar tracks</span>
          {releaseRadarTracks.map((track: SpotifyTrackObject) => {
            return (
              <div key={track.id}>
                {track.name}
              </div>
            )
          })}
        </>
      )
      }
    </div>
  )
}
