import {
  createUserTrackedPlaylist,
  deleteUserTrackedPlaylist,
} from "~/lib/supabase.server";
import { archivePlaylist } from "~/lib/spotify.server";
import { SupabaseClient } from "@supabase/supabase-js";

export const handleArchiveUnarchivePlaylist = async (
  supabase: SupabaseClient,
  session: any,
  playlistId: string,
  action: "archive" | "unarchive"
) => {
  if (action === "archive") {
    await createUserTrackedPlaylist(
      supabase,
      session.data.session.user.id,
      playlistId
    );
    await archivePlaylist(session.data.session.provider_token, playlistId);
  } else {
    await deleteUserTrackedPlaylist(
      supabase,
      session.data.session.user.id,
      playlistId
    );
  }
};
