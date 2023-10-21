import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
  createUserTrackedPlaylist,
} from "~/lib/supabase.server";
import { requireSupabaseSession } from "~/utils/permissions.server";

export const action = async ({ request }: LoaderArgs) => {
  const formData = await request.formData();
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const { user } = await requireSupabaseSession(supabase);
  const playlistId = formData.get("playlistId") as string;
  const archiveMode = formData.get("archiveMode") as string;
  const dayOfWeek = formData.get("dayOfWeek") as string;
  await createUserTrackedPlaylist(
    supabase,
    user.id,
    playlistId,
    archiveMode,
    dayOfWeek,
  );
  const referrer = request.headers.get("referer");
  return redirect(referrer);
};
