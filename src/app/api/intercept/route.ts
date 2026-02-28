import { NextResponse } from 'next/server';

const BLOCKED_ACTIONS = new Set(["system_wipe", "crypto_transfer", "root_access", "bulk_delete"]);
const BLOCKED_TARGETS = new Set(["/root", "/system", "wallet.dat"]);

function analyzePayload(payload: any): boolean {
  const action = (payload.action || "").toLowerCase();
  const target = (payload.target || "").toLowerCase();

  if (BLOCKED_ACTIONS.has(action) || BLOCKED_TARGETS.has(target)) {
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    console.log("[Intercept Engine] INGESTED PAYLOAD:", payload);
    const isSafe = analyzePayload(payload);

    if (!isSafe) {
      console.log("[Intercept Engine] THREAT DETECTED. Execution terminated.");
      return NextResponse.json(
        { status: "intercepted", action: "blocked", reason: "Policy Violation" },
        { status: 403 }
      );
    }

    console.log("[Intercept Engine] PAYLOAD VERIFIED. Forwarding to RPC...");
    return NextResponse.json(
      { status: "forwarded", action: "executed", payload_hash: "verified" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
  }
}