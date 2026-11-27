"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import nodemailer, { type Transporter } from "nodemailer";
import * as z from "zod";
import { formatPrice, getEvent, isPast, ticketBreakdown, ticketTotal } from "@/content/events";
import { env } from "@/env";
import { enquiryEmail, type Enquiry } from "@/lib/enquiry";
import { siteConfig } from "@/lib/site";

// The contact forms and service estimators' server function: checks what was sent, saves it to a
// backup log on the server, and emails it to the studio (info@inkpixelstudios.com, or CONTACT_TO).
// Contact forms include the visitor as Reply-To; estimates contain no visitor identity. The same
// flow as the studio's PHP form handlers (PHP's mail()), so it needs no settings on cPanel hosting:
// - Email: through the server's own mail program (sendmail, as PHP's mail() uses), from
//   info@inkpixelstudios.com. If SMTP_HOST, SMTP_USER, and SMTP_PASSWORD are set, through that
//   mailbox over SMTP instead.
// - Backup: every enquiry is added to data/submissions.log in the app's folder (one JSON line
//   each; not reachable from the web), whether or not the email goes out, so none is lost. A
//   failed email is noted in the log too, and in the server's error log.
// - The visitor sees "sent" (the thank-you popup) when the email went out or the enquiry was
//   saved; only when both fail do they get the "try again" line.
// - Fields are checked again here (types and lengths), whatever the browser did.
// - Contact-form bots: a hidden "website" field only bots fill in (they get "sent" and nothing
//   is emailed or saved). All submissions are limited to 5 per visitor (IP address) per 10 minutes.

const text = (max: number) => z.string().trim().max(max);
const optional = (max: number) => text(max).optional();

const contactFields = {
  name: text(120).min(1),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: optional(40),
  company: optional(120),
  services: z.array(text(60)).max(10).optional(),
  estimate: z.object({ name: text(120), answers: z.array(z.tuple([text(300), text(300)])).max(12) }).optional(),
  message: text(5000).min(1),
  page: optional(200),
  website: z.string().max(500).optional(),
};
const estimateFields = {
  estimate: z.object({
    name: text(120).min(1),
    answers: z.array(z.tuple([text(300), text(300)])).min(1).max(12),
  }),
  page: optional(200),
  website: z.string().max(500).optional(),
};

const enquirySchema = z.discriminatedUnion("form", [
  z.object({ ...contactFields, form: z.literal("project") }),
  z.object({ ...contactFields, form: z.literal("contact") }),
  z.object({ ...estimateFields, form: z.literal("estimate") }),
]);

export type EnquiryResult = { ok: true } | { ok: false; reason: "invalid" | "busy" | "unavailable" };

// Enquiries per visitor in the last 10 minutes (in this server's memory; it resets on restart).
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const recent = new Map<string, number[]>();

function tooMany(visitor: string) {
  const now = Date.now();
  const times = (recent.get(visitor) ?? []).filter((time) => now - time < WINDOW);
  if (times.length >= LIMIT) return true;
  recent.set(visitor, [...times, now]);
  // Keep the map small: drop visitors with nothing recent.
  if (recent.size > 1000) for (const [key, list] of recent) if (list.every((time) => now - time >= WINDOW)) recent.delete(key);
  return false;
}

// The backup log: data/submissions.log in the app's folder (the folder the server runs from),
// or SUBMISSIONS_LOG.
const logFile = env.SUBMISSIONS_LOG ?? path.join(process.cwd(), "data", "submissions.log");

async function log(record: Record<string, unknown>) {
  try {
    await mkdir(path.dirname(logFile), { recursive: true });
    await appendFile(logFile, `${JSON.stringify(record)}\n`, "utf8");
    return true;
  } catch (error) {
    console.error(`Enquiry backup: could not write ${logFile}.`, error);
    return false;
  }
}

// SMTP when its settings are all there; otherwise the server's sendmail program.
let transporter: Transporter | undefined;
function mailer() {
  const { SMTP_HOST: host, SMTP_PORT: port, SMTP_USER: user, SMTP_PASSWORD: pass } = env;
  const smtp = Boolean(host && user && pass);
  transporter ??= smtp
    ? nodemailer.createTransport({
        host,
        port,
        // Port 465 uses TLS from the start; 587 upgrades with STARTTLS.
        secure: port === 465,
        auth: { user, pass },
      })
    : nodemailer.createTransport({ sendmail: true, newline: "unix", path: env.SENDMAIL_PATH });
  return { transport: transporter, from: smtp && user ? user : siteConfig.email };
}

