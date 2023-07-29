import {SpotifySimplifiedPlaylistObject} from "@/app/types";
import Image from "next/image";
import { PersonIcon} from '@radix-ui/react-icons'
export default function PlaylistRow({ playlist}: { playlist: SpotifySimplifiedPlaylistObject | null}) {
  if (!playlist) {
    return null
  }
  return (
    <div className={'w-full border-1 border-gray-200 rounded-lg px-8 py-4 flex flex-row items-center justify-between'}>
      <div className={'flex flex-row items-start justify-start space-x-2'}>
        <Image src={playlist.images[0].url} alt={playlist.name} width={80} height={80} />
        <div className={'flex flex-col space-y-1'}>
          <span className={'text-2xl text-gray-800'}>
            {playlist.name}
          </span>
          <div className={'flex flex-row items-center space-x-1'}>
            <PersonIcon className={'text-gray-500 stroke-2'}/>
          <span className={'text-md text-gray-500'}>
            {playlist.owner.display_name}
          </span>
          </div>
        </div>
      </div>
    </div>
  )
}