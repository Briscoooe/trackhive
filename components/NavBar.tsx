import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function NavBar() {

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-2xl flex justify-between items-center p-3 text-sm text-foreground">
        <div className={'space-x-2 flex flex-row items-center'}>
          <Link href={"/"}>
            Home
          </Link>
          <Link href={"/app"}>
            App
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
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

  )
}