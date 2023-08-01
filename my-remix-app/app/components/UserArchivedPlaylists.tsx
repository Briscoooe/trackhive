import PlaylistRow from "~/components/PlaylistRow";
import {getSpotifyUserAchivesQuery} from "~/store/queries";
import {LoaderArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  const archives = await getSpotifyUserAchivesQuery();
  console.log("archives", archives)
  return {
    archives,
  }
}
export default function UserArchivedPlaylists() {
  const archives = useLoaderData<typeof loader>();
  console.log('archives', archives)
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      {/*{archives &&*/}
      {/*  archives.map((archivedPlaylist, index) => (*/}
      {/*    <PlaylistRow*/}
      {/*      playlist={archivedPlaylist}*/}
      {/*      key={archivedPlaylist.id}*/}
      {/*      isArchived={true}*/}
      {/*    />*/}
      {/*  ))}*/}
    </div>
  );
}
