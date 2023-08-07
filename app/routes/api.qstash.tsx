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

  const isValid = r.verify({
    signature: request.headers.get("Upstash-Signature")!,
    body,
  });

  return json({
    body: request.body,
    headers: Object.fromEntries(request.headers.entries()),
    isValid,
  });
};
