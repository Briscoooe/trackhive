import type {V2_MetaFunction} from "@remix-run/node";
import {Outlet} from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className={"flex flex-col space-y-2 w-full"}>
      <Outlet />
    </div>
  );
}
