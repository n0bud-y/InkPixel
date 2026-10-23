"use client";

import Image from "next/image";
import { technologyMenu } from "@/content/technology-menu";
import { MegaMenu } from "./MegaMenu";
import { MenuTabs } from "./MenuTabs";

// "Technologies" in the desktop menu (MegaMenu, not a link), laid out like Services (MenuTabs):
// the groups as tabs on the left; on the right the chosen group's line and its technologies, each
// a logo and a name (src/content/technology-menu.ts; display only).
export function TechnologiesMenu({ label, className, active }: { label: string; className: string; active: boolean }) {
  const { groups } = technologyMenu;

  return (
    <MegaMenu label={label} className={className} active={active} callout={technologyMenu.callout} button={technologyMenu.button}>
      <MenuTabs
        label={label}
        tabs={groups.map((group) => group.label)}
        panel={(index) => (
          <>
            <p className="max-w-[36em] px-2 text-[14px] leading-relaxed text-primary/60 2xl:text-[15px]">{groups[index].description}</p>
            <ul className="mt-4 grid grid-cols-3 gap-1.5">
              {groups[index].items.map((item) => (
                <li
                  key={item.name}
                  className="group flex items-center gap-3.5 rounded-2xl p-3 transition-colors duration-200 hover:bg-primary/[0.04] 2xl:gap-4 2xl:p-3.5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/[0.04] ring-1 ring-primary/[0.07] 2xl:size-12">
                    <Image
                      src={item.logo}
                      alt=""
                      className="size-6 object-contain transition-transform duration-300 group-hover:scale-110 2xl:size-7"
                    />
                  </span>
                  <span className="text-[15px] leading-snug font-semibold 2xl:text-[16px]">{item.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      />
    </MegaMenu>
  );
}
