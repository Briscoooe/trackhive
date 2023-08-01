import Link from "next/link";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {json, LoaderArgs} from "@remix-run/node";
import {useLoaderData, useOutletContext} from "@remix-run/react";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../types/supabase";
import {OutletContext} from "~/types";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  const { supabase } = useOutletContext<OutletContext>();


  const handleSpotifyLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <button onClick={handleSpotifyLogin}>Spotify Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
