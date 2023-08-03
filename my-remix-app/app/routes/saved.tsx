import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
  createUserTrackedPlaylist,
  deleteUserTrackedPlaylist,
  getUserArchives,
} from "~/lib/supabase.server";
import { archivePlaylist, getPlaylist } from "~/lib/spotify.server";
import { Link, useLoaderData } from "@remix-run/react";
import PlaylistRow from "~/components/PlaylistRow";
import { Button } from "~/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const archives = await getUserArchives(
    supabase,
    session.data.session.user.id
  );
  const playlistIds = archives?.map((archive) => archive.playlist_id);
  const playlists = await Promise.all(
    playlistIds.map((playlistId) =>
      getPlaylist(session.data.session.provider_token, playlistId)
    )
  );
  return {
    playlists,
  };
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
  if (action === "archive") {
    await createUserTrackedPlaylist(
      supabase,
      session.data.session.user.id,
      playlistId
    );
    await archivePlaylist(
      session.data.session.provider_token,
      formData.get("playlistId") as string
    );
  } else {
    await deleteUserTrackedPlaylist(
      supabase,
      session.data.session.user.id,
      playlistId
    );
  }
  return redirect(request.url);
};

export default function Saved() {
  const { playlists } = useLoaderData<typeof loader>();

  const playlistsExists = playlists && playlists.length > 0;
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {playlistsExists ? (
        playlists.map((playlist, index) => (
          <PlaylistRow
            playlist={playlist}
            key={index}
            isCurrentlyLoading={false}
            isArchived={true}
          />
        ))
      ) : (
        <div className="text-center space-y-2 w-full bg-white rounded-md p-4 shadow-sm">
          <h1 className="text-2xl font-medium">No saved playlists</h1>
          <Button className={"w-full"}>
            <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
            <Link to="/search">Search</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
