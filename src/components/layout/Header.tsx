"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import blackLogo from "@/assets/images/black-logo.svg";
import logo from "@/assets/images/logo.png";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { contactCta, siteConfig } from "@/lib/site";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

// Fixed over the top of every page. On /case-studies pages, uses a white background and black logo.
export function Header() {
  const pathname = usePathname();
  const isCaseStudies = pathname.startsWith("/case-studies");

  const logoLink = (
    <Link href="/" className="shrink-0 rounded-md">
      <Image
        src={isCaseStudies ? blackLogo : logo}
        alt={siteConfig.name}
        loading="eager"
        className="h-auto w-[132px] sm:w-[150px] xl:w-[168px] 2xl:w-[200px]"
      />
    </Link>
  );

  return (
    <header
      className={
        isCaseStudies
          ? "fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md text-primary shadow-xs transition-colors duration-200"
          : "site-header fixed inset-x-0 top-0 z-40 border-b border-transparent"
      }
    >
      <div className="container-site flex h-20 items-center justify-between gap-6 lg:h-24 2xl:h-32">
        {logoLink}

        <div className="hidden items-center gap-6 lg:flex xl:gap-16 2xl:gap-24">
          <nav aria-label="Main">
            <NavLinks isLightHeader={isCaseStudies} />
          </nav>
          <Magnetic>
            <Button href={contactCta.href} size="sm" icon>
              {contactCta.label}
            </Button>
          </Magnetic>
        </div>

        <MobileNav logo={logoLink} isLightHeader={isCaseStudies} />
      </div>
    </header>
  );
}
