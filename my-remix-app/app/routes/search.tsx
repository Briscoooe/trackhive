import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { ActionArgs, redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { SpotifySimplifiedPlaylistObject } from "~/types/spotify";
import { Input } from "~/components/ui/input";
import { PlaylistSearchSuggestions } from "~/components/PlaylistSearchSuggestions";
import PlaylistRow from "~/components/PlaylistRow";
import {
  createSupabaseServerClient,
  createUserTrackedPlaylist,
  getUserArchives,
} from "~/lib/supabase.server";
import { archivePlaylist, searchPlaylists } from "~/lib/spotify.server";
import { Button } from "~/components/ui/button";
import { useNavigation } from "react-router";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  if (!query) {
    return {
      playlists: [],
    };
  }

  const results = await searchPlaylists(
    session.data.session.provider_token,
    query
  );
  const userArchives = await getUserArchives(
    supabase,
    session.data.session.user.id
  );
  return { results, query, userArchives: userArchives };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const playlistId = formData.get("playlistId") as string;
  await createUserTrackedPlaylist(
    supabase,
    session.data.session.user.id,
    playlistId
  );
  await archivePlaylist(
    session.data.session.provider_token,
    formData.get("playlistId") as string
  );
  return redirect(`/`);
};
export default function Search() {
  const { results, query, userArchives } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const checkIfIsLoading = (
    playlist: SpotifySimplifiedPlaylistObject
  ): boolean => {
    return (
      navigation.state === "loading" &&
      navigation.location.pathname.includes(playlist.id)
    );
  };
  const checkIfUserHas = (
    playlist: SpotifySimplifiedPlaylistObject
  ): boolean => {
    return userArchives.some((archive) => archive.playlist_id === playlist.id);
  };
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
      <Outlet />
      {results &&
        results.items.map((playlist, index) => (
          <PlaylistRow
            playlist={playlist}
            key={index}
            isCurrentlyLoading={checkIfIsLoading(playlist)}
            isArchived={checkIfUserHas(playlist)}
          />
        ))}
    </div>
  );
}
