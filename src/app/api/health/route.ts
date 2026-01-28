import { NextResponse } from "next/server";

// Force dynamic rendering to always get fresh deployment ID
export const dynamic = "force-dynamic";

export async function GET() {
  const deploymentId = process.env.SOURCE_COMMIT || process.env.BUILD_ID || "unknown";

  return NextResponse.json({
    status: "ok",
    deploymentId,
    timestamp: new Date().toISOString(),
  });
}
