import Image from "next/image";
import type { ReactNode } from "react";
import contactMap from "@/assets/images/contact-map.webp";
import { visitUs } from "@/content/about";
import { siteConfig } from "@/lib/site";

// The studio's contact details, shared by the "Get in touch" card (VisitUs) and the Contact
// page's card (ContactSection): the office map, the address, phone, and email with their icons,
// and the social links.

// Icons for the social links, by site; any other site gets a globe.
const socialIcons: Record<string, { name: string; icon: ReactNode }> = {
  "instagram.com": {
    name: "Instagram",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
  "x.com": { name: "X", icon: <path d="M4 4l16 16M20 4L4 20" /> },
  "twitter.com": { name: "X", icon: <path d="M4 4l16 16M20 4L4 20" /> },
  "facebook.com": {
    name: "Facebook",
    icon: <path d="M14 21v-7h3l.5-3.5H14V8.5c0-1 .5-1.5 1.5-1.5H18V4h-3c-2.5 0-4 1.5-4 4v2.5H8V14h3v7" />,
  },
  "youtube.com": {
    name: "YouTube",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
      </>
    ),
  },
  "linkedin.com": {
    name: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
      </>
    ),
  },
};
const globe = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </>
);
const socialOf = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return socialIcons[host] ?? { name: host, icon: globe };
};

/** The address, phone, and email: an icon, the text, and where it leads (the address opens the
 *  map). */
export const contactLines = [
  {
    key: "address",
    label: "Visit us",
    text: siteConfig.address,
    href: visitUs.mapUrl,
    external: true,
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  {
    key: "phone",
    label: "Call us",
    text: siteConfig.phone.display,
    href: `tel:${siteConfig.phone.tel}`,
    external: false,
    icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  },
  {
    key: "email",
    label: "Email us",
    text: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </>
    ),
  },
];

export function ContactIcon({ icon, className }: { icon: ReactNode; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      {icon}
    </svg>
  );
}

// The office map: a picture that opens Google Maps (no map scripts on the page), with the
// studio's label on it.
export function OfficeMap({ className }: { className: string }) {
  return (
    <a
      href={visitUs.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block aspect-[516/214] overflow-hidden rounded-[clamp(0.5rem,0.6vw,0.75rem)] bg-white ${className}`}
    >
      <span className="sr-only">Open our office in Google Maps (opens in a new tab)</span>
      <Image
        src={contactMap}
        alt=""
        fill
        sizes="(min-width: 1024px) 28vw, 90vw"
        className="object-cover object-[50%_49%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[8%] right-[3%] max-w-[45%] rounded-md bg-white px-2.5 py-1.5 text-[clamp(0.625rem,0.65vw,0.75rem)] leading-snug text-primary shadow-md"
      >
        <strong className="block font-semibold text-crimson">{siteConfig.name}</strong>
        {visitUs.mapLabel}
      </span>
    </a>
  );
}

// The social links, once siteConfig has any.
export function SocialLinks({ className }: { className: string }) {
  if (siteConfig.socialProfiles.length === 0) return null;
  return (
    <ul aria-label="Social media" className={`flex gap-3 ${className}`}>
      {siteConfig.socialProfiles.map((url) => {
        const { name, icon } = socialOf(url);
        return (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors duration-300 hover:bg-white/30"
            >
              <span className="sr-only">{name} (opens in a new tab)</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[1.15rem]">
                {icon}
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
