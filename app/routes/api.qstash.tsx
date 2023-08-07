import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as process from "process";
import { Receiver } from "@upstash/qstash";
import { verifySignature } from "~/lib/qstash.server";

export const action = async ({ request }: ActionArgs) => {
  await verifySignature(request);

  return json({
    message: "ok",
  });
};
