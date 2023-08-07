import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as process from "process";
import { Receiver } from "@upstash/qstash";

const r = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  const body = await request.text();

  let isValid = false;
  console.log("HEAERS", Object.fromEntries(request.headers.entries()));
  try {
    isValid = await r.verify({
      signature: request.headers.get("upstash-signature")!,
      body,
    });
  } catch (error) {
    return json({
      body: request.body,
      headers: Object.fromEntries(request.headers.entries()),
      error: error.message,
      isValid,
    });
  }

  return json({
    body: request.body,
    headers: request.headers,
    isValid,
  });
};
