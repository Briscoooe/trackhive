import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
  deleteUserTrackedPlaylist,
} from "~/lib/supabase.server";

export const action = async ({ request }: LoaderArgs) => {
  const formData = await request.formData();
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const playlistId = formData.get("playlistId") as string;
  await deleteUserTrackedPlaylist(
    supabase,
    session.data.session.user.id,
    playlistId
  );
  const referrer = request.headers.get("referer");
  return redirect(referrer);
};
