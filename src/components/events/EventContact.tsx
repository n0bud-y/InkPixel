"use client";

import { useState } from "react";
import { WhatsAppIcon } from "./BookingDialog";

// "Information & registration" on an event's page (moved out of the booking box, 28 Nov 2026,
// project head): the information numbers as call buttons, and buttons to ask a question on
// WhatsApp and to share the page (the phone's share sheet, or the link copied).
export function EventContact({ title, whatsapp, phones }: { title: string; whatsapp: string; phones: string[] }) {
  const [copied, setCopied] = useState(false);
  const ask = `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi, I have a question about ${title}.`)}`;

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      }
    } catch {
      // Sharing cancelled.
    }
  };

  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden rounded-[1.75rem] bg-primary p-[clamp(1.5rem,3vw,2.5rem)] text-white">
      <div aria-hidden="true" className="absolute -top-24 -left-20 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.35),transparent)] motion-safe:animate-glow-pulse" />
      <p className="font-mono text-[11px] tracking-[0.18em] text-coral uppercase">Information & registration</p>
      <h2 id="contact-title" className="mt-2 font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight font-semibold tracking-[-0.02em]">
        Questions? Call or Message Us
      </h2>

      {phones.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-3">
          {phones.map((phone) => (
            <li key={phone}>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.06] px-4 text-[15px] font-medium text-light/90 ring-1 ring-white/12 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-gradient hover:text-white hover:shadow-[0_14px_28px_-14px_rgb(201_29_76_/_0.9)] hover:ring-transparent"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-coral stroke-2 transition-colors group-hover:stroke-white" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Call </span>
                {phone}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <a
          href={ask}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25d366] px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgb(37_211_102_/_0.9)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          <WhatsAppIcon className="size-5" />
          Ask a question<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
        </a>
        <button
          type="button"
          onClick={share}
          className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-white ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
            <circle cx="18" cy="5.5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="18.5" r="2.5" />
            <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
          </svg>
          {copied ? "Link copied" : "Share this event"}
        </button>
      </div>
    </section>
  );
}
