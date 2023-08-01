import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Form, Outlet, useLoaderData, useOutletContext} from "@remix-run/react";
import {OutletContext} from "~/types";
import UserArchivedPlaylists from "~/components/UserArchivedPlaylists";
import {useQuery} from "@tanstack/react-query";
import {
  PLAYLIST_SEARCH_RESULTS_KEY,
  USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY
} from "~/store/keys";
import {
  getDatabaseUserArchivesQuery,
  searchSpotifyPlaylistsQuery
} from "~/store/queries";
import {useRef, useState} from "react";
import {SpotifySimplifiedPlaylistObject} from "~/types/spotify";
import {Input} from "~/components/ui/input";
import {PlaylistSearchSuggestions} from "~/components/PlaylistSearchSuggestions";
import PlaylistRow from "~/components/PlaylistRow";
import {useSearchParams} from "next/navigation";
import {createSupabaseClient} from "@supabase/auth-helpers-shared";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {createSupabaseServerClient} from "~/utils/supabase.server";
import {
  archivePlaylist,
  refreshAuthToken,
  searchPlaylists
} from "../lib/spotify-client";
import {ActionArgs, redirect} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
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
  const token = await refreshAuthToken("AQCx63LCyp0FrXULF7nLioxUnhWPPIVdHPw4Veptl4CcM15EWgNGwRVlOVAQRQ2jFy30Mc3l4JeDZ8iHStbJMrXDhTtJQ3AkDHvxFqel85kqCJkFSQmbbOBqaH0BLrbe2wU")
  const results = await searchPlaylists(token, query);
  return { results, query };
};


export const action = async ({ request}: ActionArgs) => {
  const formData = await request.formData();
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('use', user.id)
  // const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", user?.id).single();
  // console.log('user auth key', userAuthKey)
  // const { decrypted_refresh_token } = userAuthKey.data;

  // console.log('token', userAuthKey)
  // console.log('QUERy, ', query)
  // console.log('token access', userAuthKey)
  const token = await refreshAuthToken("AQCx63LCyp0FrXULF7nLioxUnhWPPIVdHPw4Veptl4CcM15EWgNGwRVlOVAQRQ2jFy30Mc3l4JeDZ8iHStbJMrXDhTtJQ3AkDHvxFqel85kqCJkFSQmbbOBqaH0BLrbe2wU")
  const project = await archivePlaylist(token, formData.get("playlistId") as string);
  return redirect(`/`);
}
export default function Index() {

  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Outlet/>
    </div>
  );
}
