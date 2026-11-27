"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { formatPrice } from "@/content/events";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { BookingDialog, WhatsAppIcon, type BookingEvent } from "./BookingDialog";

// Where the box sits when pinned: 16 px below the fixed header (96 px tall on laptops, 128 px on
// large screens), measured, so it never slides under it.
const pinTop = () => (document.querySelector("header")?.getBoundingClientRect().height ?? 96) + 16;

const noSubscribe = () => () => {};

/** Days, hours, minutes, and seconds until the start; null once it has started. */
function useCountdown(start: string) {
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!mounted) return undefined;
  const left = Date.parse(start) - now;
  if (left <= 0) return null;
  const seconds = Math.floor(left / 1000);
  return { days: Math.floor(seconds / 86400), hours: Math.floor((seconds % 86400) / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 };
}

// The event's booking box. Desktop: beside the page's content, pinned below the header while the
// content scrolls (with GSAP: CSS sticky doesn't work inside the smooth scroller), until the end
// of the content. It shows the date, time, and venue, a countdown, the tickets and prices, "Book
// now" (the booking popup), WhatsApp and share buttons, and the information numbers. Phones and
// tablets: the box sits in the page, and a bar fixed to the bottom of the screen keeps the price
// and "Book now" in reach (outside the smooth scroller, so it stays fixed).
export function EventSidebar({
  event,
  date,
  time,
  day,
  month,
  start,
  mapUrl,
  phones,
  bookingOpen,
  past,
}: {
  event: BookingEvent;
  date: string;
  time: string;
  day: string;
  month: string;
  start: string;
  mapUrl: string;
  phones: string[];
  bookingOpen: boolean;
  past: boolean;
}) {
  const column = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const countdown = useCountdown(start);
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);
  const canBook = bookingOpen && !past;

  useGSAP(
    () => {
      const content = column.current;
      const element = box.current;
      if (!content || !element) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        // The box is never taller than the screen below the header (it scrolls inside itself on
        // short screens), measured again whenever ScrollTrigger re-measures (e.g. on resize).
        const fit = () => element.style.setProperty("--event-top", `${pinTop()}px`);
        fit();
        ScrollTrigger.addEventListener("refreshInit", fit);
        ScrollTrigger.create({
          trigger: element,
          start: () => `top ${pinTop()}px`,
          end: () => `+=${Math.max(0, content.offsetHeight - element.offsetHeight)}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
        return () => ScrollTrigger.removeEventListener("refreshInit", fit);
      });
      return () => mm.revert();
    },
    { scope: column },
  );

  const book = (name: string | null) => {
    setTicket(name);
    setOpen(true);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: event.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setShared(true);
      }
    } catch {
      // Sharing cancelled.
    }
  };

  const prices = event.tickets.flatMap(({ price }) => (price === null ? [] : [price]));
  const from = prices.length ? formatPrice(Math.min(...prices), event.currency) : null;
  const ask = `https://wa.me/${event.whatsapp}?text=${encodeURIComponent(`Hi, I have a question about ${event.title}.`)}`;

  return (
    <div ref={column} className="lg:h-full">
      <div
        ref={box}
        className="scrollbar-brand overflow-hidden rounded-[1.75rem] bg-white text-primary shadow-[0_40px_90px_-45px_rgb(21_25_54_/_0.6)] ring-1 ring-primary/10 lg:max-h-[calc(100svh-var(--event-top,7rem)-1rem)] lg:overflow-y-auto lg:overscroll-contain"
      >
        {/* Date and title. */}
        <div className="relative isolate overflow-hidden bg-primary p-6 text-white">
          <div aria-hidden="true" className="absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.45),transparent)]" />
          <div className="flex items-start gap-4">
            <div className="grid w-16 shrink-0 overflow-hidden rounded-2xl bg-white text-center text-primary">
              <span className="bg-brand-gradient py-1 font-mono text-[11px] tracking-[0.16em] text-white uppercase">{month}</span>
              <span className="py-1.5 font-display text-[1.75rem] leading-none font-semibold">{day}</span>
            </div>
            <div>
              <p className="font-display text-[1.15rem] leading-snug font-semibold">{event.title}</p>
            </div>
          </div>

          {/* Countdown (after the page has loaded, so server and browser agree). Decorative: the
              date is in the text, and a ticking timer would keep interrupting screen readers. */}
          {countdown && (
            <div aria-hidden="true" className="mt-5 grid grid-cols-4 gap-2 text-center">
              {(
                [
                  ["days", countdown.days],
                  ["hours", countdown.hours],
                  ["min", countdown.minutes],
                  ["sec", countdown.seconds],
                ] as const
              ).map(([unit, value]) => (
                <div key={unit} className="rounded-xl bg-white/[0.08] py-2 ring-1 ring-white/10">
                  <span className="block font-display text-[1.35rem] leading-none font-semibold tabular-nums">{String(value).padStart(2, "0")}</span>
                  <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-light/60 uppercase">{unit}</span>
                </div>
              ))}
            </div>
          )}
          {countdown === null && <p className="mt-4 text-[14px] text-light/75">{past ? "This event has ended." : "Happening now."}</p>}
        </div>

        <div className="space-y-5 p-6">
          <ul className="space-y-3 text-[15px]">
            <li className="flex gap-3">
              <CalendarIcon />
              <span>
                <span className="font-medium">{date}</span>
                <span className="block text-primary/60">{time} (Pakistan time)</span>
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon />
              <span>
                <span className="font-medium">{event.venue}</span>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block text-crimson underline-offset-4 hover:underline">
                  Open in Maps ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </span>
            </li>
          </ul>

          {/* Tickets. */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-primary/50 uppercase">Tickets</p>
            <ul className="mt-2 divide-y divide-primary/10 rounded-2xl ring-1 ring-primary/10">
              {event.tickets.map((option) => (
                <li key={option.name} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span>
                    <span className="font-medium">{option.name}</span>
                    <span className="block text-[13px] text-primary/55">{option.exhibitor ? "Per dog" : "Per person"}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-semibold text-crimson">{formatPrice(option.price, event.currency) ?? "Price TBA"}</span>
                    {canBook && (
                      <button type="button" onClick={() => book(option.name)} className="text-[13px] font-medium text-primary/70 underline-offset-4 hover:text-primary hover:underline">
                        Book {option.name.toLowerCase()}
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {canBook ? (
            <button
              type="button"
              onClick={() => book(null)}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-gradient text-[16px] font-semibold text-white shadow-[0_14px_34px_-12px_rgb(201_29_76_/_0.8)] transition hover:-translate-y-px hover:brightness-110"
            >
              Book now
            </button>
          ) : (
            <p className="rounded-full bg-primary/5 py-4 text-center font-medium text-primary/70">{past ? "This event has ended" : "Booking opens soon"}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <a
              href={ask}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-primary/15 text-[14px] font-medium transition hover:border-[#25d366] hover:text-[#128c4b]"
            >
              <WhatsAppIcon className="size-5" />
              Ask a question<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={share}
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-primary/15 text-[14px] font-medium transition hover:border-primary/30"
            >
              <ShareIcon />
              {shared ? "Link copied" : "Share"}
            </button>
          </div>

          {phones.length > 0 && (
            <div className="border-t border-primary/10 pt-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-primary/50 uppercase">Information & registration</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-primary/80 hover:text-crimson">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Phones and tablets: the bar fixed to the bottom of the screen. */}
      {mounted &&
        canBook &&
        createPortal(
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-white/95 px-4 py-3 shadow-[0_-12px_30px_-18px_rgb(21_25_54_/_0.5)] backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
              <p className="text-primary">
                <span className="block text-[12px] text-primary/60">
                  {day} {month} · {time}
                </span>
                <span className="font-semibold">{from ? `From ${from}` : "Tickets"}</span>
              </p>
              <button
                type="button"
                onClick={() => book(null)}
                className="h-12 rounded-full bg-brand-gradient px-7 text-[15px] font-semibold text-white shadow-[0_12px_28px_-10px_rgb(201_29_76_/_0.8)]"
              >
                Book now
              </button>
            </div>
          </div>,
          document.body,
        )}

      {/* Keyed by the ticket chosen, so the form starts on that ticket. */}
      <BookingDialog key={ticket ?? "any"} event={event} open={open} initialTicket={ticket} onClose={() => setOpen(false)} />
    </div>
  );
}

const iconClass = "mt-0.5 size-5 shrink-0 fill-none stroke-crimson stroke-[1.8]";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
    </svg>
  );
}
