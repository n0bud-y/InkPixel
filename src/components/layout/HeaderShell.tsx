"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { hasLightHeader } from "./NavLinks";

// The <header> bar and the logo that suits the current page. Most pages: transparent over the
// top of the page, solid navy once it scrolls (.site-header in globals.css). Pages that open on
// white (case studies): a solid white bar with the dark logo. The contents render on the server.
export function HeaderShell({
  logoOnDark,
  logoOnLight,
  children,
}: {
  logoOnDark: ReactNode;
  logoOnLight: ReactNode;
  children: ReactNode;
}) {
  const light = hasLightHeader(usePathname());

  return (
    <header
      className={
        light
          ? "fixed inset-x-0 top-0 z-40 border-b border-primary/10 bg-white"
          : "site-header fixed inset-x-0 top-0 z-40 border-b border-transparent"
      }
    >
      <div className="container-site flex h-20 items-center justify-between gap-6 lg:h-24 2xl:h-32">
        {light ? logoOnLight : logoOnDark}
        {children}
      </div>
    </header>
  );
}
