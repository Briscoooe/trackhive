import {
  SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
  SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
  SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
  SPOTIFY_PLAYLIST_TODAYS_TOP_HITS_NAME
} from "~/lib/constants";
import {Badge} from "~/components/ui/badge";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";

export function PlaylistSearchSuggestions({
                                            searchText,
                                            setSearchText,
                                          }: {
  searchText: string;
  setSearchText: (text: string) => void;
}) {
  if (searchText) {
    return null;
  }
  return (
    <div className={"flex flex-col items-center space-y-2"}>
      {[
        SPOTIFY_PLAYLIST_RELEASE_RADAR_NAME,
        SPOTIFY_PLAYLIST_DISCOVER_WEEKLY_NAME,
        SPOTIFY_PLAYLIST_TODAYS_TOP_HITS_NAME,
        SPOTIFY_PLAYLIST_RAP_CAVIAR_NAME,
      ].map((playlistName: string) => (
        <Badge
          key={playlistName}
          className={
            "cursor-pointer w-full text-sm whitespace-nowrap flex justify-between"
          }
          onClick={() => setSearchText(playlistName)}
        >
          <span>{playlistName}</span>
          <CheckBadgeIcon className={"h-4 w-4 ml-1 text-green-500"}/>
        </Badge>
      ))}
    </div>
  );
}