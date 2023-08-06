import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  createSupabaseAdminServerClient,
  createSupabaseServerClient,
  deleteAllUserData,
} from "~/lib/supabase.server";

export const action = async ({ request }: LoaderArgs) => {
  const response = new Response();

  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.user) {
    return redirect("/");
  }

  const adminClient = await createSupabaseAdminServerClient({
    request,
    response,
  });
  await deleteAllUserData(adminClient, session.data.session.user.id);
  await adminClient.auth.admin.deleteUser(session.data.session.user.id);

  return redirect("/");
};
