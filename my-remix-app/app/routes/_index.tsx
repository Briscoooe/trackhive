import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {ActionArgs, redirect} from "@remix-run/node";
import {Outlet,} from "@remix-run/react";
import {createSupabaseServerClient} from "~/lib/supabase.server";
import {
  archivePlaylist,
  refreshAuthToken,
  searchPlaylists,
} from "../lib/spotify.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) {
    return {
      playlists: [],
    };
  }
  const response = new Response();

  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", user?.id).single();
  // console.log('user auth key', userAuthKey)
  // const { decrypted_refresh_token } = userAuthKey.data;

  // console.log('token', userAuthKey)
  // console.log('QUERy, ', query)
  // console.log('token access', userAuthKey)
  const token = await refreshAuthToken(
    "AQCx63LCyp0FrXULF7nLioxUnhWPPIVdHPw4Veptl4CcM15EWgNGwRVlOVAQRQ2jFy30Mc3l4JeDZ8iHStbJMrXDhTtJQ3AkDHvxFqel85kqCJkFSQmbbOBqaH0BLrbe2wU"
  );
  const results = await searchPlaylists(token, query);
  return { results, query };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("use", user.id);
  // const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", user?.id).single();
  // console.log('user auth key', userAuthKey)
  // const { decrypted_refresh_token } = userAuthKey.data;

  // console.log('token', userAuthKey)
  // console.log('QUERy, ', query)
  // console.log('token access', userAuthKey)
  const token = await refreshAuthToken(
    "AQCx63LCyp0FrXULF7nLioxUnhWPPIVdHPw4Veptl4CcM15EWgNGwRVlOVAQRQ2jFy30Mc3l4JeDZ8iHStbJMrXDhTtJQ3AkDHvxFqel85kqCJkFSQmbbOBqaH0BLrbe2wU"
  );
  const project = await archivePlaylist(
    token,
    formData.get("playlistId") as string
  );
  return redirect(`/`);
};
export default function Index() {
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Outlet />
    </div>
  );
}
