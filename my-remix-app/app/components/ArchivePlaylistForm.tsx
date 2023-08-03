import {SpotifySimplifiedPlaylistObject} from "~/types/spotify";
import {Form} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {ArchiveBoxIcon, TrashIcon} from "@heroicons/react/24/outline";

export function ArchivePlaylistForm({
  playlist,
  buttonDisabled,
  isArchived = false,
}: {
  playlist: SpotifySimplifiedPlaylistObject;
  buttonDisabled: boolean;
  isArchived?: boolean;
}) {
  return (
    <Form className={"mt-0 sm:mt-6 w-full sm:w-auto"} method={"post"}>
      <input type="hidden" name="playlistId" value={playlist.id} />
      {!isArchived ? (
        <Button
          name={"action"}
          value={"unarchive"}
          variant={"default"}
          className={"mt-auto flex-1 w-full"}
          type={"submit"}
          disabled={buttonDisabled}
        >
          <>
            <ArchiveBoxIcon className={"w-4 h-4 mr-1"} />
            <span className={"text-md "}>Archive</span>
          </>
        </Button>
      ) : (
        <Button
          name={"action"}
          value={"unarchive"}
          variant={"outline"}
          className={"mt-auto flex-1 w-full"}
          type={"submit"}
          disabled={buttonDisabled}
        >
          <>
            <TrashIcon className={"w-4 h-4 text-red-500 mr-1"} />
            <span className={"text-md "}>Unarchive</span>
          </>
        </Button>
      )}
    </Form>
  );
}
