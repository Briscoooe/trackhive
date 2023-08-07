import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  createSupabaseAdminServerClient,
  createSupabaseServerClient,
  adminUpsertAuthToken,
} from "~/lib/supabase.server";
import { verifySignature } from "~/lib/qstash.server";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  await verifySignature(request);
};
