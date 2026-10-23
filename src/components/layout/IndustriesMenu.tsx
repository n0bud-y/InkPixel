"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { industries, industryMenu } from "@/content/industries";
import { MegaMenu } from "./MegaMenu";
import { MenuTabs } from "./MenuTabs";

// A white line icon as a shape filled with the brand gradient (CSS mask), as in the Services menu.
const maskOf = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: `url(${src})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
});

// "Industries" in the desktop menu (MegaMenu, not a link), laid out like Services (MenuTabs):
// the industries as tabs on the left; on the right the chosen one's icon and line, then its
// solutions as cards (icon, name, one line). Content in src/content/industries.ts, shared with
// "Industry-Specific Solutions"; display only.
export function IndustriesMenu({ label, className, active }: { label: string; className: string; active: boolean }) {
  return (
    <MegaMenu label={label} className={className} active={active} callout={industryMenu.callout} button={industryMenu.button}>
      <MenuTabs
        label={label}
        tabs={industries.map((industry) => industry.label)}
        panel={(index) => {
          const industry = industries[index];
          return (
            <>
              <div className="flex items-center gap-4 px-2">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-gradient shadow-[0_10px_24px_-10px_rgb(250_97_67_/_0.8)] 2xl:size-12">
                  <Image src={industry.icon} alt="" width={48} height={48} className="size-1/2" />
                </span>
                <p className="max-w-[40em] text-[14px] leading-relaxed text-primary/60 2xl:text-[15px]">{industry.description}</p>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-1.5">
                {industry.solutions.map((solution) => (
                  <li
                    key={solution.title}
                    className="group flex items-start gap-3.5 rounded-2xl p-3 transition-colors duration-200 hover:bg-primary/[0.04] 2xl:gap-4 2xl:p-3.5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/[0.04] ring-1 ring-primary/[0.07] 2xl:size-12">
                      <span
                        aria-hidden="true"
                        className="block size-6 bg-brand-gradient-reverse transition-transform duration-300 group-hover:scale-110 2xl:size-7"
                        style={maskOf(solution.icon.src)}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] leading-snug font-semibold 2xl:text-[16px]">{solution.title}</span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-primary/60 2xl:text-[14px]">{solution.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          );
        }}
      />
    </MegaMenu>
  );
}
