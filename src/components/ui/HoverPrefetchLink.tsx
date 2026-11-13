"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

// A link that prefetches its page only when someone shows intent (the pointer reaches it, it gets
// keyboard focus, or a touch starts on it), not as soon as it is on the page. For links inside
// closed menus, which would otherwise all be prefetched on every page load. The Next.js pattern
// ("Hover-triggered prefetch", node_modules/next/dist/docs/01-app/02-guides/prefetching.md).
export function HoverPrefetchLink({ onMouseEnter, onFocus, onTouchStart, ...props }: ComponentProps<typeof Link>) {
  const [active, setActive] = useState(false);

  return (
    <Link
      {...props}
      prefetch={active ? null : false}
      onMouseEnter={(event) => {
        setActive(true);
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        setActive(true);
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        setActive(true);
        onTouchStart?.(event);
      }}
    />
  );
}
