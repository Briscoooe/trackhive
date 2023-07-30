"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/primitives/DropdownMenu";
import { GearIcon } from "@radix-ui/react-icons";
import { ArrowLeftIcon, Bars4Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";
import { deleteCookie } from "@/lib/utils";

export default function HamburgerMenu() {
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const signOut = async () => {
    deleteCookie(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME);
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data) return;
      setUserEmail(data.user?.email);
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"p-4 bg-gray-100 rounded-md"}>
        <Bars4Icon className="w-4 h-4 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"bg-white"}>
        <DropdownMenuLabel className={"truncate font-medium"}>
          {userEmail}
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
