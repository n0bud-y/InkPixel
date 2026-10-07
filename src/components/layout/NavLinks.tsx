"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

// Desktop menu. The current section gets the pill.
export function NavLinks({ isLightHeader = false }: { isLightHeader?: boolean }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-0.5 xl:gap-1">
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "inline-flex rounded-full px-3 py-2 text-[13px] leading-none font-medium transition-colors duration-200 xl:px-3.5 2xl:px-4 2xl:py-2.5 2xl:text-sm",
                isLightHeader
                  ? active
                    ? "bg-[#FA6143] text-white shadow-xs"
                    : "text-slate-800 hover:bg-slate-100 hover:text-black"
                  : active
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.06)]"
                    : "text-light/70 hover:bg-white/[0.06] hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
