"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isReloading, setIsReloading] = useState(false);

  // Check if it's a server action error or deployment mismatch
  const isServerActionError =
    error.message?.includes("Failed to find Server Action") ||
    error.message?.includes("older or newer deployment");
  const isImageTimeoutError = error.message?.includes("upstream image response timed out");

  useEffect(() => {
    // Log the error to console
    console.error("Application error:", error);

    // Auto-reload if it's a Server Action mismatch error
    if (isServerActionError && typeof window !== "undefined") {
      console.log("Detected Server Action mismatch - auto-reloading page...");
      setIsReloading(true);

      // Small delay to show the loading message
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [error, isServerActionError]);

  // Show loading spinner for auto-reload
  if (isReloading || isServerActionError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Updating to latest version...
            </h2>
            <p className="text-sm text-gray-600">
              Please wait while we refresh the page with the latest updates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Normal error UI for other errors
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {isImageTimeoutError && "Loading Issue"}
            {!isImageTimeoutError && "Something went wrong"}
          </h2>
          <p className="text-sm text-gray-600">
            {isImageTimeoutError &&
              "Some images are taking too long to load. Please try again."}
            {!isImageTimeoutError &&
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
