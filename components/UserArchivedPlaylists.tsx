'use client';
import {useQuery} from "@tanstack/react-query";
import {
  USER_ARCHIVED_DATABASE_ROWS_KEY,
  USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY
} from "@/store/keys";
import {
  getSpotifyUserAchivesQuery,
} from "@/store/queries";
import PlaylistRow from "@/components/PlaylistRow";

export default function UserArchivedPlaylists() {
  const { data: archivedPlaylists } = useQuery({
    queryKey: [USER_ARCHIVED_DATABASE_ROWS_KEY],
    queryFn: getSpotifyUserAchivesQuery,
  });
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      {archivedPlaylists && archivedPlaylists.map((archivedPlaylist, index) => (
        <PlaylistRow
          playlist={archivedPlaylist}
          key={index}
          isArchived={true}
        />
      ))}
    </div>
  );
}