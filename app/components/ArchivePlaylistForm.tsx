import { SpotifySimplifiedPlaylistObject } from "~/types/spotify";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { useNavigation } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { ARCHIVE_MODE_ENDLESS, ARCHIVE_MODE_SNAPSHOT } from "~/lib/constants";
import { useState } from "react";
import { UserTrackedPlaylist } from "~/types/supabase";

const daysOfWeek = [
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
  { value: "7", label: "Sunday" },
];
const archiveModes = [
  {
    value: ARCHIVE_MODE_SNAPSHOT,
    label: "Weekly snapshot (New playlist every week)",
  },
  {
    value: ARCHIVE_MODE_ENDLESS,
    label: "Endless playlist (Adds to same playlist over time)",
  },
];

export function ArchivePlaylistForm({
  playlist,
  buttonDisabled,
  userTrackedPlaylist,
}: {
  playlist: SpotifySimplifiedPlaylistObject;
  buttonDisabled: boolean;
  userTrackedPlaylist?: UserTrackedPlaylist | null;
}) {
  const navigation = useNavigation();
  const [dayOfWeek, setDayOfWeek] = useState(daysOfWeek[0].value);
  const [archiveMode, setArchiveMode] = useState(archiveModes[0].value);
  const isArchived = !!userTrackedPlaylist;
  return (
    <div className={"w-full sm:w-auto"}>
      {!isArchived ? (
        <Dialog>
          <DialogTrigger className={"w-full"}>
            <Button
              value={"archive"}
              variant={"default"}
              className={"mt-auto flex-1 w-full"}
              disabled={buttonDisabled}
            >
              <>
                <BookmarkIcon className={"w-4 h-4 mr-1"} />
                <span className={"text-md"}>Start tracking</span>
              </>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={"text-left"}>
                Start tracking {playlist.name}
              </DialogTitle>
              <DialogDescription>
                <Form
                  className={"text-left flex flex-col space-y-4 mt-2"}
                  method={"post"}
                  action={`/playlists/${playlist.id}/archive`}
                >
                  <input type="hidden" name="playlistId" value={playlist.id} />
                  <div className={"flex flex-col space-y-2"}>
                    <Label htmlFor="dayOfWeek">Check for updates every</Label>
                    <Select
                      name={"dayOfWeek"}
                      value={dayOfWeek}
                      onValueChange={setDayOfWeek}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          id={"dayOfWeek"}
                          placeholder="Day of week"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={"flex flex-col space-y-2"}>
                    <Label htmlFor="archiveMode">Save tracks as </Label>
                    <Select
                      name={"archiveMode"}
                      value={archiveMode}
                      onValueChange={setArchiveMode}
                    >
                      <SelectTrigger className="whitespace-nowrap">
                        <SelectValue
                          className={"whitespace-nowrap"}
                          id={"archiveMode"}
                          placeholder="Snapshot"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {archiveModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant={"default"}
                    className={"mt-auto flex-1 w-full text-md"}
                    disabled={buttonDisabled}
                    type={"submit"}
                  >
                    Start tracking
                  </Button>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Form method={"post"} action={`/playlists/${playlist.id}/unarchive`}>
          <input type="hidden" name="playlistId" value={playlist.id} />
          <Button
            variant={"outline"}
            className={"mt-auto flex-1 w-full"}
            type={"submit"}
            disabled={buttonDisabled}
          >
            <>
              <BookmarkSlashIcon className={"w-4 h-4 text-red-500 mr-1"} />
              <span className={"text-md "}>Stop tracking</span>
            </>
          </Button>
        </Form>
      )}
    </div>
  );
}