'use client';
import {SpotifySimplifiedPlaylistObject, SpotifyTrackObject} from "@/app/types";
import Image from "next/image";
import {
  ChevronDownIcon, ChevronUpIcon,
  ClockIcon,
  MusicalNoteIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import {getPlaylistTracks} from "@/app/lib/spotify";
import {useEffect, useState} from "react";
const token =  "BQCKQPap8uERfJ95VRTDnKe1EzYstEqFxKlyjvbbGTa0o0KjLohIg7hAGjkNdpVr90kWpRMMn88xgXaaGJvwNbCUopDTdz13ZlMfN6TawuUtbb6cFE2S2RvWSpLXueoRHBJ2R__S8UqYmWDM3sT1LU8ZiErNshp4O10suD9UwwUgEfywNrqMrChkghPKxcsbVoZg5YxzpctKgFRsyWUfDR2yFG-4YXG95lZvjLqA_3xiblIimeGkW997Rnv1xQLo"

export default function PlaylistRow({ playlist}: { playlist: SpotifySimplifiedPlaylistObject | null}) {
  const [isOpen, setIsOpen] = useState(false)
  const [tracks, setTracks] = useState<SpotifyTrackObject[]>([])
  if (!playlist) {
    return null
  }

  useEffect(() => {
    const getTracks = async () => {
      const tracks = await getPlaylistTracks(token, playlist.id)
      setTracks(tracks)
    }
    if (isOpen && !tracks.length) {
      getTracks()
    }
  }, [isOpen])
  return (
    <div className={'w-full border-1 border-gray-200 flex flex-col rounded-lg px-4 py-2 lg:px-8 lg:py-4  hover:bg-gray-100 transition hover:cursor-pointer'}>
    <div className={'flex flex-row items-start justify-between'}>
        <div className={'flex flex-row items-start justify-start space-x-2'}>
          <Image src={playlist.images[0].url} alt={playlist.name} width={80} height={80} />
          <div className={'flex flex-col space-y-1'}>
          <span className={'text-2xl text-gray-800 leading-6 truncate'}>
            {playlist.name}
          </span>
            <div className={'flex flex-row items-center space-x-1'}>
              <UserIcon className={'text-gray-500 w-4 h-4'}/>
              <span className={'text-md text-gray-500'}>
              {playlist.owner.display_name}
            </span>
            </div>
            <div className={'flex flex-row items-center space-x-1'}>
              <MusicalNoteIcon className={'text-gray-500 h-4 w-4'}/>
              <span className={'text-md text-gray-500'}>
              {playlist.tracks.total}
            </span>
            </div>
          </div>
        </div>
        <div className={'flex flex-row items-center'}>
          <button onClick={()=> setIsOpen(!isOpen)}>
            <ChevronDownIcon className={`text-gray-500 transition h-5 w-5 ${isOpen ? 'rotate-180' : ''}`}/>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className={'space-y-2 border-t-1 mt-3 lg:mt-4 pt-3 lg:pt-4'}>
          {tracks.map((track, index) => (
            <div key={index} className={'flex flex-row items-center justify-between'}>
              <div className={'flex flex-row items-center space-x-3'}>
              <span className={'text-gray-500 text-sm'}>
                {index + 1}
              </span>
                <Image src={track.album.images[0].url} alt={track.name} width={40} height={40} />
                <div className={'flex flex-col'}>
                <span className={'text-md text-gray-800 leading-6 truncate'}>
                  {track.name}
                </span>
                  <div className={'flex flex-row items-center space-x-1'}>
                    <span className={'text-md text-gray-500'}>
                  {track.artists.map((artist, index) => (
                    <span key={index}>
                      {artist.name}
                      {index < track.artists.length - 1 && ', '}
                    </span>
                  ))}
                </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}