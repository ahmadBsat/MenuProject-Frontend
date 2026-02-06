// This file runs when the Next.js server starts
// It sets up process-level error handlers to prevent crashes

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Handle uncaught exceptions - prevents Node.js process from crashing
    process.on("uncaughtException", (error: Error) => {
      console.error("🔴 UNCAUGHT EXCEPTION - Process would have crashed:", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      // Log to external service if configured
      if (process.env.ERROR_WEBHOOK_URL) {
        fetch(process.env.ERROR_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "uncaughtException",
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
          }),
        }).catch(console.error);
      }

      // Don't exit the process - keep container running
      // process.exit(1); // <-- This would crash the container
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
      console.error("🔴 UNHANDLED PROMISE REJECTION:", {
        reason,
        promise,
        timestamp: new Date().toISOString(),
      });

      // Log to external service if configured
      if (process.env.ERROR_WEBHOOK_URL) {
        fetch(process.env.ERROR_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "unhandledRejection",
            reason: String(reason),
            timestamp: new Date().toISOString(),
          }),
        }).catch(console.error);
      }
    });

    // Handle process warnings
    process.on("warning", (warning: Error) => {
      console.warn("⚠️  PROCESS WARNING:", {
        name: warning.name,
        message: warning.message,
        stack: warning.stack,
      });
    });

    console.log("✅ Process-level error handlers initialized");
  }
}
