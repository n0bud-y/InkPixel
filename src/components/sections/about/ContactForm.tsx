"use client";

import { useState, type FormEvent } from "react";
import { Honeypot } from "@/components/sections/contact/ProjectForm";
import { ThankYouDialog, type Sender } from "@/components/ui/ThankYouDialog";
import { contactPage } from "@/content/contact-page";
import type { Enquiry } from "@/lib/enquiry";
import { sendEnquiry } from "@/lib/send-enquiry";
import { siteConfig } from "@/lib/site";

const { form: text } = contactPage;

const field =
  "mt-1 w-full border-b border-primary/45 bg-transparent py-2 text-[clamp(0.9375rem,1vw,1.125rem)] text-primary outline-none transition-colors duration-300 focus:border-crimson";
const label = "block text-[clamp(0.8125rem,0.85vw,1rem)] font-medium text-primary";

type Status = { state: "idle" | "sending" } | { state: "failed"; reason: "busy" | "unavailable" };

// The "Get in touch" form (About and the service pages): name, email, and message. Submit sends
// it to the studio's inbox (sendEnquiry, emailed from the server), then clears the form and opens
// the thank-you popup (ThankYouDialog). If it can't be sent, a short error line under the button
// asks them to try again (the Contact page's wording). Without JavaScript the browser opens the
// email app itself (a mailto: form).
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [sender, setSender] = useState<Sender | null>(null);
  const sending = status.state === "sending";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const enquiry: Enquiry = {
      form: "contact",
      name: value("name"),
      email: value("email"),
      message: value("message"),
      page: window.location.pathname,
      website: value("website") || undefined,
    };
    setStatus({ state: "sending" });
    const result = await sendEnquiry(enquiry).catch(() => ({ ok: false, reason: "unavailable" }) as const);
    if (result.ok) {
      formElement.reset();
      setStatus({ state: "idle" });
      setSender({ name: enquiry.name, email: enquiry.email });
      return;
    }
    setStatus({ state: "failed", reason: result.reason === "busy" ? "busy" : "unavailable" });
  };

  return (
    <>
      <ThankYouDialog sender={sender} onClose={() => setSender(null)} />
      <form
        action={`mailto:${siteConfig.email}`}
        method="post"
        encType="text/plain"
        onSubmit={onSubmit}
        className="relative mt-[clamp(2rem,3vw,3.5rem)] flex flex-col gap-[clamp(1.5rem,2vw,2.25rem)]"
      >
        <label className={label}>
          Name
          <input name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </label>
        <label className={label}>
          Message
          <textarea name="message" required maxLength={5000} rows={4} className={`${field} resize-none`} />
        </label>
        <Honeypot />

        <div>
          <button
            type="submit"
            aria-disabled={sending}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-gradient-reverse px-[clamp(2rem,2.6vw,3rem)] text-[clamp(0.9375rem,1vw,1.125rem)] font-medium text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 aria-disabled:cursor-wait aria-disabled:opacity-75 sm:h-[3.25rem] 2xl:h-16"
          >
            {sending ? text.sending : "Submit"}
            {sending && (
              <span
                aria-hidden="true"
                className="size-[1em] animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}
          </button>
          <p aria-live="polite" className="mt-4 text-sm leading-relaxed font-medium text-crimson empty:hidden">
            {status.state === "failed" && text.failed[status.reason]}
          </p>
        </div>
      </form>
    </>
  );
}
