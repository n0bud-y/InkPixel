// Small decorative icons: hidden from screen readers (the text next to them says what they
// mean). Size and colour come from className / the current text colour.

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M4.5 11.5l7-7M5.75 4.5h5.75v5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
