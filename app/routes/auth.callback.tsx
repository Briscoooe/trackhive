import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/lib/supabase.server";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabaseClient = createSupabaseServerClient({ request, response });
    await supabaseClient.auth.exchangeCodeForSession(code);
  }

  return redirect("/playlists", {
    headers: response.headers,
  });
};
