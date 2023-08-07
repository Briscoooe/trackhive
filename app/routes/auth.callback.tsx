import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  adminUpsertAuthToken,
  createSupabaseAdminServerClient,
  createSupabaseServerClient,
} from "~/lib/supabase.server";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabaseClient = createSupabaseServerClient({ request, response });
    const { data, error } = await supabaseClient.auth.exchangeCodeForSession(
      code,
    );
    if (
      !data.session ||
      !data.session.provider_token ||
      !data.session.provider_refresh_token
    ) {
      return redirect("/", {
        headers: response.headers,
      });
    }
    const adminClient = createSupabaseAdminServerClient({ request, response });
    await adminUpsertAuthToken(
      adminClient,
      data.user.id,
      data.session.provider_token,
      data.session.provider_refresh_token,
    );
  }

  return redirect("/playlists", {
    headers: response.headers,
  });
};
