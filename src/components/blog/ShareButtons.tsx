"use client";

import { useEffect, useState, type ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </>
  ),
  X: <path d="M4 4l16 16M20 4L4 20" />,
  Facebook: <path d="M14 21v-7h3l.5-3.5H14V8.5c0-1 .5-1.5 1.5-1.5H18V4h-3c-2.5 0-4 1.5-4 4v2.5H8V14h3v7" />,
  link: (
    <>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

const Icon = ({ name }: { name: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[1.1rem]">
    {icons[name]}
  </svg>
);

const tones = {
  onDark: { label: "text-light/55", button: "border border-white/15 text-light/85 hover:border-white/40 hover:text-white" },
  onLight: { label: "text-primary/55", button: "border border-primary/15 text-primary/80 hover:border-crimson hover:text-crimson" },
};

// Share the article: LinkedIn, X, and Facebook (each opens their share page in a new tab), and
// copy the link. `url` is the article's address on the live site.
export function ShareButtons({ url, title, tone = "onDark" }: { url: string; title: string; tone?: keyof typeof tones }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const sites = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];
  const button = `grid size-10 place-items-center rounded-full transition-colors duration-200 ${tones[tone].button}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // No clipboard (e.g. an insecure page): show the address to copy by hand.
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <p className={`mr-1 font-mono text-[0.75rem] tracking-[0.14em] uppercase ${tones[tone].label}`}>Share</p>
      <ul className="flex gap-2.5">
        {sites.map((site) => (
          <li key={site.name}>
            <a href={site.href} target="_blank" rel="noopener noreferrer" className={button}>
              <Icon name={site.name} />
              <span className="sr-only">Share on {site.name} (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} className={button}>
            <Icon name={copied ? "check" : "link"} />
            <span className="sr-only">Copy link</span>
          </button>
        </li>
      </ul>
      <p aria-live="polite" className={`text-sm ${tones[tone].label}`}>
        {copied ? "Link copied" : ""}
      </p>
    </div>
  );
}
