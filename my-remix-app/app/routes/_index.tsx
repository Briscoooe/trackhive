import type { V2_MetaFunction } from "@remix-run/node";
import {useOutletContext} from "@remix-run/react";
import {OutletContext} from "~/types";
import Login from "~/components/Login";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { session } = useOutletContext<OutletContext>();
  return (
    <div className="container mx-auto md:w-[800px] h-screen">
      {!session?.user ? <Login /> : <div>logged in!</div>}
    </div>
  );
}
