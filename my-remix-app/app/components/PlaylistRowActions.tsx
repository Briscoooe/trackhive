import {SpotifySimplifiedPlaylistObject} from "~/types/spotify";
import {Form} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {ArchiveBoxIcon} from "@heroicons/react/24/outline";

export function PlaylistRowActions({
                                     playlist,
                                     isArchived,
                                   }: {
  playlist: SpotifySimplifiedPlaylistObject;
  isArchived: boolean;
}) {
  // const queryClient = useQueryClient();
  // const handleArchiveMutation = useMutation({
  //   mutationFn: () => archiveSpotifyPlaylistMutation(playlist.id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
  //       exact: true,
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_DATABASE_ROWS_KEY],
  //       exact: true,
  //     });
  //   },
  // });

  // const handleUnarchiveMutation = useMutation({
  //   mutationFn: () => unarchiveSpotifyPlaylistMutation(playlist.id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
  //       exact: true,
  //       refetchType: "active",
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: [USER_ARCHIVED_DATABASE_ROWS_KEY],
  //       exact: true,
  //     });
  //   },
  // });
  return (
    <div
      className={
        "flex flex-row sm:flex-col items-end justify-between w-full sm:w-auto sm:justify-end"
      }
    >
      <div>
        {/*<button onClick={() => setIsOpen(!isOpen)}>*/}
        {/*  <ChevronDownIcon*/}
        {/*    className={`text-gray-500 transition h-5 w-5 ${*/}
        {/*      isOpen ? "rotate-180" : ""*/}
        {/*    }`}*/}
        {/*  />*/}
        {/*</button>*/}
      </div>
      <Form className={"mt-0 sm:mt-6"} method={'post'}>
        <input type="hidden" name="playlistId" value={playlist.id}/>
        <Button
          variant={"default"}
          className={"mt-auto flex-1"}
          type={'submit'}
        >
          <>
            <ArchiveBoxIcon className={"w-4 h-4 mr-1"}/>
            <span className={"text-md "}>Archive</span>
          </>
        </Button>
      </Form>
    </div>
  );
}