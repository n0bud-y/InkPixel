"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { contactPage } from "@/content/contact-page";
import { MOTION_OK, ScrollSmoother, gsap } from "@/lib/gsap";

const { thanks } = contactPage.form;

// Ink drops that burst out of the badge: [x, y] in rem from its centre, and a size in rem.
const drops: [number, number, number][] = [
  [-4.6, -2.4, 0.55],
  [-3.4, 2.9, 0.4],
  [4.4, -3, 0.5],
  [4.9, 1.6, 0.35],
  [-0.4, -4.8, 0.32],
  [1.7, 4.4, 0.45],
  [-5.4, 0.4, 0.28],
  [2.8, -4.3, 0.3],
];

/** Who sent the message: their name (the first word is used) and email address. */
export type Sender = { name: string; email: string };

// The thank-you popup after a contact form is sent (Contact page and "Get in touch"). A native
// modal <dialog>: focus moves into it and stays there, Esc and a click outside close it, and the
// page behind can't be used (or smooth-scrolled) while it's open.
// Animation (GSAP, skipped for reduced motion): the backdrop fades in, the card rises and settles,
// the gradient badge pops, its tick draws itself, ink drops burst out of it, then the text and
// buttons rise in one by one. Closing: the card sinks and fades, then the backdrop.
export function ThankYouDialog({ sender, onClose }: { sender: Sender | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !sender) return;
    closing.current = false;
    element.showModal();
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);

    const q = gsap.utils.selector(element);
    const tick = element.querySelector<SVGPathElement>("[data-tick]");
    const length = tick?.getTotalLength() ?? 0;
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    tl.fromTo(q("[data-backdrop]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power1.out" })
      .fromTo(q("[data-card]"), { autoAlpha: 0, y: 48, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out" }, 0.05)
      .fromTo(q("[data-badge]"), { scale: 0, rotate: -25 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.2)" }, 0.25)
      .fromTo(tick ?? [], { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, 0.55)
      .fromTo(
        q("[data-drop]"),
        { x: 0, y: 0, scale: 0, autoAlpha: 1 },
        {
          x: (index) => `${drops[index][0]}rem`,
          y: (index) => `${drops[index][1]}rem`,
          scale: 1,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.02,
        },
        0.5,
      )
      .to(q("[data-drop]"), { autoAlpha: 0, scale: 0.4, duration: 0.6, ease: "power1.in", stagger: 0.02 }, 1.05)
      .fromTo(q("[data-in]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07 }, 0.45);
    // Focus "Back to the site" once the card can take it (hidden elements can't, so showModal
    // alone leaves focus on the dialog).
    const focusPrimary = () => element.querySelector<HTMLElement>("[data-primary]")?.focus({ preventScroll: true });
    tl.call(focusPrimary, [], 0.1);
    timeline.current = tl;
    if (window.matchMedia(MOTION_OK).matches) tl.play();
    else {
      tl.progress(1).pause();
      focusPrimary();
    }

    return () => {
      tl.kill();
      smoother?.paused(false);
      if (element.open) element.close();
    };
  }, [sender]);

  const close = () => {
    const element = dialog.current;
    if (!element || closing.current) return;
    closing.current = true;
    timeline.current?.kill();
    const done = () => {
      element.close();
      ScrollSmoother.get()?.paused(false);
      onClose();
    };
    if (!window.matchMedia(MOTION_OK).matches) return done();
    const q = gsap.utils.selector(element);
    gsap.to(q("[data-card]"), { autoAlpha: 0, y: 24, scale: 0.96, duration: 0.25, ease: "power2.in" });
    gsap.to(q("[data-backdrop]"), { autoAlpha: 0, duration: 0.3, delay: 0.05, ease: "power1.in", onComplete: done });
  };

  const firstName = (sender?.name.trim().split(/\s+/)[0] ?? "").replace(/\*/g, "");

  return (
    <dialog
      ref={dialog}
      aria-labelledby="thanks-title"
      aria-describedby="thanks-text"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-y-auto bg-transparent p-4 text-left backdrop:bg-transparent open:grid open:place-items-center"
    >
      {/* Clicking outside the card closes it. */}
      <div data-backdrop aria-hidden="true" onClick={close} className="invisible fixed inset-0 bg-primary/75 backdrop-blur-md" />

      <div
        data-card
        className="invisible relative isolate w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-primary px-[clamp(1.5rem,4vw,3rem)] pt-[clamp(2.75rem,5vw,3.5rem)] pb-[clamp(1.75rem,4vw,2.75rem)] text-center shadow-[0_40px_120px_-30px_rgb(201_29_76_/_0.55)]"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.45),transparent)]"
        />

        <button
          type="button"
          onClick={close}
          aria-label={thanks.closeLabel}
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/10 text-light/70 transition hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-coral"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {/* The badge: a gradient disc with a tick that draws itself, ink drops bursting out. */}
        <div className="relative mx-auto grid size-[clamp(5rem,9vw,6rem)] place-items-center">
          {drops.map(([, , size], index) => (
            <span
              key={index}
              data-drop
              aria-hidden="true"
              style={{ width: `${size}rem`, height: `${size}rem` }}
              className="invisible absolute rounded-full bg-brand-gradient shadow-[0_0_12px_rgb(250_97_67_/_0.6)]"
            />
          ))}
          <span
            data-badge
            className="relative grid size-full place-items-center rounded-full bg-brand-gradient shadow-[0_18px_44px_-12px_rgb(250_97_67_/_0.85)] ring-8 ring-white/[0.06]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="size-1/2">
              <path data-tick d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
        </div>

        <div data-in className="mt-7">
          <Eyebrow>{thanks.eyebrow}</Eyebrow>
        </div>
        <h2
          data-in
          id="thanks-title"
          className="mt-5 font-display text-[clamp(2rem,4.2vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance text-white"
        >
          {withAccent(thanks.title.replace("{name}", firstName || "there"))}
        </h2>
        <p data-in id="thanks-text" className="mx-auto mt-4 max-w-[26em] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-light/75">
          {thanks.text}
        </p>

        {sender && (
          <p
            data-in
            className="mx-auto mt-6 flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pr-4 pl-2 text-left text-[13px] leading-snug text-light/80"
          >
            <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-crimson/20 text-coral">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="min-w-0 break-words">{thanks.reply.replace("{email}", sender.email)}</span>
          </p>
        )}

        <div data-in className="mt-8 flex flex-col-reverse items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href={thanks.work.href} variant="secondary" onClick={close}>
            {thanks.work.label}
          </Button>
          <button
            type="button"
            onClick={close}
            data-primary
            className="relative isolate inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand-gradient px-7 text-[15px] font-medium text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:h-[3.25rem]"
          >
            {thanks.close}
          </button>
        </div>
      </div>
    </dialog>
  );
}
