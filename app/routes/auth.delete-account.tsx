import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  createSupabaseAdminServerClient,
  createSupabaseServerClient,
  deleteAllUserData,
} from "~/lib/supabase.server";
import { requireSupabaseSession } from "~/utils/permissions.server";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();

  const supabase = createSupabaseServerClient({ request, response });
  const { user } = await requireSupabaseSession(supabase);

  const adminClient = await createSupabaseAdminServerClient({
    request,
    response,
  });
  await deleteAllUserData(adminClient, user.id);
  await adminClient.auth.admin.deleteUser(user.id);

  return redirect("/");
};
