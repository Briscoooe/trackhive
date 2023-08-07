import { Receiver } from "@upstash/qstash";
import process from "process";

export const verifySignature = async (request: Request) => {
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

  try {
    await r.verify({
      signature: upstashSignature!,
      body,
    });
  } catch (error) {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Upstash signature",
    });
  }
};
