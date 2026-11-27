"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
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

const field =
  "mt-1.5 block w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-[15px] text-primary outline-none transition placeholder:text-primary/40 focus:border-coral focus:ring-2 focus:ring-coral/25";
const label = "block text-[13px] font-medium text-primary/80";
// The popup's body: scrolls inside itself, with the brand scroll bar.
const scrollArea = "scrollbar-brand min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7 sm:px-8";

// The booking popup on an event's page (28 Nov 2026, project head: no forms, pay first). A native
// modal <dialog>: focus stays inside, Esc and a click outside close it. One booking is one ticket:
// 1. pick the ticket (the price for one; more dogs or people are settled on WhatsApp);
// 2. pay the amount by Raast: scan the QR code with a banking app (or send to the Raast ID);
// 3. type the transaction reference and/or choose the payment screenshot (at least one);
// 4. Submit opens WhatsApp to the studio with the ticket, amount, and reference typed in. A web
//    page can't put an image into a WhatsApp chat, so the screenshot is attached there by the
//    buyer; phones that can share files get a "Share screenshot" button for it.
// Nothing is sent to the site; the studio checks the payment and sends the ticket on WhatsApp.
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
  const [reference, setReference] = useState("");
  const [screenshot, setScreenshot] = useState<{ file: File; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
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

  // The screenshot's preview address is freed when it's replaced or the popup goes.
  useEffect(() => () => (screenshot ? URL.revokeObjectURL(screenshot.url) : undefined), [screenshot]);

  const close = () => {
    ScrollSmoother.get()?.paused(false);
    onClose();
  };

  const chooseScreenshot = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const file = changeEvent.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image (a screenshot or photo of the receipt).");
      return;
    }
    setError(null);
    setScreenshot({ file, url: URL.createObjectURL(file) });
  };

  const message = [
    `Hi Ink Pixel Studios, I've paid for a ticket to ${event.title}.`,
    `Ticket: ${ticket?.name}${ticket?.exhibitor ? " (1 dog)" : ""}`,
    amount !== null ? `Amount paid: ${price(amount)}` : "",
    reference.trim() ? `Transaction reference: ${reference.trim()}` : "",
    screenshot ? "I'm attaching my payment screenshot." : "",
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappUrl = `https://wa.me/${event.whatsapp}?text=${encodeURIComponent(message)}`;

  const submit = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (!reference.trim() && !screenshot) {
      setError("Add the transaction reference or the payment screenshot (at least one).");
      return;
    }
    setError(null);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const canShareFile = typeof navigator !== "undefined" && !!screenshot && !!navigator.canShare?.({ files: [screenshot.file] });
  const shareScreenshot = async () => {
    if (!screenshot) return;
    try {
      await navigator.share({ files: [screenshot.file], text: message });
    } catch {
      // Sharing cancelled.
    }
  };

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
          <p className="font-mono text-[11px] tracking-[0.18em] text-crimson uppercase">{sent ? "Almost done" : "Book your ticket"}</p>
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

      {sent ? (
        <div className={scrollArea}>
          <div className="rounded-2xl bg-primary p-6 text-white">
            <p className="font-display text-[1.35rem] font-semibold">Now send it on WhatsApp</p>
            <p className="mt-2 text-[15px] leading-relaxed text-light/80">
              WhatsApp has opened with your ticket, amount{reference.trim() ? ", and transaction reference" : ""} typed in. Press send
              {screenshot ? " and attach your payment screenshot in the chat" : ""}. We&apos;ll check the payment and send your ticket on WhatsApp.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-12 items-center gap-2 rounded-full bg-[#25d366] px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgb(37_211_102_/_0.9)] ${sheen}`}
            >
              <WhatsAppIcon className="size-5" />
              Open WhatsApp again<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {canShareFile && (
              <button
                type="button"
                onClick={shareScreenshot}
                className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium ring-1 ring-primary/20 transition hover:bg-primary hover:text-white"
              >
                Share screenshot
              </button>
            )}
            <button type="button" onClick={() => setSent(false)} className="inline-flex h-12 items-center px-2 text-[15px] font-medium text-primary/70 underline-offset-4 hover:underline">
              Back
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className={`${scrollArea} space-y-7`}>
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

          {/* 3. Proof of payment. */}
          <fieldset>
            <legend className="flex items-center gap-2 font-display text-[1.1rem] font-semibold">
              <Step n={3} /> Add your payment proof
            </legend>
            <p className="mt-1 text-[13px] text-primary/60">The transaction reference, the screenshot, or both.</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Transaction reference
                <input
                  value={reference}
                  onChange={(changeEvent) => setReference(changeEvent.target.value)}
                  maxLength={80}
                  autoComplete="off"
                  placeholder="e.g. 3A7F92K1"
                  className={`${field} font-mono`}
                />
              </label>
              <div className={label}>
                Payment screenshot
                <label className="mt-1.5 flex h-[3.125rem] cursor-pointer items-center gap-3 rounded-xl border border-dashed border-primary/25 bg-white px-3 text-[14px] text-primary/70 transition hover:border-coral has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-coral">
                  <input type="file" accept="image/*" onChange={chooseScreenshot} className="sr-only" />
                  {screenshot ? (
                    // A preview of the chosen image (a local blob, so a plain <img>).
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={screenshot.url} alt="" className="size-9 rounded-lg object-cover ring-1 ring-primary/10" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-none stroke-coral stroke-[1.8]" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="16" rx="3" />
                      <circle cx="9" cy="10" r="2" />
                      <path d="m21 16-5-5-9 9" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span className="min-w-0 truncate">{screenshot ? screenshot.file.name : "Choose an image"}</span>
                </label>
              </div>
            </div>
          </fieldset>

          <div>
            <p role="alert" className="mb-3 text-[14px] text-crimson empty:hidden">
              {error}
            </p>
            {/* 4. Send. */}
            <button
              type="submit"
              className={`flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25d366] text-[16px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(37_211_102_/_0.8)] ${sheen}`}
            >
              <WhatsAppIcon />
              Submit on WhatsApp
            </button>
            <p className="mt-3 text-center text-[13px] text-primary/55">We check your payment and send your ticket on WhatsApp.</p>
          </div>
        </form>
      )}
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
