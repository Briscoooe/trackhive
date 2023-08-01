import { NavBarLink } from "~/components/NavBarLink";
import HamburgerMenu from "~/components/HamburgerMenu";
import {Link, useOutletContext} from "@remix-run/react";
import {OutletContext} from "~/types";

export default function NavBar() {
  const { session } = useOutletContext<OutletContext>();
  // const supabase = createServerComponentClient({ cookies });
  //
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();i
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white">
      <div className="w-full max-w-2xl flex justify-between items-center p-3 text-sm text-foreground">
        <div className={"space-x-1 flex flex-row items-center"}>
          <NavBarLink href={"/"}>Home</NavBarLink>
          <NavBarLink href={"/app"}>App</NavBarLink>
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              {/*<HamburgerMenu />*/}
            </div>
          ) : (
            <Link
              to={"/login"}
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