export async function sendEnquiry(input: Enquiry): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const enquiry = parsed.data;
  if (enquiry.website) return { ok: true };

  // The visitor's IP: the last X-Forwarded-For entry is the one our own proxy (the host's web
  // server) added; earlier ones come from the visitor and can be made up. With none, no limit
  // (rather than one limit shared by everyone).
  const requestHeaders = await headers();
  const visitor = requestHeaders.get("x-forwarded-for")?.split(",").at(-1)?.trim() || requestHeaders.get("x-real-ip");
  if (visitor && tooMany(visitor)) return { ok: false, reason: "busy" };

  const time = new Date().toISOString();
  const logged = await log({ time, ...enquiry, website: undefined, ip: visitor ?? "" });

  const { subject, text: body } = enquiryEmail(enquiry);
  const page = enquiry.page ? `${siteConfig.url}${enquiry.page}` : siteConfig.url;
  const { transport, from } = mailer();
  const source = enquiry.form === "estimate" ? "service estimator" : "contact form";
  let sent = false;
  try {
    await transport.sendMail({
      from: { name: `${siteConfig.name} website`, address: from },
      to: env.CONTACT_TO ?? siteConfig.email,
      ...(enquiry.form === "estimate" ? {} : { replyTo: { name: enquiry.name, address: enquiry.email } }),
      subject,
      text: `${body}\n\n—\nSent from the ${source} on ${page}`,
    });
    sent = true;
  } catch (error) {
    console.error("Enquiry email not sent (it is in the backup log if that was written).", error);
    if (logged) await log({ time: new Date().toISOString(), note: `email not sent for the enquiry at ${time}` });
  }

  return sent || logged ? { ok: true } : { ok: false, reason: "unavailable" };
}

// Event bookings (28 Nov 2026): the booking form on an event's page (/events/<slug>). The ticket's
// price comes from src/content/events.ts, never from the browser. Saved to the backup log and
// emailed to the studio like an enquiry (Reply-To: the buyer), with a booking reference the buyer
// quotes when sending the Raast receipt on WhatsApp.
const dogFields = z.object({ name: text(120).min(1), breed: text(120).min(1), sex: optional(20), dateOfBirth: optional(40), className: optional(80) });
const bookingSchema = z.object({
  event: text(120).min(1),
  ticket: text(80).min(1),
  quantity: z.number().int().min(1).max(20),
  name: text(120).min(1),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: text(40).min(7),
  city: optional(80),
  dogs: z.array(dogFields).max(20).optional(),
  message: optional(2000),
  website: z.string().max(500).optional(),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingResult =
  | { ok: true; reference: string; total: number | null }
  | { ok: false; reason: "invalid" | "busy" | "unavailable" | "closed" };

export async function sendBooking(input: BookingInput): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const booking = parsed.data;

  const event = getEvent(booking.event);
  const ticket = event?.tickets.find(({ name }) => name === booking.ticket);
  if (!event || !ticket) return { ok: false, reason: "invalid" };
  if (!event.bookingOpen || isPast(event)) return { ok: false, reason: "closed" };
  // Exhibitors: one dog per ticket, each with a name and breed.
  if (ticket.exhibitor && booking.dogs?.length !== booking.quantity) return { ok: false, reason: "invalid" };

  // A reference the buyer can read out: the event's code and six letters or digits.
  const reference = `${event.code}-${Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0")}`;
  const total = ticketTotal(ticket, booking.quantity);
  const breakdown = ticketBreakdown(ticket, booking.quantity, event.currency);
  if (booking.website) return { ok: true, reference, total };

  const requestHeaders = await headers();
  const visitor = requestHeaders.get("x-forwarded-for")?.split(",").at(-1)?.trim() || requestHeaders.get("x-real-ip");
  if (visitor && tooMany(visitor)) return { ok: false, reason: "busy" };

  const time = new Date().toISOString();
  const logged = await log({ time, form: "booking", reference, ...booking, total, website: undefined, ip: visitor ?? "" });

  const price = formatPrice(total, event.currency) ?? "price to be confirmed";
  const lines = [
    `Booking ${reference}: ${event.title}`,
    `Ticket: ${ticket.name} × ${booking.quantity}`,
    `Total: ${price}${breakdown ? ` (${breakdown})` : ""}`,
    "",
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    booking.city ? `City: ${booking.city}` : "",
    ...(booking.dogs?.length
      ? [
          "",
          "Dogs:",
          ...booking.dogs.map((dog, index) =>
            `${index + 1}. ${dog.name}, ${dog.breed}${dog.sex ? `, ${dog.sex}` : ""}${dog.dateOfBirth ? `, born ${dog.dateOfBirth}` : ""}${dog.className ? `, class: ${dog.className}` : ""}`,
          ),
        ]
      : []),
    booking.message ? `\nMessage:\n${booking.message}` : "",
    "",
    "Payment: by Raast; the buyer sends the receipt on WhatsApp quoting the reference. Confirm once received.",
  ].filter((line, index, all) => line !== "" || all[index - 1] !== "");

  const { transport, from } = mailer();
  let sent = false;
  try {
    await transport.sendMail({
      from: { name: `${siteConfig.name} website`, address: from },
      to: env.CONTACT_TO ?? siteConfig.email,
      replyTo: { name: booking.name, address: booking.email },
      subject: `Booking ${reference}: ${ticket.name} × ${booking.quantity}, ${event.title}`.replace(/\s+/g, " ").trim(),
      text: `${lines.join("\n")}\n\n—\nSent from ${siteConfig.url}/events/${event.slug}`,
    });
    sent = true;
  } catch (error) {
    console.error("Booking email not sent (it is in the backup log if that was written).", error);
    if (logged) await log({ time: new Date().toISOString(), note: `email not sent for booking ${reference}` });
  }

  return sent || logged ? { ok: true, reference, total } : { ok: false, reason: "unavailable" };
}
