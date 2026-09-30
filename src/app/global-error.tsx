"use client";

import { useEffect } from "react";
import "./globals.css";

// Replaces the root layout when it fails, so it renders its own <html> and <body>.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // Sentry reporting is added in P1-07.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="mx-auto max-w-6xl px-4 py-16">
        <title>Something went wrong</title>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-6 rounded border border-foreground/20 px-4 py-2 hover:bg-foreground/5"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
