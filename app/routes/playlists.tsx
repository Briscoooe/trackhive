import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { SpotifySimplifiedPlaylistObject } from "~/types/spotify";
import { Input } from "~/components/ui/input";
import PlaylistRow from "~/components/PlaylistRow";
import {
  createSupabaseServerClient,
  getAllUserTrackedPlaylists,
} from "~/lib/supabase.server";
import { getSuggestedPlaylists, searchPlaylists } from "~/lib/spotify.server";
import { Button } from "~/components/ui/button";
import { useNavigation } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserTrackedPlaylist } from "~/types/supabase";

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const selectedTab = url.searchParams.get("tab");
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const userTrackedPlaylists = await getAllUserTrackedPlaylists(
    supabase,
    session.data.session.user.id
  );
  const suggested = await getSuggestedPlaylists(
    session.data.session.provider_token
  );
  let results;
  if (query) {
    results = await searchPlaylists(session.data.session.provider_token, query);
  }
  return {
    suggested,
    results,
    query,
    selectedTab,
    userTrackedPlaylists,
  };
};

export default function Playlists() {
  const { results, query, userTrackedPlaylists, suggested } =
    useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const checkIfIsLoading = (
    playlist: SpotifySimplifiedPlaylistObject
  ): boolean => {
    return (
      (navigation.state === "loading" &&
        navigation.location.pathname.includes(playlist.id)) ||
      navigation.state === "submitting"
    );
  };
  const getUserTrackedPlaylist = (
    playlist: SpotifySimplifiedPlaylistObject
  ): UserTrackedPlaylist | undefined => {
    return userTrackedPlaylists.find(
      (userTrackedPlaylist) => userTrackedPlaylist.playlist_id === playlist.id
    );
  };
  const resultsExist = results && results.items.length > 0;
  const isSearching =
    navigation.state === "loading" &&
    navigation.location.pathname === "/playlists";
  return (
    <div>
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className={"w-full"}>
          <TabsTrigger className={"w-1/2"} value="popular">
            Popular
          </TabsTrigger>
          <TabsTrigger className={"w-1/2"} value="search">
            Search
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="popular"
          className={"flex flex-col space-y-2 w-full"}
        >
          {suggested.map((playlist, index) => (
            <PlaylistRow
              playlist={playlist}
              key={index}
              buttonDisabled={checkIfIsLoading(playlist)}
              userTrackedPlaylist={getUserTrackedPlaylist(playlist)}
            />
          ))}
        </TabsContent>
        <TabsContent
          value="search"
          className={"flex flex-col space-y-2 w-full"}
        >
          <Form method="get" className={"flex w-full items-center space-x-2"}>
            <Input
              disabled={isSearching}
              type="text"
              name="query"
              defaultValue={query || ""}
              placeholder={"Search for a playlist"}
            />
            <Button disabled={isSearching} type="submit">
              Search
            </Button>
          </Form>
          {resultsExist &&
            results.items.map((playlist, index) => (
              <PlaylistRow
                playlist={playlist}
                key={index}
                buttonDisabled={checkIfIsLoading(playlist)}
                userTrackedPlaylist={getUserTrackedPlaylist(playlist)}
              />
            ))}
        </TabsContent>
      </Tabs>
      <Outlet />
    </div>
  );
}