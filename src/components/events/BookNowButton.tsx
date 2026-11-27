"use client";

import { sheen } from "./styles";

/** The event the booking box (EventSidebar) listens for to open its booking popup. */
export const OPEN_BOOKING = "event-booking:open";

// "Book now" outside the booking box (the event banner): opens the same booking popup.
export function BookNowButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_BOOKING))}
      className={`group/book inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 text-[16px] font-semibold text-white shadow-[0_16px_40px_-12px_rgb(201_29_76_/_0.85)] hover:shadow-[0_22px_46px_-12px_rgb(250_97_67_/_0.85)] ${sheen} ${className}`}
    >
      Book now
      <span aria-hidden="true" className="transition-transform duration-300 group-hover/book:translate-x-1">
        →
      </span>
    </button>
  );
}
