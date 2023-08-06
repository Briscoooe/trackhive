import type { UserTrackedPlaylist } from "~/types/supabase";
import { ARCHIVE_MODE_ENDLESS, ARCHIVE_MODE_SNAPSHOT } from "~/lib/constants";
import { CheckIcon } from "@heroicons/react/24/outline";

const dayOfWeekMap = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

export function UserTrackedPlaylistInformation({
  userTrackedPlaylist,
}: {
  userTrackedPlaylist?: UserTrackedPlaylist | null;
}) {
  if (!userTrackedPlaylist) {
    return null;
  }
  const getUserTrackedPlaylistString = (
    userTrackedPlaylist: UserTrackedPlaylist,
  ) => {
    if (userTrackedPlaylist.archive_mode.toString() === ARCHIVE_MODE_SNAPSHOT) {
      return (
        <span>
          <span className={"font-medium"}>New playlist</span> every{" "}
          <span className={"font-medium"}>
            {dayOfWeekMap[userTrackedPlaylist.day_of_week]}
          </span>
        </span>
      );
    }
    if (userTrackedPlaylist.archive_mode.toString() === ARCHIVE_MODE_ENDLESS) {
      return (
        <span>
          <span className={"font-medium"}>Add tracks</span> to same playlist
          every{" "}
          <span className={"font-medium"}>
            {dayOfWeekMap[userTrackedPlaylist.day_of_week]}
          </span>
        </span>
      );
    }
    return null;
  };
  return (
    <span
      className={
        "flex w-full flex-row items-center border-y-1 border-slate-100 py-2 text-sm text-slate-600"
      }
    >
      <CheckIcon className={"mr-1 inline-block h-4 w-4 text-slate-500"} />
      {getUserTrackedPlaylistString(userTrackedPlaylist)}
    </span>
  );
}
