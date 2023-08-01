import {
  SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
  SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
  SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
  SPOTIFY_PLAYLIST_TODAYS_TOP_HITS_NAME
} from "~/lib/constants";
import {Badge} from "~/components/ui/badge";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";
import {Form} from "@remix-run/react";

export function PlaylistSearchSuggestions({
  onClick,
                                          }: {
  onClick: (playlistName: string) => void;
}) {
  return (
    <Form className={"flex flex-col items-center space-y-2"} method="get">
      {[
        SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
        SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
        SPOTIFY_PLAYLIST_TODAYS_TOP_HITS_NAME,
        SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
      ].map((playlistName: string) => (
        <button name={'query'} value={playlistName} key={playlistName} className={'w-full'}>
          <Badge
            key={playlistName}
            className={
              "cursor-pointer w-full text-sm whitespace-nowrap flex justify-between"
            }
            onClick={() => onClick(playlistName)}
          >
            <span>{playlistName}</span>
            <CheckBadgeIcon className={"h-4 w-4 ml-1 text-green-500"}/>
          </Badge>
        </button>
      ))}
    </Form>
  );
}