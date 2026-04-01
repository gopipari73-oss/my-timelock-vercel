import { kv } from "@vercel/kv";
import { randomBytes } from "crypto";

export default async (req) => {
  // CORS Headers (Browser security bypass karne ke liye)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });

  try {
    const body = await req.json();
    const { encryptedPassword, unlockTimestamp, hint } = body;

    // Validation
    if (!encryptedPassword) return new Response(JSON.stringify({ error: "Password missing" }), { status: 400, headers });
    if (!unlockTimestamp || unlockTimestamp <= Date.now()) {
      return new Response(JSON.stringify({ error: "Invalid unlock time" }), { status: 400, headers });
    }

    // Unique ID generate karo (Jaise Netlify mein kiya tha)
    const id = randomBytes(16).toString("hex");

    // Vercel KV mein data save karo
    await kv.set(id, {
      encryptedPassword,
      unlockTimestamp,
      hint: hint || "",
      createdAt: Date.now(),
    });

    return new Response(JSON.stringify({ success: true, id }), { status: 200, headers });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500, headers });
  }
};