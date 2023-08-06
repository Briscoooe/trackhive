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
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10 bg-white">
      <div className="flex w-full max-w-2xl items-center justify-between p-3 text-sm text-foreground">
        <div className={"flex flex-row items-center space-x-1"}>
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
              className="rounded-md bg-spotify-green px-4 py-2 text-white no-underline hover:bg-spotify-green-darker"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
