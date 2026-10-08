import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import blackLogo from "@/assets/images/black-logo.svg";
import logo from "@/assets/images/logo.png";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { contactCta, siteConfig } from "@/lib/site";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

const logoLink = (src: StaticImageData) => (
  <Link href="/" className="shrink-0 rounded-md">
    <Image
      src={src}
      alt={siteConfig.name}
      loading="eager"
      className="h-auto w-[132px] sm:w-[150px] xl:w-[168px] 2xl:w-[200px]"
    />
  </Link>
);

// Fixed over the top of every page. HeaderShell picks the style for the page (white with the
// dark logo on case studies). z-40 keeps the skip link (z-50) above it when focused.
export function Header() {
  return (
    <HeaderShell logoOnDark={logoLink(logo)} logoOnLight={logoLink(blackLogo)}>
      <div className="hidden items-center gap-6 lg:flex xl:gap-16 2xl:gap-24">
        <nav aria-label="Main">
          <NavLinks />
        </nav>
        <Magnetic>
          <Button href={contactCta.href} size="sm" icon>
            {contactCta.label}
          </Button>
        </Magnetic>
      </div>

      {/* The menu itself is navy, so it always shows the white logo. */}
      <MobileNav logo={logoLink(logo)} />
    </HeaderShell>
  );
}
