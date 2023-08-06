import type {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";
import { createSupabaseServerClient } from "~/lib/supabase.server";
import NavBar from "./components/NavBar";

import stylesheet from "~/tailwind.css";
import Footer from "~/components/Footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Trackhive" },
    { name: "description", content: "Never miss a playlist again" },
  ];
};
export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_PUBLIC_KEY: process.env.SUPABASE_PUBLIC_KEY!,
    SUPABASE_REDIRECT_URL: process.env.SUPABASE_REDIRECT_URL!,
  };

  const response = new Response();

  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = await supabase.auth.getUser();

  return json(
    { env, session, user: user.data.user },
    { headers: response.headers },
  );
};

export default function App() {
  const { env, session, user } = useLoaderData<typeof loader>();
  const serverAccessToken = session?.access_token;
  const { revalidate } = useRevalidator();
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_PUBLIC_KEY),
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event !== "INITIAL_SESSION" &&
        session?.access_token !== serverAccessToken
      ) {
        // server and client are out of sync.
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, revalidate]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <main className="flex flex-grow flex-col items-center bg-background bg-slate-50">
          <NavBar
            redirectUrl={env.SUPABASE_REDIRECT_URL}
            user={user}
            supabase={supabase}
          />
          <div className="flex w-full max-w-2xl flex-col gap-14 px-3 py-4 text-foreground opacity-0 animate-in">
            <Outlet context={{ supabase, session }} />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
