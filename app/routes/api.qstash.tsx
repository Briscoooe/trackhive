import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { verifySignature } from "~/lib/qstash.server";
import {
  adminGetDecryptedAuthTokenByUserId,
  createSupabaseAdminServerClient,
} from "~/lib/supabase.server";
import { archivePlaylist, refreshAuthToken } from "~/lib/spotify.server";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  await verifySignature(request);
  const body = await request.json();
  const { userId, playlistId, archiveMode } = body;
  const adminClient = createSupabaseAdminServerClient({ request, response });
  const decryptedAuthToken = await adminGetDecryptedAuthTokenByUserId(
    adminClient,
    userId,
  );
  const accessToken = await refreshAuthToken(
    decryptedAuthToken.provider_refresh_token!,
  );
  await archivePlaylist(accessToken, playlistId);
  return json({ success: true });
};
