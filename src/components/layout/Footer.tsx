import Link from "next/link";
import { mainNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-foreground/60">© {siteConfig.name}</p>
      </div>
    </footer>
  );
}
