"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
    });

    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: error.message,
          digest: error.digest,
          stack: error.stack,
          url: typeof window !== "undefined" ? window.location.href : "",
          timestamp: new Date().toISOString(),
          type: "global-error",
        }),
      }).catch(console.error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Something went wrong!</h2>
          <p>A critical error has occurred.</p>
          {error.digest && <p>Error ID: {error.digest}</p>}
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
