import { LoaderArgs, redirect } from "@remix-run/node";
import {
  createSupabaseServerClient,
  getAllUserTrackedPlaylists,
} from "~/lib/supabase.server";
import { getPlaylist } from "~/lib/spotify.server";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import PlaylistRow from "~/components/PlaylistRow";
import { Button } from "~/components/ui/button";
import {
  FaceFrownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const userTrackedPlaylists = await getAllUserTrackedPlaylists(
    supabase,
    session.data.session.user.id
  );
  const playlistIds = userTrackedPlaylists?.map(
    (archive) => archive.playlist_id
  );
  const playlists = await Promise.all(
    playlistIds.map((playlistId) =>
      getPlaylist(session.data.session.provider_token, playlistId)
    )
  );
  return {
    playlists,
    userTrackedPlaylists,
  };
};

export default function Tracked() {
  const { playlists, userTrackedPlaylists } = useLoaderData<typeof loader>();

  const playlistsExists = playlists && playlists.length > 0;
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {playlistsExists ? (
        playlists.map((playlist, index) => (
          <PlaylistRow
            playlist={playlist}
            key={index}
            buttonDisabled={false}
            userTrackedPlaylist={userTrackedPlaylists.find(
              (userTrackedPlaylist) =>
                userTrackedPlaylist.playlist_id === playlist.id
            )}
          />
        ))
      ) : (
        <div className="text-center w-full bg-white rounded-md p-4 shadow-sm">
          <FaceFrownIcon className="w-12 h-12 mx-auto text-slate-500" />
          <h1 className="text-lg font-medium text-slate-600">
            No tracked playlists
          </h1>
          <Button className={"w-full sm:w-auto mt-2"}>
            <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
            <Link to="/playlists">Find playlists</Link>
          </Button>
        </div>
      )}
      <Outlet />
    </div>
  );
}
