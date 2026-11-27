"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatPrice, type EventTicket } from "@/content/events";
import { sendBooking, type BookingResult } from "@/lib/send-enquiry";
import { ScrollSmoother } from "@/lib/gsap";

/** What the dialog needs from an event (plain data: it's a client component). */
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

type Dog = { name: string; breed: string; sex: string; dateOfBirth: string; className: string };
const emptyDog: Dog = { name: "", breed: "", sex: "", dateOfBirth: "", className: "" };

const field =
  "mt-1.5 block w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-[15px] text-primary outline-none transition placeholder:text-primary/40 focus:border-coral focus:ring-2 focus:ring-coral/25";
const label = "block text-[13px] font-medium text-primary/80";

const problems: Record<Exclude<BookingResult, { ok: true }>["reason"], string> = {
  invalid: "Please check the form: every field marked * is needed, and an exhibitor booking needs each dog's name and breed.",
  busy: "Too many bookings from this connection just now. Please wait a few minutes and try again.",
  unavailable: "The booking couldn't be sent. Please try again, or call one of the numbers on this page.",
  closed: "Booking for this event has closed.",
};

// The booking popup on an event's page (a native modal <dialog>: focus stays inside, Esc closes
// it). Step 1, the form: the ticket, how many, the buyer's details, and for exhibitor tickets each
// dog's details, with the total. Step 2, after it's sent: the booking reference and how to pay by
// Raast (the QR code, the Raast ID to copy, an optional payment link), and a WhatsApp button that
// opens a message with the reference, for sending the receipt.
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
  const [quantity, setQuantity] = useState(1);
  const [dogs, setDogs] = useState<Dog[]>([{ ...emptyDog }]);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ reference: string; total: number | null; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const ticket = event.tickets.find(({ name }) => name === ticketName) ?? event.tickets[0];
  const total = ticket && ticket.price !== null ? ticket.price * quantity : null;

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

  const setCount = (count: number) => {
    const next = Math.min(10, Math.max(1, count));
    setQuantity(next);
    setDogs((list) => Array.from({ length: next }, (_, index) => list[index] ?? { ...emptyDog }));
  };

  const updateDog = (index: number, key: keyof Dog, value: string) =>
    setDogs((list) => list.map((dog, i) => (i === index ? { ...dog, [key]: value } : dog)));

  async function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!ticket) return;
    const form = new FormData(formEvent.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();
    setStatus("sending");
    setError(null);
    const result = await sendBooking({
      event: event.slug,
      ticket: ticket.name,
      quantity,
      name: value("name"),
      email: value("email"),
      phone: value("phone"),
      city: value("city") || undefined,
      dogs: ticket.exhibitor
        ? dogs.map((dog) => ({
            name: dog.name.trim(),
            breed: dog.breed.trim(),
            sex: dog.sex || undefined,
            dateOfBirth: dog.dateOfBirth || undefined,
            className: dog.className.trim() || undefined,
          }))
        : undefined,
      message: value("message") || undefined,
      website: value("website") || undefined,
    }).catch(() => ({ ok: false, reason: "unavailable" }) as const);
    setStatus("idle");
    if (result.ok) setDone({ reference: result.reference, total: result.total, name: value("name") });
    else setError(problems[result.reason]);
  }

  const price = (amount: number | null) => formatPrice(amount, event.currency);
  const { payment } = event;
  const whatsappText = done
    ? [
        `Hi, I booked ${ticket?.name} × ${quantity} for ${event.title}.`,
        `Booking reference: ${done.reference}`,
        done.total !== null ? `Amount: ${price(done.total)}` : "",
        "Here is my Raast payment receipt.",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <dialog
      ref={dialog}
      onClose={close}
      onClick={(clickEvent) => {
        if (clickEvent.target === dialog.current) dialog.current?.close();
      }}
      aria-labelledby="booking-title"
      className="m-auto max-h-[92svh] w-[min(42rem,calc(100vw-1.5rem))] overflow-y-auto overscroll-contain rounded-[1.75rem] bg-light p-0 text-primary shadow-[0_40px_120px_-30px_rgb(10_12_30_/_0.8)] backdrop:bg-primary/70 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-primary/10 bg-light/95 px-6 py-5 backdrop-blur sm:px-8">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-crimson uppercase">{done ? "Booking received" : "Book your place"}</p>
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
          className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/15 text-primary/70 transition hover:border-primary/30 hover:text-primary"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {done ? (
        <div className="px-6 py-7 sm:px-8">
          <div className="rounded-2xl bg-primary p-5 text-white">
            <p className="text-[14px] text-light/75">Thank you, {done.name.split(" ")[0]}. Your booking reference:</p>
            <p className="mt-1 font-mono text-[clamp(1.6rem,4vw,2.1rem)] font-semibold tracking-[0.08em]">{done.reference}</p>
            <p className="mt-2 text-[14px] text-light/80">
              {ticket?.name} × {quantity}
              {done.total !== null ? ` · ${price(done.total)}` : " · we'll confirm the amount on WhatsApp"}
            </p>
          </div>

          <h3 className="mt-7 font-display text-[1.25rem] font-semibold">Pay by Raast</h3>
          <ol className="mt-3 space-y-2 text-[15px] leading-relaxed text-primary/80">
            <li>1. Open your banking app and scan the QR code{payment.raastId ? ", or send to the Raast ID below" : ""}.</li>
            <li>2. Write your reference {done.reference} in the payment note, if your app has one.</li>
            <li>3. Send the receipt on WhatsApp with the button below. We confirm your booking once it&apos;s received.</li>
          </ol>

          <div className="mt-5 grid gap-5 sm:grid-cols-[12rem_1fr] sm:items-center">
            {payment.qr ? (
              <Image src={payment.qr} alt="Raast QR code for the payment" width={384} height={384} className="mx-auto w-48 rounded-2xl bg-white p-3 ring-1 ring-primary/10" />
            ) : (
              <div className="mx-auto grid size-48 place-items-center rounded-2xl border-2 border-dashed border-primary/20 bg-white p-4 text-center text-[13px] text-primary/60">
                The Raast QR code will be sent to you on WhatsApp.
              </div>
            )}
            <dl className="space-y-3 text-[15px]">
              {payment.raastId && (
                <div>
                  <dt className="text-[12px] tracking-[0.12em] text-primary/55 uppercase">Raast ID</dt>
                  <dd className="mt-0.5 flex items-center gap-2 font-mono font-semibold">
                    {payment.raastId}
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard?.writeText(payment.raastId ?? "").then(() => setCopied(true));
                      }}
                      className="rounded-full border border-primary/15 px-2.5 py-0.5 font-sans text-[12px] font-medium text-primary/70 hover:border-primary/30"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </dd>
                </div>
              )}
              {payment.accountTitle && (
                <div>
                  <dt className="text-[12px] tracking-[0.12em] text-primary/55 uppercase">Account title</dt>
                  <dd className="mt-0.5 font-semibold">{payment.accountTitle}</dd>
                </div>
              )}
              {payment.bank && (
                <div>
                  <dt className="text-[12px] tracking-[0.12em] text-primary/55 uppercase">Bank</dt>
                  <dd className="mt-0.5 font-semibold">{payment.bank}</dd>
                </div>
              )}
              {done.total !== null && (
                <div>
                  <dt className="text-[12px] tracking-[0.12em] text-primary/55 uppercase">Amount</dt>
                  <dd className="mt-0.5 font-semibold">{price(done.total)}</dd>
                </div>
              )}
              {!payment.raastId && !payment.qr && <p className="text-[14px] text-primary/70">We&apos;ll send you the Raast payment details on WhatsApp.</p>}
              {payment.link && (
                <a href={payment.link} target="_blank" rel="noopener noreferrer" className="inline-block font-medium text-crimson underline underline-offset-4">
                  Pay with the payment link ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </dl>
          </div>

          <a
            href={`https://wa.me/${event.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25d366] text-[16px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(37_211_102_/_0.8)] transition hover:brightness-105"
          >
            <WhatsAppIcon />
            Send receipt on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="mt-3 text-center text-[13px] text-primary/55">We&apos;ve also received your booking by email.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-6 px-6 py-7 sm:px-8">
          <fieldset>
            <legend className="text-[13px] font-medium text-primary/80">Ticket *</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {event.tickets.map((option) => (
                <label
                  key={option.name}
                  className="relative flex cursor-pointer flex-col rounded-2xl border border-primary/15 bg-white p-4 transition has-[:checked]:border-coral has-[:checked]:ring-2 has-[:checked]:ring-coral/25 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-coral"
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
                    <span className="text-[14px] font-semibold text-crimson">{price(option.price) ?? "Price TBA"}</span>
                  </span>
                  <span className="mt-1 text-[13px] leading-snug text-primary/65">{option.description}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex items-center justify-between gap-4">
            <span id="quantity-label" className={label}>
              {ticket?.exhibitor ? "Number of dogs" : "Number of people"}
            </span>
            <div role="group" aria-labelledby="quantity-label" className="flex items-center gap-2">
              <button type="button" onClick={() => setCount(quantity - 1)} aria-label="One fewer" className="grid size-10 place-items-center rounded-full border border-primary/15 text-xl hover:border-primary/30">
                −
              </button>
              <output aria-live="polite" className="w-8 text-center text-[17px] font-semibold">
                {quantity}
              </output>
              <button type="button" onClick={() => setCount(quantity + 1)} aria-label="One more" className="grid size-10 place-items-center rounded-full border border-primary/15 text-xl hover:border-primary/30">
                +
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>
              Full name *
              <input name="name" required autoComplete="name" maxLength={120} className={field} />
            </label>
            <label className={label}>
              Phone (WhatsApp) *
              <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={40} placeholder="03xx xxxxxxx" className={field} />
            </label>
            <label className={label}>
              Email *
              <input name="email" required type="email" autoComplete="email" maxLength={254} className={field} />
            </label>
            <label className={label}>
              City
              <input name="city" autoComplete="address-level2" maxLength={80} className={field} />
            </label>
          </div>

          {ticket?.exhibitor && (
            <div className="space-y-4">
              {dogs.map((dog, index) => (
                <fieldset key={index} className="rounded-2xl border border-primary/10 bg-white p-4">
                  <legend className="px-1 text-[13px] font-semibold text-primary">{dogs.length > 1 ? `Dog ${index + 1}` : "Your dog"}</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className={label}>
                      Dog&apos;s name *
                      <input required value={dog.name} onChange={(e) => updateDog(index, "name", e.target.value)} maxLength={120} className={field} />
                    </label>
                    <label className={label}>
                      Breed *
                      <input required value={dog.breed} onChange={(e) => updateDog(index, "breed", e.target.value)} maxLength={120} className={field} />
                    </label>
                    <label className={label}>
                      Sex
                      <select value={dog.sex} onChange={(e) => updateDog(index, "sex", e.target.value)} className={field}>
                        <option value="">Choose</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </label>
                    <label className={label}>
                      Date of birth
                      <input type="date" value={dog.dateOfBirth} onChange={(e) => updateDog(index, "dateOfBirth", e.target.value)} className={field} />
                    </label>
                    <label className={`${label} sm:col-span-2`}>
                      Class (if you know it)
                      <input value={dog.className} onChange={(e) => updateDog(index, "className", e.target.value)} maxLength={80} placeholder="e.g. Puppy, Junior, Open, Champion" className={field} />
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
          )}

          <label className={label}>
            Message
            <textarea name="message" rows={3} maxLength={2000} className={field} />
          </label>
          {/* Only bots fill this in. */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-primary/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px]">
              <span className="text-primary/60">Total: </span>
              <span className="font-display text-[1.35rem] font-semibold">{price(total) ?? "to be confirmed"}</span>
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-gradient px-7 text-[15px] font-semibold text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Book & see payment"}
            </button>
          </div>
          <p role="alert" className="text-[14px] text-crimson empty:hidden">
            {error}
          </p>
          <p className="text-[12px] text-primary/50">You pay by Raast after booking. Your details are only used for this booking.</p>
        </form>
      )}
    </dialog>
  );
}

export function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}
