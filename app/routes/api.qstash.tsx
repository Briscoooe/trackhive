import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  return json({
    request: JSON.stringify(request),
  });
};
