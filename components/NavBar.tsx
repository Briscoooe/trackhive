import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {UserIcon} from "@heroicons/react/24/outline";
import {NavBarLink} from "@/components/NavBarLink";

export default async function NavBar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-2xl flex justify-between items-center p-3 text-sm text-foreground">
        <div className={"space-x-1 flex flex-row items-center"}>
          <NavBarLink href={"/"}>Home</NavBarLink>
          <NavBarLink href={"/app"}>App</NavBarLink>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <div className={'flex items-center space-x-1'}>
                <UserIcon className="w-4 h-4 text-gray-600" />
                <span className={'text-gray-600 text-sm'}>{user.email}</span>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href={"/login"}
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
