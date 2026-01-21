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
    // Log the error to console in development
    console.error("Application error:", error);
  }, [error]);

  // Check if it's a server action error
  const isServerActionError = error.message?.includes("Failed to find Server Action");
  const isImageTimeoutError = error.message?.includes("upstream image response timed out");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {isServerActionError && "Session Expired"}
            {isImageTimeoutError && "Loading Issue"}
            {!isServerActionError && !isImageTimeoutError && "Something went wrong"}
          </h2>
          <p className="text-sm text-gray-600">
            {isServerActionError &&
              "Your session has expired. Please refresh the page to continue."}
            {isImageTimeoutError &&
              "Some images are taking too long to load. Please refresh to try again."}
            {!isServerActionError && !isImageTimeoutError &&
              "An unexpected error occurred. Please try again."}
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            color="primary"
            onPress={() => {
              // Clear any stale cache
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
          >
            Refresh Page
          </Button>
          <Button
            color="default"
            variant="bordered"
            onPress={reset}
          >
            Try Again
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
