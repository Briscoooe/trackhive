import { Bars4Icon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { SpotifyUserObject } from "~/types/spotify";
import { SupabaseClient } from "@supabase/supabase-js";

export default function HamburgerMenu({
  user,
  supabase,
}: {
  user: SpotifyUserObject;
  supabase: SupabaseClient;
}) {
  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"p-4 bg-gray-100 rounded-md"}>
        <Bars4Icon className="w-4 h-4 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"bg-white"}>
        <DropdownMenuLabel className={"truncate font-medium"}>
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className={"hover:bg-gray-50 transition cursor-pointer"}
        >
          <ArrowLeftOnRectangleIcon className="w-4 h-4 text-gray-600 mr-1 text-gray-800" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
