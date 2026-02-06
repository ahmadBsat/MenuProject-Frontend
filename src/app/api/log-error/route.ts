import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();

    // Log to console (will be captured by your deployment platform's logging)
    console.error("Client-side error:", {
      ...errorData,
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    // Here you can integrate with error tracking services:
    // - Sentry: Sentry.captureException(errorData)
    // - LogRocket: LogRocket.captureException(errorData)
    // - Datadog: datadogLogs.logger.error(errorData)
    // - Custom database logging
    // - Send to Slack/Discord webhook for critical errors

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error logging failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log error" },
      { status: 500 }
    );
  }
}
