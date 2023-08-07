import {
  ArrowLeftOnRectangleIcon,
  Bars4Icon,
  ExclamationTriangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
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
import { useState } from "react";

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
        <DropdownMenuTrigger className={"rounded-md bg-slate-100 p-4"}>
          <Bars4Icon className="h-4 w-4 text-slate-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"bg-white"}>
          <DropdownMenuLabel
            className={"flex flex-row items-center truncate font-medium"}
          >
            <UserCircleIcon className="mr-2 h-4 w-4 text-slate-500 " />
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"cursor-pointer transition hover:bg-slate-50"}
            onClick={() => setDeleteDialogIsOpen(true)}
          >
            <ExclamationTriangleIcon className="mr-2 h-4 w-4 text-red-600" />
            Delete account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={signOut}
            className={"cursor-pointer transition hover:bg-slate-50"}
          >
            <ArrowLeftOnRectangleIcon className="mr-2 h-4 w-4 text-slate-500 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAccountDialogForm
        isOpen={deleteDialogIsOpen}
        setIsOpen={setDeleteDialogIsOpen}
      />
    </>
  );
}
