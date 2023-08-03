import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {ActionArgs, redirect} from "@remix-run/node";
import {Form, Outlet, useLoaderData,} from "@remix-run/react";
import {SpotifySimplifiedPlaylistObject} from "~/types/spotify";
import {Input} from "~/components/ui/input";
import {PlaylistSearchSuggestions} from "~/components/PlaylistSearchSuggestions";
import PlaylistRow from "~/components/PlaylistRow";
import {createSupabaseServerClient,} from "~/lib/supabase.server";
import {archivePlaylist, searchPlaylists,} from "~/lib/spotify.server";
import {Button} from "~/components/ui/button";
import {useNavigation} from "react-router";

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
  const user = await supabase.auth.getUser();
  const userArchives = await supabase
    .from("user_tracked_playlist")
    .select()
    .eq("user_id", user.data.user?.id);
  return { results, query, userArchives: userArchives.data };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  console.log("FORM DATA", formData.get("action"));
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const playlistId = formData.get("playlistId") as string;
  await supabase.from("user_tracked_playlist").insert({
    playlist_id: playlistId,
    user_id: session.data.session.user.id,
  });
  await archivePlaylist(
    session.data.session.provider_token,
    formData.get("playlistId") as string
  );
  return redirect(`/`);
};
export default function Search() {
  const { results, query, userArchives } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const checkIfIsSpining = (
    playlist: SpotifySimplifiedPlaylistObject
  ): boolean => {
    const spinin =
      navigation.state === "loading" &&
      navigation.location.pathname.includes(playlist.id);
    return spinin;
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
            isCurrentlyLoading={checkIfIsSpining(playlist)}
            isArchived={checkIfUserHas(playlist)}
          />
        ))}
    </div>
  );
}
