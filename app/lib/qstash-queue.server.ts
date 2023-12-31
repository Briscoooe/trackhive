import { Receiver } from "@upstash/qstash";

export const verifySignature = async (request: Request) => {
  const clonedRequest = request.clone();
  const r = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
  });
  const body = await clonedRequest.text();
  const upstashSignature = clonedRequest.headers.get("upstash-signature");
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
