"use client";

import { useEffect } from "react";

export default function SiteError({
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
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 rounded border border-foreground/20 px-4 py-2 hover:bg-foreground/5"
      >
        Try again
      </button>
    </div>
  );
}
