import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Form, useLoaderData, useOutletContext} from "@remix-run/react";
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
import {useState} from "react";
import {SpotifySimplifiedPlaylistObject} from "~/types/spotify";
import {Input} from "~/components/ui/input";
import {PlaylistSearchSuggestions} from "~/components/PlaylistSearchSuggestions";
import PlaylistRow from "~/components/PlaylistRow";
import {useSearchParams} from "next/navigation";
import {createSupabaseClient} from "@supabase/auth-helpers-shared";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {createSupabaseServerClient} from "~/utils/supabase.server";
import {searchPlaylists} from "../lib/spotify-client";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get("query");
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
  const results = await searchPlaylists("BQCaQNR84jxZ9rOwJQS8QQo_0UjxjIPHMft4CpPX-tls5VU3WNushnpBcignVdX95kUidFdypISC_fDmROlA7SSkNCIdRynKKnWuYhgkbSP67ncU01ftQAwuNUw7cFCpy9piEtzQIwH6_QZO-BBYpbgrODW4e8CzIZG1BkuU-zgEvczFA_rvo2XNdlCHRChkUJxCiAQxDphQHwY8Fxr0ZEZ8-u4YtRvrR6wPXLwgOg0B55rQEvzemPh4JSbORC-3PIabBu-A", query);
  console.log('results', results);
  return { results, query };
};


export default function Index() {
  // const { data: userArchives } = useQuery({
  //   queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
  //   queryFn: getDatabaseUser ArchivesQuery,
  // });
  // const [params] = useSearchParams()

  // const searchText = params.get("query") || ""
  const { results, query } = useLoaderData();
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Form method="get">
        <input type="text" name="query" defaultValue={query || ""} />
        <button type="submit">Search</button>
      </Form>
      {/*<PlaylistSearchSuggestions*/}
      {/*  searchText={searchText}*/}
      {/*  setSearchText={setSearchText}*/}
      {/*/>*/}
      {results &&
        results.items.map((playlist, index) => (
          <PlaylistRow
            playlist={playlist}
            key={index}
          />
        ))}
    </div>
  );
}
