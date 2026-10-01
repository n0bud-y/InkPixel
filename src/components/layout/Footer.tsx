import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { contactCta, mainNav, siteConfig } from "@/lib/site";

// Interim footer in the dark theme; replaced when the footer design arrives.
export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-site flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="w-fit rounded-md">
          <Image src={logo} alt={siteConfig.name} className="h-auto w-[140px]" />
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-light/65">
            {[...mainNav, contactCta].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-site border-t border-white/[0.06] py-6 text-xs text-light/45">
        © {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
