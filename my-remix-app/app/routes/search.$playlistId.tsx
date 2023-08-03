import {ActionArgs, LoaderArgs, redirect} from "@remix-run/node";
import {
  createSupabaseServerClient,
  createUserTrackedPlaylist, deleteUserTrackedPlaylist,
} from "~/lib/supabase.server";
import {archivePlaylist, getPlaylist, getPlaylistTracks,} from "~/lib/spotify.server";
import {useLoaderData} from "@remix-run/react";
import PlaylistDetail from "~/components/PlaylistDetail";

export const loader = async ({ params, request }: LoaderArgs) => {
  const playlistId = params.playlistId;
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!playlistId || !session || !session.data.session?.provider_token) {
    return redirect("/");
  }

  const playlistTrackObjects = await getPlaylistTracks(
    session.data.session.provider_token,
    playlistId
  );
  const playlist = await getPlaylist(
    session.data.session.provider_token,
    playlistId
  );
  return {
    playlistId,
    playlist,
    playlistTrackObjects,
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
  if (action === 'archive') {
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

export default function SearchPlaylistId() {
  const { playlistTrackObjects, playlist } = useLoaderData<typeof loader>();
  return <PlaylistDetail playlist={playlist} tracks={playlistTrackObjects} />;
}
