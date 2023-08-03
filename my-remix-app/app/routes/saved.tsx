import {LoaderArgs, redirect} from "@remix-run/node";
import {createSupabaseServerClient, getUserArchives} from "~/lib/supabase.server";
import {getPlaylist} from "~/lib/spotify.server";
import {useLoaderData} from "@remix-run/react";
import PlaylistRow from "~/components/PlaylistRow";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const session = await supabase.auth.getSession();
  if (!session || !session.data.session?.provider_token) {
    return redirect("/");
  }
  const archives = await getUserArchives(supabase, session.data.session.user.id);
  const playlistIds = archives?.map((archive) => archive.playlist_id);
  const playlists = await Promise.all(
    playlistIds.map((playlistId) => getPlaylist(session.data.session.provider_token, playlistId))
  );
  return {
    playlists,
  }
}
export default function Saved() {
  const { playlists } = useLoaderData<typeof loader>();

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {playlists?.map((playlist, index) => (
        <PlaylistRow
          playlist={playlist}
          key={index}
          isCurrentlyLoading={false}
          isArchived={true}
        />
      ))}
    </div>
  );
}
