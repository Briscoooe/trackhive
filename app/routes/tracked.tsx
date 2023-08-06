import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
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
    session.data.session.user.id,
  );
  const playlistIds = userTrackedPlaylists?.map(
    (archive) => archive.playlist_id,
  );
  const playlists = await Promise.all(
    playlistIds.map((playlistId) =>
      getPlaylist(session.data.session.provider_token, playlistId),
    ),
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
    <div className="flex w-full flex-col items-center space-y-2">
      {playlistsExists ? (
        playlists.map((playlist, index) => (
          <PlaylistRow
            playlist={playlist}
            key={index}
            buttonDisabled={false}
            userTrackedPlaylist={userTrackedPlaylists.find(
              (userTrackedPlaylist) =>
                userTrackedPlaylist.playlist_id === playlist.id,
            )}
          />
        ))
      ) : (
        <div className="w-full rounded-md bg-white p-4 text-center shadow-sm">
          <FaceFrownIcon className="mx-auto h-12 w-12 text-slate-500" />
          <h1 className="text-lg font-medium text-slate-600">
            No tracked playlists
          </h1>
          <Button className={"mt-2 w-full sm:w-auto"}>
            <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
            <Link to="/playlists">Find playlists</Link>
          </Button>
        </div>
      )}
      <Outlet />
    </div>
  );
}
