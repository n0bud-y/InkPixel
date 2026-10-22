"use client";

import Image from "next/image";
import { industries, industryMenu } from "@/content/industries";
import { MegaMenu } from "./MegaMenu";

// "Industries" in the desktop menu (MegaMenu, not a link): the industries as cards, each its
// icon on the brand gradient, its name, and one line (src/content/industries.ts, shared with the
// home page's "Industry-Specific Solutions"; display only). Five in a row, three below 1280px.
export function IndustriesMenu({ label, className, active }: { label: string; className: string; active: boolean }) {
  return (
    <MegaMenu label={label} className={className} active={active} callout={industryMenu.callout} button={industryMenu.button}>
      <ul aria-label={label} className="grid grid-cols-3 gap-3 p-6 xl:grid-cols-5 2xl:gap-4 2xl:p-8">
        {industries.map((industry) => (
          <li
            key={industry.slug}
            className="group rounded-2xl border border-primary/[0.07] bg-primary/[0.02] p-5 transition-colors duration-200 hover:border-crimson/25 hover:bg-crimson/[0.03] 2xl:p-6"
          >
            <span className="grid size-12 place-items-center rounded-full bg-brand-gradient shadow-[0_10px_24px_-10px_rgb(250_97_67_/_0.8)] transition-transform duration-300 group-hover:scale-105 2xl:size-14">
              <Image src={industry.icon} alt="" width={48} height={48} className="size-1/2" />
            </span>
            <span className="mt-4 block font-display text-[18px] leading-tight font-medium 2xl:text-[20px]">{industry.label}</span>
            <span className="mt-2 block text-[13.5px] leading-relaxed text-primary/60 2xl:text-[14px]">{industry.description}</span>
          </li>
        ))}
      </ul>
    </MegaMenu>
  );
}
