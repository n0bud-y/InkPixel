"use client";

import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function EstimateThankYouDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    else if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="estimate-thanks-title"
      aria-describedby="estimate-thanks-text"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-y-auto bg-transparent p-4 text-left backdrop:bg-primary/75 backdrop:backdrop-blur-md open:grid open:place-items-center"
    >
      <div className="relative isolate w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-primary px-[clamp(1.5rem,4vw,3rem)] pt-[clamp(2.75rem,5vw,3.5rem)] pb-[clamp(1.75rem,4vw,2.75rem)] text-center text-white shadow-[0_40px_120px_-30px_rgb(201_29_76_/_0.55)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.45),transparent)]"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/10 text-light/70 transition hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-coral"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-4"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div
          aria-hidden="true"
          className="mx-auto grid size-[clamp(5rem,9vw,6rem)] place-items-center rounded-full bg-brand-gradient shadow-[0_18px_44px_-12px_rgb(250_97_67_/_0.85)] ring-8 ring-white/[0.06]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-1/2"
          >
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>

        <div className="mt-7">
          <Eyebrow>Estimate received</Eyebrow>
        </div>
        <h2
          id="estimate-thanks-title"
          className="mt-5 font-display text-[clamp(2rem,4.2vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance"
        >
          Your estimate request is in.
        </h2>
        <p
          id="estimate-thanks-text"
          className="mx-auto mt-4 max-w-[26em] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-light/75"
        >
          Your answers have been sent to our team. Thanks for your interest.
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-gradient px-7 text-[15px] font-medium text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:h-[3.25rem]"
          >
            Back to the service page
          </button>
        </div>
      </div>
    </dialog>
  );
}
