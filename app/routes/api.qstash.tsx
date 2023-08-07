import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as process from "process";
import { Receiver } from "@upstash/qstash";

export const action = async ({ request }: ActionArgs) => {
  const r = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
  });
  const body = await request.text();
  const upstashSignature = request.headers.get("upstash-signature");
  if (!upstashSignature) {
    throw new Response(null, {
      status: 400,
      statusText: "Missing Upstash signature",
    });
  }

  let isValid = false;
  try {
    isValid = await r.verify({
      signature: request.headers.get("upstash-signature")!,
      body,
    });
  } catch (error) {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Upstash signature",
    });
  }

  return json({
    isValid,
  });
};
