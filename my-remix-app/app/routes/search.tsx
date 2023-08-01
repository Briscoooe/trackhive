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
import {
  createSupabaseServerClient,
  getCurrentUserAccessToken
} from "~/utils/supabase.server";
import {ActionArgs, redirect} from "@remix-run/node";
import {archivePlaylist, refreshAuthToken, searchPlaylists} from "~/lib/spotify-client";
import {Button} from "~/components/ui/button";

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
  const accessToken = await getCurrentUserAccessToken({ supabase });
  const results = await searchPlaylists(accessToken, query);
  console.log('results', results);
  return { results, query };
};


export const action = async ({ request}: ActionArgs) => {
  const formData = await request.formData();
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const accessToken = await getCurrentUserAccessToken({ supabase });
  const project = await archivePlaylist(accessToken, formData.get("playlistId") as string);
  return redirect(`/`);
}
export default function Search() {
  // const { data: userArchives } = useQuery({
  //   queryKey: [USER_ARCHIVED_SPOTIFY_PLAYLISTS_KEY],
  //   queryFn: getDatabaseUser ArchivesQuery,
  // });
  // const [params] = useSearchParams()

  // const searchText = params.get("query") || ""
  const { results, query } = useLoaderData();

  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Form method="get" className={"flex w-full items-center space-x-2"}>
        <Input type="text" name="query" defaultValue={query || ""} />
        <Button type="submit">Search</Button>
      </Form>
      <PlaylistSearchSuggestions
        onClick={(playlist) => {}}
        // searchText={searchText}
        // setSearchText={setSearchText}
      />
      <Outlet/>
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
