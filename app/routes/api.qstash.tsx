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
  const { userId, playlistId } = body;
  const adminClient = createSupabaseAdminServerClient({ request, response });
  const decryptedAuthToken = await adminGetDecryptedAuthTokenByUserId(
    adminClient,
    userId,
  );
  try {
    const accessToken = await refreshAuthToken(
      decryptedAuthToken.decrypted_provider_refresh_token.split("\n").join("")!,
    );
    console.log("access token", accessToken);
    await archivePlaylist(accessToken, playlistId);
  } catch (e) {
    console.log("error", e);
    throw new Response(null, { status: 400 });
  }
  return json({ success: true });
};
