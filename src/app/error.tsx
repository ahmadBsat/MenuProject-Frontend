"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error details to console in development
    console.error("Error boundary caught:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
      cause: error.cause,
    });

    // In production, you can send this to your error tracking service
    // Example: Sentry, LogRocket, or custom logging endpoint
    if (process.env.NODE_ENV === "production") {
      // Send error to your logging service
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: error.message,
          digest: error.digest,
          stack: error.stack,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      }).catch(console.error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-4">
          We apologize for the inconvenience. An error has occurred.
        </p>
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 p-4 rounded mb-4 text-left">
            <p className="font-mono text-sm text-red-600 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-xs text-gray-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        {process.env.NODE_ENV === "production" && error.digest && (
          <p className="text-sm text-gray-600 mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-2 justify-center">
          <Button color="primary" onPress={() => reset()}>
            Try again
          </Button>
          <Button
            color="default"
            variant="bordered"
            onPress={() => (window.location.href = "/")}
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
