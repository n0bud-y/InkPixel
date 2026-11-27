"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatPrice, ticketTotal, type EventTicket } from "@/content/events";
import { ScrollSmoother } from "@/lib/gsap";
import { sheen } from "./styles";

/** What the popup needs from an event (plain data: it's a client component). */
export type BookingEvent = {
  slug: string;
  title: string;
  when: string;
  venue: string;
  currency: string;
  tickets: EventTicket[];
  payment: { raastId: string | null; accountTitle: string | null; bank: string | null; qr: string | null; link: string | null };
  whatsapp: string;
};

// The popup's body: scrolls inside itself, with the brand scroll bar.
const scrollArea = "scrollbar-brand min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7 sm:px-8";

// The booking popup on an event's page (28 Nov 2026, project head: no forms, pay first; payment
// proof goes on WhatsApp only, never through the site). A native modal <dialog>: focus stays
// inside, Esc and a click outside close it. One booking is one ticket:
// 1. pick the ticket (the price for one; more dogs or people are settled on WhatsApp);
// 2. pay the amount by Raast: scan the QR code with a banking app (or send to the Raast ID);
// 3. "Send payment proof on WhatsApp" opens WhatsApp to the studio with the ticket and amount
//    typed in; the buyer sends the screenshot or transaction reference there, and the studio
//    sends the ticket in the chat.
export function BookingDialog({
  event,
  open,
  initialTicket,
  onClose,
}: {
  event: BookingEvent;
  open: boolean;
  initialTicket: string | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [ticketName, setTicketName] = useState(initialTicket ?? event.tickets[0]?.name ?? "");
  const [copied, setCopied] = useState(false);

  const ticket = event.tickets.find(({ name }) => name === ticketName) ?? event.tickets[0];
  const amount = ticket ? ticketTotal(ticket, 1) : null;
  const price = (value: number | null) => formatPrice(value, event.currency);
  const { payment } = event;

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      element.showModal();
      ScrollSmoother.get()?.paused(true);
    } else if (!open && element.open) {
      element.close();
    }
  }, [open]);

  const close = () => {
    ScrollSmoother.get()?.paused(false);
    onClose();
  };

  const message = [
    `Hi Ink Pixel Studios, I've paid for a ticket to ${event.title}.`,
    `Ticket: ${ticket?.name}${ticket?.exhibitor ? " (1 dog)" : ""}`,
    amount !== null ? `Amount paid: ${price(amount)}` : "",
    "Here is my payment screenshot / transaction reference:",
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappUrl = `https://wa.me/${event.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <dialog
      ref={dialog}
      onClose={close}
      onClick={(clickEvent) => {
        if (clickEvent.target === dialog.current) dialog.current?.close();
      }}
      aria-labelledby="booking-title"
      className="m-auto max-h-[min(92svh,56rem)] w-[min(42rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] bg-light p-0 text-primary shadow-[0_40px_120px_-30px_rgb(10_12_30_/_0.8)] backdrop:bg-primary/70 backdrop:backdrop-blur-sm open:flex motion-safe:open:animate-pop-in"
    >
      {/* The header stays put; the rest scrolls below it. */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-primary/10 bg-light px-6 py-5 sm:px-8">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-crimson uppercase">Book your ticket</p>
          <h2 id="booking-title" className="mt-1 font-display text-[clamp(1.25rem,2.4vw,1.6rem)] leading-tight font-semibold">
            {event.title}
          </h2>
          <p className="mt-1 text-[13px] text-primary/60">
            {event.when} · {event.venue}
          </p>
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/15 text-primary/70 transition hover:rotate-90 hover:border-primary/30 hover:text-primary"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={`${scrollArea} space-y-7`}>
        {/* 1. The ticket. */}
        <fieldset>
          <legend className="flex items-center gap-2 font-display text-[1.1rem] font-semibold">
            <Step n={1} /> Choose your ticket
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {event.tickets.map((option) => (
              <label
                key={option.name}
                className="relative flex cursor-pointer flex-col rounded-2xl border border-primary/15 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-coral/50 hover:shadow-[0_16px_30px_-20px_rgb(201_29_76_/_0.6)] has-[:checked]:border-coral has-[:checked]:ring-2 has-[:checked]:ring-coral/25 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-coral"
              >
                <input
                  type="radio"
                  name="ticket"
                  value={option.name}
                  checked={ticketName === option.name}
                  onChange={() => setTicketName(option.name)}
                  className="sr-only"
                />
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold">{option.name}</span>
                  <span className="text-[15px] font-semibold whitespace-nowrap text-crimson">{price(ticketTotal(option, 1)) ?? "Price TBA"}</span>
                </span>
                <span className="mt-1 text-[13px] leading-snug text-primary/65">{option.description}</span>
                <span className="mt-2 font-mono text-[10px] tracking-[0.14em] text-primary/45 uppercase">
                  {option.entry ? "Entry + 1 dog" : option.exhibitor ? "1 dog" : "1 person"}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-white/70 px-4 py-3 text-[13px] leading-relaxed text-primary/70 ring-1 ring-primary/10">
            More dogs (+{price(event.tickets.find((option) => option.exhibitor)?.price ?? null) ?? "fee"} each) or more people? Tell us on WhatsApp after
            paying and pay the extra there.
          </p>
        </fieldset>

        {/* 2. Pay. */}
        <section aria-labelledby="pay-title">
          <h3 id="pay-title" className="flex items-center gap-2 font-display text-[1.1rem] font-semibold">
            <Step n={2} /> Pay by Raast
          </h3>
          <div className="mt-3 grid gap-5 rounded-2xl bg-white p-5 ring-1 ring-primary/10 sm:grid-cols-[13rem_1fr] sm:items-center">
            {payment.qr ? (
              <Image src={payment.qr} alt="Raast QR code for the payment" width={416} height={416} className="mx-auto w-52 rounded-2xl bg-white p-2 ring-1 ring-primary/10" />
            ) : (
              <div className="mx-auto grid size-52 place-items-center rounded-2xl border-2 border-dashed border-primary/20 p-4 text-center text-[13px] text-primary/60">
                The Raast QR code is on its way. Ask us on WhatsApp for the payment details.
              </div>
            )}
            <div>
              <p className="text-[12px] tracking-[0.12em] text-primary/55 uppercase">Amount to pay</p>
              <p className="font-display text-[2rem] leading-tight font-semibold text-crimson">{price(amount) ?? "To be confirmed"}</p>
              <ol className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-primary/75">
                <li>1. Open your banking app and scan the QR code{payment.raastId ? " (or send to the Raast ID)" : ""}.</li>
                <li>2. Enter the amount above and pay.</li>
                <li>3. Copy the transaction reference, or take a screenshot.</li>
              </ol>
              {(payment.raastId || payment.accountTitle || payment.bank) && (
                <dl className="mt-3 space-y-1 text-[14px]">
                  {payment.raastId && (
                    <div className="flex flex-wrap items-center gap-2">
                      <dt className="text-primary/55">Raast ID:</dt>
                      <dd className="font-mono font-semibold">{payment.raastId}</dd>
                      <button
                        type="button"
                        onClick={() => {
                          void navigator.clipboard?.writeText(payment.raastId ?? "").then(() => setCopied(true));
                        }}
                        className="rounded-full border border-primary/15 px-2.5 py-0.5 text-[12px] font-medium text-primary/70 hover:border-primary/30"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  )}
                  {payment.accountTitle && (
                    <div className="flex gap-2">
                      <dt className="text-primary/55">Account:</dt>
                      <dd className="font-semibold">{payment.accountTitle}</dd>
                    </div>
                  )}
                  {payment.bank && (
                    <div className="flex gap-2">
                      <dt className="text-primary/55">Bank:</dt>
                      <dd className="font-semibold">{payment.bank}</dd>
                    </div>
                  )}
                </dl>
              )}
              {payment.link && (
                <a href={payment.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[14px] font-medium text-crimson underline underline-offset-4">
                  Or pay with the payment link ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 3. Payment proof, on WhatsApp only. */}
        <section aria-labelledby="proof-title">
          <h3 id="proof-title" className="flex items-center gap-2 font-display text-[1.1rem] font-semibold">
            <Step n={3} /> Send your payment proof
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-primary/70">
            After paying, tap the button: WhatsApp opens with your ticket and amount typed in. Send us the payment screenshot or the
            transaction reference in the chat, and we&apos;ll send your ticket there.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25d366] text-[16px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(37_211_102_/_0.8)] ${sheen}`}
          >
            <WhatsAppIcon />
            Send payment proof on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </div>
    </dialog>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-brand-gradient-reverse text-[13px] font-bold text-white">
      {n}
    </span>
  );
}

export function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}
