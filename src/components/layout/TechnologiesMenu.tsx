"use client";

import Image from "next/image";
import { useId } from "react";
import { technologyMenu } from "@/content/technology-menu";
import { MegaMenu } from "./MegaMenu";

// "Technologies" in the desktop menu (MegaMenu, not a link): the technologies by group, each a
// logo and a name (src/content/technology-menu.ts; display only).
export function TechnologiesMenu({ label, className, active }: { label: string; className: string; active: boolean }) {
  const id = useId();

  return (
    <MegaMenu label={label} className={className} active={active} callout={technologyMenu.callout} button={technologyMenu.button}>
      <div className="grid grid-cols-3 gap-x-4 gap-y-7 p-6 xl:grid-cols-6 2xl:gap-x-6 2xl:p-8">
        {technologyMenu.groups.map((group, index) => (
          <div key={group.label}>
            <p id={`${id}-group-${index}`} className="flex items-center gap-2 px-2 text-[12px] font-semibold tracking-[0.14em] text-crimson uppercase">
              {/* Left out where six columns are narrowest, so every label fits on one line. */}
              <span aria-hidden="true" className="font-mono text-primary/35 xl:max-2xl:hidden">
                {String(index + 1).padStart(2, "0")}
              </span>
              {group.label}
            </p>
            <ul aria-labelledby={`${id}-group-${index}`} className="mt-3 flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-primary/[0.04]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/[0.04] ring-1 ring-primary/[0.07] 2xl:size-10">
                    <Image
                      src={item.logo}
                      alt=""
                      className="size-5 object-contain transition-transform duration-300 group-hover:scale-110 2xl:size-[1.375rem]"
                    />
                  </span>
                  <span className="text-[14px] leading-snug font-medium 2xl:text-[15px]">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MegaMenu>
  );
}
