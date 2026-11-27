"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { formatPrice, ticketTotal } from "@/content/events";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { BookingDialog, type BookingEvent } from "./BookingDialog";
import { Countdown, useCountdown } from "./Countdown";
import { sheen } from "./styles";

// Short laptop screens (up to 820 px tall) get a tighter box (the lg:[@media(max-height:820px)]
// classes), so it fits below the header there too.
// Where the box sits when pinned: 16 px below the fixed header (96 px tall on laptops, 128 px on
// large screens), measured, so it never slides under it.
const pinTop = () => (document.querySelector("header")?.getBoundingClientRect().height ?? 96) + 16;

const noSubscribe = () => () => {};

// The event's booking box. Desktop: beside the page's content, pinned below the header while the
// content scrolls (with GSAP: CSS sticky doesn't work inside the smooth scroller), until the end
// of the content. It shows the date, time, and venue, a countdown, the tickets and prices, and
// "Book now" (the booking popup); questions and sharing are in the page (EventContact). Phones and
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
  bookingOpen: boolean;
  past: boolean;
}) {
  const column = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
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
        // No scroll bar inside the box: when it fits below the header it pins there; on a screen
        // too short for it, it scrolls with the page until its bottom is in view (16 px above the
        // screen's edge) and pins there, so every part of it can be reached. Measured again on
        // every refresh (e.g. on resize).
        const fits = () => element.offsetHeight + pinTop() + 16 <= window.innerHeight;
        ScrollTrigger.create({
          trigger: element,
          start: () => (fits() ? `top ${pinTop()}px` : "bottom bottom-=16"),
          end: () => `+=${Math.max(0, content.offsetHeight - element.offsetHeight)}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
      return () => mm.revert();
    },
    { scope: column },
  );

  const book = (name: string | null) => {
    setTicket(name);
    setOpen(true);
  };

  const prices = event.tickets.flatMap((option) => ticketTotal(option, 1) ?? []);
  const from = prices.length ? formatPrice(Math.min(...prices), event.currency) : null;

  return (
    <div ref={column} className="lg:h-full">
      <div
        ref={box}
        className="overflow-hidden rounded-[1.75rem] bg-white text-primary shadow-[0_40px_90px_-45px_rgb(21_25_54_/_0.6)] ring-1 ring-primary/10"
      >
        {/* Date and title. */}
        <div className="relative isolate overflow-hidden bg-primary p-6 text-white lg:[@media(max-height:820px)]:p-5">
          <div aria-hidden="true" className="absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.45),transparent)] motion-safe:animate-glow-pulse" />
          <div className="flex items-start gap-4">
            <div className="grid w-16 shrink-0 overflow-hidden rounded-2xl bg-white text-center text-primary shadow-[0_14px_28px_-12px_rgb(0_0_0_/_0.6)] motion-safe:animate-float">
              <span className="bg-brand-gradient py-1 font-mono text-[11px] tracking-[0.16em] text-white uppercase">{month}</span>
              <span className="py-1.5 font-display text-[1.75rem] leading-none font-semibold">{day}</span>
            </div>
            <div>
              <p className="font-display text-[1.15rem] leading-snug font-semibold">{event.title}</p>
            </div>
          </div>

          <Countdown start={start} className="mt-5 lg:[@media(max-height:820px)]:mt-4" cellClassName="lg:[@media(max-height:820px)]:py-1.5" />
          {countdown === null && <p className="mt-4 text-[14px] text-light/75">{past ? "This event has ended." : "Happening now."}</p>}
        </div>

        <div className="space-y-5 p-6 lg:[@media(max-height:820px)]:space-y-4 lg:[@media(max-height:820px)]:p-5">
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
                <li key={option.name} className="group/ticket relative flex items-center justify-between gap-3 px-4 py-3 lg:[@media(max-height:820px)]:py-2 transition-colors duration-300 first:rounded-t-2xl last:rounded-b-2xl hover:bg-light">
                  <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[3px] origin-center scale-y-0 rounded-r bg-brand-gradient transition-transform duration-300 group-hover/ticket:scale-y-100" />
                  <span>
                    <span className="font-medium">{option.name}</span>
                    <span className="block text-[13px] text-primary/55">
                      {option.entry ? `With 1 dog · +${formatPrice(option.price, event.currency)} per extra dog` : option.exhibitor ? "Per dog" : "Per person"}
                    </span>
                  </span>
                  <span className="shrink-0 text-right whitespace-nowrap">
                    <span className="block font-semibold text-crimson">{formatPrice(ticketTotal(option, 1), event.currency) ?? "Price TBA"}</span>
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
              className={`group/book flex h-14 w-full lg:[@media(max-height:820px)]:h-12 items-center justify-center gap-2 rounded-full bg-brand-gradient text-[16px] font-semibold text-white shadow-[0_14px_34px_-12px_rgb(201_29_76_/_0.8)] hover:shadow-[0_20px_40px_-12px_rgb(250_97_67_/_0.8)] ${sheen}`}
            >
              Book now
              <span aria-hidden="true" className="transition-transform duration-300 group-hover/book:translate-x-1">
                →
              </span>
            </button>
          ) : (
            <p className="rounded-full bg-primary/5 py-4 text-center font-medium text-primary/70">{past ? "This event has ended" : "Booking opens soon"}</p>
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
                className={`h-12 rounded-full bg-brand-gradient px-7 text-[15px] font-semibold text-white shadow-[0_12px_28px_-10px_rgb(201_29_76_/_0.8)] ${sheen}`}
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
