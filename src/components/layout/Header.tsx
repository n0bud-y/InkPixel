import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { contactCta, siteConfig } from "@/lib/site";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

// Fixed over the top of every page. The transparent → solid change on scroll lives in
// globals.css (.site-header). z-40 keeps the skip link (z-50) above it when focused.
export function Header() {
  const logoLink = (
    <Link href="/" className="shrink-0 rounded-md">
      <Image
        src={logo}
        alt={siteConfig.name}
        loading="eager"
        className="h-auto w-[132px] sm:w-[150px] xl:w-[168px] 2xl:w-[200px]"
      />
    </Link>
  );

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-transparent">
      <div className="container-site flex h-20 items-center justify-between gap-6 lg:h-24 2xl:h-32">
        {logoLink}

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

        <MobileNav logo={logoLink} />
      </div>
    </header>
  );
}
