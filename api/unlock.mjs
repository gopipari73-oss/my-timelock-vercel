import { kv } from "@vercel/kv";

export default async (req) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });

  try {
    const { id } = await req.json();
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400, headers });

    // Vercel KV se data nikalo
    const data = await kv.get(id);

    if (!data) {
      return new Response(JSON.stringify({ error: "ID galat hai ya data delete ho gaya" }), { status: 404, headers });
    }

    const now = Date.now();
    const unlockTime = data.unlockTimestamp;

    // ── SERVER-SIDE TIME CHECK ──
    if (now < unlockTime) {
      const remaining = unlockTime - now;
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

      return new Response(JSON.stringify({
        locked: true,
        remaining: { days, hours, minutes },
        hint: data.hint || null
      }), { status: 403, headers });
    }

    // Time ho gaya — Success!
    return new Response(JSON.stringify({
      success: true,
      encryptedPassword: data.encryptedPassword,
      hint: data.hint
    }), { status: 200, headers });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500, headers });
  }
};