import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
  deleteUserTrackedPlaylist,
} from "~/lib/supabase.server";
import { requireSupabaseSession } from "~/utils/permissions.server";

export const action = async ({ request }: LoaderArgs) => {
  const formData = await request.formData();
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const { user } = await requireSupabaseSession(supabase);
  const playlistId = formData.get("playlistId") as string;
  await deleteUserTrackedPlaylist(supabase, user.id, playlistId);
  const referrer = request.headers.get("referer");
  return redirect(referrer);
};
