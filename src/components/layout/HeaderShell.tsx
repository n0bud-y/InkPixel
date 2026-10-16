"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { HeaderLightContext } from "./header-tone";
import { hasLightHeader } from "./NavLinks";

// How far the page scrolls before the header turns white.
const SCROLLED_AT = 40;

// The <header> bar and the logo that suits it. Most pages: transparent over the top of the page
// with the white logo; once the page scrolls, a solid white bar with the dark logo (the logos
// crossfade). Pages that open on white (case studies): white all the time. The rest of the header
// reads which it is (useHeaderLight). The contents render on the server.
export function HeaderShell({
  logoOnDark,
  logoOnLight,
  children,
}: {
  logoOnDark: ReactNode;
  logoOnLight: ReactNode;
  children: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const light = hasLightHeader(usePathname()) || scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLLED_AT);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const fade = "transition-[opacity,visibility] duration-300";

  return (
    <HeaderLightContext.Provider value={light}>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
          light ? "border-primary/10 bg-white" : "border-transparent",
          scrolled ? "shadow-[0_12px_30px_-20px_rgb(21_25_54_/_0.45)]" : "",
        ].join(" ")}
      >
        <div className="container-site flex h-20 items-center justify-between gap-6 lg:h-24 2xl:h-32">
          <div className="grid shrink-0 *:col-start-1 *:row-start-1">
            <div className={`${fade} ${light ? "invisible opacity-0" : ""}`}>{logoOnDark}</div>
            <div className={`${fade} ${light ? "" : "invisible opacity-0"}`}>{logoOnLight}</div>
          </div>
          {children}
        </div>
      </header>
    </HeaderLightContext.Provider>
  );
}
