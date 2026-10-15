"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site";

const field =
  "mt-1 w-full border-b border-primary/45 bg-transparent py-2 text-[clamp(0.9375rem,1vw,1.125rem)] text-primary outline-none transition-colors duration-300 focus:border-crimson";
const label = "block text-[clamp(0.8125rem,0.85vw,1rem)] font-medium text-primary";

// The "Get in touch" form: name, email, and message. Until the lead pipeline (P3-14) sends
// messages from the site, Submit opens the visitor's email app with the message written out,
// addressed to the studio; without JavaScript, the browser does much the same (a mailto: form).
export function ContactForm() {
  const [opened, setOpened] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const subject = `Project enquiry from ${value("name")}`;
    const body = `${value("message")}\n\n${value("name")}\n${value("email")}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form
      action={`mailto:${siteConfig.email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      className="mt-[clamp(2rem,3vw,3.5rem)] flex flex-col gap-[clamp(1.5rem,2vw,2.25rem)]"
    >
      <label className={label}>
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Message
        <textarea name="message" required rows={4} className={`${field} resize-none`} />
      </label>

      <div>
        <button
          type="submit"
          className="h-12 rounded-full bg-brand-gradient-reverse px-[clamp(2rem,2.6vw,3rem)] text-[clamp(0.9375rem,1vw,1.125rem)] font-medium text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 sm:h-[3.25rem] 2xl:h-16"
        >
          Submit
        </button>
        <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-primary/75">
          {opened && (
            <>
              Your email app should open with your message, ready to send. If it doesn&apos;t, write to us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-crimson underline underline-offset-4">
                {siteConfig.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
