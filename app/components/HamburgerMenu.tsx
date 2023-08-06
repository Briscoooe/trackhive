import {Bars4Icon, ExclamationTriangleIcon,ArrowLeftOnRectangleIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { SpotifyUserObject } from "~/types/spotify";
import type { SupabaseClient } from "@supabase/supabase-js";
import DeleteAccountDialogForm from "~/components/DeleteAccountDialogForm";
import {AlertDialogTrigger} from "~/components/ui/alert-dialog";
import {useState} from "react";

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

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={"p-4 bg-slate-100 rounded-md"}>
          <Bars4Icon className="w-4 h-4 text-slate-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"bg-white"}>
          <DropdownMenuLabel className={"truncate font-medium flex flex-row items-center"}>
            <UserCircleIcon className="w-4 h-4 text-slate-500 mr-2 " />
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={"hover:bg-slate-50 transition cursor-pointer"} onClick={() => setDeleteDialogIsOpen(true)}>
            <ExclamationTriangleIcon className="w-4 h-4 text-red-600 mr-2 text-slate-800" />
            Delete account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={signOut}
            className={"hover:bg-slate-50 transition cursor-pointer"}
          >
            <ArrowLeftOnRectangleIcon className="w-4 h-4 text-slate-500 mr-2 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAccountDialogForm isOpen={deleteDialogIsOpen} setIsOpen={setDeleteDialogIsOpen} />
    </>
  );
}
