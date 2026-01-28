"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";

interface HealthResponse {
  status: string;
  deploymentId: string;
  timestamp: string;
}

export default function DeploymentMonitor() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const initialDeploymentIdRef = useRef<string | null>(null);

  // Fetch current deployment ID
  const checkDeployment = async () => {
    try {
      const response = await fetch("/api/health");
      const data: HealthResponse = await response.json();

      // Store initial deployment ID on first load
      if (initialDeploymentIdRef.current === null) {
        initialDeploymentIdRef.current = data.deploymentId;
        return;
      }

      // Check if deployment has changed
      if (
        data.deploymentId !== initialDeploymentIdRef.current &&
        data.deploymentId !== "unknown"
      ) {
        console.log(
          `New deployment detected: ${initialDeploymentIdRef.current} -> ${data.deploymentId}`
        );
        setShowUpdatePrompt(true);
      }
    } catch (error) {
      console.error("Failed to check deployment:", error);
    }
  };

  // Check for updates every 60 seconds
  useEffect(() => {
    // Initial check
    checkDeployment();

    // Set up polling interval
    const interval = setInterval(() => {
      checkDeployment();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle reload
  const handleReload = () => {
    window.location.reload();
  };

  // Don't render anything if no update available
  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-lg max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Update Available
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              A new version of the app is available. Refresh to get the latest features and fixes.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                color="primary"
                onPress={handleReload}
              >
                Refresh Now
              </Button>
              <Button
                size="sm"
                variant="light"
                onPress={() => setShowUpdatePrompt(false)}
              >
                Later
              </Button>
            </div>
          </div>
          <button
            onClick={() => setShowUpdatePrompt(false)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
