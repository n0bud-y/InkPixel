"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import nodemailer, { type Transporter } from "nodemailer";
import * as z from "zod";
import { env } from "@/env";
import { enquiryEmail, type Enquiry } from "@/lib/enquiry";
import { siteConfig } from "@/lib/site";

// The contact forms' server function: checks what was sent, saves it to a backup log on the
// server, and emails it to the studio (info@inkpixelstudios.com, or CONTACT_TO) with the visitor
// as Reply-To, so the studio can answer straight from its inbox. The same flow as the studio's
// PHP form handlers (PHP's mail()), so it needs no settings on cPanel hosting:
// - Email: through the server's own mail program (sendmail, as PHP's mail() uses), from
//   info@inkpixelstudios.com. If SMTP_HOST, SMTP_USER, and SMTP_PASSWORD are set, through that
//   mailbox over SMTP instead.
// - Backup: every enquiry is added to data/submissions.log in the app's folder (one JSON line
//   each; not reachable from the web), whether or not the email goes out, so none is lost. A
//   failed email is noted in the log too, and in the server's error log.
// - The visitor sees "sent" (the thank-you popup) when the email went out or the enquiry was
//   saved; only when both fail do they get the "try again" line.
// - Fields are checked again here (types and lengths), whatever the browser did.
// - Bots: a hidden "website" field that only bots fill in (they get "sent" and nothing is
//   emailed or saved), and at most 5 enquiries per visitor (IP address) per 10 minutes.

const text = (max: number) => z.string().trim().max(max);
const optional = (max: number) => text(max).optional();

const enquirySchema = z.object({
  form: z.enum(["project", "contact"]),
  name: text(120).min(1),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: optional(40),
  company: optional(120),
  services: z.array(text(60)).max(10).optional(),
  estimate: z.object({ name: text(120), answers: z.array(z.tuple([text(300), text(300)])).max(12) }).optional(),
  message: text(5000).min(1),
  page: optional(200),
  website: z.string().max(500).optional(),
});

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
  let sent = false;
  try {
    await transport.sendMail({
      from: { name: `${siteConfig.name} website`, address: from },
      to: env.CONTACT_TO ?? siteConfig.email,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject,
      text: `${body}\n\n—\nSent from the contact form on ${page}`,
    });
    sent = true;
  } catch (error) {
    console.error("Enquiry email not sent (it is in the backup log if that was written).", error);
    if (logged) await log({ time: new Date().toISOString(), note: `email not sent for the enquiry at ${time}` });
  }

  return sent || logged ? { ok: true } : { ok: false, reason: "unavailable" };
}
