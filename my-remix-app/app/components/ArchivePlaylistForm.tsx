import {SpotifySimplifiedPlaylistObject} from "~/types/spotify";
import {Form, Link} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {ArchiveBoxIcon} from "@heroicons/react/24/outline";

export function ArchivePlaylistForm({
                                     playlist,
                                     buttonDisabled,
                                   }: {
  playlist: SpotifySimplifiedPlaylistObject;
  buttonDisabled: boolean;
}) {
  return (
      <Form className={"mt-0 sm:mt-6 w-full sm:w-auto"} method={'post'}>
        <input type="hidden" name="playlistId" value={playlist.id}/>
        <Button
          variant={"default"}
          className={"mt-auto flex-1 w-full"}
          type={'submit'}
          disabled={buttonDisabled}
        >
          <>
            <ArchiveBoxIcon className={"w-4 h-4 mr-1"}/>
            <span className={"text-md "}>Archive</span>
          </>
        </Button>
      </Form>
  );
}