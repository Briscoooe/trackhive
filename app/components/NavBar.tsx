import { NavBarLink } from "~/components/NavBarLink";
import HamburgerMenu from "~/components/HamburgerMenu";
import type { SpotifyUserObject } from "~/types/spotify";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "~/components/ui/button";

export default function NavBar({
  redirectUrl,
  user,
  supabase,
}: {
  redirectUrl: string;
  user?: SpotifyUserObject;
  supabase: SupabaseClient;
}) {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: redirectUrl,
        scopes: [
          "user-read-email",
          "playlist-read-private",
          "playlist-read-collaborative",
          "playlist-modify-public",
          "playlist-modify-private",
        ].join(","),
      },
    });
  };
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white">
      <div className="w-full max-w-2xl flex justify-between items-center p-3 text-sm text-foreground">
        <div className={"space-x-1 flex flex-row items-center"}>
          <NavBarLink href={"/"}>Home</NavBarLink>
          {user && (
            <>
              <NavBarLink href={"/tracked"}>Tracked</NavBarLink>
              <NavBarLink href={"/playlists"}>Discover</NavBarLink>
            </>
          )}
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <HamburgerMenu user={user} supabase={supabase} />
            </div>
          ) : (
            <Button
              onClick={handleLogin}
              className="py-2 px-4 rounded-md no-underline bg-spotify-green text-white hover:bg-spotify-green-darker"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
